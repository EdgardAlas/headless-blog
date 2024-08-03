import * as authorsActions from '@/crud/authors/actions';
import * as authorValidations from '@/crud/authors/validations';
import { CrudFormInfo } from '@/types/crud';

export const authorsCrudModalInfo: CrudFormInfo = {
	create: {
		title: 'Create Author',
		validation: authorValidations.createAuthorValidation,
		createAction: authorsActions.createAuthorAction,
	},
	update: {
		title: 'Update Author',
		validation: authorValidations.updateAuthorValidation,
		updateAction: authorsActions.updateAuthorAction,
	},
	delete: {
		title: 'Delete Author',
		deleteAction: authorsActions.deleteAuthorAction,
	},
	get: {
		getAction: authorsActions.getAuthorByIdAction,
	},
};
