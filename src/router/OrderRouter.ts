import { Router } from 'express';
import OrderControllers from '../controllers/OrderControllers';
import addUserReq from '../middleware/validToken';

const router = Router();

const Order = new OrderControllers();

router.get('/orders', Order.getAll);
router.post('/orders', addUserReq.Token, Order.create);

export default router;