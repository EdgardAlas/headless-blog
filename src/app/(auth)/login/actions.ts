'use server';

import { loginValidations } from '@/app/(auth)/validations';
import { signIn } from '@lib/auth';
import { unAuthAction } from '@lib/safe-action';

export const loginAction = unAuthAction
	.schema(loginValidations)
	.action(async ({ parsedInput }) => {
		await signIn('credentials', {
			...parsedInput,
			redirect: true,
			redirectTo: '/',
		});
	});
