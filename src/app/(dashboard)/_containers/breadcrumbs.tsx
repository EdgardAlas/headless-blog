'use client';

import { capitalize } from '@/helpers/capitalize';
import { ellipsis } from '@/helpers/ellipsis';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import { usePathname } from 'next/navigation';

export const CommonBreadcrumbs = () => {
	const pathname = usePathname();
	const segments = pathname.split('/').filter((item) => item !== '');
	const segmentsWithSeparator = segments
		.map((segment) => [segment, 'separator'])
		.flat()
		.slice(0, -1);

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{segmentsWithSeparator.map((segment, index) => {
					const url = `/${segments.slice(0, index + 1).join('/')}`;
					const title = capitalize(segment);

					return segment === 'separator' ? (
						<BreadcrumbSeparator key={index} />
					) : (
						<BreadcrumbItem key={index}>
							<BreadcrumbLink href={url}>{ellipsis(title, 20)}</BreadcrumbLink>
						</BreadcrumbItem>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
};
