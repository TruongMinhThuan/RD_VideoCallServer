import { CreateChatRoomDTO, SendMessageDTO } from "@server/dto";
import { CRUD } from "@server/interfaces/crud.interface";
import ChatMessage from "../models/ChatMessageModel";
import ChatRoom from "../models/ChatRoomModel";



export class ChatService  {
   
    async createRoom(resource: CreateChatRoomDTO): Promise<any> {
        
        const room = new ChatRoom(resource)
        const res = await room.save()
        console.log('room save: ',res);
        return res
        throw new Error("Method not implemented.");
    }

    async sendMessage(resource:SendMessageDTO){
        const sender = {username:'sender 1'}
        const message =  await ChatMessage.create({
            message:resource.message,
            message_type:1,
            attachment_url:'assa',
        })

        console.log('message: ',message);

        return message
        
    }



}

