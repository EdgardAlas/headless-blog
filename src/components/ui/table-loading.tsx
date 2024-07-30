'use client';

import { DataTable } from '@components/ui/data-table';
import { Skeleton } from '@components/ui/skeleton';
import React from 'react';

interface TableLoadingProps {
	size?: number;
}

export const TableLoading = ({ size }: TableLoadingProps) => {
	return (
		<DataTable
			columns={[
				{
					header: 'Loading...',
					accessorKey: 'loading',
					cell: () => <Skeleton className='h-4 w-full' />,
				},
			]}
			data={Array.from({ length: size ?? 5 }).map((_, index) => ({
				id: index,
				loading: '',
			}))}
		/>
	);
};
