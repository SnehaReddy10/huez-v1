import { Request, Response } from 'express';
import { z } from 'zod';
import mongoose from 'mongoose';
import { ErrorMessages } from '../../constants/error-messages';
import { StatusCodes } from '../../constants/status-codes';
import { MenuItem } from '../../models/menu-item.model';
import { updateMenuItemSchema } from '../../validators/restaurant/update-menu-item.validator';

export const UpdateMenuItemController = async (req: Request, res: Response) => {
  try {
    const { menuItemId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(menuItemId)) {
      res
        .status(StatusCodes.BadRequest)
        .json({ success: false, error: 'Invalid menu item ID' });
      return;
    }

    const { success, data, error } = updateMenuItemSchema.safeParse(req.body);
    if (!success) {
      const errors = error.errors.map((err) => err.message);
      res
        .status(StatusCodes.BadRequest)
        .json({ success: false, error: errors });
      return;
    }

    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      menuItemId,
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!updatedMenuItem) {
      res
        .status(StatusCodes.NotFound)
        .json({ success: false, message: 'Menu item not found' });
      return;
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Menu item updated successfully',
      data: updatedMenuItem,
    });
  } catch (err: any) {
    res.status(StatusCodes.InternalServerError).json({
      success: false,
      error: ErrorMessages.Server.InternalServerError,
      details: err.message,
    });
  }
};
