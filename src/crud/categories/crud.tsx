import { CategoryColumns } from '@/crud/categories/_containers/columns';
import { getCategoriesPaginated } from '@/crud/categories/dao';
import { crudValidations } from '@/crud/crud-modals';
import { CrudConfiguration } from '@/types/crud';

export const categoryCrud: CrudConfiguration = {
	roles: ['admin', 'user'],
	crud: crudValidations.categories,
	getData: getCategoriesPaginated,
	columns: CategoryColumns,
	seo: {
		title: 'Categories',
		description: 'Manage categories',
	},
};
