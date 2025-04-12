import { Request, Response } from 'express';
import { Order } from '../../models/order.model';
import { StatusCodes } from '../../constants/status-codes';
import { ErrorMessages } from '../../constants/error-messages';

const VALID_TIME_RANGES = ['3months', '6months', '1year'] as const;
type TimeRange = (typeof VALID_TIME_RANGES)[number];

export const GetPastOrdersController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    const timeRange = req.query.timeRange
      ? (req.query.timeRange as TimeRange)
      : '3months';

    if (timeRange && !VALID_TIME_RANGES.includes(timeRange)) {
      res.status(StatusCodes.BadRequest).json({
        success: false,
        message: `Invalid time range. Use one of: ${VALID_TIME_RANGES.join(
          ', '
        )}`,
      });
      return;
    }

    const startDate = new Date();
    switch (timeRange) {
      case '3months':
        startDate.setMonth(startDate.getMonth() - 3);
        break;
      case '6months':
        startDate.setMonth(startDate.getMonth() - 6);
        break;
      case '1year':
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
    }

    const orders = await Order.find({
      user: userId,
      createdAt: { $gte: startDate },
      status: { $in: ['processing', 'shipped', 'delivered'] },
    })
      .populate('items.menuItem')
      .populate('discountId')
      .sort({ createdAt: -1 });

    res.status(StatusCodes.OK).json({
      success: true,
      data: orders,
      timeRange,
      startDate,
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
