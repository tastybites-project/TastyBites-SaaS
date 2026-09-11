import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { useCart } from "../context/CartContext";

function MenuDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // FETCH MENU ITEM
  // =========================

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await API.get(
          `/menu-items/${id}`
        );

        console.log(
          "Menu Details:",
          response.data
        );

        const menuItem =
          response.data.menuItem ||
          response.data.data ||
          response.data;

        setItem(menuItem);
      } catch (error) {
        console.error(
          "Menu Details Error:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to load menu item."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItem();
  }, [id]);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="flex justify-center items-center py-32">
          <p className="text-lg text-gray-500">
            Loading food details... 🍔
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="max-w-3xl mx-auto px-6 py-20">

          <div className="bg-red-100 border border-red-300 text-red-700 p-6 rounded-xl text-center">

            <p className="font-semibold">
              {error}
            </p>

            <Link
              to="/menu"
              className="inline-block mt-5 bg-black text-white px-6 py-3 rounded-lg"
            >
              Back to Menu
            </Link>

          </div>

        </div>
      </div>
    );
  }

  // =========================
  // ITEM NOT FOUND
  // =========================

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="text-center py-20">

          <div className="text-7xl">
            🍽️
          </div>

          <h2 className="text-2xl font-bold mt-5">
            Menu Item Not Found
          </h2>

          <Link
            to="/menu"
            className="inline-block mt-5 bg-black text-white px-6 py-3 rounded-lg"
          >
            Back to Menu
          </Link>

        </div>
      </div>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR */}

      <Navbar />

      {/* HEADER */}

      <section className="bg-black text-white">

        <div className="max-w-7xl mx-auto px-6 py-12">

          <p className="text-yellow-400 font-semibold">
            🍽️ TastyBites
          </p>

          <h1 className="text-4xl font-bold mt-2">
            Food Details
          </h1>

        </div>

      </section>

      {/* DETAILS */}

      <main className="max-w-6xl mx-auto px-6 py-12">

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          <div className="grid md:grid-cols-2">

            {/* =========================
                IMAGE
            ========================= */}

            <div className="bg-gray-100 min-h-\[400px] flex items-center justify-center">

              {item.image ? (

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full min-h-\[400px] object-cover"
                />

              ) : (

                <div className="text-9xl">
                  🍔
                </div>

              )}

            </div>

            {/* =========================
                INFORMATION
            ========================= */}

            <div className="p-8 md:p-10">

              {/* CATEGORY */}

              {item.category && (

                <span className="inline-block bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-full">
                  {item.category}
                </span>

              )}

              {/* NAME */}

              <h2 className="text-4xl font-bold text-gray-900 mt-5">
                {item.name}
              </h2>

              {/* PRICE */}

              <p className="text-3xl font-bold mt-5">
                ₹{item.price}
              </p>

              {/* DESCRIPTION */}

              <div className="mt-7">

                <h3 className="text-lg font-bold">
                  Description
                </h3>

                <p className="text-gray-600 mt-2 leading-7">
                  {item.description ||
                    "Delicious food prepared fresh for you."}
                </p>

              </div>

              {/* AVAILABILITY */}

              <div className="mt-7">

                <h3 className="text-lg font-bold">
                  Availability
                </h3>

                <div className="mt-2">

                  {item.availability ? (

                    <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                      ● In Stock
                    </span>

                  ) : (

                    <span className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold">
                      ● Out of Stock
                    </span>

                  )}

                </div>

              </div>

              {/* BUTTONS */}

              <div className="flex flex-wrap gap-4 mt-8">

                <button
                  onClick={() => addToCart(item)}
                  disabled={!item.availability}
                  className={`px-7 py-3 rounded-lg font-semibold ${
                    item.availability
                      ? "bg-black text-white hover:bg-gray-800"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {item.availability
                    ? "Add to Cart 🛒"
                    : "Out of Stock"}
                </button>

                <Link
                  to="/menu"
                  className="border border-gray-300 px-7 py-3 rounded-lg font-semibold hover:bg-gray-100"
                >
                  ← Back to Menu
                </Link>

              </div>

            </div>

          </div>

        </div>

      </main>

      {/* FOOTER */}

      <footer className="bg-black text-gray-400 mt-10">

        <div className="max-w-7xl mx-auto px-6 py-8 text-center">

          <p>
            © {new Date().getFullYear()} TastyBites
          </p>

          <p className="text-sm mt-2">
            Delicious food, made with love ❤️
          </p>

        </div>

      </footer>

    </div>
  );
}

export default MenuDetails;