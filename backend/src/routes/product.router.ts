import { Router } from 'express';
import {
  GetAllProductsController,
  GetProductsByCategoryController,
  SearchController,
  GetTagsController,
} from '../controllers/product';
import { GetPopularMenuItemsController } from '../controllers/product/get-popular-menu-items.controller';

export const productRouter = Router();

productRouter.get('/', GetAllProductsController);
productRouter.get('/filter', GetProductsByCategoryController);
productRouter.get('/search', SearchController);
productRouter.get('/tags', GetTagsController);
productRouter.get('/popular-items', GetPopularMenuItemsController);
