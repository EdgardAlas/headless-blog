import mongoose, { ObjectId } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

export interface CategoryDocument {
	id: ObjectId;
	name: string;
	updateAt: Date;
	createAt: Date;
}

const CategorySchema = new mongoose.Schema<CategoryDocument>(
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

CategorySchema.plugin(paginate);

export const CategoryModel =
	(mongoose.models.Category as mongoose.PaginateModel<CategoryDocument>) ||
	mongoose.model<CategoryDocument, mongoose.PaginateModel<CategoryDocument>>(
		'Category',
		CategorySchema
	);
