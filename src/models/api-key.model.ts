import mongoose, { ObjectId } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

export interface ApiKeyDocument {
	id: ObjectId;
	apiKey: string;
	expiredAt?: Date | string | null;
	updatedAt: Date;
	name: string;
}

export const Schema = new mongoose.Schema<ApiKeyDocument>(
	{
		name: {
			type: String,
			required: true,
		},
		apiKey: {
			type: String,
			required: true,
			unique: true,
		},
		expiredAt: {
			type: Date,
			required: false,
		},
	},
	{
		timestamps: true,
	}
);

Schema.plugin(paginate);

export const ApiKeyModel =
	(mongoose.models.ApiKey as mongoose.PaginateModel<ApiKeyDocument>) ||
	mongoose.model<ApiKeyDocument, mongoose.PaginateModel<ApiKeyDocument>>(
		'ApiKey',
		Schema
	);

Schema.obj;
