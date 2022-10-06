import express from 'express'
import AuthenticationController from "../controllers/api/auth/AuthenticationController";
const AuthRoute = express.Router()

AuthRoute.post('/auth/login',AuthenticationController.login)
AuthRoute.post('/auth/register',AuthenticationController.register)
AuthRoute.get('/auth/profile',AuthenticationController.getProfile)
export default AuthRoute