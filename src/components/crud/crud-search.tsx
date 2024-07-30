'use client';
import { Input } from '@components/ui/input';
import { useUpdateQueryParams } from '@hooks/use-update-search-params';
import { SearchIcon } from 'lucide-react';
import React from 'react';

export interface CrudSearchProps {
	query?: string;
}

export const CrudSearch = ({ query: value }: CrudSearchProps) => {
	const timerRef = React.useRef<NodeJS.Timeout | null>(null);
	const { updateQueryParams } = useUpdateQueryParams();

	return (
		<section className='flex w-full flex-col gap-2 md:w-1/2 lg:w-1/3'>
			<Input
				startIcon={SearchIcon}
				placeholder='Search...'
				type='search'
				defaultValue={value}
				onChange={(e) => {
					if (timerRef.current) {
						clearTimeout(timerRef.current);
					}

					timerRef.current = setTimeout(() => {
						updateQueryParams({ query: e.target.value });
					}, 500);
				}}
			/>
		</section>
	);
};
