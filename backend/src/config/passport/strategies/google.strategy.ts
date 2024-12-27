import { Strategy } from 'passport-google-oauth2';

export const googleStrategy = new Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: `${process.env.HOST_URL}/api/v1/auth/google/callback`,
    passReqToCallback: true,
  },
  function (
    request: any,
    accessToken: any,
    refreshToken: any,
    profile: any,
    done: any
  ) {
    return done(null, profile);
  }
);
