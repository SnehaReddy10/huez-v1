import { z } from 'zod';
import { MenuItemCategory, Cuisine } from '../../constants/enums/menu-item';

export const menuItemSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  price: z.number().positive('Price must be greater than 0'),
  imageUrl: z.string(),
  restaurant: z.string().regex(/^[a-fA-F0-9]{24}$/, 'Invalid restaurant ID'),
  category: z.nativeEnum(MenuItemCategory, { message: 'Invalid category' }),
  cuisine: z.nativeEnum(Cuisine, { message: 'Invalid cuisine' }),
  isVeg: z.boolean().optional(),
  isVegan: z.boolean().optional(),
  inStock: z.number().nonnegative('Stock must be a non-negative number'),
  calories: z.number().nonnegative('Calories must be a non-negative number'),
});
