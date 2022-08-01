import { Router } from 'express';
import ProductController from '../controllers/products.controller';

const router = Router();

const productsController = new ProductController();

router.post('/', productsController.createProduct);

router.get('/', productsController.getAllProducts);

export default router;