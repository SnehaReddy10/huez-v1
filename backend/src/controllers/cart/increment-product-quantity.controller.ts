import { Request, Response } from 'express';
import { Cart } from '../../models/cart.model';
import { StatusCodes } from '../../constants/status-codes';
import { ErrorMessages } from '../../constants/error-messages';

export const IncrementProductQuantityController = async (
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

    const product = cart.items.find(
      (item) => item.menuItem.toString() === menuItemId
    );

    if (!product) {
      res.status(StatusCodes.NotFound).json({
        success: false,
        message: ErrorMessages.MenuItem.NotFound,
      });
      return;
    }

    product.quantity += 1;
    await cart.save();

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Product quantity increased.',
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
