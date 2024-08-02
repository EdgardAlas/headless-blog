import * as categoriesActions from '@/crud/categories/actions';
import * as categoriesValidations from '@/crud/categories/validations';
import { CrudFormInfo } from '@/types/crud';

export const categoriesCrudModalInfo: CrudFormInfo = {
	create: {
		title: 'Create Category',
		validation: categoriesValidations.createCategoryValidation,
	},
	update: {
		title: 'Update Category',
		validation: categoriesValidations.updateCategoryValidation,
	},
	delete: {
		title: 'Delete Category',
	},
	deleteAction: categoriesActions.deleteCategoryAction,
	createAction: categoriesActions.createCategoryAction,
	updateAction: categoriesActions.updateCategoryAction,
	getAction: categoriesActions.getCategoryByIdAction,
};
