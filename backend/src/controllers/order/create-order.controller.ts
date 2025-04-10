import { NextFunction, Request, Response } from 'express';
import { Order } from '../../models/order.model';
import { Cart } from '../../models/cart.model';

export const CreateOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { shippingAddress } = req.body;
    const userId = req.user?._id;

    const cart = await Cart.findOne({ user: userId }).populate(
      'items.menuItem'
    );

    if (!cart || cart.items.length === 0) {
      res.status(400).json({ message: 'Cart is empty' });
      return;
    }

    const order = new Order({
      user: userId,
      items: cart.items,
      discountId: cart.discountId,
      discountAmount: cart.discountAmount,
      totalPrice: cart.totalPrice,
      shippingCharges: cart.shipppingCharges,
      tax: cart.tax,
      shippingAddress,
      paymentDetails: {
        paymentIntentId: '',
        paymentStatus: 'pending',
        paymentMethod: '',
      },
      status: 'pending',
    });

    await order.save();

    req.orderId = order._id.toString();
    next();
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return;
  }
};
