import { Router } from 'express';
import AuthRoute from './authentication.routes';
import ChatRoute from './chat.routes';

const router = Router();
router.use(AuthRoute);
router.use(ChatRoute);

export default router;
