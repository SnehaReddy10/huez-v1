import { Router } from 'express';
import {
  GetAllOffersController,
  CreateOfferController,
  GetOfferByIdController,
  UpdateOfferController,
  DeleteOfferController,
  ApplyOfferController,
} from '../controllers/offers';
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
offerRouter.post('/:offerId', ApplyOfferController);
offerRouter.put(
  '/:id',
  validateRequest(OfferUpdateSchema),
  UpdateOfferController
);
offerRouter.delete('/', DeleteOfferController);
