import { useState } from 'react';
import { IoMdStar } from 'react-icons/io';
import PrimaryButton from '../buttons/primary-button/PrimaryButton';
import QuantityControlGroup from '../common/QuantityControlGroup';

export const MenuItem = ({ item, addProductToCart }: any) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="bg-white shadow-lg rounded-sm p-4 max-md:w-full w-64">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-full h-32 object-cover rounded-sm"
      />

      <div className="mt-3">
        <h3 className="text-gray-800 font-semibold text-xs">{item.name}</h3>
        <div className="mt-2 flex gap-2 justify-between items-center">
          <QuantityControlGroup
            item={{ menuItem: item, quantity }}
            decrementProductQuantity={() => setQuantity((x) => x - 1)}
            incrementProductQuantity={() => setQuantity((x) => x + 1)}
          />
          <PrimaryButton
            label="+ ADD"
            className="bg-black-900 px-4 py-1 rounded-md w-max text-[0.5rem] text-white font-semibold shadow-md hover:bg-[#E65A00] transition"
            onClickHandler={() =>
              addProductToCart({ menuItemId: item._id, quantity })
            }
          />
        </div>

        <div className="flex justify-between items-center mt-2">
          <span className="text-sm font-bold">${item.price}</span>
          <span className="font-medium flex gap-[1px] items-center text-sm">
            <span className="text-sm">
              <IoMdStar color="#cf5a58" />
            </span>
            {item.rating ?? 4}
          </span>
        </div>
      </div>
    </div>
  );
};
