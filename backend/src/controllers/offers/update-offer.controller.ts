import { Response, Request } from 'express';
import { ErrorMessages } from '../../constants/error-messages';
import { StatusCodes } from '../../constants/status-codes';
import Offer from '../../models/offer.model';

export const UpdateOfferController = async (req: Request, res: Response) => {
  const userRole = req.user?.role;

  if (userRole !== 'MERCHANT' && userRole !== 'ADMIN') {
    res.status(StatusCodes.Forbidden).json({
      success: false,
      message: 'Access denied. Only MERCHANTS and ADMIN can update offers.',
    });
    return;
  }

  try {
    const updatedOffer = await Offer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedOffer) {
      res.status(StatusCodes.NotFound).json({
        success: false,
        message: 'Offer not found.',
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Offer updated successfully.',
      data: updatedOffer,
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
