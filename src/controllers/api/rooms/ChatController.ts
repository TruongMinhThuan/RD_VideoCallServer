// import * as jwt from 'jsonwebtoken';

import { ChatService } from "../../../services/ChatService";
import { Response,Request, NextFunction } from "express";


class ChatController{

     
   async createRoom(req:Request,res:Response) {
     try {
          const room = new ChatService()
          await room.createRoom(req.body)
          return res.send(201)
          
     } catch (error) {
          console.log('error: ',error);
          
          return res.send(404)
     }     

   }

   async sendMessage(req:Request,res:Response){
     try {
          const message = new ChatService()
          await message.sendMessage(req.body)
          return res.send(201)
          
     } catch (error) {
          console.log('error: ',error);
          
          return res.send(404)
     }     
   }

}

export default new ChatController();