import { authorCrud } from '@/crud/authors/crud';
import { categoryCrud } from '@/crud/categories/crud';
import { CrudValidationKeys } from '@/crud/modals';
import { userCrud } from '@/crud/users/crud';
import { apiKeyCrud } from '@/crud/api-key/crud';
import { CrudMap } from '@/types/crud';

export const crudPages: CrudMap<CrudValidationKeys> = {
	['api-keys']: apiKeyCrud,
	users: userCrud,
	categories: categoryCrud,
	authors: authorCrud,
};
