import express from 'express';
import { CreateConversationValidation } from '@validations/create-conversation.validation';
import { ChatController } from '@controllers/api';
import { isAuth } from 'src/middlewares/auth.middleware';

const RoomRoute = express.Router();

RoomRoute.get('/conversation/:id', isAuth, (req, res) => ChatController.getConversation(req, res));

RoomRoute.post('/conversation', isAuth, (req, res) => ChatController.createConversation(req, res));

RoomRoute.patch('/conversation/:id', isAuth, (req, res) => ChatController.updateConversation(req, res));

RoomRoute.get('/conversations', isAuth, (req, res) => ChatController.getConversations(req, res));

RoomRoute.post('/conversation/:id/join', isAuth, ChatController.joinConversation);

RoomRoute.post('/conversation/:conversation_id/message', isAuth, (req, res) => ChatController.sendMessage(req, res));

RoomRoute.get('/conversation/:conversation_id/messages', (req, res) => ChatController.getMessages(req, res));

RoomRoute.post('/conversation-room', isAuth, (req, res) => ChatController.createConversationRoom(req, res));

RoomRoute.put('/conversation-room/:conversation_id', isAuth, (req, res) => ChatController.addConversationRoomParticipants(req, res));

export default RoomRoute;
