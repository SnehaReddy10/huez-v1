import { Request, Response } from 'express';
import { Cart } from '../../models/cart.model';
import { StatusCodes } from '../../constants/status-codes';
import { ErrorMessages } from '../../constants/error-messages';

export const DeleteCartController = async (req: Request, res: Response) => {
  const userId = req.user?._id;

  try {
    const cart = await Cart.findOneAndDelete({ user: userId });

    if (!cart) {
      res.status(StatusCodes.NotFound).json({
        success: false,
        message: ErrorMessages.Cart.NotFound,
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Cart deleted successfully.',
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
