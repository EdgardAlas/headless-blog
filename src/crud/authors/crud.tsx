import { AuthorColumns } from '@/crud/authors/_containers/columns';
import { getAuthorsPaginated } from '@/crud/authors/dao';
import { authorsCrudModalInfo } from './modal';
import { CrudConfiguration } from '@/types/crud';
import { ImageSizeLimit } from '@components/ui/image-size-limit';

export const authorCrud: CrudConfiguration = {
	roles: ['admin', 'user'],
	crud: authorsCrudModalInfo,
	getData: getAuthorsPaginated,
	columns: AuthorColumns,
	fieldConfig: {
		image: {
			fieldType: 'file',
			description: <ImageSizeLimit />,
		},
	},
	seo: {
		title: 'Authors',
		description: 'Manage authors',
	},
};
