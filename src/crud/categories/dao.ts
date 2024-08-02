import { mapToPagination } from '@helpers/map-to-pagination';
import { connectDB } from '@lib/db';
import { formatDate } from '@lib/format-dates';
import { CategoryDocument, CategoryModel } from '@models/category.model';
import { PaginateResult } from 'mongoose';

export const insertCategory = async (category: Partial<CategoryDocument>) => {
	await connectDB();

	return CategoryModel.create(category);
};

export const findCategoryById = async (id: string) => {
	await connectDB();

	return CategoryModel.findById(id);
};

export const findCategoryByName = async (name: string) => {
	await connectDB();

	return CategoryModel.findOne({
		name: {
			$regex: name,
			$options: 'i',
		},
	});
};

export const updateCategory = async (
	id: string,
	category: Partial<CategoryDocument>
) => {
	await connectDB();

	return CategoryModel.findByIdAndUpdate(id, category, { new: true });
};

export const deleteCategory = async (id: string) => {
	await connectDB();

	return CategoryModel.findByIdAndDelete(id);
};

export const getCategoriesPaginated =
	(
		query: string,
		page: number,
		size: number
	): (() => Promise<WithPagination<CategoryRow[]>>) =>
	async () => {
		await connectDB();

		const categories = await CategoryModel.paginate(
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

		return mapCategoriesToCategoryRowArray(categories);
	};

// mappers functions
export const mapCategoriesToCategoryRowArray = async (
	categories: PaginateResult<CategoryDocument>
) => {
	return mapToPagination<CategoryRow>(categories, (category) => {
		return {
			id: category.id.toString(),
			name: category.name,
			updatedAt: formatDate(category.updatedAt).format('LLL'),
			canBeDeleted: true,
		};
	});
};
