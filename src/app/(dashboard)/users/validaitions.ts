import { z } from 'zod';

export const createUserValidation = z.object({
	name: z
		.string()
		.min(3, {
			message: 'Name must be between 3 and 255 characters',
		})
		.max(255, {
			message: 'Name must be between 3 and 255 characters',
		}),
	email: z.string().email({
		message: 'Invalid email',
	}),
	password: z
		.string()
		.min(8, {
			message: 'Password must be at least 6 characters',
		})
		.max(255, {
			message: 'Password must be at most 255 characters',
		}),
	role: z
		.enum(['admin', 'user'], {
			message: 'Invalid role',
		})
		.default('user'),
	image: z.any().optional(),
});

export const updateUserValidation = z
	.object({
		name: z
			.string()
			.min(3, {
				message: 'Name must be between 3 and 255 characters',
			})
			.max(255, {
				message: 'Name must be between 3 and 255 characters',
			}),
		email: z.string().email({
			message: 'Invalid email',
		}),
		role: z.enum(['admin', 'user'], {
			message: 'Invalid role',
		}),
		password: z.string().optional(),
		id: z.string().uuid({
			message: 'Invalid id',
		}),
		image: z.any().optional(),
	})
	.superRefine((data, cx) => {
		if (data.password && data.password.length < 8) {
			cx.addIssue({
				code: 'custom',
				message: 'Password must be at least 8 characters',
				path: ['password'],
			});
		}
	});

export type GeneralUserValidation = z.infer<typeof updateUserValidation>;
