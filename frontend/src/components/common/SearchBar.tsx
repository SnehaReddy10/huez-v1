import { IoSearchSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

function SearchBar({
  className = '',
  onChangeHandler,
}: {
  className?: string;
  onChangeHandler?: any;
}) {
  const navigate = useNavigate();
  return (
    <div
      className={twMerge(
        `flex items-center justify-center gap-2 text-black-900 bg-white rounded-full text-xs ${className}`
      )}
    >
      <input
        onClick={() => {
          navigate('/search');
        }}
        onChange={onChangeHandler}
        type="text"
        className={twMerge(`rounded-full focus-within:outline-none px-4`)}
        placeholder="Search"
      />
      <button className="rounded-e-full bg-black-900 p-2">
        <IoSearchSharp color="white" />
      </button>
    </div>
  );
}

export default SearchBar;
