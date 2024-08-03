import { crudPages } from '@/crud';
import { CrudValidationKeys } from '@/crud/crud-modals';
import { validateRole } from '@/helpers/validate-role';
import { CrudUi } from '@components/crud/crud-ui';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({
	params,
}: GeneralCrudProps): Promise<Metadata> {
	const selectedCrud = crudPages[params.crud as CrudValidationKeys];

	if (!selectedCrud) {
		return notFound();
	}

	return selectedCrud.seo;
}

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
	const selectedCrud = crudPages[crud as CrudValidationKeys];

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
			crud={crud as CrudValidationKeys}
			searchParams={searchParams}
		/>
	);
};

export default GeneralCrudPage;
