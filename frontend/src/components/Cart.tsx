import { LiaShippingFastSolid } from 'react-icons/lia';

const remainingFreeMinSpend: number = 34;
const spentPercentage = '60%';
const remainingPercentage = '40%';

let cart = [
  {
    name: 'Pizza',
    size: 'L',
    price: 50,
    quantity: 1,
  },
];

function Cart() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center p-10">
      <h2 className="font-semibold text-xl">Cart</h2>
      <div className="flex flex-col gap-2 items-center">
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

        <div className="grid grid-cols-4 justify-between text-xs">
          <p className="font-bold p-4">Product</p>
          <p className="font-bold p-4">Quantity</p>
          <p className="font-bold p-4">Price</p>
          <p className="font-bold p-4">Subtotal</p>
          {cart.map((x) => (
            <>
              <p>{x.name}</p>
              <p>{x.quantity}</p>
              <p>${x.price}</p>
              <p>{x.price * x.quantity}</p>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cart;
