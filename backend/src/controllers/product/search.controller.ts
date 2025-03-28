import { Request, Response } from 'express';
import { MenuItem } from '../../models/menu-item.model';
import { Restaurant } from '../../models/restaurant.model';
import { StatusCodes } from '../../constants/status-codes';
import { ErrorMessages } from '../../constants/error-messages';
import mongoose from 'mongoose';

export const SearchController = async (req: Request, res: Response) => {
  try {
    const query = String(req.query.query || '').trim();
    const limit = parseInt(req.query.limit as string) || 20;
    const menuCursor = req.query.menuCursor as string | undefined;
    const restaurantCursor = req.query.restaurantCursor as string | undefined;

    if (!query) {
      res
        .status(StatusCodes.BadRequest)
        .json({ message: 'Search query is required' });
      return;
    }

    const menuItemQuery: any = { name: { $regex: query, $options: 'i' } };
    const restaurantQuery: any = {
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { address: { $regex: query, $options: 'i' } },
      ],
    };

    if (menuCursor && mongoose.Types.ObjectId.isValid(menuCursor)) {
      menuItemQuery._id = { $gt: new mongoose.Types.ObjectId(menuCursor) };
    }
    if (restaurantCursor && mongoose.Types.ObjectId.isValid(restaurantCursor)) {
      restaurantQuery._id = {
        $gt: new mongoose.Types.ObjectId(restaurantCursor),
      };
    }

    const [menuItems, restaurants] = await Promise.all([
      MenuItem.find(menuItemQuery).sort({ _id: 1 }).limit(limit),
      Restaurant.find(restaurantQuery).sort({ _id: 1 }).limit(limit),
    ]);

    const nextMenuItemCursor =
      menuItems.length > 0 ? menuItems[menuItems.length - 1]._id : null;
    const nextRestaurantCursor =
      restaurants.length > 0 ? restaurants[restaurants.length - 1]._id : null;

    res.json({
      menuItems,
      restaurants,
      nextMenuItemCursor,
      nextRestaurantCursor,
    });
  } catch (error) {
    console.error('Error searching:', error);
    res
      .status(StatusCodes.InternalServerError)
      .json({ message: ErrorMessages.Server.InternalServerError });
    return;
  }
};
