import mongoose from '../provider/Database';

// Define the Conversation Schema
export const CallingParticipantSchema = new mongoose.Schema({
    participant: { type: mongoose.Types.ObjectId, ref: 'User' },
    conversation: { type: mongoose.Types.ObjectId, ref: 'Conversation' },
    candidate_data: [],
    offer: { type: Object },
    answer: { type: Object },

});

const CallingParticipant = mongoose.model(
    'CallingParticipantSchema',
    CallingParticipantSchema,
);

export default CallingParticipant;