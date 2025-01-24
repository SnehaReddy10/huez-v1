import { twMerge } from 'tailwind-merge';

function PrimaryInput({
  placeholder,
  className = '',
}: {
  placeholder: string;
  className?: string;
}) {
  return (
    <input
      type="text"
      className={twMerge(
        `border-[1px] p-1 rounded-sm border-[#A59D84] text-xs w-60 ${className}`
      )}
      placeholder={placeholder}
    />
  );
}

export default PrimaryInput;
