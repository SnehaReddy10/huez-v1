import { Response, Request } from 'express';
import { ErrorMessages } from '../../constants/error-messages';
import { StatusCodes } from '../../constants/status-codes';
import Offer from '../../models/offer.model';

export const GetOfferByIdController = async (req: Request, res: Response) => {
  try {
    const offer = await Offer.findById(req.params.id);

    if (!offer) {
      res.status(StatusCodes.NotFound).json({
        success: false,
        message: 'Offer not found.',
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: offer,
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
