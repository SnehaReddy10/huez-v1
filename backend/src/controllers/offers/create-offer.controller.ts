import { Request, Response } from 'express';
import { StatusCodes } from '../../constants/status-codes';
import { ErrorMessages } from '../../constants/error-messages';
import Offer from '../../models/offer.model';

export const CreateOfferController = async (req: Request, res: Response) => {
  const userRole = req.user?.role;

  if (userRole !== 'MERCHANT' && userRole !== 'ADMIN') {
    res.status(StatusCodes.Forbidden).json({
      success: false,
      message: 'Access denied. Only MERCHANTS and ADMIN can create offers.',
    });
    return;
  }

  try {
    const newOffer = new Offer(req.body);
    await newOffer.save();

    res.status(StatusCodes.Created).json({
      success: true,
      message: 'Offer created successfully.',
      data: newOffer,
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
