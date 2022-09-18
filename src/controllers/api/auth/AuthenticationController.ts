// import * as jwt from 'jsonwebtoken';

import  AuthenticationService  from "../../../services/AuthenticationService";
import { Response,Request, NextFunction } from "express";
import BaseController from "../BaseController";

class AuthenticationController extends BaseController{

     constructor(){
          super()
     }
     
   async login(req:Request,res:Response) {
     try {
          const auth = new AuthenticationService()
          await auth.login(req.body)
          return res.send(201)
          
     } catch (error) {
          return res.send(404)
     }     

   }

   async register(req:Request,res:Response){
     try {
          const auth = new AuthenticationService()
          await  auth.register(req.body)
          return res.send(201)
          
     } catch (error) {
          return res.send(404)
     }
   }
}

export default new AuthenticationController();