import { LoginDTO } from "@server/dto/Login.dto"
import User from "@server/models/UserModel"
import { BaseService } from "./BaseService"

export class LoginService extends BaseService{

    constructor(){
        super()
    }

    public async login(loginData:LoginDTO):Promise<Boolean> {
        let {username,password} = loginData

        await User.findOne({username})

        return false

    }
}