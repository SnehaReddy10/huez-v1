import { NextFunction, Request, Response, Router } from 'express';
import { stripe } from '../config/stripe.config';
import { CreatePaymentIntentController } from '../controllers/payment';
import {
  CreateOrderController,
  UpdateOrderPaymentController,
} from '../controllers/order';

export const paymentRouter = Router();

paymentRouter.post(
  '/create-payment-intent',
  (req: Request, res: Response, next: NextFunction) => {
    console.log('create-payment-intent');
    next();
  },
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
