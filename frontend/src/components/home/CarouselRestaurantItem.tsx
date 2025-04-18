import { FaStar, FaHeart, FaClock } from 'react-icons/fa';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { MdDeliveryDining } from 'react-icons/md';

export const CarouselRestaurantItem = ({ slide }: { slide: any }) => {
  const {
    imageUrl,
    restarantName,
    rating,
    time,
    numberOfratings = 25,
  }: {
    imageUrl: string;
    restarantName: string;
    rating: number;
    time: string;
    numberOfratings: number;
  } = slide;

  return (
    <div className="min-w-[100%] rounded-xl shadow-md overflow-hidden bg-white">
      <div className="w-[98%] relative">
        <img src={imageUrl} alt="Food" className="w-full h-32 object-cover" />
        <div className="absolute top-2 left-2 bg-white text-black text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <FaStar className="text-yellow-500 text-xs" />
          <span className="font-semibold text-xs">{rating}</span>
          <span className="text-gray-500 text-[10px]">{numberOfratings}+</span>
        </div>
        <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
          <FaHeart className="text-green-500 text-xs" />
        </div>
      </div>

      <div className="p-2 w-[95%]">
        <div className="flex items-center gap-1 font-semibold text-xs">
          {restarantName}
          <IoIosCheckmarkCircle className="text-blue-500 text-xs" />
        </div>

        <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
          <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
            <MdDeliveryDining className="text-xs" />
            Free delivery
          </div>
          |
          <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
            <FaClock className="text-xs text-gray-400" />
            {time}
          </div>
        </div>
      </div>
    </div>
  );
};
