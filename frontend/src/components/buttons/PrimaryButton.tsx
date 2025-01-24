import { twMerge } from 'tailwind-merge';

function PrimaryButton({
  label,
  className = '',
  onClickHandler,
}: {
  label: string;
  className?: string;
  onClickHandler: any;
}) {
  return (
    <button
      onClick={onClickHandler}
      className={twMerge(
        `text-white bg-black-900 py-[2px] px-6 rounded-sm text-[0.65rem] ${className}`
      )}
    >
      {label}
    </button>
  );
}

export default PrimaryButton;
