import { Request, Response } from 'express';
import { MenuItem } from '../../models/menu-item.model';
import { StatusCodes } from '../../constants/status-codes';
import { ErrorMessages } from '../../constants/error-messages';

export const GetAllProductsController = async (req: Request, res: Response) => {
  try {
    const menuItems = await MenuItem.find();

    const processedMenuItems = menuItems.map((item) => {
      const tags: string[] = [];

      if (item.cuisine) {
        tags.push(item.cuisine.toLowerCase());
      }

      if (item.isVeg) {
        tags.push('veg');
      } else {
        tags.push('non-veg');
      }

      if (item.isVegan) {
        tags.push('vegan');
      }

      if (item.category) {
        tags.push(item.category.toLowerCase());
      }

      if (item.calories !== undefined) {
        tags.push(`${item.calories} calories`);
      }

      return { ...item.toObject(), tags };
    });

    res.status(StatusCodes.OK).json({
      success: true,
      data: processedMenuItems,
    });
  } catch (error: any) {
    res.status(StatusCodes.InternalServerError).json({
      success: false,
      message: ErrorMessages.Server.InternalServerError,
      error: error.message,
    });
  }
};
