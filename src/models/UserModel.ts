import crypto from 'crypto';
import bcrypt from 'bcrypt';

import mongoose from '../provider/Database';

// Create the model schema & register your custom methods here
// export interface IUserModel extends IUser, mongoose.Document {
// 	billingAddress(): string;
// 	comparePassword(password: string, cb: any): string;
// 	validPassword(password: string, cb: any): string;
// 	gravatar(_size: number): string;
// }

// Define the User Schema
export const UserSchema = new mongoose.Schema({
	username: { type: String, unique: true },
	password: { type: String },
	token: {type:String}
},{timestamps:true});

// Compares the user's password with the request password
UserSchema.methods.comparePassword = function (_requestPassword, _cb): any {
	bcrypt.compare(_requestPassword, this.password, (_err, _isMatch) => {
		return _cb(_err, _isMatch);
	});
};

const User = mongoose.model('User', UserSchema);

export default User;
