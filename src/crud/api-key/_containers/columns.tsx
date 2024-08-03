'use client';

import { ShowApiKey } from '@/crud/api-key/_containers/show-api-key';
import { CrudActions } from '@components/crud/crud-actions';
import { ColumnDef } from '@tanstack/react-table';

export const ApiKeyColumns: ColumnDef<ApiKeyRow>[] = [
	{
		header: 'Name',
		accessorKey: 'name',
	},
	{
		header: 'ApiKey',
		accessorKey: 'apiKey',
		cell: ({ row: { original } }) => {
			return <ShowApiKey apiKey={original.apiKey} />;
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
					crud='api-keys'
					id={original.id}
				/>
			);
		},
	},
];
