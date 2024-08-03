import { authorCrud } from '@/crud/authors/crud';
import { categoryCrud } from '@/crud/categories/crud';
import { CrudValidationKeys } from '@/crud/crud-modals';
import { userCrud } from '@/crud/users/crud';
import { CrudMap } from '@/types/crud';

export const crudPages: CrudMap<CrudValidationKeys> = {
	users: userCrud,
	categories: categoryCrud,
	authors: authorCrud,
};
