import { DataTable } from '@components/ui/data-table';
import { Pagination } from '@components/ui/pagination';
import { ColumnDef } from '@tanstack/react-table';

export interface CrudTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: () => Promise<WithPagination<TData[]>>;
}

const CrudTable = async <TData, TValue>({
	columns,
	data: promise,
}: CrudTableProps<TData, TValue>) => {
	const data = await promise();

	return (
		<>
			<DataTable columns={columns} data={data.data} />
			<Pagination
				{...{
					page: data.page,
					size: data.size,
					totalPages: data.totalPages,
				}}
			/>
		</>
	);
};

export default CrudTable;
