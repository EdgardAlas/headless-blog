import mongoose, { ObjectId } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

export interface AuthorDocument {
	id: ObjectId;
	name: string;
	image: string;
	updateAt: Date;
	createAt: Date;
}

const AuthorSchema = new mongoose.Schema<AuthorDocument>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			index: true,
		},
		image: {
			type: String,
			required: false,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

AuthorSchema.plugin(paginate);

export const AuthorModel =
	(mongoose.models.Author as mongoose.PaginateModel<AuthorDocument>) ||
	mongoose.model<AuthorDocument, mongoose.PaginateModel<AuthorDocument>>(
		'Author',
		AuthorSchema
	);
