import mongoose from '../provider/Database';

// Define the Conversation Schema
const MessageSchema = new mongoose.Schema({
  sender_id: { type: mongoose.Types.ObjectId, ref: 'User' },
  receiver_id: { type: mongoose.Types.ObjectId, ref: 'User' },
  content: String,
  type: Number,
  file_url: String,
  sent_datetime: { type: Date, default: new Date() },
});

const Message = mongoose.model('Message', MessageSchema);

export default Message;
