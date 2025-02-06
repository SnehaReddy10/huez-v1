import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { StatusCodes } from '../constants/status-codes';

export const validateRequest = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(StatusCodes.BadRequest).json({
        success: false,
        message: 'Validation Error',
        errors: result.error.errors.map((err) => err.message),
      });
      return;
    }
    next();
  };
};
