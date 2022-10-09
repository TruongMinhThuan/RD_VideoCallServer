import mongoose from '../provider/Database';

// Define the Conversation Schema
export const ConversationParticipantSchema = new mongoose.Schema({
  participant: { type: mongoose.Types.ObjectId, ref: 'User' },
  conversation: { type: mongoose.Types.ObjectId, ref: 'Conversation' },
  joined_datetime: { type: Date, default: new Date() },
  left_datetime: { type: Date, default: new Date() },
  is_author: { type: Boolean, default: false },
});

// ConversationParticipantSchema.virtual('participant', {
//   ref: 'User',
//   localField: '_id', 
//   foreignField: 'participant',
// });

const ConversationParticipant = mongoose.model(
  'ConversationParticipant',
  ConversationParticipantSchema,
);

export default ConversationParticipant;
