import {
	createUserAction,
	deleteUserAction,
	getUserByIdAction,
	updateUserAction,
} from '@/app/(dashboard)/users/actions';
import {
	createUserValidation,
	updateUserValidation,
} from '@/app/(dashboard)/users/validaitions';

export const validatiodCrudMap = {
	users: {
		create: {
			title: 'Create User',
			validation: createUserValidation,
		},
		update: {
			title: 'Update User',
			validation: updateUserValidation,
		},
		delete: {
			title: 'Delete User',
		},
		deleteAction: deleteUserAction,
		createAction: createUserAction,
		updateAction: updateUserAction,
		getAction: getUserByIdAction,
	},
} as const;

export type ValidationCrudMap = keyof typeof validatiodCrudMap;
