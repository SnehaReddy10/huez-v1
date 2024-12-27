import { Router } from 'express';
import { CreateRestaurantController } from '../controllers/restaurant/create-restaurant.controller';
import { CreateMenuItemController } from '../controllers/restaurant/create-menu-item.controller';
import { GetMenuController } from '../controllers/restaurant/get-menu.controller';
import { UpdateMenuItemController } from '../controllers/restaurant/update-menu-item.controller';
import { DeleteMenuItemController } from '../controllers/restaurant/delete-menu-item.controller';
import { GetMenuItemController } from '../controllers/restaurant/get-menu-item.controller';
import { merchantMiddleware } from '../middlewares/merchant.middleware';

export const restaurantRouter = Router();

restaurantRouter.get('/:restaurantId/menu', GetMenuController);
restaurantRouter.get('/menu-item/:menuItemId', GetMenuItemController);

restaurantRouter.use(merchantMiddleware);

restaurantRouter.post('/', CreateRestaurantController);
restaurantRouter.post('/menu-item', CreateMenuItemController);
restaurantRouter.put('/menu-item/:menuItemId', UpdateMenuItemController);
restaurantRouter.delete('/menu-item/:menuItemId', DeleteMenuItemController);
