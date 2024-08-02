import { categoriesCrudModalInfo } from '@/crud/categories/modal';
import { usersModalCrudModalInfo } from '@/crud/users/modal';
import { CrudFormInfo } from '@/types/crud';

export type CrudValidationKeys = 'users' | 'categories';

export const crudValidations: Record<CrudValidationKeys, CrudFormInfo> = {
	users: usersModalCrudModalInfo,
	categories: categoriesCrudModalInfo,
};
