import * as usersActions from '@/crud/users/actions';
import * as usersValidations from '@/crud/users/validations';
import { CrudFormInfo } from '@/types/crud';

export const usersModalCrudModalInfo: CrudFormInfo = {
	create: {
		title: 'Create User',
		validation: usersValidations.createUserValidation,
		createAction: usersActions.createUserAction,
	},
	update: {
		title: 'Update User',
		validation: usersValidations.updateUserValidation,
		updateAction: usersActions.updateUserAction,
	},
	delete: {
		title: 'Delete User',
		deleteAction: usersActions.deleteUserAction,
	},

	get: {
		getAction: usersActions.getUserByIdAction,
	},
};
