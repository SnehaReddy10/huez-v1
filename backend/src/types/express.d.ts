import { User } from 'src/models/User.model';

declare global {
  namespace Express {
    interface User {
      _id: string;
      name: string;
      username: string;
      email: string;
      role: string;
      authProvider: string;
      restaurants: string[];
      createdAt: Date;
      __v?: number;
    }

    interface Request {
      user?: User;
      orderId?: string;
      paymentIntentId?: string;
      clientSecret?: string;
    }
  }
}
