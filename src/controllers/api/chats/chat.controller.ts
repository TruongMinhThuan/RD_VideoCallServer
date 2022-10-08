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
      console.log('====================================');
      console.time('create');
      console.log('====================================');
      await this.chat.createConversation(req.body);
      console.log('====================================');
      console.timeEnd('create')
      console.log('====================================');
      return res.sendStatus(201);
    } catch (error) {
      console.log('error: ', error);

      return res.sendStatus(404);
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
