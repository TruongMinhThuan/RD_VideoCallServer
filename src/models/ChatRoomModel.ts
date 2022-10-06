import mongoose from '../provider/Database';
import ChatMessage from './ChatMessageModel';


export const ChatRoomSchema = new mongoose.Schema({
	name: { type: String, unique: true },
	author: {type:String} ,
	conversation_id:{type:String,unique:true},
},{timestamps:true});


const ChatRoom = mongoose.model('ChatRoom', ChatRoomSchema);

export default ChatRoom;
