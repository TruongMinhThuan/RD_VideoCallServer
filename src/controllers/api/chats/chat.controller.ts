// import * as jwt from 'jsonwebtoken';

import { ChatService } from '../../../services/ChatService';
import { Response, Request, NextFunction } from 'express';
import { CreateConversationDTO, SendMessageDTO } from '@dto/index';
import GetMessagesDTO from '@dto/chat-messages/GetMessages.dto';

class ChatController {
  protected chat: ChatService;
  protected user_id: Object;

  constructor() {
    this.chat = new ChatService();
    this.user_id = '63425942f392ef38406f909d'
  }

  async createConversation(req: Request, res: Response) {
    try {
      const body: CreateConversationDTO = { ...req.body, participant: this.user_id }
      await this.chat.createConversation(body);
      return res.sendStatus(201);
    } catch (error) {
      console.log('error: ', error);

      return res.sendStatus(404);
    }
  }

  async getConversations(req: Request, res: Response) {
    try {
      const conversations = await this.chat.getConversations({ user_id: this.user_id })
      return res.json(conversations)
    } catch (error) {
      console.log('errors: ', error);
      return res.sendStatus(404)
    }
  }

  async joinConversation(req: Request, res: Response) {
    try {
      const conversations = await this.chat.joinConversation({ _id: req.params.id, participant: this.user_id })
      return res.json(conversations)
    } catch (error) {
      console.log('errors: ', error);
      return res.sendStatus(404)
    }
  }

  async sendMessage(req: Request, res: Response) {
    try {
      const body: SendMessageDTO = {
        ...req.body,
        sender: this.user_id,
        conversation: req.params.conversation_id
      }
      console.log('====================================');
      console.log('====================================');

      await this.chat.sendMessage(body);
      return res.send(201);
    } catch (error) {
      console.log('error: ', error);

      return res.send(404);
    }
  }

  async getMessages(req: Request, res: Response) {
    try {
      const body: GetMessagesDTO = {
        ...req.body,
        conversation_id: req.params.conversation_id
      }
      const data = await this.chat.getMessages(body);
      return res.json(data);
    } catch (error) {
      console.log('error: ', error);

      return res.send(404);
    }
  }
}

export default new ChatController();
