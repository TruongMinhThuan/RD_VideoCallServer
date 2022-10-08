import express from 'express';
import chatController from '../controllers/api/chats/chat.controller';

const RoomRoute = express.Router();
RoomRoute.post('/conversation', (req, res) =>
  chatController.createConversation(req, res),
);

export default RoomRoute;
