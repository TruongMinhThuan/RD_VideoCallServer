import express from 'express';
import { CreateConversationValidation } from '@validations/create-conversation.validation';
import { ChatController } from '@controllers/api';
import { isAuth } from 'src/middlewares/auth.middleware';

const RoomRoute = express.Router();
RoomRoute.post('/conversation', isAuth, (req, res) => ChatController.createConversation(req, res));

RoomRoute.get('/conversations', isAuth, (req, res) => ChatController.getConversations(req, res));

RoomRoute.post('/conversation/:id/join', isAuth, ChatController.joinConversation);

RoomRoute.post('/conversation/:conversation_id/message', isAuth, (req, res) => ChatController.sendMessage(req, res));

RoomRoute.get('/conversation/:conversation_id/messages', (req, res) => ChatController.getMessages(req, res));

RoomRoute.post('/conversation-room', isAuth, (req, res) => ChatController.createConversationRoom(req, res));

RoomRoute.put('/conversation-room/:conversation_id', isAuth, (req, res) => ChatController.addConversationRoomParticipants(req, res));

RoomRoute.post('/video-room', isAuth, (req, res) => ChatController.createVideoRoom(req, res));

RoomRoute.delete('/video-room/:room_id', isAuth, (req, res) => ChatController.createVideoRoom(req, res));

RoomRoute.put('/video-room/:room_id', isAuth, (req, res) => ChatController.updateVideoRoom(req, res));

RoomRoute.get('/video-rooms', isAuth, (req, res) => ChatController.getVideoRooms(res));

export default RoomRoute;
