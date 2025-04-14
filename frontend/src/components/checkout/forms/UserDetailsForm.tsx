import { AddressElement } from '@stripe/react-stripe-js';
import PrimaryButton from '../../buttons/primary-button/PrimaryButton';
import TertiaryInput from '../../inputs/TertiaryInput';

function UserDetailsForm({
  handleCustomerSubmit,
  message,
  customerName,
  setCustomerName,
  customerEmail,
  setCustomerEmail,
}: {
  handleCustomerSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  message: string;
  customerName: string;
  setCustomerName: (value: string) => void;
  customerEmail: string;
  setCustomerEmail: (value: string) => void;
}) {
  return (
    <form onSubmit={handleCustomerSubmit} className="flex flex-col gap-4">
      <TertiaryInput
        error={message || undefined}
        innerRef={{
          value: customerName,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            setCustomerName(e.target.value),
        }}
        required={true}
        placeholder="John Doe"
        label="Full Name"
        labelClassName="text-start w-full"
        inputClassName="text-start"
      />
      <TertiaryInput
        error={message || undefined}
        innerRef={{
          value: customerEmail,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            setCustomerEmail(e.target.value),
        }}
        required={true}
        placeholder="john.doe@gmail.com"
        label="Email"
        labelClassName="text-start w-full"
        inputClassName="text-start"
      />
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
        <AddressElement
          options={{
            mode: 'shipping',
            defaultValues: {
              address: {
                country: 'US',
              },
            },
          }}
        />
      </div>
      <PrimaryButton
        type="submit"
        label="Continue to Payment"
        onClickHandler={handleCustomerSubmit}
        className="w-max py-2 rounded-none uppercase text-[0.5rem] text-white font-medium tracking-wider md:mt-4"
      />
    </form>
  );
}

export default UserDetailsForm;
