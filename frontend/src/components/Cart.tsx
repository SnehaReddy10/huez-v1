import Grid from './common/Grid';
import {
  useDecrementProductQuantityMutation,
  useGetCartQuery,
  useIncrementProductQuantityMutation,
  useRemoveFromCartMutation,
} from '../store';
import PrimaryButton from './buttons/primary-button/PrimaryButton';
import QuantityControlGroup from './common/QuantityControlGroup';
import { twMerge } from 'tailwind-merge';
import { useNavigate } from 'react-router-dom';
import CartLoader from './cart/CartLoader';

function Cart() {
  const navigate = useNavigate();
  const { data: cart } = useGetCartQuery({});
  const [deleteProduct] = useRemoveFromCartMutation();
  const [incrementProductQuantity] = useIncrementProductQuantityMutation();
  const [decrementProductQuantity] = useDecrementProductQuantityMutation();

  const rows =
    cart?.data?.items?.map((item: any) => [
      {
        label: <ProductInfo item={item} />,
        id: item._id,
        className: 'w-[70%]',
        onClick: () => {},
        itemId: item.menuItem._id,
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
        id: item._id,
        className: 'w-[10%] text-center',
      },
      {
        label: (
          <p className="font-semibold">
            ${`${(item.price * item.quantity).toFixed(2)}`}
          </p>
        ),
        id: item._id,
        className: 'w-[10%]',
      },
    ]) || [];

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
    <>
      {rows.length > 0 ? (
        <div className="flex max-xl:flex-col min-h-[100dvh] pb-20 justify-between animate-slideIn">
          <div className="flex flex-col items-center w-full xl:w-[70%] md:py-10 pb-4 lg:px-10">
            <div className="flex justify-between items-center w-full max-sm:border-b-8 py-2 px-3 max-sm:border-gray-100">
              <h2 className="text-base font-semibold md:text-xl">
                Shopping cart
              </h2>
              <p className="text-xs text-gray-400 font-semibold md:font-bold">
                {cart?.data?.items.length} ITEMS
              </p>
            </div>

            {rows.length > 0 ? (
              <Grid
                onDelete={(s: any) => deleteProduct(s)}
                onEdit={() => {}}
                title=""
                headers={headers}
                rows={rows}
                className={`hidden md:flex`}
              />
            ) : (
              <EmptyCart />
            )}

            <MobileCart
              items={cart?.data?.items ?? []}
              onDecrement={decrementProductQuantity}
              onIncrement={incrementProductQuantity}
              className={`flex md:hidden`}
            />
          </div>
          {rows.length > 0 && (
            <div className="max-h-[20rem] min-h-28 bg-gray-100 xl:w-[30%] md:py-10 py-3 px-3 lg:px-10 flex flex-col justify-between">
              <div className="flex flex-col md:gap-10">
                <h3 className="text-black text-xl max-sm:hidden">Summary</h3>

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
                  label={`Place Order`}
                  onClickHandler={() => {
                    navigate('/checkout', { state: { cart } });
                  }}
                  className="w-full py-2 rounded-md text-xs"
                />
              </div>
            </div>
          )}{' '}
        </div>
      ) : (
        <EmptyCart />
      )}
    </>
  );
}

function ProductInfo({ item }: any) {
  return (
    <div className="flex gap-4 xl:gap-6 items-center">
      <img
        src={item.menuItem.imageUrl}
        alt={item.menuItem.name}
        className="xl:h-20 xl:w-32 h-20 w-20 object-cover"
      />
      <p>{item.menuItem.name}</p>
    </div>
  );
}

function EmptyCart() {
  const navigate = useNavigate();
  return (
    <div className="text-xs py-24 px-5 animate-fadeIn flex flex-col gap-4 justify-center items-center w-full">
      <CartLoader />
      <div className="flex flex-col gap-1 items-center">
        <h2 className="font-bold"> Your Cart is Empty</h2>
        <p className="text-gray-600">
          Looks like you haven't added anything to your cart yet.
        </p>
      </div>
      <PrimaryButton
        label={'Add Products'}
        onClickHandler={() => {
          navigate('/menu');
        }}
        className="py-1 w-max"
      />
    </div>
  );
}

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
    <div className={twMerge(`bg-white w-[100%] ${className}`)}>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b-[2px] border-gray-100 text-xs py-2 px-3"
          >
            <img
              src={item.menuItem.imageUrl}
              alt={item.menuItem.name}
              className="w-[15%] aspect-1 rounded-lg"
            />
            <div className="flex-1 px-4">
              <p className="font-semibold">{item.menuItem.name}</p>
              <p className="text-gray-500">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
            <QuantityControlGroup
              item={item}
              incrementProductQuantity={onIncrement}
              decrementProductQuantity={onDecrement}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
