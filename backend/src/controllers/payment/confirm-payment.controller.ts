import { Request, Response } from 'express';
import { Order } from '../../models/order.model';
import { Cart } from '../../models/cart.model';
import Stripe from 'stripe';
import { MenuItem } from '../../models/menu-item.model';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-03-31.basil',
});

export const ConfirmPaymentController = async (req: Request, res: Response) => {
  try {
    const { paymentIntentId, address } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    const order = await Order.findOne({
      'paymentDetails.paymentIntentId': paymentIntentId,
      user: userId,
    });

    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      res.status(400).json({ message: 'Payment not successful' });
      return;
    }

    if (address) {
      order.shippingAddress = {
        street: address.street,
        city: address.city,
        state: address.state,
        country: address.country,
        postalCode: address.postalCode,
      };
    }

    order.paymentDetails = {
      paymentIntentId,
      paymentStatus: 'completed',
      paymentMethod: paymentIntent.payment_method_types[0],
    };
    order.status = 'processing';

    await order.save();

    const bulkUpdates = order.items.map((item) => ({
      updateOne: {
        filter: { _id: item.menuItem },
        update: { $inc: { userActivityScore: 1 } },
      },
    }));

    await MenuItem.bulkWrite(bulkUpdates);

    await Cart.findOneAndUpdate(
      { user: userId },
      {
        $set: { items: [], totalPrice: 0, discountId: null, discountAmount: 0 },
      }
    );

    res.status(200).json({
      success: true,
      message: 'Payment confirmed and order updated',
      data: order,
    });
    return;
  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to confirm payment',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return;
  }
};
