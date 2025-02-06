import { Router } from 'express';
import { GetAllOffersController } from '../controllers/offers/get-all-offers.controller';
import { CreateOfferController } from '../controllers/offers/create-offer.controller';
import { GetOfferByIdController } from '../controllers/offers/get-offer-by-id.controller';
import { UpdateOfferController } from '../controllers/offers/update-offer.controller';
import { DeleteOfferController } from '../controllers/offers/delete-offer.controller';
import { CreateOfferSchema } from '../validators/offer/create-offer.validator';
import { validateRequest } from '../middlewares/validator.middleware';
import { OfferUpdateSchema } from '../validators/offer/update-offer.validator';

export const offerRouter = Router();

offerRouter.get('/:id', GetOfferByIdController);

offerRouter.get('/', GetAllOffersController);
offerRouter.post(
  '/',
  validateRequest(CreateOfferSchema),
  CreateOfferController
);
offerRouter.put(
  '/:id',
  validateRequest(OfferUpdateSchema),
  UpdateOfferController
);
offerRouter.delete('/', DeleteOfferController);
