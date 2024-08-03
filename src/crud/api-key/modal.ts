import * as apiKeyActions from '@/crud/api-key/actions';
import * as apiKeyValidations from '@/crud/api-key/validations';
import { CrudFormInfo } from '@/types/crud';

export const apiKeyCrudModalInfo: CrudFormInfo = {
	create: {
		title: 'Create ApiKey',
		validation: apiKeyValidations.createApiKeyValidation,
		createAction: apiKeyActions.createApiKeyAction,
	},
	update: {
		title: 'Update ApiKey',
		validation: apiKeyValidations.updateApiKeyValidation,
		noEdit: true,
	},
	delete: {
		title: 'Delete ApiKey',
		deleteAction: apiKeyActions.deleteApiKeyAction,
	},
	get: {},
};
