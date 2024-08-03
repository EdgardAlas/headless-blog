import { CategoryColumns } from '@/crud/categories/_containers/columns';
import { getCategoriesPaginated } from '@/crud/categories/dao';
import { CrudConfiguration } from '@/types/crud';
import { categoriesCrudModalInfo } from './modal';

export const categoryCrud: CrudConfiguration = {
	roles: ['admin', 'user'],
	crud: categoriesCrudModalInfo,
	getData: getCategoriesPaginated,
	columns: CategoryColumns,
	seo: {
		title: 'Categories',
		description: 'Manage categories',
	},
};
