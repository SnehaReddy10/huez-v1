import { Router } from 'express';
import {
  CreateRestaurantController,
  CreateMenuItemController,
  GetMenuController,
  UpdateMenuItemController,
  DeleteMenuItemController,
  GetMenuItemController,
} from '../controllers/restaurant';
import { merchantMiddleware } from '../middlewares/merchant.middleware';

export const restaurantRouter = Router();

restaurantRouter.get('/:restaurantId/menu', GetMenuController);
restaurantRouter.get('/menu-item/:menuItemId', GetMenuItemController);

restaurantRouter.use(merchantMiddleware);

restaurantRouter.post('/', CreateRestaurantController);
restaurantRouter.post('/menu-item', CreateMenuItemController);
restaurantRouter.put('/menu-item/:menuItemId', UpdateMenuItemController);
restaurantRouter.delete('/menu-item/:menuItemId', DeleteMenuItemController);
