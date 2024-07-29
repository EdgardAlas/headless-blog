import { z } from 'zod';

export const loginValidations = z.object({
	email: z.string().email({
		message: 'Please enter a valid email address',
	}),
	password: z.string(),
});

export type LoginValues = z.infer<typeof loginValidations>;
