import { z } from 'zod';

export const CreateOfferSchema = z.object({
  name: z.string().min(3, 'Offer name must be at least 3 characters long'),
  discount: z.enum(['Buy 1 Get 1', 'Percentage Off']),
  value: z.number().optional(),
  image: z.string().url('Invalid image URL'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters long'),
});
