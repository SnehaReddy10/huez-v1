import Grid from './common/Grid';
import {
  useDecrementProductQuantityMutation,
  useGetCartQuery,
  useIncrementProductQuantityMutation,
  useRemoveFromCartMutation,
} from '../store';
import PrimaryButton from './buttons/PrimaryButton';
import QuantityControlGroup from './common/QuantityControlGroup';

function Cart() {
  const { data: cart } = useGetCartQuery({});
  const [deleteProduct] = useRemoveFromCartMutation();
  const [incrementProductQuantity] = useIncrementProductQuantityMutation();
  const [decrementProductQuantity] = useDecrementProductQuantityMutation();

  const rows =
    cart?.data?.items?.map((item: any) => [
      {
        label: <ProductInfo item={item} />,
        id: item.menuItem._id,
        className: 'w-[70%]',
        onClick: () => {},
      },
      { label: item.description, id: item._id, className: 'w-[10%]' },
      {
        label: (
          <QuantityControlGroup
            item={item}
            incrementProductQuantity={incrementProductQuantity}
            decrementProductQuantity={decrementProductQuantity}
          />
        ),
        id: item.menuItem._id,
        className: 'w-[10%] text-center',
      },
      {
        label: (
          <p className="font-semibold">
            ${`${(item.price * item.quantity).toFixed(2)}`}
          </p>
        ),
        id: item.menuItem._id,
        className: 'w-[10%]',
      },
    ]) ?? [];

  const headers = [
    {
      label: 'Items',
      id: 1,
      className: 'w-[70%]',
    },
    { label: 'Size', id: 2, className: 'w-[10%]' },
    { label: 'Quantity', id: 3, className: 'w-[10%] text-center' },
    { label: 'Price', id: 4, className: 'w-[10%]' },
  ];

  return (
    <div className="flex max-sm:flex-col animate-slideIn">
      <div className="flex flex-col items-center md:w-[70%] py-10 px-5 lg:px-10">
        <div className="flex justify-between items-center w-full">
          <h2 className="text-xl">Shopping cart</h2>
          <p className="text-xs text-gray-400 font-bold">
            {cart?.data?.items.length} ITEMS
          </p>
        </div>
        {/* <div className="flex flex-col gap-2 items-center">
          <p className="text-xs">
            Shop for ${remainingFreeMinSpend} more to enjoy{' '}
            <span className="font-bold">FREE Shipping</span>
          </p>
          <div className="flex gap-1 items-center w-[120%]">
            <p
              className={`bg-green-500 w-[${spentPercentage}] h-1 rounded-md`}
            ></p>
            <LiaShippingFastSolid size={20} />
            <p
              className={`flex bg-gray-300 w-[${remainingPercentage}] h-1 rounded-md`}
            ></p>
          </div>
        </div> */}

        <Grid
          onDelete={(s: any) => deleteProduct(s)}
          onEdit={() => {}}
          title=""
          headers={headers}
          rows={rows}
          className={`hidden md:flex`}
        />
        <MobileCart
          items={cart?.data?.items ?? []}
          onDecrement={decrementProductQuantity}
          onIncrement={incrementProductQuantity}
          className={`flex md:hidden`}
        />
      </div>
      <div className="max-h-[20rem] min-h-[20rem] bg-gray-100 md:w-[30%] py-10 px-5 lg:px-10 flex flex-col justify-between">
        <div className="flex flex-col gap-10">
          <h3 className="text-black text-xl">Summary</h3>

          <div className="text-xs flex flex-col gap-1 font-semibold text-gray-500">
            <div className="flex justify-between">
              <p className="">Subtotal</p>
              <p className="font-semibold text-black-900">
                ${cart?.data?.totalPrice?.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="">Shipping</p>
              <p className="font-semibold text-black-900">
                ${cart?.data?.shippingCharges?.toFixed(2) ?? 0}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="">Tax</p>
              <p className="font-semibold text-black-900">
                ${cart?.data?.tax?.toFixed(2) ?? 0}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-xs">
          <div className="flex justify-between">
            <p className="">Total</p>
            <p className="font-bold text-black-900">
              ${cart?.data?.totalPrice?.toFixed(2)}
            </p>
          </div>
          <PrimaryButton
            label={'Checkout'}
            onClickHandler={() => {}}
            className="w-full py-1"
          />
        </div>
      </div>
    </div>
  );
}

function ProductInfo({ item }: any) {
  return (
    <div className="flex gap-6 items-center">
      <img
        src={item.menuItem.imageUrl}
        alt={item.menuItem.name}
        className="h-20 w-32"
      />
      <p>{item.menuItem.name}</p>
    </div>
  );
}

import { IoAdd, IoRemove } from 'react-icons/io5';
import { twMerge } from 'tailwind-merge';

interface CartProps {
  items: any[];
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  className: string;
}

const MobileCart = ({
  items,
  onIncrement,
  onDecrement,
  className,
}: CartProps) => {
  return (
    <div className={twMerge(`bg-white ${className}`)}>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b-[2px] text-xs"
          >
            <img
              src={item.menuItem.imageUrl}
              alt={item.menuItem.name}
              className="w-16 h-16 rounded-lg"
            />
            <div className="flex-1 px-4">
              <p className="font-semibold">{item.menuItem.name}</p>
              <p className="text-gray-500">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <button
                className="p-2 bg-black text-black rounded-md"
                onClick={() => onIncrement(item.menuItem._id)}
              >
                <IoAdd size={20} />
              </button>
              <span className="w-8 h-8 flex items-center justify-center bg-black-900 text-white text-sm font-semibold rounded-md">
                {item.quantity}
              </span>
              <button
                className="p-2 bg-black text-black rounded-md"
                onClick={() => {
                  console.log(item.menuItem._id);
                  onDecrement(item.menuItem._id);
                }}
              >
                <IoRemove size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
