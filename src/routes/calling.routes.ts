import express from 'express';
import { ChatController } from '@controllers/api';
import { isAuth } from 'src/middlewares/auth.middleware';
import callingController from '@controllers/api/calling/calling.controller';

const CallingRoute = express.Router();

CallingRoute.get('/conversation-calling/:id', isAuth, (req, res) => callingController.getConversationCalling(req, res));


export default CallingRoute;
