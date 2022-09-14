import { Router } from 'express';
import LoginControllers from '../controllers/LoginControllers';

const router = Router();

const Login = new LoginControllers();

router.post('/login', Login.verify);

export default router;