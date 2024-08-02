'use server';

import {
	deleteAuthor,
	findAuthorById,
	findAuthorByName,
	insertAuthor,
} from '@/crud/authors/dao';
import {
	createAuthorValidation,
	updateAuthorValidation,
} from '@/crud/authors/validations';
import { updateUser } from '@/crud/users/dao';
import { CustomError } from '@/helpers/custom-error';
import { idValidation } from '@/validations/id.validations';

import { authAction } from '@lib/safe-action';
import { revalidatePath } from 'next/cache';

export const createAuthorAction = authAction
	.metadata({
		roles: ['admin', 'user'],
	})
	.schema(createAuthorValidation)
	.action(async ({ parsedInput: values }) => {
		const foundAuthor = await findAuthorByName(values.name);

		if (foundAuthor) {
			throw new CustomError('Author already exists');
		}

		await insertAuthor({
			name: values.name,
		});

		revalidatePath('/authors');

		return 'User created successfully';
	});

export const updateAuthorAction = authAction
	.metadata({
		roles: ['admin', 'user'],
	})
	.schema(updateAuthorValidation)
	.action(async ({ parsedInput: values }) => {
		const foundAuthor = await findAuthorByName(values.name);

		if (!foundAuthor) {
			throw new CustomError('Author not found');
		}

		if (foundAuthor.id !== values.id) {
			throw new CustomError('this name is already taken');
		}

		await updateUser(foundAuthor.id, {
			name: values.name,
		});

		revalidatePath('/authors');

		return 'User updated successfully';
	});

export const deleteAuthorAction = authAction
	.metadata({
		roles: ['admin', 'user'],
	})
	.schema(idValidation)
	.action(async ({ parsedInput: values }) => {
		const Author = await findAuthorById(values.id);

		if (!Author) {
			throw new CustomError('Author not found');
		}

		await deleteAuthor(values.id);

		revalidatePath('/authors');

		return 'User deleted successfully';
	});

export const getAuthorByIdAction = authAction
	.metadata({
		roles: ['admin', 'user'],
	})
	.schema(idValidation)
	.action(async ({ parsedInput: values }) => {
		const author = await findAuthorById(values.id);

		if (!author) {
			throw new CustomError('Author not found');
		}

		const AuthorRow: AuthorRow = {
			id: author.id.toString(),
			name: author.name,
			image: author.image,
			updatedAt: author.updateAt,
			canBeDeleted: true,
		};

		return AuthorRow;
	});
