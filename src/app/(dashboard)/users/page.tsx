import { UsersTableColumns } from '@/app/(dashboard)/users/_containers/users-columns';
import { getUsersPaginated } from '@/app/(dashboard)/users/dao';
import { GeneralUserValidation } from '@/app/(dashboard)/users/validaitions';
import { validateRole } from '@/helpers/validate-role';
import { CrudUi } from '@components/crud/crud-ui';

interface UsersPageProps {
	searchParams: {
		[key: string]: string;
	};
}

const UsersPage = async ({ searchParams }: UsersPageProps) => {
	await validateRole(['admin']);

	const { query, page, size } = searchParams;

	return (
		<CrudUi<GeneralUserValidation, UserRow>
			columns={UsersTableColumns}
			data={getUsersPaginated(
				query || '',
				Number(page) || 1,
				Number(size) || 7
			)}
			fieldConfig={{
				password: {
					fieldType: 'password',
				},
				image: {
					fieldType: 'file',
					description: (
						<>
							<span className='text-xs text-gray-500'>
								Image should not be more than 5MB
							</span>
						</>
					),
				},
			}}
			crud='users'
			searchParams={searchParams}
		/>
	);
};

export default UsersPage;
