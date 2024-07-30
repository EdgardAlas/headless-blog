import { AdminContent } from '@/app/(dashboard)/_containers/admin-content';
import { Sidebar } from '@/app/(dashboard)/_containers/sidebar';
import { AlertDialogProvider } from '@components/ui/alert-dialog-provider';
import { validateRole } from '@helpers/validate-role';
import React from 'react';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
	const { userRole } = await validateRole();

	return (
		<main className='min-h-dvh bg-gray-50'>
			<section className='grid h-full grid-cols-12'>
				<Sidebar role={userRole} />

				<AdminContent>
					<AlertDialogProvider>{children}</AlertDialogProvider>
				</AdminContent>
			</section>
		</main>
	);
};

export default DashboardLayout;
