import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function Carousel({ items }: { items: any }) {
  const [index, setIndex] = useState(0);

  const handleRightArrowClick = () => setIndex((x) => (x < 5 ? x + 1 : 0));
  const handleLeftArrowClick = () => setIndex((x) => (x > 0 ? x - 1 : 5));

  return (
    <div className="flex items-center justify-center selection:bg-transparent w-screen">
      <div
        className="bg-brown-600 p-2 mr-4 rounded-md  hover:cursor-pointer"
        onClick={handleLeftArrowClick}
      >
        <FaArrowLeft size={16} color="white" />
      </div>
      <div className="w-1/2 relative overflow-hidden">
        <div
          className="flex gap-2 transition-all ease-out"
          style={{
            transform: `translateX(-${index * 10}rem)`,
          }}
        >
          {items.map((x: any) => (
            <div className="relative inset-0 w-24 h-24">
              <img src={x.url} alt="" className="rounded-full w-24 h-24" />
              <span className="absolute inset-0 rounded-full bg-black-900 hover:opacity-30 opacity-0 transition-all ease" />
            </div>
          ))}
        </div>
      </div>
      <div
        className="bg-brown-600 ml-4 p-2 rounded-md hover:cursor-pointer"
        onClick={handleRightArrowClick}
      >
        <FaArrowRight size={16} color="white" />
      </div>
    </div>
  );
}

export default Carousel;
