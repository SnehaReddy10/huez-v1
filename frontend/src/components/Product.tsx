import { FaShoppingCart } from 'react-icons/fa';
import PrimaryButton from './buttons/primary-button/PrimaryButton';
import { useState } from 'react';

const similarItems = [
  {
    name: 'healthy salad',
    price: 23,
    shortDescription: 'Vibrant Pasta',
    rating: '5.0',
    description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum quaerat ab placeat, labore ipsum perferendis.`,
    imageUrl:
      'https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Asparagus Wild',
    price: 23,
    shortDescription: 'Vibrant Pasta',
    rating: '5.0',
    description: `Lorem ipsum dolorerum eum.`,
    imageUrl:
      'https://images.pexels.com/photos/1860204/pexels-photo-1860204.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Asparagus Wild',
    price: 23,
    shortDescription: 'Vibrant Pasta',
    rating: '5.0',
    description: `Lorem ipsum dolor, sitore esse rerum eum.`,
    imageUrl:
      'https://images.pexels.com/photos/1860204/pexels-photo-1860204.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Asparagus Wild',
    price: 23,
    shortDescription: 'Vibrant Pasta',
    description: `Lorem ipsurum quaerat ab placeat, labore ipsum perferendis, ut voluptatibus cum nisi recusandae, m eum.`,
    rating: '5.0',
    imageUrl:
      'https://images.pexels.com/photos/1860204/pexels-photo-1860204.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

function Product() {
  const [currentItem, setCurrentitem] = useState(similarItems[0]);

  return (
    <div className="bg-white flex flex-col gap-4 justify-center items-center pb-10">
      <div className="max-w-screen-2xl relative flex gap-10">
        <div className="">
          <div className="h-64 text-3xl font-semibold bg-black-900 text-white translate-x-16 w-64 py-4 flex justify-center"></div>
          <img
            src={currentItem.imageUrl}
            alt=""
            className="absolute inset-0 top-6 left-8 rounded-full w-80 h-80 z-10"
          />
        </div>
        <div className="max-w-screen-lg p-20 text-black-900 flex flex-col gap-6 justify-center items-center">
          <h2 className="text-6xl font-bold">{currentItem.name}</h2>
          <p className="text-pretty text-gray-700">
            ${currentItem.description}
          </p>
          <div className="flex gap-8 w-full justify-between">
            <div>
              <p className="text-red-500 text-sm font-black selection:text-white">
                ${currentItem.price}
              </p>
              <p className="text-xxs">total payable</p>
            </div>
            <PrimaryButton
              label="Order now"
              className="bg-black-900 text-white font-semibold"
              onClickHandler={() => {}}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-24">
        {similarItems.map((x) => (
          <div
            onClick={() => setCurrentitem(x)}
            className="h-32 flex flex-col relative bg-black-900 text-white px-6 py-2 rounded-lg"
          >
            <div className="flex justify-between items-center">
              <img
                src={x.imageUrl}
                alt=""
                className="absolute w-20 h-20 rounded-full -translate-x-9 translate-y-5"
              />
              <p className="absolute end-6 mt-12 font-bold text-xs">
                ${x.price}
              </p>
            </div>
            <div className="flex flex-col gap-0 mb-2 mt-16">
              <p className="font-semibold text-sm">{x.name}</p>
              <span className="text-xxxs text-gray-300">
                {x.shortDescription}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xxxs font-bold">{x.rating}</span>
              <FaShoppingCart size={10} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
