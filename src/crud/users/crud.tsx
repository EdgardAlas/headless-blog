import { UsersTableColumns } from '@/crud/users/_containers/columns';
import { getUsersPaginated } from '@/crud/users/dao';
import { CrudConfiguration } from '@/types/crud';
import { ImageSizeLimit } from '@components/ui/image-size-limit';
import { usersModalCrudModalInfo } from './modal';

export const userCrud: CrudConfiguration = {
	roles: ['admin'],
	columns: UsersTableColumns,
	crud: usersModalCrudModalInfo,
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
