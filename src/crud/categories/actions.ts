'use server';

import { updateUser } from '@/crud/users/dao';
import { CustomError } from '@/helpers/custom-error';
import { idValidation } from '@/validations/id.validations';

import {
	deleteCategory,
	findCategoryById,
	findCategoryByName,
	insertCategory,
} from '@/crud/categories/dao';
import {
	createCategoryValidation,
	updateCategoryValidation,
} from '@/crud/categories/validations';
import { authAction } from '@lib/safe-action';
import { revalidatePath } from 'next/cache';

export const createCategoryAction = authAction
	.metadata({
		roles: ['admin', 'user'],
	})
	.schema(createCategoryValidation)
	.action(async ({ parsedInput: values }) => {
		const foundCategory = await findCategoryByName(values.name);

		if (foundCategory) {
			throw new CustomError('Category already exists');
		}

		await insertCategory({
			name: values.name,
		});

		revalidatePath('/categories');

		return 'User created successfully';
	});

export const updateCategoryAction = authAction
	.metadata({
		roles: ['admin', 'user'],
	})
	.schema(updateCategoryValidation)
	.action(async ({ parsedInput: values }) => {
		const foundCategory = await findCategoryByName(values.name);

		if (!foundCategory) {
			throw new CustomError('Category not found');
		}

		if (foundCategory.id !== values.id) {
			throw new CustomError('this name is already taken');
		}

		await updateUser(foundCategory.id, {
			name: values.name,
		});

		revalidatePath('/categories');

		return 'User updated successfully';
	});

export const deleteCategoryAction = authAction
	.metadata({
		roles: ['admin', 'user'],
	})
	.schema(idValidation)
	.action(async ({ parsedInput: values }) => {
		const category = await findCategoryById(values.id);

		if (!category) {
			throw new CustomError('Category not found');
		}

		await deleteCategory(values.id);

		revalidatePath('/categories');

		return 'User deleted successfully';
	});

export const getCategoryByIdAction = authAction
	.metadata({
		roles: ['admin', 'user'],
	})
	.schema(idValidation)
	.action(async ({ parsedInput: values }) => {
		const category = await findCategoryById(values.id);

		if (!category) {
			throw new CustomError('Category not found');
		}

		const categoryRow: CategoryRow = {
			id: category.id.toString(),
			name: category.name,
			updatedAt: category.updateAt,
			canBeDeleted: true,
		};

		return categoryRow;
	});
