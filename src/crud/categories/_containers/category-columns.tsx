'use client';

import { CrudActions } from '@components/crud/crud-actions';
import { ColumnDef } from '@tanstack/react-table';

export const CategoryColumns: ColumnDef<CategoryRow>[] = [
	{
		header: 'Name',
		accessorKey: 'name',
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
					crud='categories'
					id={original.id}
				/>
			);
		},
	},
];
