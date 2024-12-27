import { z } from 'zod';

export const createRestaurantSchema = z.object({
  name: z.string().min(1, { message: 'Restaurant name is required' }),
  address: z.string().min(1, { message: 'Restaurant address is required' }),
  coordinates: z
    .array(z.number())
    .length(2, { message: 'Coordinates should have exactly 2 values' }),
  cuisine: z.array(z.string()).optional(),
  menu: z.array(z.string()).optional(),
});
