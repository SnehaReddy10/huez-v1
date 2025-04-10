import { NextFunction, Request, Response, Router } from 'express';
import { CreateOrderController } from '../controllers/order/create-order.controller';
import { CreatePaymentIntentController } from '../controllers/payment/create-payment-intent.controller';
import { UpdateOrderPaymentController } from '../controllers/order/update-order-payment.controller';
import { stripe } from '../config/stripe.config';

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
