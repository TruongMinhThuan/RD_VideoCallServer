import express from 'express'
import { AuthController } from "@controllers/api/index";
const AuthRoute = express.Router()

AuthRoute.post('/auth/login', (req, res) => AuthController.login(req, res));
AuthRoute.post('/auth/register', (req, res) => AuthController.register(req, res))
AuthRoute.get('/auth/profile',(req, res) => AuthController.getProfile(req, res))
export default AuthRoute