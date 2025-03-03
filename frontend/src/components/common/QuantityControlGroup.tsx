import { IoRemoveCircleOutline, IoAddCircleOutline } from 'react-icons/io5';

function QuantityControlGroup({
  item,
  decrementProductQuantity,
  incrementProductQuantity,
}: any) {
  return (
    <div className="flex gap-1 md:gap-2 items-center justify-center">
      <span
        className={`${
          item.quantity === 1
            ? 'text-gray-400'
            : 'text-black hover:text-white hover:bg-black-900'
        }  rounded-full transition-all ease-in`}
      >
        <IoRemoveCircleOutline
          size={25}
          onClick={() =>
            item.quantity > 1 ? decrementProductQuantity(item.menuItem._id) : ''
          }
        />
      </span>
      <p className="text-xs font-bold">{item.quantity}</p>
      <span className="text-black hover:text-white hover:bg-black-900 rounded-full transition-all ease-in">
        <IoAddCircleOutline
          size={25}
          onClick={() => incrementProductQuantity(item.menuItem._id)}
          fill="white"
        />
      </span>
    </div>
  );
}

export default QuantityControlGroup;
