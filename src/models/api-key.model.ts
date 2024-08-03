import mongoose, { ObjectId } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

export interface ApiKeyDocument {
	id: ObjectId;
	apiKey: string;
	expiredAt: Date;
	updateAt: Date;
}

const ApiKeySchema = new mongoose.Schema<ApiKeyDocument>(
	{
		apiKey: {
			type: String,
			required: true,
			unique: true,
		},
		expiredAt: {
			type: Date,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

ApiKeySchema.plugin(paginate);

export const ApikeyModel =
	(mongoose.models.ApiKey as mongoose.PaginateModel<ApiKeyDocument>) ||
	mongoose.model<ApiKeyDocument, mongoose.PaginateModel<ApiKeyDocument>>(
		'ApiKey',
		ApiKeySchema
	);
