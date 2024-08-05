import { z } from 'zod';

export const createAuthorValidation = z.object({
	name: z
		.string()
		.min(3, {
			message: 'Name must be between 3 and 60 characters',
		})
		.max(60, {
			message: 'Name must be between 3 and 60 characters',
		}),
	/* image: z.any().optional(), */
});

export const updateAuthorValidation = z.object({
	name: z
		.string()
		.min(3, {
			message: 'Name must be between 3 and 60 characters',
		})
		.max(60, {
			message: 'Name must be between 3 and 60 characters',
		}),
	/* image: z.any().optional(), */
	id: z.string().min(1, {
		message: 'Id must be a valid string',
	}),
});
