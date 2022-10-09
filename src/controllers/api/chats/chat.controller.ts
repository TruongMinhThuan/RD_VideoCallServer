// import * as jwt from 'jsonwebtoken';

import { ChatService } from '../../../services/ChatService';
import { Response, Request, NextFunction } from 'express';

class ChatController {
  protected chat: ChatService;

  constructor() {
    this.chat = new ChatService();
  }

  async createConversation(req: Request, res: Response) {
    try {
      await this.chat.createConversation(req.body);
      return res.sendStatus(201);
    } catch (error) {
      console.log('error: ', error);

      return res.sendStatus(404);
    }
  }

  async getConversations(req: Request, res: Response) {
    try {
      const conversations = await this.chat.getConversations({_id:req.params.id,user_id:Object('63425942f392ef38406f909d')})
      return res.json(conversations)
    } catch (error) {
      console.log('errors: ',error);
      return res.sendStatus(404)
    }
  }

  async joinConversation(req: Request, res: Response) {
    try {
      const conversations = await this.chat.joinConversation({_id:req.params.id,participant:Object('63412bfe4b19adc59f05bb12')})
      return res.json(conversations)
    } catch (error) {
      console.log('errors: ',error);
      return res.sendStatus(404)
    }
  }

  async sendMessage(req: Request, res: Response) {
    try {
      const message = new ChatService();
      await message.sendMessage(req.body);
      return res.send(201);
    } catch (error) {
      console.log('error: ', error);

      return res.send(404);
    }
  }
}

export default new ChatController();
