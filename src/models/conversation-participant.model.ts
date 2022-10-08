import mongoose from '../provider/Database';

// Define the Conversation Schema
const ConversationParticipantSchema = new mongoose.Schema({
  participant_id: { type: mongoose.Types.ObjectId, ref: 'User' },
  conversation_id: { type: mongoose.Types.ObjectId, ref: 'Conversation' },
  joined_datetime: { type: Date, default: new Date() },
  left_datetime: { type: Date, default: new Date() },
  is_author: { type: Boolean, default: false },
});

const ConversationParticipant = mongoose.model(
  'ConversationParticipant',
  ConversationParticipantSchema,
);

export default ConversationParticipant;
