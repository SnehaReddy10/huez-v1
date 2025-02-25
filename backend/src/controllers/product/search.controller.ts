import { Request, Response } from 'express';
import { MenuItem } from '../../models/menu-item.model';
import { Restaurant } from '../../models/restaurant.model';
import { StatusCodes } from '../../constants/status-codes';
import { ErrorMessages } from '../../constants/error-messages';

export const SearchController = async (req: Request, res: Response) => {
  try {
    const query = String(req.query.query);

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

    const combinedResults = [
      ...menuItems.map((item: any) => ({
        ...item.toObject(),
        type: 'menuItem',
      })),
      ...restaurants.map((restaurant: any) => ({
        ...restaurant.toObject(),
        type: 'restaurant',
      })),
    ];

    combinedResults.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

    res.json(combinedResults);
    return;
  } catch (error) {
    console.error(`Error searching`, error);
    res
      .status(StatusCodes.InternalServerError)
      .json({ message: ErrorMessages.Server.InternalServerError });
    return;
  }
};
