/* eslint-disable @typescript-eslint/no-explicit-any */
import { UsersTableColumns } from '@/crud/users/_containers/users-columns';
import { getUsersPaginated } from '@/crud/users/dao';
import { validatiodCrudMap } from '@/crud/validations-map';
import { CrudMap } from '@/types/crud';

export const crudMap: CrudMap = {
	users: {
		roles: ['admin'],
		columns: UsersTableColumns,
		crud: validatiodCrudMap.users,
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
