import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  console.error('Stripe secret key is not defined in environment variables');
}

const stripe = new Stripe(stripeSecretKey || '', {
  apiVersion: '2025-03-31.basil',
});

export { stripe };
