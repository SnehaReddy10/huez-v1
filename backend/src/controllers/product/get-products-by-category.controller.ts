import { Request, Response } from 'express';
import { MenuItem } from '../../models/menu-item.model';
import { Cart } from '../../models/cart.model';
import { StatusCodes } from '../../constants/status-codes';
import { ErrorMessages } from '../../constants/error-messages';

export const GetProductsByCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const { isVeg, isVegan, cuisine, category } = req.query;

    const filter: any = { $or: [] };

    if (cuisine) {
      filter.$or.push({ cuisine: cuisine });
    }
    if (category) {
      filter.$or.push({
        category: category,
      });
    }

    if (filter.$or.length === 0) {
      delete filter.$or;
    }

    const menuItems = await MenuItem.find(filter).limit(20);

    let cartItems: any = [];

    if (req.user) {
      const userCart = await Cart.findOne({
        user: req.user?._id,
      }).populate('items.menuItem');

      cartItems = userCart ? userCart.items : [];
    }

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

      const cartItem = cartItems?.find(
        (cartItem: any) =>
          cartItem.menuItem._id.toString() === item._id.toString()
      );
      const quantityInCart = cartItem ? cartItem.quantity : 0;

      return {
        ...item.toObject(),
        tags,
        quantityInCart,
      };
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
