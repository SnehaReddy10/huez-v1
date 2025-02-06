import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function Carousel({ items }: { items: { url: string }[] }) {
  const [index, setIndex] = useState(0);
  const itemWidth = 6 * 4;
  const totalItems = items.length;

  const handleRightArrowClick = () => {
    setIndex((prevIndex) => (prevIndex < totalItems - 1 ? prevIndex + 1 : 0));
  };

  const handleLeftArrowClick = () => {
    setIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : totalItems - 1));
  };

  return (
    <div className="flex items-center justify-center w-screen selection:bg-transparent">
      <button
        className="bg-gray-600 p-2 mr-4 rounded-md hover:cursor-pointer hover:bg-gray-700"
        onClick={handleLeftArrowClick}
      >
        <FaArrowLeft size={16} color="white" />
      </button>

      <div className="w-1/2 overflow-hidden relative">
        <div
          className="flex gap-4 transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(-${index * itemWidth}px)`,
          }}
        >
          {items.map((x, idx) => (
            <div key={idx} className="relative w-24 h-24 shrink-0">
              <img
                src={x.url}
                alt={`Item ${idx}`}
                className="rounded-full w-24 h-24 object-cover"
              />
              <span className="absolute inset-0 rounded-full bg-black-900 opacity-0 hover:opacity-30  transition-all ease-in" />
            </div>
          ))}
        </div>
      </div>

      <button
        className="bg-gray-600 p-2 ml-4 rounded-md hover:cursor-pointer hover:bg-gray-700"
        onClick={handleRightArrowClick}
      >
        <FaArrowRight size={16} color="white" />
      </button>
    </div>
  );
}

export default Carousel;
