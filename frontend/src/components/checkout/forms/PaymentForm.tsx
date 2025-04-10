import { PaymentElement } from '@stripe/react-stripe-js';
import PrimaryButton from '../../buttons/primary-button/PrimaryButton';

function PaymentForm({
  handleSubmit,
  paymentAmount,
  setStep,
  isLoading,
  stripe,
  elements,
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  paymentAmount: number;
  setStep: (step: 'customer' | 'payment') => void;
  isLoading: boolean;
  stripe: any;
  elements: any;
}) {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="mb-4">
        <div className="mb-4 p-4 bg-gray-50 rounded-md">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Payment Amount:</span>
            <span className="text-lg font-bold">
              ${paymentAmount?.toFixed(2) || '0.00'}
            </span>
          </div>
        </div>
        <PaymentElement />
      </div>
      <div className="flex justify-between mt-4">
        <PrimaryButton
          type="button"
          label="Back"
          onClickHandler={() => setStep('customer')}
          className="w-max py-2 rounded-none uppercase text-[0.5rem] text-white font-medium tracking-wider bg-white border-black-900 border-2 text-black-900"
        />
        <PrimaryButton
          type="submit"
          label={isLoading ? 'Processing...' : 'Pay Now'}
          onClickHandler={handleSubmit}
          disabled={isLoading || !stripe || !elements}
          className="w-max py-2 rounded-none uppercase text-[0.5rem] text-white font-medium tracking-wider"
        />
      </div>
    </form>
  );
}

export default PaymentForm;
