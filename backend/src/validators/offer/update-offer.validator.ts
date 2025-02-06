import { CreateOfferSchema } from './create-offer.validator';

export const OfferUpdateSchema = CreateOfferSchema.partial();
