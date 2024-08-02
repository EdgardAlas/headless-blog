import { UsersTableColumns } from '@/crud/users/_containers/columns';
import { getUsersPaginated } from '@/crud/users/dao';
import { crudValidations } from '@/crud/crud-modals';
import { CrudConfiguration } from '@/types/crud';
import { ImageSizeLimit } from '@components/ui/image-size-limit';

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
			description: <ImageSizeLimit />,
		},
	},
	seo: {
		title: 'Users',
		description: 'Manage users',
	},
};
