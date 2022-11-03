import JoinConversationDTO from '@dto/chat-conversation/JoinConversation.dto';
import GetMessagesDTO from '@dto/chat-messages/GetMessages.dto';
import { CreateConversationDTO, getConversationsDTO, MakeFriendDTO, SendMessageDTO } from '@dto/index';
import { ConversationParticipant, Message, Conversation } from '@models/index';
import { Request } from 'express';
import ip from 'ip'
import Networking from './Networking';
import { v4 } from 'uuid'
import AddConversationParticipantDTO from '@dto/chat-conversation/AddConversationParticipant.dto';
import VideoRoom from '@models/videoroom.model';
import CreateVideoRoomDTO from '@dto/video-room/CreateVideoRoom.dto';
import DeleteVideoRoomDTO from '@dto/video-room/DeleteVideoRoom.dto';
import UpdateVideoRoomDTO from '@dto/video-room/UpdateVideoRoom.dto';
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
    let conversation = new Conversation({ name: resource.name, connection_id: `${v4().toString()}-${resource.participant}` });
    conversation.conversation_participants.push(resource.participant)
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
    conversation.conversation_participants.push(Object(author.participant))
    conversation.conversation_participants.push(Object(friend.participant))
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
      .find({ conversation_participants: { $all: [resource.user_id] } })
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

  async createVideoRoom(resource: CreateVideoRoomDTO) {
    let videoRoom = new VideoRoom()
    videoRoom.offer = resource.offer
    videoRoom.save()

    return videoRoom
  }

  async updateVideoRoom(resource: UpdateVideoRoomDTO) {
    console.log('update data:: ', resource);
    let videoRoom = await VideoRoom.findById(resource.roomId)
    videoRoom.answer = resource.answer
    videoRoom.save()
    return videoRoom
  }

  async getVideoRooms() {
    let videoRooms = await VideoRoom.find({})
    return videoRooms
  }

  async deleteVideoRoom(resource: DeleteVideoRoomDTO) {
    await (await VideoRoom.findById(resource.roomId)).delete()
    return true
  }
}
