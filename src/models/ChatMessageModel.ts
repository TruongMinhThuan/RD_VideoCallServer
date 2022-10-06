import mongoose from '../provider/Database';
import ChatRoom from './ChatRoomModel';
import User from './UserModel';


export const ChatMessageSchema = new mongoose.Schema({
	message_type: { type: String, unique: true },
	message: {type:String} ,
    attachment_url:{type:String},


},{timestamps:true});


const ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema);

export default ChatMessage;
