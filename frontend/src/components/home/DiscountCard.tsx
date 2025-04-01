import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../buttons/primary-button/PrimaryButton';
import PrimaryInput from '../inputs/PrimaryInput';
import { useState } from 'react';

function DiscountCard() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  return (
    <div className="h-64 bg-cover flex flex-col gap-4 justify-center items-center bg-[url('https://images.unsplash.com/photo-1625604087024-7fb428fc4626?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGRhcmslMjBmb29kJTIwcGhvdG9ncmFwaHl8ZW58MHwwfDB8fHww')] w-[80%] rounded-lg">
      <h1 className="text-white text-xl font-bold md:w-[30%] text-center p-1">
        Join our Membership and Get a Discount of Up to 30%!
      </h1>
      <div className="w-min max-w-sm bg-white rounded-full px-1 py-1 flex">
        <PrimaryInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className="w-min max-sm:max-w-26 px-2 md:px-6 py-[2px] md:py-1 rounded-full border-0 focus-within:outline-none"
        />
        <PrimaryButton
          label="Sign In"
          onClickHandler={() => {
            navigate('/login', { state: { email } });
          }}
          className="md:py-2 rounded-full bg-orange-500 w-max"
        />
      </div>
    </div>
  );
}

export default DiscountCard;
