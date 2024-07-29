import { CustomError } from '@helpers/custom-error';
import { authMiddleware } from '@lib/auth-middleware';
import { comparePasswords } from '@lib/hashing';
import { UserModel } from '@models/user.model';
import { loginValidations } from '@/app/(auth)/validations';
import NextAuth from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import { connectDB } from '@lib/db';

export const {
	handlers,
	signIn,
	signOut,
	auth,
	unstable_update: update,
} = NextAuth({
	...authMiddleware,
	providers: [
		credentials({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				await connectDB();

				const { email, password } =
					await loginValidations.parseAsync(credentials);

				const user = await UserModel.findOne({ email });

				if (!user) {
					throw new CustomError('Email or password are incorrect');
				}

				if (user.blocked) {
					throw new CustomError('User is blocked');
				}

				const isValid = await comparePasswords(password, user.password);

				if (!isValid) {
					throw new CustomError('Email or password are incorrect');
				}

				return {
					id: user._id.toString(),
				};
			},
		}),
	],
});
