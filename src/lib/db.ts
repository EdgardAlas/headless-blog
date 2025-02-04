import { env } from '@lib/env';
import mongoose from 'mongoose';

const { DATABASE_URL } = env;

if (!DATABASE_URL) {
	throw new Error(
		'Please define the DATABASE_URL environment variable inside .env.local or .env.production'
	);
}

declare global {
	// eslint-disable-next-line no-var
	var mongooseGlobal: {
		conn: typeof mongoose | null;
		promise: Promise<mongoose.Mongoose> | null;
	};
}

let cached = global.mongooseGlobal;

if (!cached) {
	cached = global.mongooseGlobal = { conn: null, promise: null };
}

async function connectDB() {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
		};

		cached.promise = mongoose
			.connect(DATABASE_URL as string, opts)
			.then((mongoose) => {
				return mongoose;
			});
	}
	cached.conn = await cached.promise;
	return cached.conn;
}

export { connectDB };
