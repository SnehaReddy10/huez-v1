import React, { useState, useEffect } from 'react';
import {
  useStripe,
  useElements,
  AddressElement,
} from '@stripe/react-stripe-js';
import OrderDetails from '../OrderDetails';
import UserDetailsForm from './UserDetailsForm';
import PaymentForm from './PaymentForm';
import { useConfirmPaymentMutation } from '../../../store';
import { useNavigate } from 'react-router-dom';

export const CheckoutForm = ({ clientSecret }: { clientSecret: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [step, setStep] = useState<'customer' | 'payment'>('customer');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [addressData, setAddressData] = useState<any>(null);
  const [paymentAmount, setPaymentAmount] = useState<number | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [confirmPayment] = useConfirmPaymentMutation();

  useEffect(() => {
    if (stripe && clientSecret) {
      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        if (paymentIntent) {
          setPaymentAmount(paymentIntent.amount / 100);
          setPaymentIntentId(paymentIntent.id);
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
      name: 'Shipping Address',
      street: result.value.address.line1,
      city: result.value.address.city,
      state: result.value.address.state,
      country: result.value.address.country,
      postalCode: result.value.address.postal_code,
      isDefault: true,
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

      if (!paymentIntentId) {
        setMessage('Payment Intent ID is missing');
        return;
      }

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
        confirmParams: {
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
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        try {
          console.log('Payment intent ID:', paymentIntentId);
          await confirmPayment({
            paymentIntentId,
            address: addressData,
          }).unwrap();

          navigate('/order-confirmed', {
            state: {
              paymentIntentId,
              status: 'succeeded',
            },
          });
        } catch (apiError: any) {
          console.error('Error confirming payment with API:', apiError);
          setMessage(
            'Payment processed but confirmation failed. Please contact support.'
          );
        }
      } else {
        setMessage('Payment is still processing. Please wait...');
      }
    } catch (error: any) {
      setMessage(error.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex md:flex-row flex-col justify-center items-start w-full overflow-y-auto">
      <div className="w-full max-xl:p-6 xl:w-2/3 flex flex-col justify-start gap-8 h-full py-20">
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
      <div className="w-full md:w-1/3 h-full sticky top-0">
        <OrderDetails />
      </div>
    </div>
  );
};
