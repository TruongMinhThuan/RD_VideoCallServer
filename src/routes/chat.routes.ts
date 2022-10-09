import express from 'express';
import { validate } from 'src/validations';
import { CreateConversationValidation } from '@validations/create-conversation.validation';
import chatController from '../controllers/api/chats/chat.controller';

const RoomRoute = express.Router();
RoomRoute.post(
  '/conversation',
  CreateConversationValidation,
  (req, res) => chatController.createConversation(req, res),
);

RoomRoute.get(
  '/conversations/:id',
  (req, res) => chatController.getConversations(req, res),
);

RoomRoute.post(
  '/conversation/:id/join',
  (req, res) => chatController.joinConversation(req, res),
);

export default RoomRoute;
