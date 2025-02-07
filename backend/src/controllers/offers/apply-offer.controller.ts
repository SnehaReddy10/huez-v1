import { Request, Response } from 'express';
import { Cart } from '../../models/cart.model';
import { StatusCodes } from '../../constants/status-codes';
import { ErrorMessages } from '../../constants/error-messages';
import Offer from '../../models/offer.model';

export const ApplyOfferController = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const { offerId } = req.params;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart || cart.items.length === 0) {
      res.status(StatusCodes.BadRequest).json({
        success: false,
        message: 'Cart is empty or does not exist.',
      });
      return;
    }

    const offer = await Offer.findById(offerId);

    if (!offer || !offer.isActive) {
      res.status(StatusCodes.NotFound).json({
        success: false,
        message: 'Offer not found or expired.',
      });
      return;
    }

    let discountAmount = 0;

    if (offer.discount === 'Percentage Off' && offer.value > 0) {
      discountAmount = (cart.totalPrice * offer.value) / 100;
    }

    if (offer.discount === 'Buy 1 Get 1' && cart.items.length > 1) {
      const minPricedItem = cart.items.reduce((prev, curr) =>
        prev.price < curr.price ? prev : curr
      );
      discountAmount = minPricedItem.price;
    }

    cart.discountId = offer._id;
    cart.discountAmount = discountAmount;

    await cart.save();

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Offer applied successfully.',
      data: {
        cart,
        discountApplied: offer.name,
        discountAmount,
      },
    });
    return;
  } catch (error: any) {
    res.status(StatusCodes.InternalServerError).json({
      success: false,
      message: ErrorMessages.Server.InternalServerError,
      error: error.message,
    });
    return;
  }
};
