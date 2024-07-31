import { mapToPagination } from '@helpers/map-to-pagination';
import { currentUser } from '@lib/current-user';
import { connectDB } from '@lib/db';
import { formatDate } from '@lib/format-dates';
import { UserDocument, UserModel } from '@models/user.model';
import { PaginateResult } from 'mongoose';

export const findUserByEmail = async (email: string) => {
	await connectDB();

	return UserModel.findOne({ email });
};

export const insertUser = async (user: Partial<UserDocument>) => {
	await connectDB();

	return UserModel.create(user);
};

export const findUserById = async (id: string) => {
	await connectDB();

	return UserModel.findById(id);
};

export const updateUser = async (id: string, user: Partial<UserDocument>) => {
	await connectDB();

	return UserModel.findByIdAndUpdate(id, user, { new: true });
};

export const deleteUser = async (id: string) => {
	await connectDB();

	return UserModel.findByIdAndDelete(id);
};

export const getUsersPaginated =
	(
		query: string,
		page: number,
		size: number
	): (() => Promise<WithPagination<UserRow[]>>) =>
	async () => {
		await connectDB();
		const user = await currentUser();

		if (!user) {
			return {
				data: [],
				page: 1,
				size: 7,
				totalPages: 1,
			};
		}

		const users = await UserModel.paginate(
			{
				$or: [
					{
						email: {
							$regex: query,
							$options: 'i',
						},
					},
					{
						name: {
							$regex: query,
							$options: 'i',
						},
					},
				],
			},
			{
				page: page,
				limit: size,
				sort: {
					updatedAt: -1,
				},
			}
		);

		return mapUserResponseToUserRowArray(users);
	};

// mappers functions
export const mapUserResponseToUserRowArray = async (
	users: PaginateResult<UserDocument>
) => {
	const loggedUser = await currentUser();

	if (!loggedUser) {
		return {
			data: [],
			page: 1,
			size: 7,
			totalPages: 1,
		};
	}

	return mapToPagination<UserRow>(users, (user) => {
		return {
			id: user.id.toString(),
			name: user.name,
			email: user.email,
			role: user.role,
			image: user.image,
			updatedAt: formatDate(user.updatedAt).format('LLL'),
			canBeDeleted: loggedUser.id.toString() !== user.id.toString(),
			blocked: user.blocked,
		};
	});
};
