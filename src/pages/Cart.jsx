import { useEffect, useState } from "react";
import {
  getCart,
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
} from "../services/cart";
import { placeOrder } from "../services/order";


const Cart = () => {
   console.log("✅ Cart component mounted");
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const handlePlaceOrder = async () => {
  try {
    await placeOrder();
    alert("Order placed successfully!");
    window.location.href = "/orders";
  } catch (error) {
    console.error("PLACE ORDER ERROR:", error.response?.data || error);
    alert(error.response?.data?.message || "Failed to place order");
  }
};


  const fetchCart = async () => {
  try {
    const res = await getCart();

    console.log("FULL RESPONSE 👉", res.data);
    console.log("CART DATA 👉", res.data.data);

    setCart(res.data.data);
  } catch (error) {
    console.error("FETCH CART ERROR", error);
  }finally {
    setLoading(false); // ✅ THIS WAS MISSING
  }

};


  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (productId) => {
    await removeFromCart(productId);
    fetchCart();
  };

  const handleDecrease = async (productId) => {
    await decreaseQuantity(productId);
    fetchCart();
  };

  const handleIncrease = async (productId) => {
    await increaseQuantity(productId);
    fetchCart();
  };

  if (loading) {
    return <p className="p-6">Loading cart...</p>;
  }

if (!cart || !cart.items || cart.items.length === 0) {
  return <p className="p-6">Your cart is empty.</p>;
}

return (
  <div className="p-6 max-w-4xl mx-auto">
    <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

    {cart.items.map((item) => (
      <div
        key={item.productId}
        className="flex justify-between items-center border-b py-4"
      >
        <div>
          <p className="font-semibold">Product ID: {item.productId}</p>
          <p>Price: ₹{item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <p className="font-medium">
            Item Total: ₹{item.price * item.quantity}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleDecrease(item.productId)}
            className="px-3 py-1 bg-gray-300 rounded"
          >
            -
          </button>

          <button
            onClick={() => handleIncrease(item.productId)}
            className="px-3 py-1 bg-gray-300 rounded"
          >
            +
          </button>

          <button
            onClick={() => handleRemove(item.productId)}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Remove
          </button>
        </div>
      </div>
    ))}

    {/* ✅ CART SUMMARY (ONCE) */}
    <div className="text-right mt-6">
      <p className="text-xl font-bold mb-4">
        Total: ₹{cart.totalAmount}
      </p>

      <button
        onClick={handlePlaceOrder}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Place Order
      </button>
    </div>
  </div>
);
}
export default Cart;
