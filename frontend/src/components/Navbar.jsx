import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const navigate = useNavigate();

  const { cart } = useCart();

  const token = localStorage.getItem("token");
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const cartCount = cart.reduce(
    (total, item) =>
      total + Number(item.quantity),
    0
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between h-16">

          {/* =========================
              LOGO
          ========================= */}

          <Link
            to="/"
            className="text-2xl font-bold text-gray-900"
          >
            TastyBites 🍔
          </Link>


          {/* =========================
              MENU
          ========================= */}

          <div className="hidden md:flex items-center gap-6">

            <Link
              to="/"
              className="text-gray-700 hover:text-black font-medium"
            >
              Home
            </Link>

            <Link
              to="/menu"
              className="text-gray-700 hover:text-black font-medium"
            >
              Menu
            </Link>

            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-black font-medium"
            >
              Cart 🛒

              {cartCount > 0 && (
                <span className="absolute -top-3 -right-4 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {isLoggedIn && user?.role !== "Admin" && (
              <Link
                to="/my-orders"
                className="text-gray-700 hover:text-black font-medium"
              >
                My Orders
              </Link>
            )}

          </div>


          {/* =========================
              RIGHT SIDE
          ========================= */}

          <div className="flex items-center gap-3">

            {!isLoggedIn ? (

              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 font-medium hover:text-black"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-5 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800"
                >
                  Register
                </Link>
              </>

            ) : (

              <>

                {user?.role === "Admin" && (
                  <Link
                    to="/admin/dashboard"
                    className="hidden sm:block px-4 py-2 bg-black text-white rounded-lg font-medium"
                  >
                    Admin Panel
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-100"
                >
                  Logout
                </button>

              </>

            )}

          </div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;