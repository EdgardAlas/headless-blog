import { Role } from '@constants/roles';
import mongoose, { ObjectId } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

export interface UserDocument {
	id: ObjectId;
	email: string;
	password: string;
	name: string;
	image: string;
	role: Role;
	blocked: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export const Schema = new mongoose.Schema<UserDocument>(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
		name: {
			type: String,
			required: false,
			trim: true,
		},
		image: {
			type: String,
			required: false,
			trim: true,
		},
		blocked: {
			type: Boolean,
			required: false,
			default: false,
		},
		role: {
			type: String,
			required: false,
			default: 'user',
		},
	},
	{
		timestamps: true,
	}
);

Schema.plugin(paginate);

export const UserModel =
	(mongoose.models.User as mongoose.PaginateModel<UserDocument>) ||
	mongoose.model<UserDocument, mongoose.PaginateModel<UserDocument>>(
		'User',
		Schema
	);
