import * as categoriesActions from '@/crud/categories/actions';
import * as categoriesValidations from '@/crud/categories/validations';
import { CrudFormInfo } from '@/types/crud';

export const categoriesCrudModalInfo: CrudFormInfo = {
	create: {
		title: 'Create Category',
		validation: categoriesValidations.createCategoryValidation,
		createAction: categoriesActions.createCategoryAction,
	},
	update: {
		title: 'Update Category',
		validation: categoriesValidations.updateCategoryValidation,
		updateAction: categoriesActions.updateCategoryAction,
	},
	delete: {
		title: 'Delete Category',
		deleteAction: categoriesActions.deleteCategoryAction,
	},
	get: {
		getAction: categoriesActions.getCategoryByIdAction,
	},
};
