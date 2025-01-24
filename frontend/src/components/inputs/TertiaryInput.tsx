import { twMerge } from 'tailwind-merge';

function TertiaryInput({
  placeholder,
  label = '',
  type = 'text',
  className = '',
  labelClassName = '',
}: {
  placeholder: string;
  label?: string;
  type?: string;
  className?: string;
  labelClassName?: string;
}) {
  return (
    <div className="flex flex-col gap-1 justify-center items-center w-full">
      <label
        htmlFor={placeholder}
        className={twMerge(`text-xxs uppercase ${labelClassName}`)}
      >
        {label}
      </label>
      <input
        type={type}
        className={twMerge(
          `input-reset text-center text-xs font-bold border-b-2 placeholder:font-normal focus:outline-none w-full border-gray-300 ${className}`
        )}
        placeholder={placeholder}
      />
    </div>
  );
}

export default TertiaryInput;
