import { CategoryColumns } from '@/crud/categories/_containers/category-columns';
import { getCategoriesPaginated } from '@/crud/categories/dao';
import { crudValidations } from '@/crud/crud-validations';
import { CrudConfiguration } from '@/types/crud';

export const categoryCrud: CrudConfiguration = {
	roles: ['admin', 'user'],
	crud: crudValidations.categories,
	getData: getCategoriesPaginated,
	columns: CategoryColumns,
};
