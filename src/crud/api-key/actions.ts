'use server';

import {
	createApiKeyValidation,
	getApiKeyValidation,
} from '@/crud/api-key/validations';
import { CustomError } from '@/helpers/custom-error';
import { idValidation } from '@/validations/id.validations';
import { revalidatePath } from 'next/cache';

import {
	deleteApiKey,
	findApiKeyById,
	findApiKeyByKeyId,
	insertApiKey,
} from '@/crud/api-key/dao';

import { extractApiKey, generateApiKey } from '@helpers/api-key';
import { authAction } from '@lib/safe-action';

export const createApiKeyAction = authAction
	.metadata({
		roles: ['admin', 'user'],
	})
	.schema(createApiKeyValidation)
	.action(async ({ parsedInput: values }) => {
		const { apiKey, apiKeyId } = await generateApiKey();
		await insertApiKey({
			name: values.name,
			apiKey: apiKey,
			searchId: apiKeyId,
		});

		revalidatePath('/api-keys');

		return 'ApiKey created successfully';
	});

export const deleteApiKeyAction = authAction
	.metadata({
		roles: ['admin', 'user'],
	})
	.schema(idValidation)
	.action(async ({ parsedInput: values }) => {
		const apiKey = await findApiKeyById(values.id);

		if (!apiKey) {
			throw new CustomError('ApiKey not found');
		}

		await deleteApiKey(values.id);

		revalidatePath('/api-keys');

		return 'ApiKey deleted successfully';
	});

export const getApiKeyAction = authAction
	.metadata({
		roles: ['admin', 'user'],
	})
	.schema(getApiKeyValidation)
	.action(async ({ parsedInput: values }) => {
		const apiKeyId = await findApiKeyByKeyId(values.apiKeyId);

		if (!apiKeyId) {
			throw new CustomError('ApiKey not found');
		}

		const { apiKey } = extractApiKey(apiKeyId.apiKey);

		return {
			apiKey,
			name: apiKeyId.name,
		};
	});
