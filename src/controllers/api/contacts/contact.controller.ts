// import * as jwt from 'jsonwebtoken';

import { Response, Request, NextFunction } from 'express';
import { CreateConversationDTO, MakeFriendDTO, SendMessageDTO } from '@dto/index';
import GetMessagesDTO from '@dto/chat-messages/GetMessages.dto';
import { ContactService } from 'src/services/ContactService';
import { ChatService } from 'src/services';

export class ContactController {
    protected contact: ContactService;
    protected user_id: Object;
    protected chat: ChatService;

    constructor() {
        this.contact = new ContactService()
        this.chat = new ChatService()

        this.user_id = '63425942f392ef38406f909d'
    }

    async getContactList(req: Request, res: Response) {
        console.log('====================================');
        console.log('req:: ', req.user);
        console.log('====================================');
        try {
            const data = await this.contact.getContacts(req.user.user_id)
            return res.status(200).send(data)
        } catch (error) {
            console.log('error: ', error);

            return res.sendStatus(404);
        }
    }

    // async addContact(req: Request, res: Response) {
    //     try {
    //         const data = await this.contact.getContacts()
    //         return res.status(200).send(data)
    //     } catch (error) {
    //         console.log('error: ', error);

    //         return res.sendStatus(404);
    //     }
    // }

    async makeFriends(req: Request, res: Response) {
        try {
            const body: MakeFriendDTO = { ...req.body, author: req.user?.user_id, friend: req.params.friend_id }
            const data = await this.chat.makeFriend(body)
            return res.status(200).send(data)
        } catch (error) {
            console.log('error: ', error);

            return res.sendStatus(404);
        }
    }

}

export default new ContactController