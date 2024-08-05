import { authorsCrudModalInfo } from '@/crud/authors/modal';
import { categoriesCrudModalInfo } from '@/crud/categories/modal';
import { usersModalCrudModalInfo } from '@/crud/users/modal';
import { apiKeyCrudModalInfo } from '@/crud/api-key/modal';
import { CrudFormInfo } from '@/types/crud';

export type CrudValidationKeys =
	| 'users'
	| 'categories'
	| 'authors'
	| 'api-keys';

export const crudValidations: Record<CrudValidationKeys, CrudFormInfo> = {
	['api-keys']: apiKeyCrudModalInfo,
	users: usersModalCrudModalInfo,
	categories: categoriesCrudModalInfo,
	authors: authorsCrudModalInfo,
};
