import { UsersTableColumns } from '@/crud/users/_containers/users-columns';
import { getUsersPaginated } from '@/crud/users/dao';
import { crudValidations } from '@/crud/crud-validations';
import { CrudConfiguration } from '@/types/crud';

export const userCrud: CrudConfiguration = {
	roles: ['admin'],
	columns: UsersTableColumns,
	crud: crudValidations.users,
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
};
