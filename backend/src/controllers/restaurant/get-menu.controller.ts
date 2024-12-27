import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { ErrorMessages } from '../../constants/error-messages';
import { StatusCodes } from '../../constants/status-codes';
import { MenuItem } from '../../models/menu-item.model';

export const GetMenuController = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      res
        .status(StatusCodes.BadRequest)
        .json({ success: false, error: 'Invalid restaurant ID' });
      return;
    }

    const menuItems = await MenuItem.find({ restaurant: restaurantId });

    if (!menuItems.length) {
      res.status(StatusCodes.NotFound).json({
        success: false,
        message: 'No menu items found for this restaurant',
      });
      return;
    }

    res.status(StatusCodes.OK).json({ success: true, data: menuItems });
  } catch (err: any) {
    res.status(StatusCodes.InternalServerError).json({
      success: false,
      error: ErrorMessages.Server.InternalServerError,
      details: err.message,
    });
  }
};
