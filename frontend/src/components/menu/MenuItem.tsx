import { IoCartOutline, IoChevronBackOutline } from 'react-icons/io5';
import { BsDot } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import QuantityControlGroup from '../common/QuantityControlGroup';
import PrimaryButton from '../buttons/primary-button/PrimaryButton';
import RadioInput from '../inputs/RadioInput';
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import { useState } from 'react';
import Carousel from '../common/Carousel';
import {
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
  useAddToCartMutation,
} from '../../store';
import { MenuSkeletonLoader } from '../loaders/MenuSkeletonLoader';

interface AddOn {
  name: string;
  price: number;
  icon: string;
  selected?: boolean;
}

interface MenuItem {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  description?: string;
  category?: string;
}

function MenuItem() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetProductByIdQuery(id);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addToCart] = useAddToCartMutation();

  const { data: relatedProducts } = useGetProductsByCategoryQuery(
    {
      category: product?.data?.category,
    },
    {
      skip: !product?.data?.category,
    }
  );

  const addOns: AddOn[] = [
    { name: 'Pepper julienned', price: 2.3, icon: '🌶️', selected: true },
    { name: 'Baby spinach', price: 2.3, icon: '🌿' },
    { name: 'Mushroom', price: 2.3, icon: '🍄' },
  ];

  if (isLoading) {
    return <MenuSkeletonLoader />;
  }

  if (error || !product?.data) {
    return (
      <div className="p-4 text-center text-red-500">
        Failed to load product details
      </div>
    );
  }

  const handleAddToCart = async () => {
    try {
      await addToCart({
        menuItemId: product?.data?._id,
        quantity,
      }).unwrap();
      navigate('/cart');
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const relatedItems =
    relatedProducts?.data?.slice(0, 3).map((item: MenuItem) => ({
      name: item.name,
      image: item.imageUrl,
      bgColor: 'bg-rose-50',
    })) || [];

  return (
    <div className="h-screen bg-white flex flex-col">
      <div className="z-10 bg-white/80 backdrop-blur-md relative md:hidden flex">
        <div className="fixed w-full max-w-xl mx-auto p-4">
          <div className="flex justify-between items-center">
            <button
              className="p-2 bg-white rounded-full flex items-center justify-center shadow-md"
              onClick={() => navigate(-1)}
            >
              <IoChevronBackOutline className="text-lg" />
            </button>
            <div className="relative bg-white rounded-full p-2">
              <IoCartOutline
                className="text-lg"
                onClick={() => {
                  navigate('/cart');
                }}
              />
              <span className="absolute text-xxs top-1 right-1 bg-red-500 text-white rounded-full w-3 h-3 flex items-center justify-center">
                2
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full">
        <div className="w-[100%] aspect-[4/3] bg-[#f8f8f8]">
          <img
            src={product?.data?.imageUrl}
            alt={product?.data?.name}
            className="w-[100%] aspect-[4/3] object-cover"
          />
        </div>
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1">
          {[...Array(4)].map((_, i) => (
            <BsDot
              key={i}
              className={`text-2xl ${i === 0 ? 'text-white' : 'text-white/50'}`}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-white">
        <div className="max-w-md mx-auto">
          <div className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  {product?.data?.name}
                </h1>
                <p className="text-gray-600 text-sm mb-3">
                  {product?.data?.description}
                </p>
                <p className="text-[1.0625rem] font-bold text-green-500">
                  ${product?.data?.price}
                </p>
              </div>
              <button
                onClick={() => setIsFavorite((e) => !e)}
                className="mt-1 p-1 bg-white shadow-xl shadow-gray-300 rounded-full"
              >
                {isFavorite ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart />
                )}
              </button>
            </div>

            <div className="py-3 border-y-[0.5px] border-gray-200">
              <h2 className="text-base font-bold text-gray-900">
                Add more items
              </h2>
              <div>
                {addOns.map((addon, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-1 py-3 rounded-xl"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{addon.icon}</span>
                      <span className="text-[0.9375rem] text-gray-700">
                        {addon.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[0.875rem] text-gray-500">
                        +${addon.price.toFixed(2)}
                      </span>
                      <RadioInput
                        label=""
                        name="addon"
                        value={addon.name}
                        defaultChecked={addon.selected}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {relatedItems.length > 0 && (
              <div className="py-4">
                <h2 className="text-base font-bold text-gray-900 mb-3">
                  Related Items
                </h2>

                <Carousel
                  className="bg-white p-2"
                  carouselItem={({ slide }: { slide: any }) => (
                    <div
                      key={slide.index}
                      className="flex-shrink-0 w-[5.25rem]"
                    >
                      <div
                        className={`w-[100%] aspect-1 rounded-xl ${slide.bgColor} mb-1.5 overflow-hidden`}
                      >
                        <img
                          src={slide.image}
                          alt={slide.name}
                          className="w-[100%] aspect-1 object-cover"
                        />
                      </div>
                      <p className="text-[0.75rem] text-gray-900 font-medium text-center">
                        {slide.name}
                      </p>
                    </div>
                  )}
                  slides={relatedItems}
                  slidesPerView={3.2}
                  slidesPerGroup={3}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white border-t border-gray-100">
        <div className="max-w-md mx-auto p-4 flex items-center justify-between">
          <QuantityControlGroup
            item={{ quantity, menuItem: { _id: product?.data?._id } }}
            decrementProductQuantity={() =>
              setQuantity((prev) => Math.max(1, prev - 1))
            }
            incrementProductQuantity={() => setQuantity((prev) => prev + 1)}
          />
          <PrimaryButton
            label="Add To Cart"
            className="py-2 px-6 text-sm"
            onClickHandler={handleAddToCart}
            icon={<FaShoppingCart />}
          />
        </div>
      </div>
    </div>
  );
}

export default MenuItem;
