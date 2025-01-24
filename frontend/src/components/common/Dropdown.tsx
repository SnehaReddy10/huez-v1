import { useState } from 'react';

function Dropdown({ dropdownList }: any) {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="relative">
      <div
        onClick={() => setShowDropdown((c) => !c)}
        className="border-2 border-gray-200 p-[2px] px-2"
      >
        {selectedQuantity}
      </div>
      {showDropdown && (
        <div className="absolute inset-0 top-9">
          {dropdownList.map((x: any) => (
            <p
              onClick={() => {
                setSelectedQuantity(x);
                setShowDropdown(false);
              }}
              className="p-[2px] px-2 bg-white flex items-center justify-center border-b-2 border-gray-500"
            >
              {x}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
