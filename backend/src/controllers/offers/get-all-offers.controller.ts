import { Response, Request } from 'express';
import { ErrorMessages } from '../../constants/error-messages';
import { StatusCodes } from '../../constants/status-codes';
import Offer from '../../models/offer.model';

export const GetAllOffersController = async (req: Request, res: Response) => {
  try {
    const offers = await Offer.find();
    res.status(StatusCodes.OK).json({
      success: true,
      data: offers,
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
