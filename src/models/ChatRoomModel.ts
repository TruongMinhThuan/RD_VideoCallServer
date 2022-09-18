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
export const ChatRoomSchema = new mongoose.Schema({
	username: { type: String, unique: true },
	password: { type: String },
	
},{timestamps:true});

// Compares the user's password with the request password
ChatRoomSchema.methods.comparePassword = function (_requestPassword, _cb): any {
	bcrypt.compare(_requestPassword, this.password, (_err, _isMatch) => {
		return _cb(_err, _isMatch);
	});
};

const User = mongoose.model('User', ChatRoomSchema);

export default User;
