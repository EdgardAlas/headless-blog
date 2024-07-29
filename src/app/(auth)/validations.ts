import { z } from 'zod';

export const loginValidations = z.object({
	email: z.string().email(),
	password: z.string(),
});

export type LoginValues = z.infer<typeof loginValidations>;
