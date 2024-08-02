'use client';

import { CrudActions } from '@components/crud/crud-actions';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { shortName } from '@helpers/short-name';
import { ColumnDef } from '@tanstack/react-table';

export const AuthorColumns: ColumnDef<AuthorRow>[] = [
	{
		header: 'Name',
		accessorKey: 'name',
	},
	{
		header: 'Image',
		accessorKey: 'image',
		cell: ({ row: { original } }) => {
			return (
				<Avatar>
					<AvatarFallback>{shortName(original.name)}</AvatarFallback>
					<AvatarImage src={original?.image ?? ''} alt={original.name} />
				</Avatar>
			);
		},
	},
	{
		header: 'Last Updated',
		accessorKey: 'updatedAt',
	},
	{
		header: '',
		accessorKey: 'actions',
		cell: ({ row: { original } }) => {
			return (
				<CrudActions
					canBeDeleted={original.canBeDeleted}
					crud='authors'
					id={original.id}
				/>
			);
		},
	},
];
