import { Router } from 'express';
import {
  CreateCartController,
  AddProductToCartController,
  DeleteProductFromCartController,
  DeleteCartController,
  GetCartController,
  DecrementProductQuantityController,
  IncrementProductQuantityController,
  SyncCartOnLoginController,
} from '../controllers/cart';

export const cartRouter = Router();

cartRouter.get('/', GetCartController);
cartRouter.post('/', CreateCartController);
cartRouter.post('/product', AddProductToCartController);
cartRouter.post('/product/increment', IncrementProductQuantityController);
cartRouter.post('/product/decrement', DecrementProductQuantityController);
cartRouter.delete('/product/:menuItemId', DeleteProductFromCartController);
cartRouter.delete('/', DeleteCartController);
cartRouter.post('/sync', SyncCartOnLoginController);
