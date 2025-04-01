import React from 'react';
import { twMerge } from 'tailwind-merge';

function PrimaryInput({
  placeholder,
  value,
  className = '',
  onChange,
}: {
  placeholder: string;
  value: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type="text"
      value={value}
      className={twMerge(
        `border-[1px] p-1 rounded-sm border-[#A59D84] text-xs w-60 ${className}`
      )}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

export default PrimaryInput;
