import mongoose from '../provider/Database';
import { ConversationParticipantSchema } from './conversation-participant.model';

// Define the Conversation Schema
const ConversationSchema = new mongoose.Schema({
  name: { type: String, unique: false },
  last_message: { type: mongoose.Types.ObjectId, ref: 'Message' },
  conversation_participants: [{ type: mongoose.Types.ObjectId, ref: 'ConversationParticipant' }],
  connection_id: { type: String, require: false, index: true }
}, {
  timestamps: true,

});

// ConversationSchema.virtual('participants', {
//   ref: 'User', // The model to use
//   localField: 'conversation_participants', // Find people where `localField`
//   foreignField: '_id', // is equal to `foreignField`
// });


const Conversation = mongoose.model('Conversation', ConversationSchema);

export default Conversation;
