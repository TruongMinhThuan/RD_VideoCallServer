import JoinConversationDTO from '@dto/chat-conversation/JoinConversation.dto';
import GetMessagesDTO from '@dto/chat-messages/GetMessages.dto';
import { CreateConversationDTO, getConversationRoomFriendship, getConversationsDTO, MakeFriendDTO, SendMessageDTO } from '@dto/index';
import { ConversationParticipant, Message, Conversation } from '@models/index';
import { Request } from 'express';
import Networking from './Networking';
import { v4 } from 'uuid'
import AddConversationParticipantDTO from '@dto/chat-conversation/AddConversationParticipant.dto';
import UpdateConversationDTO from '@dto/chat-conversation/UpdateConversation.dto';
import User from '@models/UserModel';
export default class ChatService {
  constructor() {

  }

  async createConversation(resource: CreateConversationDTO): Promise<any> {
    let conversationParticipant = new ConversationParticipant({ ...resource, is_author: true })
    conversationParticipant = await conversationParticipant.save()
    let conversation = new Conversation({ ...resource });
    conversation.conversation_participants.push(Object(conversationParticipant._id))
    conversation = await conversation.save();
    return conversation
  }

  async createConversationRoom(resource: CreateConversationDTO): Promise<any> {
    let conversationParticipant = new ConversationParticipant({ ...resource, is_author: true })
    conversationParticipant = await conversationParticipant.save()
    let conversation = new Conversation({ name: resource.name, connection_id: `${v4().toString()}-${resource.participant}` });
    conversation.conversation_participants.push(conversationParticipant)
    const lastMessage = new Message({ content: `Create room ${resource.name}`, conversation: conversation._id, sender: conversationParticipant.participant })
    lastMessage.save()
    conversation.last_message = Object(lastMessage._id)
    await conversation.save()

    conversation = await conversation.save();
    return conversation
  }

  async addConversationParticipants(resource: AddConversationParticipantDTO) {
    const conversation = await Conversation.findByIdAndUpdate(resource.conversation_id,
      { $push: { conversation_participants: [...resource.participants] } }
    ).populate({
      path: 'conversation_participants',
      populate: {
        path: 'participant',
        select: 'username'
      },
    })
      .populate({
        path: 'last_message',
        populate: {
          path: 'sender receiver',
          select: 'username'
        },
      })
    return conversation
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
    conversation.conversation_participants.push(author)
    conversation.conversation_participants.push(friend)
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
      .find({ "conversation_participants.participant": resource.user_id })
      .sort({ updatedAt: 'descending' })
      .populate({
        path: 'conversation_participants',
        populate: {
          path: 'participant',
          select: 'username'
        },
      })
      .populate({
        path: 'last_message',
        populate: {
          path: 'sender receiver',
          select: 'username'
        },
      })

    return conversations
  }

  async getConversationRoomFriendship(resource: getConversationRoomFriendship) {

    const converation = await Conversation.findById(resource.conversation_id)
    let participantIds = converation.conversation_participants?.map((e: any) => e.participant?.toString())
    const contacts = await User.find({ _id: { $nin: participantIds } }).select('username createdAt')
    return contacts
  }


  async getConversationDetail(resource: getConversationsDTO) {

    let conversation = await Conversation
      .findById(resource._id)
      .populate({
        path: 'conversation_participants',
        populate: {
          path: 'participant',
          select: 'username'
        },
      })
      .populate({
        path: 'last_message',
        populate: {
          path: 'sender receiver',
          select: 'username'
        },
      })

    return conversation
  }

  async updateConversation(resource: UpdateConversationDTO) {

    let filter = {
      _id: resource.conversationId,
    }

    let conversation = await Conversation.findOneAndUpdate(filter, resource.data, { new: true })
    console.log('conversation updated::: ', conversation);

    return conversation
  }

  async joinConversation(resource: JoinConversationDTO) {
    let conversation = await Conversation.findById(resource._id)
    const isExisted = conversation.conversation_participants[Object(resource.participant)]
    if (isExisted) {
      return false
    }
    let conversationParticipant = new ConversationParticipant({ conversation: conversation, participant: resource.participant })
    conversationParticipant.save()
    conversation.conversation_participants.push(Object(conversationParticipant._id))
    conversation.save()
    return conversation
  }

  async sendMessage(resource: SendMessageDTO) {
    let message = new Message(resource)
    message = await message.save()
    await Conversation.findByIdAndUpdate(resource.conversation, {
      last_message: { ...message, receiver: message },
      updatedAt: Date.now
    })
    return message.toJSON();
  }

  async getMessages(resource: GetMessagesDTO, req: Request) {
    let nextPage = `http://${Networking.getIpAddress()}:3000` + req.baseUrl + req.path;
    let messages = await Message
      .find({ conversation: resource.conversation_id })
      .sort({ sent_datetime: 'descending' })
      .populate({
        path: 'sender',
        select: 'username createdAt'
      })
      .skip(resource.limit * (resource.page - 1))
      .limit(resource.limit)

    return {
      data: messages,
      page: resource.page,
      perpage: resource.limit,
      total: messages.length,
      next_page: messages.length > 0 ? `${nextPage}?page=${resource.page + 1}&limit=${resource.limit}` : null
    };
  }

}
