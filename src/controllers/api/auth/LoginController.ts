// import * as jwt from 'jsonwebtoken';

import { LoginDTO } from "@server/dto/Login.dto";
import { LoginService } from "@server/services/LoginService";


class LoginController {

    private _loginService :LoginService

    constructor(){
        this._loginService = new LoginService()
    }

    /**
     * login
     */
    public async login(loginDTO:LoginDTO) {
        await this._loginService.login(loginDTO)
    }
}

export default LoginController;
