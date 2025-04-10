import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetPaymentStatusQuery } from '../../store/payment/paymentApi';

const PaymentStatus = () => {
  const location = useLocation();
  const [status, setStatus] = useState<string | null>(null);
  const [customerEmail, setCustomerEmail] = useState<string | null>(null);

  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get('session_id');

  const { data, isLoading, error } = useGetPaymentStatusQuery(
    { sessionId: sessionId || '' },
    { skip: !sessionId }
  );

  useEffect(() => {
    if (data) {
      setStatus(data.status);
      setCustomerEmail(data.customer_email);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking payment status...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600">
            Error checking payment status. Please try again.
          </p>
        </div>
      </div>
    );
  }

  if (!status) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">No payment status available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Payment {status}</h2>
        {customerEmail && (
          <p className="text-gray-600">
            A confirmation email has been sent to {customerEmail}
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentStatus;
