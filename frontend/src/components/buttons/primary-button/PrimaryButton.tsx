import { twMerge } from 'tailwind-merge';

function PrimaryButton({
  label,
  className = '',
  onClickHandler,
  disabled = false,
  type = 'button',
  icon,
}: {
  label: string;
  className?: string;
  onClickHandler: any;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClickHandler}
      className={twMerge(
        `flex gap-2 items-center justify-center disabled:bg-[#999] disabled:cursor-not-allowed text-white bg-black-900 py-[2px] px-6 rounded-sm text-[0.65rem] ${className}`
      )}
    >
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </button>
  );
}

export default PrimaryButton;
