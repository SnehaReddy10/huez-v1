import { Router } from 'express';
import {
  SignupController,
  SignInController,
  GoogleLoginController,
} from '../controllers/auth';
import passport from '../config/passport';
import { passportMiddleware } from '../middlewares/passport.middleware';

export const authRouter = Router();

authRouter.post('/signup', SignupController);
authRouter.post('/signin', SignInController);

authRouter.use(passportMiddleware);

//google
authRouter.get(
  '/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })
);

authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/api/v1/auth/failed',
    successRedirect: '/api/v1/auth/success',
  })
);

authRouter.get('/failed', (req, res) => {
  res.send({ success: false });
});

authRouter.get('/success', GoogleLoginController);
