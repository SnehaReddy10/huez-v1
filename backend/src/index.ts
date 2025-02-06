import { dbConfig } from './config/db/db.config';
import dotenv from 'dotenv';

dotenv.config({ path: `.env.development.local` });
dbConfig.init();

import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth.router';
import { userRouter } from './routes/user.router';
import { session } from './config/session';
import passport from './config/passport';
import { restaurantRouter } from './routes/restaurant.route';
import { cartRouter } from './routes/cart.router';
import { authMiddleware } from './middlewares/auth.middleware';
import { productRouter } from './routes/product.router';
import { offerRouter } from './routes/offer.router';

const app = express();

app.use(cors());
app.use(express.json());
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/auth', authRouter);

app.use(authMiddleware);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/offers', offerRouter);
app.use('/api/v1/user', userRouter);

app.use('/api/v1/restaurant', restaurantRouter);
app.use('/api/v1/cart', cartRouter);

app.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}`);
});
