import { FaMapMarkerAlt } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { IoCartOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export const HomeTopBar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex text-sm items-center justify-between px-4 py-2 bg-white shadow-sm border-[2px] border-gray-100">
      <div className="flex items-center gap-2">
        <FaMapMarkerAlt className="text-orange00 text-base" />
        <div>
          <p className="text-xxs text-gray-500">Delivery To</p>
          <div className="flex items-center gap-1">
            <p className="font-medium text-xs">Banasree, B-Block</p>
            <div>
              <IoIosArrowDown className="text-gray-600 text-xs" />
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <IoCartOutline
          className="text-xl"
          onClick={() => {
            navigate('/cart');
          }}
        />
        <span className="absolute text-xxs -top-1 -right-1 bg-red-500 text-white rounded-full w-3 h-3 flex items-center justify-center">
          2
        </span>
      </div>
    </div>
  );
};
