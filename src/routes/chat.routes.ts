import express from 'express';
import { validate } from 'src/validations';
import { CreateConversationValidation } from '@validations/create-conversation.validation';
import { ChatController } from '@controllers/api';
import { isAuth } from 'src/middlewares/auth.middleware';

const RoomRoute = express.Router();
RoomRoute.post('/conversation', CreateConversationValidation, ChatController.createConversation);

RoomRoute.get('/conversations', ChatController.getConversations);

RoomRoute.post('/conversation/:id/join', isAuth, ChatController.joinConversation);

RoomRoute.post('/conversation/:conversation_id/message', isAuth, ChatController.sendMessage);

RoomRoute.get('/conversation/:conversation_id/messages', ChatController.getMessages);

export default RoomRoute;
