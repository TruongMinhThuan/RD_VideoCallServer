import JoinConversationDTO from '@dto/chat-conversation/JoinConversation.dto';
import { CreateConversationDTO, getConversationsDTO, SendMessageDTO } from '@dto/index';
import { ConversationParticipant } from '@models/index';
import { Conversation } from '@models/index';

export class ChatService {


  async createConversation(resource: CreateConversationDTO): Promise<any> {


    let conversationParticipant = new ConversationParticipant({ ...resource, is_author: true })
    conversationParticipant = await conversationParticipant.save()
    let conversation = new Conversation({ ...resource });
    conversation.conversation_participants.push(conversationParticipant)
    conversation = await conversation.save();

    return true


  }

  async getConversations(resource: getConversationsDTO) {

    let conversations = await Conversation
      .find({ 'conversation_participants.participant': resource.user_id })
      .populate({ path: 'conversation_participants.participant', select: 'username createdAt' })
    return conversations
  }

  async joinConversation(resource: JoinConversationDTO) {
    console.log('input:: ', resource);

    let conversation = await Conversation.findById(resource._id)
    const isExisted = conversation.conversation_participants?.find(e => e.participant?.toString() == resource.participant)
    console.log('====================================');
    console.log('isExisted:: ', isExisted);
    console.log('====================================');
    if (isExisted) {
      return false
    }
    let conversationParticipant = new ConversationParticipant({ conversation: conversation, participant: resource.participant })
    conversationParticipant.save()
    conversation.conversation_participants.push(conversationParticipant)
    conversation.save()
    return true
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
