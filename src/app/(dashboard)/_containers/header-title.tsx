'use client';

import { pageLayoutData } from '@/constants/page-layout-data';
import { useSelectedLayoutSegment } from 'next/navigation';

export const HeaderTitle = () => {
	const segment = useSelectedLayoutSegment();
	const segmentkey = `/${segment ?? ''}`;

	const pageData = pageLayoutData[segmentkey];

	return <h1 className='text-xl font-bold text-gray-800'>{pageData?.title}</h1>;
};
