import { Request, Response } from 'express';
import { Order } from '../../models/order.model';

export const UpdateOrderPaymentController = async (
  req: Request,
  res: Response
) => {
  try {
    const { orderId, paymentIntentId } = req;
    const userId = req.user?._id;

    if (!orderId || !paymentIntentId) {
      res
        .status(400)
        .json({ message: 'Order ID and Payment Intent ID are required' });
      return;
    }

    const order = await Order.findOne({
      _id: orderId,
      user: userId,
    });

    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    if (order.paymentDetails) {
      order.paymentDetails.paymentIntentId = paymentIntentId;
      order.paymentDetails.paymentStatus = 'completed';
      order.status = 'processing';
      await order.save();
    }

    res.status(200).json({
      success: true,
      message: 'Order payment details updated successfully',
      data: order,
      clientSecret: req.clientSecret,
    });
    return;
  } catch (error) {
    console.error('Error updating order payment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update order payment',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return;
  }
};
