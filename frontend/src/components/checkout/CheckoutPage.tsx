import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useCreatePaymentIntentMutation } from '../../store';
import { CheckoutForm } from './forms/CheckoutForm';
import { StripeProvider } from '../../stripe/StripeProvider';

const CheckoutPage = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const paymentIntentCreated = useRef(false);
  const location = useLocation();
  const cartData = location.state?.cart;
  const [createPaymentIntent, { isLoading, error }] =
    useCreatePaymentIntentMutation();

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        if (!cartData?.data || paymentIntentCreated.current) {
          return;
        }

        paymentIntentCreated.current = true;
        const amount = Math.round(cartData.data.totalPrice * 100); // Convert to cents

        const result = await createPaymentIntent({
          amount,
          currency: 'usd',
          cartId: cartData.data._id,
        }).unwrap();

        setClientSecret(result.clientSecret);
      } catch (error) {
        console.error('Error creating payment intent:', error);
        paymentIntentCreated.current = false;
      }
    };

    fetchClientSecret();
  }, [cartData]);

  if (!cartData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600">
            No cart data available. Please return to cart.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Creating payment intent...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600">
            Error creating payment intent. Please try again.
          </p>
        </div>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payment form...</p>
        </div>
      </div>
    );
  }

  return (
    <StripeProvider clientSecret={clientSecret}>
      <CheckoutForm clientSecret={clientSecret} />
    </StripeProvider>
  );
};

export default CheckoutPage;
