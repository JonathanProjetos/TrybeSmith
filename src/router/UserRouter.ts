import { Router } from 'express';
import UserControllers from '../controllers/UserControllers';

const router = Router();

const User = new UserControllers();

router.post('/users', User.create);

export default router;