import express from 'express';
import { ContactController } from '@controllers/api'
import { isAuth } from 'src/middlewares/auth.middleware';

const ContactRoute = express.Router();
ContactRoute.get('/contacts', (req, res) => ContactController.getContactList(req, res));
ContactRoute.post('/contact/:friend_id', isAuth, (req, res) => ContactController.makeFriends(req, res));

export default ContactRoute;
