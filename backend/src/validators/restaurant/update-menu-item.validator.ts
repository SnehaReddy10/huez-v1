import { z } from 'zod';

export const updateMenuItemSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  category: z.string().optional(),
  cuisine: z.string().optional(),
  isVeg: z.boolean().optional(),
  inStock: z.number().optional(),
});
