import React, { useState, useEffect } from 'react';
import {
  useStripe,
  useElements,
  AddressElement,
} from '@stripe/react-stripe-js';
import OrderDetails from '../OrderDetails';
import UserDetailsForm from './UserDetailsForm';
import PaymentForm from './PaymentForm';

export const CheckoutForm = ({ clientSecret }: { clientSecret: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [step, setStep] = useState<'customer' | 'payment'>('customer');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [addressData, setAddressData] = useState<any>(null);
  const [paymentAmount, setPaymentAmount] = useState<number | null>(null);

  useEffect(() => {
    if (stripe && clientSecret) {
      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        if (paymentIntent) {
          setPaymentAmount(paymentIntent.amount / 100);
        }
      });
    }
  }, [stripe, clientSecret]);

  const handleCustomerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !customerEmail) {
      setMessage('Please provide your name and email');
      return;
    }

    const addressElement = elements?.getElement(AddressElement);
    if (!addressElement) {
      setMessage('Address element not found');
      return;
    }

    const result = await addressElement.getValue();
    if (!result.complete) {
      setMessage('Please complete the address form');
      return;
    }

    const formattedAddress = {
      street: result.value.address.line1,
      city: result.value.address.city,
      state: result.value.address.state,
      country: result.value.address.country,
      postalCode: result.value.address.postal_code,
    };

    setAddressData(formattedAddress);
    setStep('payment');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    try {
      if (!addressData) {
        setMessage('Address information is missing');
        return;
      }

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/order-confirmed`,
          payment_method_data: {
            billing_details: {
              name: customerName,
              email: customerEmail,
              address: {
                line1: addressData.street,
                city: addressData.city,
                state: addressData.state,
                country: addressData.country,
                postal_code: addressData.postalCode,
              },
            },
          },
        },
      });

      if (error) {
        setMessage(error.message || 'An error occurred during payment.');
      } else {
        setMessage('Payment successful!');
      }
    } catch (error: any) {
      setMessage(error.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-row justify-center items-start w-full overflow-y-auto">
      <div className="w-full max-xl:p-10 xl:w-2/3 flex flex-col justify-start gap-8 h-full py-20">
        <div className="xl:px-32 flex flex-col gap-8">
          <h2 className="text-xl font-semibold">
            {step === 'customer'
              ? 'Who is placing this order?'
              : 'How would you like to pay?'}
          </h2>

          {step === 'customer' ? (
            <UserDetailsForm
              handleCustomerSubmit={handleCustomerSubmit}
              message={message || ''}
              customerName={customerName}
              setCustomerName={setCustomerName}
              customerEmail={customerEmail}
              setCustomerEmail={setCustomerEmail}
            />
          ) : (
            <PaymentForm
              handleSubmit={handleSubmit}
              paymentAmount={paymentAmount ?? 0}
              setStep={setStep}
              isLoading={isLoading}
              stripe={stripe}
              elements={elements}
            />
          )}

          {message && (
            <div className="p-4 mt-4 text-sm text-red-700 bg-red-100 rounded-md">
              {message}
            </div>
          )}
        </div>
      </div>
      <div className="w-1/3 h-full sticky top-0">
        <OrderDetails />
      </div>
    </div>
  );
};
