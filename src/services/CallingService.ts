
import { CreateConversationDTO, getConversationRoomFriendship, getConversationsDTO, MakeFriendDTO, SendMessageDTO } from '@dto/index';
import CallingParticipant from '@models/calling-participant.model';
import { ConversationParticipant, Message, Conversation } from '@models/index';

export default class CallingService {

    async createConversation(resource: CreateConversationDTO): Promise<any> {
        let conversationParticipant = new ConversationParticipant({ ...resource, is_author: true })
        conversationParticipant = await conversationParticipant.save()
        let conversation = new Conversation({ ...resource });
        conversation.conversation_participants.push(Object(conversationParticipant._id))
        conversation = await conversation.save();
        return conversation
    }

    async getConversationCallings(id: String): Promise<any> {
        // let callingData = await Conversation.findById(id)
        // .select('calling_participants')

        let callingData = await CallingParticipant.find({ conversation: id })
          
        console.log('====================================');
        console.log('calling Data:: ', callingData);
        console.log('====================================');
        return callingData
    }

}
