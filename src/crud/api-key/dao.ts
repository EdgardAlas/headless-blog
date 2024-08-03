import { mapToPagination } from '@helpers/map-to-pagination';
import { connectDB } from '@lib/db';
import { ApiKeyModel, ApiKeyDocument } from '@models/api-key.model';
import { PaginateResult } from 'mongoose';
import { currentUser } from '@lib/current-user';
import { formatDate } from '@lib/format-dates';
import { extractApiKey } from '@helpers/api-key';

export const findApiKeyById = async (id: string) => {
	await connectDB();

	return ApiKeyModel.findById(id);
};

export const findApiKeyByKeyId = async (apiKey: string) => {
	await connectDB();

	return ApiKeyModel.findOne({ searchId: apiKey });
};

export const insertApiKey = async (apiKey: Partial<ApiKeyDocument>) => {
	await connectDB();

	return ApiKeyModel.create(apiKey);
};

export const updateApiKey = async (
	id: string,
	apiKey: Partial<ApiKeyDocument>
) => {
	await connectDB();

	return ApiKeyModel.findByIdAndUpdate(id, apiKey, { new: true });
};

export const deleteApiKey = async (id: string) => {
	await connectDB();

	return ApiKeyModel.findByIdAndDelete(id);
};

export const getApiKeysPaginated =
	(
		query: string,
		page: number,
		size: number
	): (() => Promise<WithPagination<ApiKeyRow[]>>) =>
	async () => {
		await connectDB();
		const apiKey = await currentUser();

		if (!apiKey) {
			return {
				data: [],
				page: 1,
				size: 7,
				totalPages: 1,
			};
		}

		const apiKeys = await ApiKeyModel.paginate(
			{},
			{
				page: page,
				limit: size,
				sort: {
					updatedAt: -1,
				},
			}
		);

		return mapApiKeyResponseToApiKeyRowArray(apiKeys);
	};

// mappers functions

export const mapApiKeyResponseToApiKeyRowArray = async (
	apiKeys: PaginateResult<ApiKeyDocument>
) => {
	return mapToPagination<ApiKeyRow>(apiKeys, (apiKey: ApiKeyDocument) => {
		return {
			id: apiKey.id.toString(),
			name: apiKey.name,
			apiKey: extractApiKey(apiKey.apiKey).apiKeyId,
			canBeDeleted: true,
			updatedAt: formatDate(apiKey.updatedAt).format('LLL'),
		};
	});
};
