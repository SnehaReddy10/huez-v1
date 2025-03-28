import { Request, Response } from 'express';
import { StatusCodes } from '../../constants/status-codes';
import {
  Cuisine,
  MenuItemCategory,
  TagIcons,
} from '../../constants/enums/menu-item';

export const GetTagsController = async (req: Request, res: Response) => {
  try {
    const tags = [
      ...Object.values(MenuItemCategory)
        .map((category, index) => ({
          id: index + 2,
          label: category,
          type: 'category',
          icon: TagIcons[category],
        }))
        .slice(0, 4),

      ...Object.values(Cuisine)
        .map((cuisine, index) => ({
          id: Object.values(MenuItemCategory).length + index + 1,
          label:
            cuisine.charAt(0).toUpperCase() + cuisine.slice(1).toLowerCase(),
          type: 'cuisine',
          icon: TagIcons[
            cuisine.charAt(0).toUpperCase() + cuisine.slice(1).toLowerCase()
          ],
        }))
        .slice(0, 4),
    ];

    res.status(StatusCodes.OK).json({
      success: true,
      data: [
        {
          id: 1,
          label: 'All',
          type: 'category',
          icon: TagIcons['All'],
        },
        ...tags,
      ],
    });
  } catch (error: any) {
    res.status(StatusCodes.InternalServerError).json({
      success: false,
      message: 'Error fetching filter tags',
      error: error.message,
    });
  }
};
