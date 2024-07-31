import { CrudForm, CrudFormProps } from '@components/crud/crud-form';
import { CrudSearch } from '@components/crud/crud-search';
import CrudTable, { CrudTableProps } from '@components/crud/crud-table';
import { TableLoading } from '@components/ui/table-loading';
import { Suspense } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface CrudUiProps<T extends Record<string, any>>
	extends CrudFormProps<NoInfer<T>>,
		CrudTableProps<any, unknown> {
	searchParams: { [key: string]: string };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CrudUi = <T extends Record<string, any>>({
	columns,
	data: promise,
	fieldConfig,
	crud,
	searchParams,
}: CrudUiProps<T>) => {
	return (
		<>
			<CrudForm<T> crud={crud} fieldConfig={fieldConfig} />

			<CrudSearch query={searchParams?.query} />
			<Suspense fallback={<TableLoading />} key={JSON.stringify(searchParams)}>
				<CrudTable columns={columns} data={promise} />
			</Suspense>
		</>
	);
};
