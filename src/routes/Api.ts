import { Router } from 'express';
import  AuthRoute  from './authentication.routes';
import RoomRoute from './chatroom.routes';

const router = Router();
router.use(AuthRoute)
router.use(RoomRoute)

export default router;