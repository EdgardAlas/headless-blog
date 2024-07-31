import { Role } from '@/constants/roles';
import { auth } from '@lib/auth';
import { connectDB } from '@lib/db';
import { UserModel } from '@models/user.model';
import { cache } from 'react';

export const currentUser = cache(
	async (): Promise<
		| {
				id: string;
				email: string;
				blocked: boolean;
				role: Role;
				image: string;
				name: string;
		  }
		| undefined
	> => {
		const session = await auth();

		if (!session) {
			return undefined;
		}

		await connectDB();

		if (!session.user?.id) {
			return undefined;
		}

		const foundUser = await UserModel.findById(session.user.id);

		if (!foundUser) {
			return undefined;
		}

		return {
			id: foundUser._id.toString(),
			email: foundUser.email,
			blocked: foundUser.blocked,
			role: foundUser.role as Role,
			image: foundUser.image,
			name: foundUser.name,
		};
	}
);
