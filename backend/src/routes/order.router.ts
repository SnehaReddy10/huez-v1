import { Router } from 'express';
import { GetPastOrdersController } from '../controllers/order';

export const orderRouter = Router();

orderRouter.get('/past-orders', GetPastOrdersController);
