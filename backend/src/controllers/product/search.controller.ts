import { Request, Response } from 'express';
import { MenuItem } from '../../models/menu-item.model';
import { Restaurant } from '../../models/restaurant.model';
import { StatusCodes } from '../../constants/status-codes';
import { ErrorMessages } from '../../constants/error-messages';

export const SearchController = async (req: Request, res: Response) => {
  try {
    const query = String(req.query.query).trim();

    if (!query) {
      res.status(400).json({ message: 'Search query is required' });
      return;
    }

    const menuItemsPromise = MenuItem.find(
      { $text: { $search: query } },
      { score: { $meta: 'textScore' } }
    ).sort({ score: { $meta: 'textScore' } });

    const restaurantsPromise = Restaurant.find(
      { $text: { $search: query } },
      { score: { $meta: 'textScore' } }
    ).sort({ score: { $meta: 'textScore' } });

    const [menuItems, restaurants] = await Promise.all([
      menuItemsPromise,
      restaurantsPromise,
    ]);

    res.json({ menuItems, restaurants });
    return;
  } catch (error) {
    console.error(`Error searching`, error);
    res
      .status(StatusCodes.InternalServerError)
      .json({ message: ErrorMessages.Server.InternalServerError });
    return;
  }
};
