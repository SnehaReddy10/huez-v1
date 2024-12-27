import { Router } from 'express';
import { SignupController } from '../controllers/auth/signup.controller';
import { SignInController } from '../controllers/auth/signin-controller';
import passport from '../config/passport';
import { passportMiddleware } from '../middlewares/passport.middleware';
import { GoogleLoginController } from '../controllers/auth/google-login.controller';

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
