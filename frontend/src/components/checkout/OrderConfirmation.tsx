import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../buttons/primary-button/PrimaryButton';
import { useState } from 'react';

const OrderConfirmation = () => {
  const [email] = useState('john.doe@gmail.com');
  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex justify-center items-center xl:px-20">
      <div className="w-full h-full max-w-5xl bg-white rounded-lg flex overflow-hidden">
        <div className="flex flex-col justify-around">
          <div className="flex flex-col">
            <h1 className="text-2xl">Thank you for shopping with Huez.</h1>
            <p className="text-2xl">You’ve made a great choice</p>
            <p className="text-xs text-gray-500 mt-6">
              Confirmation letter has been sent to{' '}
              <span className="font-medium">{email}</span>
            </p>
          </div>

          <div>
            <div className="mt-6 text-xs text-gray-600 xl:w-1/3">
              <p>Hello, John Doe.</p>
              <p className="mt-2 text-justify">
                Your order has been successfully completed and will be delivered
                to you in the near future. You can track the delivery status in
                the Personal Account. You could also receive a notification with
                a link to track the parcel from our partner DHL.
              </p>
            </div>

            <div className="flex justify-between mt-6">
              <span className="tracking-tight text-gray-600 text-xs font-medium">
                HUEZ
              </span>
              <PrimaryButton
                label={'Back to Home'}
                onClickHandler={() => {
                  navigate('/');
                }}
                className="w-max py-2 rounded-none uppercase text-[0.5rem] text-black-900 font-medium tracking-wider bg-white border-2 border-black-900"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
