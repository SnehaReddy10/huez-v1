import { NextFunction, Response, Request } from 'express';
import { StatusCodes } from '../constants/status-codes';
import { ErrorMessages } from '../constants/error-messages';
import { Role } from '../constants/enums/role';

export function merchantMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    res.status(StatusCodes.Unauthorized).json({
      success: false,
      message: ErrorMessages.User.Unauthorized,
    });
    return;
  }

  if (req.user.role !== Role.MERCHANT) {
    res.status(StatusCodes.Forbidden).json({
      success: false,
      message: ErrorMessages.User.ForbiddenMerchantAccess,
    });
    return;
  }

  next();
}
