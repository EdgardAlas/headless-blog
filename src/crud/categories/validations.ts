import { z } from 'zod';

export const createCategoryValidation = z.object({
	name: z
		.string()
		.min(3, {
			message: 'Name must be between 3 and 30 characters',
		})
		.max(30, {
			message: 'Name must be between 3 and 30 characters',
		}),
});

export const updateCategoryValidation = z.object({
	name: z
		.string()
		.min(3, {
			message: 'Name must be between 3 and 30 characters',
		})
		.max(30, {
			message: 'Name must be between 3 and 30 characters',
		}),
	id: z.string().min(1, {
		message: 'Id must be a valid string',
	}),
});
