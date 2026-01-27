import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };


  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      {/* Left side */}
      <div className="text-xl font-bold">
        <Link to="/products">Ecommerce</Link>
      </div>

      {/* Right side */}
      <div className="space-x-4">
        {!token ? (
          <>
            <Link to="/login" className="hover:text-gray-300">
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-300">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/products" className="hover:text-gray-300">
              Products
            </Link>
            <Link to="/cart" className="hover:text-gray-300">
              Cart
            </Link>
            <Link to="/orders">My Orders</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
