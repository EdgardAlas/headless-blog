import { crudMap } from '@/crud/crud-map';
import { validateRole } from '@/helpers/validate-role';
import { CrudUi } from '@components/crud/crud-ui';
import { notFound } from 'next/navigation';

interface GeneralCrudProps {
	searchParams: {
		[key: string]: string;
	};
	params: {
		crud: string;
	};
}

const GeneralCrudPage = async ({
	searchParams,
	params: { crud },
}: GeneralCrudProps) => {
	const selectedCrud = crudMap[crud];

	if (!selectedCrud) {
		notFound();
	}

	await validateRole(selectedCrud.roles);

	const { query, page, size } = searchParams;

	return (
		<CrudUi
			columns={selectedCrud.columns}
			data={selectedCrud.getData(
				query || '',
				Number(page) || 1,
				Number(size) || 7
			)}
			fieldConfig={selectedCrud.fieldConfig}
			crud={crud}
			searchParams={searchParams}
		/>
	);
};

export default GeneralCrudPage;
