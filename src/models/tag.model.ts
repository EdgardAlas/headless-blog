import mongoose, { ObjectId } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

export interface TagDocument {
	id: ObjectId;
	name: string;
	updateAt: Date;
	createAt: Date;
}

const TagSchema = new mongoose.Schema<TagDocument>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			index: true,
		},
	},
	{
		timestamps: true,
	}
);

TagSchema.plugin(paginate);

export const TagModel =
	(mongoose.models.Tag as mongoose.PaginateModel<TagDocument>) ||
	mongoose.model<TagDocument, mongoose.PaginateModel<TagDocument>>(
		'Tag',
		TagSchema
	);
