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

export default RoomRoute;
