import { Router } from 'express';
import AuthRoute from './authentication.routes';
import ChatRoute from './chat.routes';
import ContactRoute from './contact.routes';

const router = Router();
router.use(ChatRoute);
router.use(ContactRoute)
router.use(AuthRoute);

export default router;
