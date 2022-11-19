// import * as jwt from 'jsonwebtoken';

import { ChatService } from '../../../services';
import { Response, Request, NextFunction } from 'express';
import { CreateConversationDTO, SendMessageDTO } from '@dto/index';
import GetMessagesDTO from '@dto/chat-messages/GetMessages.dto';
import AddConversationParticipantDTO from '@dto/chat-conversation/AddConversationParticipant.dto';
import CallingService from '@services/CallingService';

class CallingController {
    private chat: CallingService = new CallingService();
    protected user_id: Object;

    constructor() {
        this.chat = new CallingService();
    }


    async getConversationCalling(req: Request, res: Response) {
        try {
            const conversationCallings = await this.chat.getConversationCallings(req.params.id)
            return res.json(conversationCallings)
        } catch (error) {
            console.log('errors: ', error);
            return res.sendStatus(404)
        }
    }

}

export default new CallingController();
