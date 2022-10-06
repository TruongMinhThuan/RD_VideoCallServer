// import * as jwt from 'jsonwebtoken';

import  AuthenticationService  from "../../../services/AuthenticationService";
import { Response,Request, NextFunction } from "express";
import BaseController from "../BaseController";

class AuthenticationController extends BaseController{
     private auth: AuthenticationService 

     constructor(){
          super()
     }
     
   async login(req:Request,res:Response) {
     try {
          const auth = new AuthenticationService()
          const user = await auth.login(req.body)
          return res.json(user)
          
     } catch (error) {
          return res.send(404)
     }     

   }

   async register(req:Request,res:Response){
     try {
          const auth = new AuthenticationService()
          const user = await  auth.register(req.body)
          return res.json(user)
     } catch (error) {
          return res.send(404)
     }
   }

   async getProfile(req:Request,res:Response){
     try {
          return res.send(200)
     } catch (error) {
          return res.send(404)
     }
   }

}

export default new AuthenticationController();