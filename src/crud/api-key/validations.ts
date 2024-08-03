import { z } from 'zod';

export const createApiKeyValidation = z.object({
	name: z.string(),
});

export const updateApiKeyValidation = z.object({});

export const getApiKeyValidation = z.object({
	apiKeyId: z.string().min(1, {
		message: 'ApiKeyId is required',
	}),
});
