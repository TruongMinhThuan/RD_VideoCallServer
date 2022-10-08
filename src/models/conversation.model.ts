import mongoose from '../provider/Database';

// Define the Conversation Schema
const ConversationSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  last_message_id: { type: mongoose.Types.ObjectId, ref: 'Message' },
});

const Conversation = mongoose.model('Conversation', ConversationSchema);

export default Conversation;
