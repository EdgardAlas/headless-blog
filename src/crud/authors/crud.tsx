import { AuthorColumns } from '@/crud/authors/_containers/columns';
import { getAuthorsPaginated } from '@/crud/authors/dao';
import { crudValidations } from '@/crud/crud-modals';
import { CrudConfiguration } from '@/types/crud';
import { ImageSizeLimit } from '@components/ui/image-size-limit';

export const authorCrud: CrudConfiguration = {
	roles: ['admin', 'user'],
	crud: crudValidations.authors,
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
