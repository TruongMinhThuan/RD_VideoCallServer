import { LoginDTO,RegisterDTO } from "@server/dto"
import User from "../models/UserModel"
import { BaseService } from "./BaseService"
import bcrypt from 'bcrypt'
export default class AuthenticationService extends BaseService{

    constructor(){
        super()
    }

    public async login(data:LoginDTO) {
        try {
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
            await user.save()
            return true
        } catch (error) {
            throw error
        }
    }
}