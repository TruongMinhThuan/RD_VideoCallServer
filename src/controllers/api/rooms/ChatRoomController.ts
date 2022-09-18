// import * as jwt from 'jsonwebtoken';

import { ChatRoomService } from "../../../services/ChatRoomService";
import { Response,Request, NextFunction } from "express";


class ChatRoomController{

     
   async createRoom(req:Request,res:Response) {
     try {
          const room = new ChatRoomService()
          await room.create(req.body)
          return res.send(201)
          
     } catch (error) {
          return res.send(404)
     }     

   }

}

export default new ChatRoomController();