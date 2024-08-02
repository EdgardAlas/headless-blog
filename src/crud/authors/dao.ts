import { mapToPagination } from '@helpers/map-to-pagination';
import { connectDB } from '@lib/db';
import { formatDate } from '@lib/format-dates';
import { AuthorDocument, AuthorModel } from '@models/author.model';
import { PaginateResult } from 'mongoose';

export const insertAuthor = async (Author: Partial<AuthorDocument>) => {
	await connectDB();

	return AuthorModel.create(Author);
};

export const findAuthorById = async (id: string) => {
	await connectDB();

	return AuthorModel.findById(id);
};

export const findAuthorByName = async (name: string) => {
	await connectDB();

	return AuthorModel.findOne({
		name: {
			$regex: name,
			$options: 'i',
		},
	});
};

export const updateAuthor = async (
	id: string,
	Author: Partial<AuthorDocument>
) => {
	await connectDB();

	return AuthorModel.findByIdAndUpdate(id, Author, { new: true });
};

export const deleteAuthor = async (id: string) => {
	await connectDB();

	return AuthorModel.findByIdAndDelete(id);
};

export const getAuthorsPaginated =
	(
		query: string,
		page: number,
		size: number
	): (() => Promise<WithPagination<AuthorRow[]>>) =>
	async () => {
		await connectDB();

		const authors = await AuthorModel.paginate(
			{
				$or: [
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

		return mapAuthorsToAuthorRowArray(authors);
	};

// mappers functions
export const mapAuthorsToAuthorRowArray = async (
	Authors: PaginateResult<AuthorDocument>
) => {
	return mapToPagination<AuthorRow>(Authors, (author) => {
		return {
			id: author.id.toString(),
			name: author.name,
			image: author.image,
			updatedAt: formatDate(author.updatedAt).format('LLL'),
			canBeDeleted: true,
		};
	});
};
