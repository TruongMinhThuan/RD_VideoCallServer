import mongoose from '../provider/Database';

// Define the Conversation Schema
const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Types.ObjectId, ref: 'User' },
  receiver: { type: mongoose.Types.ObjectId, ref: 'User' },
  content: String,
  type: Number,
  file_url: String,
  sent_datetime: { type: Date, default: new Date() },
});

const Message = mongoose.model('Message', MessageSchema);

export default Message;
