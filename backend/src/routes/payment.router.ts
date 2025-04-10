import { Request, Response, Router } from 'express';
import { stripe } from '../config/stripe.config';
import { CreatePaymentIntentController } from '../controllers/payment';
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

paymentRouter.get(
  '/payment-session-status',
  async (req: Request, res: Response) => {
    const session = await stripe.checkout.sessions.retrieve(
      req.query?.session_id?.toString() ?? ''
    );

    res.send({
      status: session.status,
      customer_email: session?.customer_details?.email ?? '',
    });
  }
);

paymentRouter.post('/confirm', ConfirmPaymentController);
