import { Request, Response } from 'express';
import { MenuItem } from '../../models/menu-item.model';
import { StatusCodes } from '../../constants/status-codes';
import { ErrorMessages } from '../../constants/error-messages';

export const DeleteMenuItemController = async (req: Request, res: Response) => {
  try {
    const { menuItemId } = req.params;

    const deletedMenuItem = await MenuItem.findByIdAndDelete(menuItemId);

    if (!deletedMenuItem) {
      res
        .status(StatusCodes.NotFound)
        .json({ success: false, message: ErrorMessages.MenuItem.NotFound });
      return;
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Menu item deleted successfully',
      menuItem: deletedMenuItem,
    });
  } catch (error: any) {
    res.status(StatusCodes.InternalServerError).json({
      success: false,
      message: ErrorMessages.Server.InternalServerError,
      error: error.message,
    });
  }
};
