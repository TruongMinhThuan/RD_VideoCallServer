
import { Router } from 'express';

import Locals from '../provider/Locals';

import LoginController1 from '../controllers/api/auth/LoginController';
import RegisterController from '../controllers/Api/Auth/Register';
import RefreshTokenController from '../controllers/Api/Auth/RefreshToken';

const router = Router();

router.post('/auth/login', );

export default router;