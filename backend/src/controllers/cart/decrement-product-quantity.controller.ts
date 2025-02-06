import { Request, Response } from 'express';
import { Cart } from '../../models/cart.model';
import { StatusCodes } from '../../constants/status-codes';
import { ErrorMessages } from '../../constants/error-messages';

export const DecrementProductQuantityController = async (
  req: Request,
  res: Response
) => {
  const { menuItemId } = req.body;
  const userId = req.user!._id;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      res.status(StatusCodes.NotFound).json({
        success: false,
        message: ErrorMessages.Cart.NotFound,
      });
      return;
    }

    const productIndex = cart.items.findIndex(
      (item) => item.menuItem.toString() === menuItemId
    );

    if (productIndex === -1) {
      res.status(StatusCodes.NotFound).json({
        success: false,
        message: ErrorMessages.MenuItem.NotFound,
      });
      return;
    }

    if (cart.items[productIndex].quantity > 1) {
      cart.items[productIndex].quantity -= 1;
    } else {
      cart.items.splice(productIndex, 1);
    }

    await cart.save();

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Product quantity decreased.',
      data: cart,
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
