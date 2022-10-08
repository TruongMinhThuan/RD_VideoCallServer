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
export const UserSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    password: { type: String },
    token: { type: String },
  },
  { timestamps: true },
);

const User = mongoose.model('User', UserSchema);

export default User;
