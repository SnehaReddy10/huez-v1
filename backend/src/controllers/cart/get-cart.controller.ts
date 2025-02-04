import { Request, Response } from 'express';
import { Cart } from '../../models/cart.model';
import { StatusCodes } from '../../constants/status-codes';
import { ErrorMessages } from '../../constants/error-messages';

export const GetCartController = async (req: Request, res: Response) => {
  const userId = req.user!._id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate(
      'items.menuItem'
    );

    if (!cart) {
      res.status(StatusCodes.NotFound).json({
        success: false,
        message: 'Cart is empty.',
        data: [],
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      success: true,
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
