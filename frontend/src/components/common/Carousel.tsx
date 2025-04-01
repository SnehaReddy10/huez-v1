import { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function Carousel({
  totalItems,
  children,
}: {
  totalItems: number;
  children: any;
}) {
  const [index, setIndex] = useState(0);
  const [visibleItems, setVisibleCount] = useState(0);
  const itemWidth = window.innerWidth <= 600 ? 6 : 3; // Adjust item width based on screen size
  const totalCarouselWidth: number = totalItems * itemWidth;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setVisibleCount(2);
      } else if (window.innerWidth <= 900) {
        setVisibleCount(2);
      } else {
        setVisibleCount(5);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleRightArrowClick = () => {
    if (index * itemWidth < totalCarouselWidth - itemWidth) {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleLeftArrowClick = () => {
    if (index > 0) {
      setIndex((prevIndex) => prevIndex - 1);
    }
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

      <div className="w-2/3 overflow-hidden relative">
        <div
          className="flex gap-4 transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(-${index * itemWidth}rem)`,
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
