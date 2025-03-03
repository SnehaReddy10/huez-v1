import { Request, Response } from 'express';
import { StatusCodes } from '../../constants/status-codes';
import { Cuisine, MenuItemCategory } from '../../constants/enums/menu-item';

export const GetTagsController = async (req: Request, res: Response) => {
  try {
    const tags = [
      ...Object.values(MenuItemCategory)
        .map((category, index) => ({
          id: index + 2,
          label: category,
          type: 'category',
        }))
        .slice(0, 4),

      ...Object.values(Cuisine)
        .map((cuisine, index) => ({
          id: Object.values(MenuItemCategory).length + index + 1,
          label: cuisine,
          type: 'cuisine',
        }))
        .slice(0, 4),

      {
        id:
          Object.values(MenuItemCategory).length +
          Object.values(Cuisine).length +
          1,
        label: 'Veg',
        type: 'veg',
      },
      {
        id:
          Object.values(MenuItemCategory).length +
          Object.values(Cuisine).length +
          2,
        label: 'Vegan',
        type: 'vegan',
      },
    ];

    res.status(StatusCodes.OK).json({
      success: true,
      data: [
        {
          id: 1,
          label: 'All',
          type: 'category',
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
