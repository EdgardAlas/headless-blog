import mongoose from 'mongoose';
import { z } from 'zod';

export const idValidation = z.object({
	id: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
		message: 'Invalid id',
	}),
});
