import { IoSearchSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { useEffect, useRef } from 'react';

function SearchBar({
  className = '',
  onChangeHandler,
  autoFocus = false,
  inputClassName = '',
  buttonClassName = '',
  iconColor = 'white',
}: {
  className?: string;
  onChangeHandler?: any;
  autoFocus?: boolean;
  inputClassName?: string;
  buttonClassName?: string;
  iconColor?: string;
}) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div
      onClick={() => {
        navigate('/search');
      }}
      className={twMerge(
        `flex items-center h-8 justify-center text-black-900 bg-white rounded-full text-xs ${className}`
      )}
    >
      <input
        ref={inputRef}
        onChange={onChangeHandler}
        type="text"
        className={twMerge(
          `rounded-full focus-within:outline-none px-4 ${inputClassName}`
        )}
        placeholder="Search"
      />
      <button
        className={twMerge(
          `rounded-e-full bg-black-900 p-2 ${buttonClassName}`
        )}
      >
        <IoSearchSharp color={iconColor} size={25} />
      </button>
    </div>
  );
}

export default SearchBar;
