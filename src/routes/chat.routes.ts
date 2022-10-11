import express from 'express';
import { validate } from 'src/validations';
import { CreateConversationValidation } from '@validations/create-conversation.validation';
import chatController from '../controllers/api/chats/chat.controller';
import {isAuth} from 'src/middlewares/auth.middleware';

const RoomRoute = express.Router();
RoomRoute.post(
  '/conversation',
  CreateConversationValidation,
  (req, res) => chatController.createConversation(req, res),
);

RoomRoute.get(
  '/conversations',
  (req, res) => chatController.getConversations(req, res),
);

RoomRoute.post(
  '/conversation/:id/join',
  (req, res) => chatController.joinConversation(req, res),
);

RoomRoute.post(
  '/conversation/:conversation_id/message',isAuth,(req, res) => chatController.sendMessage(req, res)
);

RoomRoute.get(
  '/conversation/:conversation_id/messages',
  (req, res) => chatController.getMessages(req, res),
);

export default RoomRoute;
