import { Request, Response } from 'express';
import { Cart } from '../../models/cart.model';
import { MenuItem } from '../../models/menu-item.model';
import { StatusCodes } from '../../constants/status-codes';
import { ErrorMessages } from '../../constants/error-messages';

export const AddProductToCartController = async (
  req: Request,
  res: Response
) => {
  const { menuItemId, quantity } = req.body;
  const userId = req.user!._id;

  try {
    const menuItem = await MenuItem.findById(menuItemId);
    if (!menuItem) {
      res.status(StatusCodes.NotFound).json({
        success: false,
        message: ErrorMessages.MenuItem.NotFound,
      });
      return;
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [],
        totalPrice: 0,
      });
    }

    const existingProduct = cart.items.find(
      (item) => item.menuItem.toString() === menuItemId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
      existingProduct.price = menuItem.price;
    } else {
      const newProduct = {
        menuItem: menuItemId,
        quantity,
        price: menuItem.price,
      };
      cart.items.push(newProduct);
    }

    await cart.save();

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Menu item added to cart.',
      data: cart,
    });
    return;
  } catch (error: any) {
    res.status(StatusCodes.InternalServerError).json({
      success: false,
      message: ErrorMessages.Server.InternalServerError,
      error: error.message,
    });
    return;
  }
};
