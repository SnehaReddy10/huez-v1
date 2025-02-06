import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import TagButton from '../buttons/TagButton';
import QuantityControlGroup from '../common/QuantityControlGroup';

export function MenuItem({
  item,
  addProductToCart,
  className = '',
  align = 'left',
}: {
  item: any;
  addProductToCart: any;
  className?: string;
  align: 'left' | 'right';
}) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div
      className={twMerge(
        `relative m-4 flex w-full justify-between bg-slate-50 rounded-md ${className}`
      )}
    >
      <img
        src={item.imageUrl}
        alt={item._id.toString()}
        className="md:w-64 md:h-56"
      />
      <div className={`flex flex-col gap-4 p-4`}>
        <h3 className="text-xl font-semibold">{item.name}</h3>
        <p className="text-gray-700 text-xxs">{item.description}</p>
        <div className="flex gap-2">
          {item.tags.map((x: string) => (
            <TagButton
              onClick={() => {}}
              label={x}
              icon={null}
              isSelected={false}
              className="py-1 px-2 hover:border-gray-300 text-gray-700"
            />
          ))}
        </div>
        <div className="flex gap-4 ">
          <QuantityControlGroup
            item={{ menuItem: item, quantity }}
            decrementProductQuantity={() => setQuantity((x) => x - 1)}
            incrementProductQuantity={() => setQuantity((x) => x + 1)}
          />
          <div className="flex justify-between bg-black-900 items-center px-4 rounded-full py-1">
            <p className="text-white text-xs font-semibold pr-2 border-r-[1px] border-gray-500">
              ${item.price}
            </p>
            <span
              onClick={() =>
                addProductToCart({ menuItemId: item._id, quantity })
              }
              className="text-white flex items-center py-[2px] px-2 rounded-sm text-xs"
            >
              Add to order
            </span>
          </div>
        </div>
        {/* {item.quantityInCart > 0 && (
          <span
            className={`absolute rounded-sm bottom-0 ${
              align === 'left' ? 'right-0' : 'left-0'
            } bg-green-700 p-1 text-white text-xs`}
          >
            Added to cart
          </span>
        )} */}
      </div>
    </div>
  );
}
