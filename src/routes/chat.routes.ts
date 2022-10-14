import express from 'express';
import { CreateConversationValidation } from '@validations/create-conversation.validation';
import { ChatController } from '@controllers/api';
import { isAuth } from 'src/middlewares/auth.middleware';

const RoomRoute = express.Router();
RoomRoute.post('/conversation', isAuth, (req, res) => ChatController.createConversation(req, res));

RoomRoute.get('/conversations', (req, res) => ChatController.getConversations(req, res));

RoomRoute.post('/conversation/:id/join', isAuth, ChatController.joinConversation);

RoomRoute.post('/conversation/:conversation_id/message', (req, res) => ChatController.sendMessage(req, res));

RoomRoute.get('/conversation/:conversation_id/messages', (req, res) => ChatController.getMessages(req, res));


export default RoomRoute;
