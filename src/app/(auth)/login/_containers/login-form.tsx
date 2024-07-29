'use client';

import { loginAction } from '@/app/(auth)/login/actions';
import { loginValidations, LoginValues } from '@/app/(auth)/validations';
import { FormContext } from '@components/form/form-context';
import { FormInput } from '@components/form/form-input';
import { Button } from '@components/ui/button';
import { CardContent, CardFooter } from '@components/ui/card';
import { Input } from '@components/ui/input';
import { PasswordInput } from '@components/ui/password-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { handleSafeActionError } from '@lib/handle-safe-action-error';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export const LoginForm = () => {
	const form = useForm<LoginValues>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: zodResolver(loginValidations),
	});

	return (
		<FormContext
			form={form}
			onSubmit={async (data) => {
				const id = toast.loading('Logging in...');

				const response = await loginAction(data);

				if (handleSafeActionError(id, response)) {
					return;
				}

				toast.success('Logged in successfully', {
					id,
				});
			}}
		>
			<CardContent className='space-y-4'>
				<FormInput
					input={Input}
					name='email'
					label='Email'
					type='email'
					placeholder='email@email.com'
				/>

				<FormInput
					input={PasswordInput}
					name='password'
					label='Password'
					placeholder='********'
				/>
			</CardContent>
			<CardFooter>
				<Button className='w-full' loading={form.formState.isSubmitting}>
					Sign in
				</Button>
			</CardFooter>
		</FormContext>
	);
};
