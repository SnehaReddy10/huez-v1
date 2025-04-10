import { Router } from 'express';
import {
  CreatePaymentIntentController,
  GetPaymentSessionStatusController,
} from '../controllers/payment';
import {
  CreateOrderController,
  UpdateOrderPaymentController,
} from '../controllers/order';
import { ConfirmPaymentController } from '../controllers/payment/confirm-payment.controller';

export const paymentRouter = Router();

paymentRouter.post(
  '/create-payment-intent',
  CreateOrderController,
  CreatePaymentIntentController,
  UpdateOrderPaymentController
);

paymentRouter.get('/payment-session-status', GetPaymentSessionStatusController);

paymentRouter.post('/confirm', ConfirmPaymentController);
