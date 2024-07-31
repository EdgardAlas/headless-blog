/* eslint-disable @typescript-eslint/no-explicit-any */
import * as usersActions from '@/crud/users/actions';
import * as usersValidations from '@/crud/users/validations';
import { CrudOptions } from '@/types/crud';

export const validatiodCrudMap: Record<string, CrudOptions> = {
	users: {
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
	},
};

export type ValidationCrudMap = keyof typeof validatiodCrudMap;
