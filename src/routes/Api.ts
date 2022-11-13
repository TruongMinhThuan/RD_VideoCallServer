import { Router } from 'express';
import AuthRoute from './authentication.routes';
import ChatRoute from './chat.routes';
import ContactRoute from './contact.routes';
import UserRouter from './profile.routes';

const router = Router();
router.use(ChatRoute);
router.use(ContactRoute)
router.use(AuthRoute);
router.use(UserRouter)

export default router;
