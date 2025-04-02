import { useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';

const Accordion = ({ title, children }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-md w-64 shadow-sm">
      <button
        className="flex justify-between items-center w-full p-2 font-semibold text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <IoChevronDown
          className={`transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && <div className="p-2 text-sm text-gray-600">{children}</div>}
    </div>
  );
};

export default Accordion;
