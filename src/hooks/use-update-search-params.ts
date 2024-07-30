'use client';

import { cleanObj } from '@/helpers/clean-obj';
import { objToSearchParams } from '@/helpers/obj-to-search-params';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export const useUpdateQueryParams = (hasRdKey: boolean = false) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const searchParamsObj = useMemo(() => {
		const obj = Object.fromEntries(searchParams.entries());
		return cleanObj(obj);
	}, [searchParams]);

	const updateQueryParams = (newParams: Record<string, string>) => {
		const params = objToSearchParams(
			cleanObj({
				...searchParamsObj,
				...newParams,
				...(hasRdKey ? { rd: Date.now().toString() } : {}),
			})
		);
		const url = `${pathname}${params}`;
		router.push(url);
	};

	return { updateQueryParams };
};
