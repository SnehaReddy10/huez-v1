import { Request, Response } from 'express';
import { Cart } from '../../models/cart.model';
import { MenuItem } from '../../models/menu-item.model';
import { StatusCodes } from '../../constants/status-codes';
import { ErrorMessages } from '../../constants/error-messages';

export const SyncCartOnLoginController = async (
  req: Request,
  res: Response
) => {
  try {
    const { cart: localCart } = req.body;
    const userId = req.user?._id;

    console.log({ localCart });

    if (!localCart || !Array.isArray(localCart)) {
      res.status(StatusCodes.BadRequest).json({
        success: false,
        message: 'Invalid cart data.',
      });
      return;
    }

    let userCart = await Cart.findOne({ user: userId });

    if (!userCart) {
      userCart = new Cart({ user: userId, items: [], totalPrice: 0 });
    }

    for (const localItem of localCart) {
      const menuItem = await MenuItem.findById(localItem.menuItemId);

      if (!menuItem) continue;

      const existingItem = userCart.items.find(
        (item) => item.menuItem._id.toString() === localItem.menuItem
      );

      if (existingItem) {
        existingItem.quantity += localItem.quantity;
        existingItem.price = menuItem.price;
      } else {
        userCart.items.push({
          menuItem: localItem.menuItemId,
          quantity: localItem.quantity,
          price: menuItem.price,
        });
      }
    }

    await userCart.save();

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Cart synced successfully.',
      data: userCart,
    });
    return;
  } catch (error: any) {
    console.error('Error syncing cart:', error);
    res.status(StatusCodes.InternalServerError).json({
      success: false,
      message: ErrorMessages.Server.InternalServerError,
      error: error.message,
    });
    return;
  }
};
