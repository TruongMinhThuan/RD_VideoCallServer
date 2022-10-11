import JoinConversationDTO from '@dto/chat-conversation/JoinConversation.dto';
import GetMessagesDTO from '@dto/chat-messages/GetMessages.dto';
import { CreateConversationDTO, getConversationsDTO, SendMessageDTO } from '@dto/index';
import { ConversationParticipant, Message, Conversation } from '@models/index';

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
      .populate({
        path: 'last_message',
        populate:{
          path:'sender',
          select:'username'
        }
      })
    return conversations
  }

  async joinConversation(resource: JoinConversationDTO) {
    let conversation = await Conversation.findById(resource._id)
    const isExisted = conversation.conversation_participants?.find(e => e.participant?.toString() == resource.participant)
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
    console.log('====================================');
    console.log('message input: ', resource);
    console.log('====================================');
    let message = new Message(resource)
    message = await message.save()
    await Conversation.findByIdAndUpdate(message.conversation, {
      last_message: message
    })

    console.log('message: ', message);
    return true;
  }

  async getMessages(resource: GetMessagesDTO) {
    console.log('====================================');
    console.log('message input: ', resource);
    console.log('====================================');
    let messages = await Message
      .find({ conversation: resource.conversation_id })
      .populate({
        path:'sender',
        select:'username createdAt'
      })

    console.log('message: ', messages);
    return messages;
  }
}
