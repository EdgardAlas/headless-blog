/* eslint-disable @typescript-eslint/no-explicit-any */
import { UsersTableColumns } from '@/crud/users/_containers/users-columns';
import * as usersActions from '@/crud/users/actions';
import { getUsersPaginated } from '@/crud/users/dao';
import * as usersValidations from '@/crud/users/validations';
import { CrudMap } from '@/types/crud';

export const crudMap: CrudMap = {
	users: {
		roles: ['admin'],
		columns: UsersTableColumns,
		crud: {
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
		getData: getUsersPaginated,
		fieldConfig: {
			password: {
				fieldType: 'password',
			},
			image: {
				fieldType: 'file',
				description: (
					<>
						<span className='text-xs text-gray-500'>
							Image should not be more than 5MB
						</span>
					</>
				),
			},
		},
	},
};
