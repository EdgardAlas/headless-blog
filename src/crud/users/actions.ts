'use server';

import {
	deleteUser,
	findUserByEmail,
	findUserById,
	insertUser,
	updateUser,
} from '@/crud/users/dao';
import {
	createUserValidation,
	updateUserValidation,
} from '@/crud/users/validations';
import { Role } from '@/constants/roles';
import { CustomError } from '@/helpers/custom-error';
import { idValidation } from '@/validations/id.validations';

import { hashPassword } from '@lib/hashing';
import { authAction } from '@lib/safe-action';
import { revalidatePath } from 'next/cache';

export const createUserAction = authAction
	.metadata({
		roles: ['admin'],
	})
	.schema(createUserValidation)
	.action(async ({ parsedInput: values, ctx: { role } }) => {
		if (role !== 'super-admin' && values.role === 'super-admin') {
			throw new CustomError('You cannot create a super-admin');
		}

		const foundUser = await findUserByEmail(values.email);

		if (foundUser) {
			throw new CustomError('User already exists');
		}

		await insertUser({
			blocked: false,
			role: values.role,
			email: values.email,
			/* image: values.image, */
			name: values.name,
			password: await hashPassword(values.password),
		});

		revalidatePath('/users');

		return 'User created successfully';
	});

export const updateUserAction = authAction
	.metadata({
		roles: ['admin'],
	})
	.schema(updateUserValidation)
	.action(async ({ parsedInput: values, ctx: { role } }) => {
		const foundUser = await findUserByEmail(values.email);

		if (!foundUser) {
			throw new CustomError('User not found');
		}

		if (role !== 'super-admin' && values.role === 'super-admin') {
			throw new CustomError('You cannot update a user to super-admin');
		}

		if (foundUser.id !== values.id) {
			throw new CustomError('This email is already in use');
		}

		if (values.password === '') {
			delete values.password;
		}

		if (values.password) {
			values.password = await hashPassword(values.password);
		}

		await updateUser(foundUser.id, {
			role: values.role,
			email: values.email,
			/* image: values.image, */
			name: values.name,
			password: values.password,
		});

		revalidatePath('/users');

		return 'User updated successfully';
	});

export const deleteUserAction = authAction
	.metadata({
		roles: ['admin'],
	})
	.schema(idValidation)
	.action(async ({ parsedInput: values, ctx: { id } }) => {
		const user = await findUserById(values.id);

		if (!user) {
			throw new CustomError('User not found');
		}

		if (user.role === 'super-admin') {
			throw new CustomError('You cannot delete a super-admin');
		}

		if (user.id === id) {
			throw new CustomError('You cannot delete yourself');
		}

		await deleteUser(values.id);

		revalidatePath('/users');

		return 'User deleted successfully';
	});

export const getUserByIdAction = authAction
	.metadata({
		roles: ['admin'],
	})
	.schema(idValidation)
	.action(async ({ parsedInput: values, ctx: { id } }) => {
		const user = await findUserById(values.id);

		if (!user) {
			throw new CustomError('User not found');
		}

		const userRow: UserRow = {
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role as Role,
			updatedAt: user.updatedAt,
			image: user.image ? user.image.toString() : '',
			canBeDeleted: user.id !== id,
			blocked: user.blocked,
			key: Date.now().toString(),
		};

		return userRow;
	});
