import { Router } from 'express';
import { GetAllProductsController } from '../controllers/product/get-all-products.controller';

export const productRouter = Router();

productRouter.get('/', GetAllProductsController);
