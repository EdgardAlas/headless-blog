import * as usersActions from '@/crud/users/actions';
import * as usersValidations from '@/crud/users/validations';
import { CrudFormInfo } from '@/types/crud';

export const usersModalCrudModalInfo: CrudFormInfo = {
	create: {
		title: 'Create User',
		validation: usersValidations.createUserValidation,
	},
	update: {
		title: 'Update User',
		validation: usersValidations.updateUserValidation,
	},
	delete: {
		title: 'Delete User',
	},
	deleteAction: usersActions.deleteUserAction,
	createAction: usersActions.createUserAction,
	updateAction: usersActions.updateUserAction,
	getAction: usersActions.getUserByIdAction,
};
