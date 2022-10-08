import { CreateConversationDTO, SendMessageDTO } from '@dto/index';
import { Conversation } from '@models/index';

export class ChatService {
  async createConversation(resource: CreateConversationDTO): Promise<any> {
    const room = new Conversation(resource);
    // const res = await room.save();
    // console.log('room save: ', res);
    // return res;
    console.log('====================================');
    console.log('create');
    console.log('====================================');
    return 'dsf'
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
