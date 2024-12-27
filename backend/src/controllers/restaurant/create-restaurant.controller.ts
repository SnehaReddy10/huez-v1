import { Request, Response } from 'express';
import { StatusCodes } from '../../constants/status-codes';
import { ErrorMessages } from '../../constants/error-messages';
import { createRestaurantSchema } from '../../validators/restaurant/create-restaurant.validator';
import { Restaurant } from '../../models/restaurant.model';

export async function CreateRestaurantController(req: Request, res: Response) {
  try {
    const { success, data, error } = createRestaurantSchema.safeParse(req.body);

    if (!success) {
      const errors = error.errors.map((x) => x.message);
      res
        .status(StatusCodes.BadRequest)
        .json({ success: false, error: errors });
      return;
    }

    const { name, address, coordinates, cuisine, menu } = data;

    const newRestaurant = new Restaurant({
      name,
      address,
      location: {
        type: 'Point',
        coordinates: coordinates,
      },
      merchant: req.user!._id.toString(),
      cuisine: cuisine || [],
      menu: menu || [],
    });

    await newRestaurant.save();

    res.status(StatusCodes.Created).json({
      success: true,
      message: 'Restaurant created successfully',
      restaurant: newRestaurant,
    });
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.InternalServerError).json({
      success: false,
      message: ErrorMessages.Server.InternalServerError,
      error: error.message,
    });
  }
  return;
}
