import { Router } from 'express';
import { GetAllProductsController } from '../controllers/product/get-all-products.controller';
import { GetProductsByCategoryController } from '../controllers/product/get-products-by-category.controller';
import { SearchController } from '../controllers/product/search.controller';
import { GetTagsController } from '../controllers/product/get-tags.controller';

export const productRouter = Router();

productRouter.get('/', GetAllProductsController);
productRouter.get('/filter', GetProductsByCategoryController);
productRouter.get('/search', SearchController);
productRouter.get('/tags', GetTagsController);
