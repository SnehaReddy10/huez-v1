import { Request, Response } from 'express';
import { stripe } from '../../config/stripe.config';

export const GetPaymentSessionStatusController = async (
  req: Request,
  res: Response
) => {
  const session = await stripe.checkout.sessions.retrieve(
    req.query?.session_id?.toString() ?? ''
  );

  res.send({
    status: session.status,
    customer_email: session?.customer_details?.email ?? '',
  });
};
