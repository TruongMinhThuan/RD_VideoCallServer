import JoinConversationDTO from '@dto/chat-conversation/JoinConversation.dto';
import GetMessagesDTO from '@dto/chat-messages/GetMessages.dto';
import { CreateConversationDTO, getConversationsDTO, MakeFriendDTO, SendMessageDTO } from '@dto/index';
import { ConversationParticipant, Message, Conversation } from '@models/index';
import ChatSocketService from './ChatSocketService';

export default class ChatService {
  private chatSocket = new ChatSocketService()
  constructor() {

  }

  async createConversation(resource: CreateConversationDTO): Promise<any> {
    let conversationParticipant = new ConversationParticipant({ ...resource, is_author: true })
    conversationParticipant = await conversationParticipant.save()
    let conversation = new Conversation({ ...resource });
    conversation.conversation_participants.push(conversationParticipant)
    conversation = await conversation.save();
    return true
  }

  async makeFriend(resource: MakeFriendDTO): Promise<any> {

    const friend = new ConversationParticipant()
    friend.participant = resource.friend
    const author = new ConversationParticipant()
    author.participant = resource.author
    const connection_id = `${author.participant}-${friend.participant}`
    const existConversation = await this.getFriendConnection(connection_id)
    if (existConversation) {
      return existConversation
    }
    await friend.save()
    await author.save()
    let conversation = new Conversation();
    conversation.connection_id = connection_id
    conversation.conversation_participants.push(friend)
    conversation.conversation_participants.push(author)
    const lastMessage = new Message({ content: `Say hi to you`, conversation: conversation._id, sender: author.participant })
    lastMessage.save()
    conversation.last_message = Object(lastMessage._id)
    await conversation.save()

    return conversation.toJSON()
  }

  private async getFriendConnection(connection_id: String): Promise<any> {
    const converation = await Conversation.findOne({ connection_id })
    if (!converation) {
      return false
    }
    return converation
  }

  async getConversations(resource: getConversationsDTO) {

    let conversations = await Conversation
      .find({ 'conversation_participants.participant': resource.user_id })
      .sort({ updatedAt: 'descending' })
      .populate({ path: 'conversation_participants.participant', select: 'username createdAt' })
      .populate({
        path: 'last_message',
        populate: {
          path: 'sender receiver',
          select: 'username'
        },
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
      last_message: message,
      updatedAt: Date.now
    })
    return message.toJSON();
  }

  async getMessages(resource: GetMessagesDTO) {
    let messages = await Message
      .find({ conversation: resource.conversation_id })
      .sort({ sent_datetime: 'descending' })
      .populate({
        path: 'sender',
        select: 'username createdAt'
      })

    return messages;
  }
}
