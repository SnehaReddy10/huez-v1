import { useState } from 'react';
import TagButton from './buttons/TagButton';
import { twMerge } from 'tailwind-merge';
import { IoRemoveCircleOutline, IoAddCircleOutline } from 'react-icons/io5';
const items = [
  {
    id: 1,
    url: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'Pasta Primavera',
    description:
      'A delicious pasta dish with fresh vegetables and a light tomato sauce.',
    price: 12.99,
    calories: 450,
    tags: ['vegetarian'],
  },
  {
    id: 2,
    url: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'Berry Smoothie Bowl',
    description:
      'A refreshing bowl of blended berries topped with granola and fresh fruits.',
    price: 8.99,
    calories: 320,
    tags: ['vegan', 'gluten-free'],
  },
  {
    id: 3,
    url: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'Avocado Toast',
    description:
      'Crispy toast topped with creamy avocado and a sprinkle of spices.',
    price: 7.49,
    calories: 280,
    tags: ['vegan', 'healthy'],
  },
  {
    id: 4,
    url: 'https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'Chocolate Cake',
    description:
      'Rich and moist chocolate cake with layers of creamy frosting.',
    price: 6.99,
    calories: 650,
    tags: ['vegetarian', 'dessert'],
  },
  {
    id: 5,
    url: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'Grilled Chicken Salad',
    description:
      'A healthy salad with grilled chicken, fresh greens, and a tangy dressing.',
    price: 10.99,
    calories: 350,
    tags: ['non-veg', 'healthy'],
  },
  {
    id: 6,
    url: 'https://images.pexels.com/photos/803963/pexels-photo-803963.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'Cheese Pizza',
    description: 'Classic pizza with a crispy crust and gooey melted cheese.',
    price: 9.99,
    calories: 720,
    tags: ['vegetarian', 'comfort-food'],
  },
  {
    id: 7,
    url: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'Strawberry Pancakes',
    description: 'Fluffy pancakes topped with fresh strawberries and syrup.',
    price: 8.49,
    calories: 540,
    tags: ['vegetarian', 'dessert', 'breakfast'],
  },
  {
    id: 8,
    url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'Sushi Platter',
    description:
      'An assortment of fresh sushi rolls and sashimi, served with soy sauce.',
    price: 15.99,
    calories: 400,
    tags: ['non-veg', 'asian', 'gluten-free'],
  },
];

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

  return (
    <div className="w-full">
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
        {items.map((x, i) => (
          <div key={x.id}>
            {i % 2 === 0 && (
              <div key={x.id} className="mr-8">
                <MenuItem item={x} />
              </div>
            )}
            {i % 2 !== 0 && (
              <div key={x.id} className="flex justify-end items-end">
                <MenuItem item={x} className="flex-row-reverse" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="2xl:w-[40%]"></div>
    </div>
  );
}

function MenuItem({ item, className = '' }: { item: any; className?: string }) {
  const [quantity, setQuantity] = useState(1);
  return (
    <div
      className={twMerge(
        `m-4 flex w-full justify-between bg-slate-50 rounded-md ${className}`
      )}
    >
      <img
        src={item.url}
        alt={item.id.toString()}
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
                onClick={() => setQuantity((x) => x - 1)}
              />
            </span>
            <p className="text-xs font-bold">{quantity}</p>
            {/* <Dropdown dropdownList={[1, 2, 3, 4]} /> */}
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
            <span className="text-white flex items-center py-[2px] px-2 rounded-sm text-xs">
              Add to order
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
