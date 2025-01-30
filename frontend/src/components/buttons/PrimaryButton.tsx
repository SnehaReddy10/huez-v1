import { twMerge } from 'tailwind-merge';

function PrimaryButton({
  label,
  className = '',
  onClickHandler,
  disabled = false,
  type = 'button',
}: {
  label: string;
  className?: string;
  onClickHandler: any;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClickHandler}
      className={twMerge(
        `disabled:bg-[#999] disabled:cursor-not-allowed text-white bg-black-900 py-[2px] px-6 rounded-sm text-[0.65rem] ${className}`
      )}
    >
      {label}
    </button>
  );
}

export default PrimaryButton;
