import { Router } from 'express';
import OrderControllers from '../controllers/OrderControllers';

const router = Router();

const Order = new OrderControllers();

router.get('/orders', Order.getAll);

export default router;