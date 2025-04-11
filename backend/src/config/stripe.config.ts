import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  console.error('Stripe secret key is not defined in environment variables');
}

const API_VERSION = '2025-03-31.basil';
const stripe = new Stripe(stripeSecretKey || '', {
  apiVersion: API_VERSION,
});

console.log('Stripe successfully initialized with API version:', API_VERSION);

export { stripe };
