import { CommonBreadcrumbs } from '@/app/(dashboard)/_containers/breadcrumbs';
import { AdminHeader } from '@/app/(dashboard)/_containers/header';
import React from 'react';

export const AdminContent = ({ children }: { children: React.ReactNode }) => {
	return (
		<article className='col-span-12 flex flex-col gap-4 lg:col-span-9 xl:col-span-10'>
			<AdminHeader />
			<section className='mx-auto mt-8 w-[90%] md:w-5/6 lg:w-3/4'>
				<CommonBreadcrumbs />
			</section>
			<section className='mx-auto mb-4 flex w-[90%] flex-col gap-4 rounded-md bg-white p-4 shadow-md md:w-5/6 md:px-6 xl:w-3/4'>
				{children}
			</section>
		</article>
	);
};
