import { Router } from 'express';
import {
  GetAllProductsController,
  GetProductsByCategoryController,
  SearchController,
  GetTagsController,
} from '../controllers/product';

export const productRouter = Router();

productRouter.get('/', GetAllProductsController);
productRouter.get('/filter', GetProductsByCategoryController);
productRouter.get('/search', SearchController);
productRouter.get('/tags', GetTagsController);
