import { ApiKeyColumns } from '@/crud/api-key/_containers/columns';
import { getApiKeysPaginated } from '@/crud/api-key/dao';
import { CrudConfiguration } from '@/types/crud';
import { apiKeyCrudModalInfo } from './modal';

export const apiKeyCrud: CrudConfiguration = {
	roles: ['admin', 'user'],
	columns: ApiKeyColumns,
	crud: apiKeyCrudModalInfo,
	getData: getApiKeysPaginated,
	seo: {
		title: 'ApiKey',
		description: 'Manage apiKey',
	},
};
