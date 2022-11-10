import mongoose from '../provider/Database';
import { ConversationParticipantSchema } from './conversation-participant.model';

// Define the Conversation Schema
const VideoRoomModel = new mongoose.Schema({
    offer: {},
    answer: {},
    callee:[],
    caller:[]
}, {
    timestamps: true,

});

// ConversationSchema.virtual('participants', {
//   ref: 'User', // The model to use
//   localField: 'conversation_participants', // Find people where `localField`
//   foreignField: '_id', // is equal to `foreignField`
// });


const VideoRoom = mongoose.model('VideoRoom', VideoRoomModel);

export default VideoRoom;
