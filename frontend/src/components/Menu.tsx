import { useState } from 'react';
import TagButton from './buttons/TagButton';
import { twMerge } from 'tailwind-merge';
import { IoRemoveCircleOutline, IoAddCircleOutline } from 'react-icons/io5';
import { useAddToCartMutation, useGetProductsQuery } from '../store';

const tags = [
  {
    id: 1,
    label: 'All Menu',
  },
  {
    id: 2,
    label: 'Main Course',
  },
  {
    id: 3,
    label: 'Desserts',
  },
  {
    id: 4,
    label: 'Drinks',
  },
  {
    id: 5,
    label: 'Asian',
  },
  {
    id: 6,
    label: 'Chinese',
  },
];

function Menu() {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [addProduct, addProductResults] = useAddToCartMutation();
  const { data: items, isSuccess, isFetching, error } = useGetProductsQuery({});

  return (
    <div className="w-full selection:bg-transparent">
      <div className="flex gap-2 p-4 items-center justify-center">
        {tags.map((x) => (
          <TagButton
            label={x.label}
            key={x.id}
            icon={null}
            isSelected={x.id === selectedIndex}
            onClick={() => setSelectedIndex(x.id)}
          />
        ))}
      </div>
      <div className="grid 2xl:grid-cols-2">
        {items?.data?.map((x: any, i: number) => (
          <div key={x.id}>
            {i % 2 === 0 && (
              <div key={x.id} className="mr-8">
                <MenuItem addProductToCart={addProduct} item={x} />
              </div>
            )}
            {i % 2 !== 0 && (
              <div key={x.id} className="flex justify-end items-end">
                <MenuItem
                  addProductToCart={addProduct}
                  item={x}
                  className="flex-row-reverse"
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="2xl:w-[40%]"></div>
    </div>
  );
}

function MenuItem({
  item,
  addProductToCart,
  className = '',
}: {
  item: any;
  addProductToCart: any;
  className?: string;
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
      <div className="flex flex-col gap-4 p-4">
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
          <div className="flex gap-2 items-center justify-center">
            <span className="text-black hover:text-white hover:bg-black-900 rounded-full transition-all ease-in">
              <IoRemoveCircleOutline
                size={35}
                onClick={() => setQuantity((x) => (x > 1 ? x - 1 : x))}
              />
            </span>
            <p className="text-xs font-bold">{quantity}</p>
            <span className="text-black hover:text-white hover:bg-black-900 rounded-full transition-all ease-in">
              <IoAddCircleOutline
                size={35}
                onClick={() => setQuantity((x) => x + 1)}
                fill="white"
              />
            </span>
          </div>
          <div className="flex justify-between bg-black-900 items-center px-4 rounded-full py-1">
            <p className="text-white text-xs font-semibold pr-2 border-r-[1px] border-gray-500">
              ${item.price}
            </p>
            <span
              onClick={() =>
                addProductToCart({ menuItemId: item.id, quantity })
              }
              className="text-white flex items-center py-[2px] px-2 rounded-sm text-xs"
            >
              Add to order
            </span>
          </div>
        </div>
        {/* <span className="absolute right-0 bottom-0 text-xs p-1 rounded-sm font-semibold bg-green-700 text-white">
          1 {item.name} Added to cart
        </span> */}
      </div>
    </div>
  );
}

export default Menu;
