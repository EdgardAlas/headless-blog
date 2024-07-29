import { Role } from '@/constants/roles';
import { CustomError } from '@helpers/custom-error';
import { validateMutation } from '@helpers/validate-mutation';
import { currentUser } from '@lib/current-user';
import { CredentialsSignin } from 'next-auth';
import { createSafeActionClient } from 'next-safe-action';
import { z } from 'zod';

const handleReturnedServerError = (e: Error) => {
	if (e instanceof CustomError) {
		return e.message;
	}

	if (e instanceof CredentialsSignin) {
		return 'Invalid credentials';
	}

	return 'An error occurred. Please try again later.';
};

export const action = createSafeActionClient({
	handleReturnedServerError,
});

export const authAction = createSafeActionClient({
	handleReturnedServerError,

	defineMetadataSchema() {
		return z.object({
			roles: z.array(z.string()),
		});
	},
}).use(async ({ next, metadata: { roles } }) => {
	const user = await currentUser();
	validateMutation(user?.role as Role, roles as Role[]);

	if (!user) {
		throw new CustomError('Unauthorized');
	}

	return next({
		ctx: user,
	});
});
