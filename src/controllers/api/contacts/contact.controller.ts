// import * as jwt from 'jsonwebtoken';

import { ChatService } from '../../../services/ChatService';
import { Response, Request, NextFunction } from 'express';
import { CreateConversationDTO, SendMessageDTO } from '@dto/index';
import GetMessagesDTO from '@dto/chat-messages/GetMessages.dto';
import { ContactService } from 'src/services/ContactService';

class ChatController {
    protected contact: ContactService;
    protected user_id: Object;

    constructor() {
        this.contact = new ContactService();
        this.user_id = '63425942f392ef38406f909d'
    }

    async getContactList(req: Request, res: Response) {
        try {
            const body: CreateConversationDTO = { ...req.body, participant: this.user_id }
            const data = await this.contact.getContacts()
            return res.sendStatus(201).send(data);
        } catch (error) {
            console.log('error: ', error);

            return res.sendStatus(404);
        }
    }

}

export default new ChatController();
