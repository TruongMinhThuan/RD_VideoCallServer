import JoinConversationDTO from '@dto/chat-conversation/JoinConversation.dto';
import GetMessagesDTO from '@dto/chat-messages/GetMessages.dto';
import { CreateConversationDTO, getConversationsDTO, SendMessageDTO } from '@dto/index';
import { ConversationParticipant, Message, Conversation } from '@models/index';
import User from '@models/UserModel';

export class ContactService {


    async getContacts(user_id: string): Promise<any> {
        const contacts = await User.find({ _id: { $ne: user_id } }).select('username createdAt')
        return contacts
    }


}
