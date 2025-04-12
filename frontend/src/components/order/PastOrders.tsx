import { useState } from 'react';
import { useGetPastOrdersQuery } from '../../store';
import Loader from '../common/Loader';

type TimeRange = '3months' | '6months' | '1year';

const PastOrders = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('3months');
  const { data, isLoading, error } = useGetPastOrdersQuery(timeRange);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500">Error loading orders</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Past Orders</h1>

      <div className="mb-4 flex gap-2">
        <button
          className={`px-4 py-2 rounded ${
            timeRange === '3months' ? 'bg-primary text-white' : 'bg-gray-200'
          }`}
          onClick={() => setTimeRange('3months')}
        >
          Last 3 Months
        </button>
        <button
          className={`px-4 py-2 rounded ${
            timeRange === '6months' ? 'bg-primary text-white' : 'bg-gray-200'
          }`}
          onClick={() => setTimeRange('6months')}
        >
          Last 6 Months
        </button>
        <button
          className={`px-4 py-2 rounded ${
            timeRange === '1year' ? 'bg-primary text-white' : 'bg-gray-200'
          }`}
          onClick={() => setTimeRange('1year')}
        >
          Last Year
        </button>
      </div>

      {data?.data?.length === 0 ? (
        <div className="text-center py-8">
          No orders found for this time period
        </div>
      ) : (
        <div className="grid gap-4">
          {data?.data?.map((order: any) => (
            <div key={order._id} className="border rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="font-semibold">
                    Order #{order._id.slice(-6)}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    order.status === 'delivered'
                      ? 'bg-green-100 text-green-800'
                      : order.status === 'shipped'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              <div className="mt-2">
                {order.items.map((item: any) => (
                  <div key={item._id} className="flex justify-between py-1">
                    <span>
                      {item.menuItem.name} x {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-2 pt-2 border-t">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${order.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PastOrders;
