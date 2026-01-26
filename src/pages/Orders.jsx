import { useEffect, useState } from "react";
import { getMyOrders } from "../services/order";
import { mockPay } from "../services/payment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await getMyOrders();
      setOrders(res.data.data);
    } catch (err) {
      console.error("ORDER ERROR", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleMockPay = async (orderId) => {
    try {
      await mockPay(orderId);
      alert("Payment Successful (Mock)");
      fetchOrders(); // refresh orders
    } catch (error) {
      alert("Payment failed");
    }
  };

  if (loading) return <p className="p-6">Loading orders...</p>;
  if (!orders.length) return <p className="p-6">No orders found.</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.map((order) => (
        <div key={order._id} className="border p-4 mb-4 rounded shadow">
          <p className="font-bold">Order ID: {order._id}</p>
          <p>Total: ₹{order.totalAmount}</p>
          <p>Date: {new Date(order.createdAt).toLocaleString()}</p>

          <div className="mt-3">
            <p className="font-semibold">Items:</p>
            {order.items.map((item) => (
              <div key={item.productId} className="ml-4">
                <p>Product ID: {item.productId}</p>
                <p>
                  Qty: {item.quantity} × ₹{item.price}
                </p>
              </div>
            ))}
          </div>

          {order.paymentStatus === "PENDING" && (
            <button
              onClick={() => handleMockPay(order._id)}
              className="bg-green-600 text-white px-4 py-2 mt-3 rounded"
            >
              Pay Now
            </button>
          )}

          {order.paymentStatus === "PAID" && (
            <p className="text-green-600 font-semibold mt-2">
              Payment Completed
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Orders;
