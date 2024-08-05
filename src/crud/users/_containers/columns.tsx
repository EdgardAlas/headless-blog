'use client';

import { CrudActions } from '@components/crud/crud-actions';
/* import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'; */
import { Badge } from '@components/ui/badge';
/* import { shortName } from '@helpers/short-name'; */
import { cn } from '@lib/cn';
import { ColumnDef } from '@tanstack/react-table';

export const UsersTableColumns: ColumnDef<UserRow>[] = [
	{
		header: 'Name',
		accessorKey: 'name',
	},
	{
		header: 'Email',
		accessorKey: 'email',
	},
	{
		header: 'Role',
		accessorKey: 'role',
		cell: ({ row: { original } }) => {
			return (
				<Badge
					className={cn({
						'bg-blue-500': original.role === 'user',
						'bg-red-500': original.role === 'admin',
					})}
				>
					{original.role}
				</Badge>
			);
		},
	},
	/* {
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
	}, */
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
					crud='users'
					id={original.id}
				/>
			);
		},
	},
];
