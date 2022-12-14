import { LoginDTO, RegisterDTO } from '@dto/index';
import User from '../models/UserModel';
import { BaseService } from './BaseService';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export default class AuthenticationService extends BaseService {
  constructor() {
    super();
  }

  public async login(data: LoginDTO) {
    try {
      const user = await User.findOne({ username: data.username.toLowerCase() });
      console.log('user password:: ', user);

      const isAuth = await bcrypt.compare(data.password, user.password);
      if (!isAuth) {
        throw Error('Invalid User');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  public async register(data: RegisterDTO) {
    try {
      data.avatar =
        'https://gravatar.com/avatar/a559e04ec28d672e668b6959fe1f8ee5?s=400&d=robohash&r=x';
      let user = await User.create({
        ...data,
        username: data.username.toLowerCase(),
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      const token = await this.generateToken(user.id);
      user.token = token;
      await user.save();
      return user;
    } catch (error) {
      throw Error('Invalid User');
    }
  }

  private async generateToken(userId: string) {
    // Create token
    const token = jwt.sign({ user_id: userId }, 'secret');
    console.log('tokeb:: ', token);

    return token;
  }
}
