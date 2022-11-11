import mongoose from '../provider/Database';
import { ConversationParticipantSchema } from './conversation-participant.model';

// Define the Conversation Schema
const ConversationSchema = new mongoose.Schema({
  name: { type: String, unique: false },
  last_message: { type: mongoose.Types.ObjectId, ref: 'Message' },
  conversation_participants: [ConversationParticipantSchema],
  connection_id: { type: String, require: false, index: true },
  offer: { type: Object },
  answer: { type: Object },
  videocall_candidates: [],
  caller: [],
  callee: [],

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
