import { authorsCrudModalInfo } from '@/crud/authors/modal';
import { categoriesCrudModalInfo } from '@/crud/categories/modal';
import { usersModalCrudModalInfo } from '@/crud/users/modal';
import { CrudFormInfo } from '@/types/crud';

export type CrudValidationKeys = 'users' | 'categories' | 'authors';

export const crudValidations: Record<CrudValidationKeys, CrudFormInfo> = {
	users: usersModalCrudModalInfo,
	categories: categoriesCrudModalInfo,
	authors: authorsCrudModalInfo,
};
