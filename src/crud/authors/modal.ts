import * as authorsActions from '@/crud/authors/actions';
import * as authorValidations from '@/crud/authors/validations';
import { CrudFormInfo } from '@/types/crud';

export const authorsCrudModalInfo: CrudFormInfo = {
	create: {
		title: 'Create Author',
		validation: authorValidations.createAuthorValidation,
	},
	update: {
		title: 'Update Author',
		validation: authorValidations.updateAuthorValidation,
	},
	delete: {
		title: 'Delete Author',
	},
	deleteAction: authorsActions.deleteAuthorAction,
	createAction: authorsActions.createAuthorAction,
	updateAction: authorsActions.updateAuthorAction,
	getAction: authorsActions.getAuthorByIdAction,
};
