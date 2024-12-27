import { User } from '../models/user.model'; // Adjust path to your User model

declare global {
  namespace Express {
    interface User {
      _id: string;
      name: string;
      username: string;
      email: string;
      role: string;
      authProvider: string;
      restaurants: string[]; // Adjust as needed
      createdAt: Date;
      __v?: number;
    }

    interface Request {
      user?: User; // Add user to Request
    }
  }
}
