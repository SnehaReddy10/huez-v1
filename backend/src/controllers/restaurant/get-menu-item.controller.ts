import { Request, Response } from 'express';
import { MenuItem } from '../../models/menu-item.model';
import { StatusCodes } from '../../constants/status-codes';
import { ErrorMessages } from '../../constants/error-messages';

export const GetMenuItemController = async (req: Request, res: Response) => {
  const { menuItemId } = req.params;

  try {
    const menuItem = await MenuItem.findById(menuItemId).populate('restaurant');

    if (!menuItem) {
      res.status(StatusCodes.NotFound).json({
        success: false,
        message: ErrorMessages.MenuItem.NotFound,
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: menuItem,
    });
  } catch (error: any) {
    res.status(StatusCodes.InternalServerError).json({
      success: false,
      message: ErrorMessages.Server.InternalServerError,
      error: error.message,
    });
  }
};
