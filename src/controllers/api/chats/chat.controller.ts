// import * as jwt from 'jsonwebtoken';

import { ChatService } from '../../../services';
import { Response, Request, NextFunction } from 'express';
import { CreateConversationDTO, SendMessageDTO } from '@dto/index';
import GetMessagesDTO from '@dto/chat-messages/GetMessages.dto';
import AddConversationParticipantDTO from '@dto/chat-conversation/AddConversationParticipant.dto';

class ChatController {
  private chat: ChatService = new ChatService();
  protected user_id: Object;

  constructor() {
    this.chat = new ChatService();
  }

  async createConversation(req: Request, res: Response) {
    try {
      const body: CreateConversationDTO = { ...req.body, participant: req.user._id }
      const data = await this.chat.createConversation(body);
      return res.status(201).json(data);
    } catch (error) {
      return res.sendStatus(404);
    }
  }

  async createConversationRoom(req: Request, res: Response) {
    try {
      const body: CreateConversationDTO = { ...req.body, participant: req.user.user_id }
      const data = await this.chat.createConversationRoom(body);
      return res.status(201).json(data);
    } catch (error) {
      return res.sendStatus(404);
    }
  }

  async addConversationRoomParticipants(req: Request, res: Response) {
    try {
      const body: AddConversationParticipantDTO = { ...req.body, conversation_id: req.params.conversation_id }
      const data = await this.chat.addConversationParticipants(body);
      return res.status(201).json(data);
    } catch (error) {
      console.log('error: ', error);
      return res.sendStatus(404);
    }
  }

  async getConversations(req: Request, res: Response) {
    try {
      const conversations = await this.chat.getConversations({ user_id: req.user.user_id })
      return res.json(conversations)
    } catch (error) {
      console.log('errors: ', error);
      return res.sendStatus(404)
    }
  }

  /**
   * 
   * @param req 
   * @param res 
   * @desc get user who not in conversation room
   * @returns 
   */
  async getConversationRoomFriendship(req: Request, res: Response) {
    try {
      const conversations = await this.chat.getConversationRoomFriendship({ conversation_id: req.params.conversation_id })
      return res.json(conversations)
    } catch (error) {
      console.log('errors: ', error);
      return res.sendStatus(404)
    }
  }

  async getConversation(req: Request, res: Response) {
    try {
      const conversation = await this.chat.getConversationDetail({ _id: req.params.id })
      return res.json(conversation)
    } catch (error) {
      console.log('errors: ', error);
      return res.sendStatus(404)
    }
  }

  async updateConversation(req: Request, res: Response) {
    try {
      const conversation = await this.chat.updateConversation({ conversationId: req.params.id, data: req.body })
      return res.json(conversation)
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
        sender: req.user?.user_id,
        conversation: req.params.conversation_id
      }
      const message = await this.chat.sendMessage(body)
      return res.json(message).status(201)
    } catch (error) {
      return res.send(404);
    }
  }

  async getMessages(req: Request, res: Response) {
    try {
      const body: GetMessagesDTO = {
        ...req.body,
        conversation_id: req.params.conversation_id,
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 25
      }
      const data = await this.chat.getMessages(body, req);
      return res.json(data);
    } catch (error) {
      console.log('error: ', error);

      return res.send(404);
    }
  }
}

export default new ChatController();
