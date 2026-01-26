import { addToCart } from "../services/cart";

const ProductCard = ({ product }) => {
  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, 1);
      alert("Product added to cart");
    } catch (error) {
      alert(
        error.response?.data?.message || "Failed to add to cart"
      );
    }
  };

  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition">
      <h3 className="text-lg font-bold mb-2">{product.name}</h3>

      <p className="text-gray-700 mb-1">Price: ₹{product.price}</p>

      <p className="text-gray-600 mb-3">
        Stock: {product.stock}
      </p>

      <button
        onClick={handleAddToCart}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        disabled={product.stock === 0}
      >
        {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
