import { Request, Response } from 'express';
import { MenuItem } from '../../models/menu-item.model';
import { Cart } from '../../models/cart.model';
import { StatusCodes } from '../../constants/status-codes';
import { ErrorMessages } from '../../constants/error-messages';
import mongoose from 'mongoose';

export const GetAllProductsController = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 20;
    const cursor = req.query.cursor as string | undefined;

    let query: any = {};
    if (cursor && mongoose.Types.ObjectId.isValid(cursor)) {
      query._id = { $gt: new mongoose.Types.ObjectId(cursor) };
    }

    const menuItems = await MenuItem.find(query).sort({ _id: 1 }).limit(limit);

    let cartItems: any = [];
    if (req.user) {
      const userCart = await Cart.findOne({
        user: req.user?._id,
      }).populate('items.menuItem');
      cartItems = userCart ? userCart.items : [];
    }

    const processedMenuItems = menuItems.map((item) => {
      const tags: string[] = [];

      if (item.cuisine) tags.push(item.cuisine.toLowerCase());
      if (item.isVeg) tags.push('veg');
      else tags.push('non-veg');
      if (item.isVegan) tags.push('vegan');
      if (item.category) tags.push(item.category.toLowerCase());
      if (item.calories !== undefined) tags.push(`${item.calories} calories`);

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

    const nextCursor =
      menuItems.length > 0 ? menuItems[menuItems.length - 1]._id : null;

    res.status(StatusCodes.OK).json({
      success: true,
      data: processedMenuItems,
      nextCursor, // Send next cursor for pagination
    });
  } catch (error: any) {
    res.status(StatusCodes.InternalServerError).json({
      success: false,
      message: ErrorMessages.Server.InternalServerError,
      error: error.message,
    });
  }
};
