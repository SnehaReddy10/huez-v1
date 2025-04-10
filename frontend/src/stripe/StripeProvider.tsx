import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

interface Props {
  children: React.ReactNode;
  clientSecret: string;
}

export const StripeProvider = ({ children, clientSecret }: Props) => {
  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#000000',
      colorBackground: '#ffffff',
      colorText: '#000000',
      colorDanger: '#ef4444',
      fontFamily:
        'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      spacingUnit: '4px',
      borderRadius: '0',
    },
    rules: {
      '.Input': {
        border: 'none',
        borderBottom: '2px solid #d1d5db',
        borderRadius: '0',
        padding: '0.5rem 0',
        fontSize: '0.75rem',
        lineHeight: '1rem',
        color: '#000000',
        backgroundColor: 'transparent',
        fontWeight: '700',
        textAlign: 'start',
      },
      '.Input:focus': {
        borderBottom: '2px solid #000000',
        boxShadow: 'none',
      },
      '.Label': {
        fontSize: '0.54rem',
        fontWeight: '400',
        color: '#000000',
        marginBottom: '0.25rem',
        textTransform: 'uppercase',
        textAlign: 'start',
      },
      '.Error': {
        fontSize: '0.54rem',
        color: '#ef4444',
        marginTop: '0.25rem',
      },
      '.Tab': {
        padding: '0.5rem 0',
        fontSize: '0.75rem',
        color: '#6b7280',
        fontWeight: '400',
      },
      '.Tab:hover': {
        color: '#000000',
      },
      '.Tab--selected': {
        color: '#000000',
        borderBottom: '2px solid #000000',
      },
      '.Input::placeholder': {
        color: '#6b7280',
        fontWeight: '400',
      },
      '.Input:not(:placeholder-shown)': {
        color: '#000000',
        fontWeight: '700',
      },
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
};
