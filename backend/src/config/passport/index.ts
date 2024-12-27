import passport from 'passport';
import { googleStrategy } from './strategies/google.strategy';
import { jwtStrategy } from './strategies/jwt.strategy';

passport.use(googleStrategy);
passport.use(jwtStrategy);

passport.serializeUser(function (user: any, done: any) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done: any) {
  done(null, user);
});

export default passport;
