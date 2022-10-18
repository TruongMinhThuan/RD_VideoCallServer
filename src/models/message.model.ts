import mongoose from '../provider/Database';
import paginate from 'mongoose-paginate-v2';

// declare your schema
export const institutionSchema = new mongoose.Schema({ name: String });

// paginate with this plugin
institutionSchema.plugin(paginate);

// declare a mongoose document based on a Typescript interface representing your schema
interface MessageDocument extends mongoose.Document { }

// Define the Conversation Schema
const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Types.ObjectId, ref: 'User' },
  receiver: { type: mongoose.Types.ObjectId, ref: 'User' },
  content: String,
  type: Number,
  attachment_url: String,
  sent_datetime: { type: Date, default: Date.now },
  conversation: { type: mongoose.Types.ObjectId, ref: 'Conversation' }
}, {
  timestamps: true
});

const Message = mongoose.model<MessageDocument, mongoose.PaginateModel<MessageDocument>>('Message', MessageSchema);

export default Message;
