import { Request, Response } from 'express';
import { Cart } from '../../models/cart.model';
import { StatusCodes } from '../../constants/status-codes';
import { ErrorMessages } from '../../constants/error-messages';

export const CreateCartController = async (req: Request, res: Response) => {
  const userId = req.user?._id;

  try {
    const existingCart = await Cart.findOne({ user: userId });

    if (existingCart) {
      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Cart Already Exists.',
        data: existingCart,
      });
      return;
    }

    const newCart = new Cart({
      user: userId,
      items: [],
      totalPrice: 0,
    });

    await newCart.save();

    res.status(StatusCodes.Created).json({
      success: true,
      message: 'Cart created successfully.',
      data: newCart,
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
