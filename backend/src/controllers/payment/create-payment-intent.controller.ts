import { NextFunction, Request, Response } from 'express';
import { stripe } from '../../config/stripe.config';

export const CreatePaymentIntentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { amount, currency } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount || 1000,
      currency: currency || 'usd',
      description: 'Payment for an order',
    });

    req.clientSecret = paymentIntent.client_secret || '';
    req.paymentIntentId = paymentIntent.id || '';

    next();
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
};
