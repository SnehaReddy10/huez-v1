import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function Carousel({
  totalItems,
  children,
}: {
  totalItems: number;
  children: any;
}) {
  const [index, setIndex] = useState(0);
  const itemWidth = 200;
  const visibleItems = 3;

  const handleRightArrowClick = () => {
    setIndex((prevIndex) =>
      prevIndex < totalItems - visibleItems ? prevIndex + 1 : 0
    );
  };

  const handleLeftArrowClick = () => {
    setIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : totalItems - visibleItems
    );
  };

  return (
    <div className="flex items-center justify-center w-screen selection:bg-transparent">
      {totalItems > visibleItems && (
        <button
          className="bg-gray-600 p-2 mr-4 rounded-md hover:cursor-pointer hover:bg-gray-700"
          onClick={handleLeftArrowClick}
        >
          <FaArrowLeft size={16} color="white" />
        </button>
      )}

      <div className="w-1/2 overflow-hidden relative">
        <div
          className="flex gap-4 transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(-${index * itemWidth}px)`,
          }}
        >
          {children}
        </div>
      </div>

      {totalItems > visibleItems && (
        <button
          className="bg-gray-600 p-2 ml-4 rounded-md hover:cursor-pointer hover:bg-gray-700"
          onClick={handleRightArrowClick}
        >
          <FaArrowRight size={16} color="white" />
        </button>
      )}
    </div>
  );
}

export default Carousel;
