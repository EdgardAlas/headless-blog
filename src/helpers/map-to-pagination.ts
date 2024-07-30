import { CustomError } from '@helpers/custom-error';
import { currentUser } from '@lib/current-user';
import { PaginateResult } from 'mongoose';

export const mapToPagination = async <T>(
	data: PaginateResult<unknown>,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	mapper: (...args: any[]) => any
) => {
	const user = await currentUser();

	if (!user) {
		throw new CustomError('User not found');
	}

	return {
		data: data.docs.map(mapper) as T[],
		page: data.page || 1,
		size: data.limit || 7,
		totalPages: data.totalPages,
	};
};
