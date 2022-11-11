import express from 'express'
import { AuthController } from "@controllers/api/index";
const AuthRoute = express.Router()

AuthRoute.post('/auth/login', (req, res) => AuthController.login(req, res));
AuthRoute.post('/auth/register', AuthController.register)
AuthRoute.get('/auth/profile', AuthController.getProfile)
export default AuthRoute