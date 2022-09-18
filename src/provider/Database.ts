import mongoose,{Error} from 'mongoose';
import Promise from 'bluebird';
import { MongoError } from 'mongodb';

import Locals from './Locals';

export class Database {
	// Initialize your database pool
	public static init (): any {
		const dsn = Locals.config().mongooseUrl;
		const options = { };

		// (<any>mongoose) = Promise;
        Promise.promisifyAll(mongoose);

		mongoose.connect(dsn,options, (error: Error) => {
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
