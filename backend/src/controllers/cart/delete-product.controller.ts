import { Request, Response } from 'express';
import { Cart } from '../../models/cart.model';
import { StatusCodes } from '../../constants/status-codes';
import { ErrorMessages } from '../../constants/error-messages';

export const DeleteProductFromCartController = async (
  req: Request,
  res: Response
) => {
  const { menuItemId } = req.params;
  const userId = req.user!._id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate(
      'items.menuItem'
    );

    if (!cart) {
      res.status(StatusCodes.NotFound).json({
        success: false,
        message: ErrorMessages.Cart.NotFound,
      });
      return;
    }

    console.log({ cart });
    cart.items.map((item) => {
      console.log(item.menuItem._id.toString(), menuItemId);
    });

    const productIndex = cart.items.findIndex(
      (item) => item.menuItem._id.toString() === menuItemId
    );

    if (productIndex === -1) {
      res.status(StatusCodes.NotFound).json({
        success: false,
        message: 'Product not found in cart.',
      });
      return;
    }

    cart.items.splice(productIndex, 1);

    let total = 0;
    cart.items.forEach((item: any) => {
      total += item.price * item.quantity;
    });
    cart.totalPrice = total;

    await cart.save();

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Product removed from cart successfully.',
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
