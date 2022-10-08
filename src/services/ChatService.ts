import { CreateConversationDTO, SendMessageDTO } from '@dto/index';
import { Conversation } from '@models/index';

export class ChatService {
  async createConversation(resource: CreateConversationDTO): Promise<any> {
   
    const conversation = new Conversation(resource);
    conversation.save();
    console.log('====================================');
    console.log('create: ', conversation);
    console.log('====================================');
    return 'dsf';
  }

  async sendMessage(resource: SendMessageDTO) {
    // const sender = { username: 'sender 1' };
    // const message = await ChatMessage.create({
    //   message: resource.message,
    //   message_type: 1,
    //   attachment_url: 'assa',
    // });
    // console.log('message: ', message);
    // return message;
  }
}
