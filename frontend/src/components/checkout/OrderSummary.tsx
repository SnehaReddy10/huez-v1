import { useLocation } from 'react-router-dom';

const OrderSummary = () => {
  const location = useLocation();
  const cart = location.state?.cart;
  const order = {
    orderNo: '9PM2EQ',
    deliveryDate: '06.08.19',
    shippingDetails: {
      name: 'John Appleseed',
      address: '194 Ferry St London, 07105',
      method: 'Europe Standard',
    },
    total: 252.0,
    shippingCost: 0.0,
    items: [
      {
        name: "Bal d'Afrique",
        description: '225ml Body wash',
        price: 40,
        image: '/images/body-wash.png',
      },
      {
        name: 'Seven Veils',
        description: '100ml Eau de Parfum',
        price: 180,
        image: '/images/perfume.png',
      },
      {
        name: 'Rose of no Man’s Land',
        description: '30ml Hand cream',
        price: 32,
        image: '/images/hand-cream.png',
      },
    ],
  };

  return (
    <div className="text-xs font-medium text-gray-950 bg-gray-100 p-2 xl:p-6 rounded-lg shadow-md max-w-md mx-auto py-8">
      <h2 className="font-semibold mb-8">Order Summary</h2>

      <div className="grid grid-cols-6 gap-4 mb-4">
        <span className="font-medium col-span-2">Order No:</span>
        <span className="col-span-3 text-gray-650">{order.orderNo}</span>
        <span className="col-span-1"></span>
        <span className="font-medium col-span-2">Est delivery date:</span>{' '}
        <span className=" col-span-3 text-gray-650">{order.deliveryDate}</span>
        <span className=" col-span-1"></span>
        <p className="font-medium col-span-2">Shipping details:</p>
        <span className="col-span-3 text-gray-650">
          <p>{order.shippingDetails.name}</p>
          <p>{order.shippingDetails.address}</p>
          <p>{order.shippingDetails.method}</p>
        </span>
        <span className="col-span-1"></span>
      </div>

      <div className="flex flex-col gap-4">
        <div className="border-t pt-4 grid grid-cols-6 gap-y-4">
          <span className="col-span-2"></span>
          <p className="col-span-3 font-bold text-xs text-gray-950">Total</p>
          <span className="col-span-1 font-bold text-xs text-gray-950 text-right">
            {order.total.toFixed(2)} $
          </span>
        </div>

        <div className="grid grid-cols-6 gap-y-4 overflow-y-auto md:h-20 xl:h-32 2xl:h-48 scrollbar-hidden">
          {cart?.data?.items?.map((item: any) => (
            <>
              <div className="flex col-span-2 items-center justify-center">
                <img
                  src={item.menuItem.imageUrl}
                  alt={item.menuItem.name}
                  className="hidden xl:flex w-16 h-16 object-cover rounded-md"
                />
              </div>
              <div className="flex-1 col-span-3">
                <p className="font-medium text-gray-650">
                  {item.menuItem.name}
                </p>
                <p className="text-xxs text-gray-650">
                  {item.menuItem.description}
                </p>
              </div>
              <span className="font-medium col-span-1 text-right">
                {item.price} $
              </span>
            </>
          ))}
        </div>

        <div className="grid grid-cols-6 sticky bottom-0">
          <span className="col-span-2"></span>
          <p className="col-span-3 text-gray-650">Shipping</p>
          <span className="col-span-1 text-right">{order.shippingCost} $</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
