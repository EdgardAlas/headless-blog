import { cleanObj } from '@/helpers/clean-obj';

export const objToSearchParams = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	obj: Record<string, TODO>,
	hasRnKey = false
) => {
	if (hasRnKey) {
		obj = { ...obj, rn: Date.now().toString() };
	}

	const objToClean = cleanObj(obj);

	if (Object.keys(objToClean).length === 0) {
		return '';
	}

	return `?${new URLSearchParams(obj).toString()}`;
};
