import { Router } from 'express';
import ProductsControllers from '../controllers/ProductsControllers';

const router = Router();

const Product = new ProductsControllers();

router.post('/products', Product.create);
router.get('/products', Product.getAll);

export default router;