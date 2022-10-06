import { LoginDTO,RegisterDTO } from "@server/dto"
import User from "../models/UserModel"
import { BaseService } from "./BaseService"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export default class AuthenticationService extends BaseService{

    constructor(){
        super()
    }

    public async login(data:LoginDTO) {
        try {
            console.log('input:: ',data);
            
            const user = await User.findOne({username:data.username})
            const isAuth = await bcrypt.compare(data.password,user.password)
            if(!isAuth){
                throw Error('Invalid User')
            }
            return user
        } catch (error) {
            throw error
        }

    }

    public async register(data:RegisterDTO){
        try {
            let user = await User.create(data)
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(user.password,salt)
            const token = await  this.generateToken(user.id)
            user.token = token
            await user.save()
            return user
        } catch (error) {
            throw error
        }
    }

    private async generateToken(userId:string){
        // Create token
        const token =  jwt.sign({user_id:userId},'secret');
        console.log('tokeb:: ',token);
        
        return token

    }
}