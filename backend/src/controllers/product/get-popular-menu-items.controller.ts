import { Request, Response } from 'express';
import { MenuItem } from '../../models/menu-item.model';

export const GetPopularMenuItemsController = async (
  req: Request,
  res: Response
) => {
  try {
    const topItems = await MenuItem.find()
      .sort({ userActivityScore: -1 })
      .limit(3)
      .select('category');

    res.json(topItems);
  } catch (err: any) {
    console.log('Failed to fetch top menu items', err);
    res.status(500).json({ error: 'Failed to fetch top menu items' });
  }
};
