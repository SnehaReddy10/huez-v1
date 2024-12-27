import { Request, Response } from 'express';
import { menuItemSchema } from '../../validators/restaurant/create-menu-item.validator';
import { ErrorMessages } from '../../constants/error-messages';
import { StatusCodes } from '../../constants/status-codes';
import { MenuItem } from '../../models/menu-item.model';
import { Restaurant } from '../../models/restaurant.model';

export const CreateMenuItemController = async (req: Request, res: Response) => {
  try {
    const { success, data, error } = menuItemSchema.safeParse(req.body);

    if (!success) {
      const errors = error.errors.map((err) => err.message);
      res
        .status(StatusCodes.BadRequest)
        .json({ success: false, error: errors });
      return;
    }

    const { restaurant, ...menuItemData } = data;
    const restaurantExists = await Restaurant.findById(restaurant);

    if (!restaurantExists) {
      res
        .status(StatusCodes.NotFound)
        .json({ success: false, error: ErrorMessages.Restaurant.NotFound });
      return;
    }

    const menuItem = new MenuItem({
      ...menuItemData,
      restaurant,
    });

    await menuItem.save();

    res.status(StatusCodes.Created).json({
      success: true,
      message: 'Menu item created successfully',
      menuItem,
    });
  } catch (err: any) {
    res.status(StatusCodes.InternalServerError).json({
      success: false,
      error: ErrorMessages.Server.InternalServerError,
      details: err.message,
    });
  }
};
