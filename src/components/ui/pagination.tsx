'use client';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@components/ui/select';
/* import {
	ChevronLeftIcon,
	ChevronRightIcon,
	DoubleArrowLeftIcon,
	DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
 */
import { Button } from '@components/ui/button';
import { useUpdateQueryParams } from '@hooks/use-update-search-params';
import { cn } from '@lib/cn';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export interface PaginationProps {
	page: number;
	size: number;
	totalPages: number;
}

export const Pagination = (pagination: PaginationProps) => {
	const { updateQueryParams } = useUpdateQueryParams();

	const goToPage = (page: number) => () => {
		if (page < 1 || page > pagination.totalPages) return;

		updateQueryParams({ page: page.toString() });
	};

	const canPreviousPage = (page: number) => page > 1;

	const canNextPage = (page: number, totalPages: number) => page < totalPages;

	return (
		<>
			<PageOf
				page={pagination.page}
				totalPages={pagination.totalPages}
				className='lg:hidden'
			/>
			<div className='flex items-center justify-between'>
				<div className='flex items-center space-x-2'>
					<p className='text-sm font-medium'>Rows</p>
					<Select
						value={pagination.size.toString()}
						onValueChange={(value) => updateQueryParams({ size: value })}
					>
						<SelectTrigger className='h-8 w-[70px]'>
							<SelectValue placeholder={pagination.size.toString()} />
						</SelectTrigger>
						<SelectContent side='top'>
							{[7, 15, 25, 40, 50].map((pageSize) => (
								<SelectItem key={pageSize} value={`${pageSize}`}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className='flex items-center space-x-2'>
					<PageOf
						page={pagination.page}
						totalPages={pagination.totalPages}
						className='hidden lg:block'
					/>
					<Button
						variant='outline'
						className='hidden h-8 w-8 p-0 lg:flex'
						onClick={goToPage(1)}
						disabled={!canPreviousPage(pagination.page)}
					>
						<span className='sr-only'>Go to first page</span>
						<ArrowLeft className='h-4 w-4' />
					</Button>
					<Button
						variant='outline'
						className='h-8 w-8 p-0'
						onClick={goToPage(pagination.page - 1)}
						disabled={!canPreviousPage(pagination.page)}
					>
						<span className='sr-only'>Go to previous page</span>
						<ChevronLeft className='h-4 w-4' />
					</Button>
					<Button
						variant='outline'
						className='h-8 w-8 p-0'
						onClick={goToPage(pagination.page + 1)}
						disabled={!canNextPage(pagination.page, pagination.totalPages)}
					>
						<span className='sr-only'>Go to next page</span>
						<ChevronRight className='h-4 w-4' />
					</Button>
					<Button
						variant='outline'
						className='hidden h-8 w-8 p-0 lg:flex'
						onClick={goToPage(pagination.totalPages)}
						disabled={!canNextPage(pagination.page, pagination.totalPages)}
					>
						<span className='sr-only'>Go to last page</span>
						<ArrowRight className='h-4 w-4' />
					</Button>
				</div>
			</div>
		</>
	);
};

const PageOf = ({
	page,
	totalPages,
	className,
}: {
	page: number;
	totalPages: number;
	className?: string;
}) => (
	<span className={cn('w-full text-center text-sm font-medium', className)}>
		page <span className='font-bold'>{page}</span> of{' '}
		<span className='font-bold'>{totalPages}</span>
	</span>
);
