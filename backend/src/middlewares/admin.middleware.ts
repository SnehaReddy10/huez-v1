import { NextFunction, Response, Request } from 'express';
import { StatusCodes } from '../constants/status-codes';
import { ErrorMessages } from '../constants/error-messages';
import { Role } from '../constants/enums/role';

export function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    return res.status(StatusCodes.Unauthorized).json({
      success: false,
      message: ErrorMessages.User.Unauthorized,
    });
  }

  if (req.user.role !== Role.ADMIN) {
    return res.status(StatusCodes.Forbidden).json({
      success: false,
      message: ErrorMessages.User.ForbiddenAdminAccess,
    });
  }

  next();
}
