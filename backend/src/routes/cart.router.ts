import { Router } from 'express';
import { CreateCartController } from '../controllers/cart/create-cart.controller';
import { AddProductToCartController } from '../controllers/cart/add-product.controller';
import { DeleteProductFromCartController } from '../controllers/cart/delete-product.controller';
import { DeleteCartController } from '../controllers/cart/delete-cart.controller';

export const cartRouter = Router();

cartRouter.post('/', CreateCartController);
cartRouter.post('/product', AddProductToCartController);
cartRouter.delete('/product/:menuItemId', DeleteProductFromCartController);
cartRouter.delete('/', DeleteCartController);
