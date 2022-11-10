import mongoose, { Error, MongooseOptions } from 'mongoose';
import Promise from 'bluebird';
import Locals from './Locals';

export class Database {
	// Initialize your database pool
	public static init(): any {
		const dsn = 'mongodb+srv://root:root@cluster0.rgzpkc8.mongodb.net/test2?retryWrites=true&w=majority';
		const options: MongooseOptions = {
			autoIndex: true, //make this also true

		};

		// (<any>mongoose) = Promise;
		Promise.promisifyAll(mongoose);

		mongoose.connect(dsn, options, (error: Error) => {
			// handle the error case
			if (error) {
				console.log('Failed to connect to the Mongo server!!');
				console.log(error);
				throw error;
			} else {
				console.log('connected to mongo server at: ' + dsn);
			}
		});
	}
}

export default mongoose;
