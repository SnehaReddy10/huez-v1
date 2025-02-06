import { Response, Request } from 'express';
import { ErrorMessages } from '../../constants/error-messages';
import { StatusCodes } from '../../constants/status-codes';
import Offer from '../../models/offer.model';

export const DeleteOfferController = async (req: Request, res: Response) => {
  const userRole = req.user?.role;

  if (userRole !== 'MERCHANT' && userRole !== 'ADMIN') {
    res.status(StatusCodes.Forbidden).json({
      success: false,
      message: 'Access denied. Only MERCHANTS and ADMIN can delete offers.',
    });
    return;
  }

  try {
    const deletedOffer = await Offer.findByIdAndDelete(req.params.id);

    if (!deletedOffer) {
      res.status(StatusCodes.NotFound).json({
        success: false,
        message: 'Offer not found.',
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Offer deleted successfully.',
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
