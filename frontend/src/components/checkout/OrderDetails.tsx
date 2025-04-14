import { useLocation, useNavigate } from 'react-router-dom';
import PrimaryButton from '../buttons/primary-button/PrimaryButton';

function OrderDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = location.state;

  return (
    <div className="h-full py-10 bg-gray-50 p-6 text-sm flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="font-semibold">Items</h2>
          <PrimaryButton
            label="Edit cart"
            onClickHandler={() => {
              navigate('/cart');
            }}
            className="text-gray-500 text-xs hover:underline bg-transparent"
          />
        </div>

        <div className="space-y-4 text-gray-700">
          {cart?.data?.items?.map((item: any) => (
            <Item key={item._id} item={item} />
          ))}
        </div>
      </div>

      <div>
        <div className="mt-6 flex justify-between items-center border-t pt-4">
          <p className="text-gray-600 text-xs font-medium">Promocode</p>
          <button className="text-gray-500 text-xs">enter code</button>
        </div>

        <div className="flex justify-between mt-4 font-semibold">
          <span>Total</span>
          <span className="font-bold">
            {(cart?.data?.totalPrice ?? 0).toFixed(2)} $
          </span>
        </div>
      </div>
    </div>
  );
}

function Item({ item }: { item: any }) {
  return (
    <div className="grid md:grid-cols-7 xl:grid-cols-4 text-gray-600 text-xs">
      <div className="md:col-span-5 xl:col-span-3">
        <p className="font-medium">{item.menuItem.name}</p>
        <p className="text-xxs text-gray-500 text-nowrap overflow-hidden text-ellipsis">
          {item.menuItem.description}
        </p>
      </div>
      <span className="font-medium text-xxs md:col-span-2 xl:col-span-1 text-center">
        {item.quantity}x {item.price} $
      </span>
    </div>
  );
}

export default OrderDetails;
