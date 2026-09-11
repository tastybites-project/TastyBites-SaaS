import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { useCart } from "../context/CartContext";

function Home() {
  const { addToCart } = useCart();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH FEATURED FOOD
  // =========================

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await API.get("/menu-items");

        const menuItems =
          response.data.menuItems ||
          response.data.items ||
          response.data.data ||
          [];

        // Show first 4 available foods
        const featured = menuItems
          .filter((item) => item.availability)
          .slice(0, 4);

        setItems(featured);
      } catch (error) {
        console.error("Home Menu Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  // =========================
  // PAGE
  // =========================

  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR */}

      <Navbar />

      {/* =========================
          HERO
      ========================= */}

      <section className="bg-black text-white">

        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">

          <div className="max-w-3xl">

            <p className="text-yellow-400 font-semibold mb-4">
              🍽️ Welcome to TastyBites
            </p>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Delicious Food,
              <br />
              Delivered With Love ❤️
            </h1>

            <p className="text-gray-400 text-lg mt-6 max-w-2xl">
              Discover fresh, delicious and carefully prepared
              food made specially for you.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">

              <Link
                to="/menu"
                className="bg-white text-black px-7 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Browse Menu 🍔
              </Link>

              <Link
                to="/register"
                className="border border-white text-white px-7 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition"
              >
                Create Account
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* =========================
          FEATURED FOODS
      ========================= */}

      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="text-center mb-10">

          <p className="text-yellow-500 font-semibold">
            Our Popular Choices
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Featured Foods
          </h2>

          <p className="text-gray-500 mt-3">
            Try some of our delicious customer favourites.
          </p>

        </div>

        {loading ? (

          <div className="text-center py-10 text-gray-500">
            Loading delicious food... 🍕
          </div>

        ) : items.length === 0 ? (

          <div className="text-center py-10 text-gray-500">
            No featured food available right now.
          </div>

        ) : (

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {items.map((item) => (

              <div
                key={item._id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
              >

                {/* IMAGE */}

                <div className="h-48 bg-gray-100 flex items-center justify-center">

                  {item.image ? (

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />

                  ) : (

                    <div className="text-7xl">
                      🍔
                    </div>

                  )}

                </div>

                {/* CONTENT */}

                <div className="p-5">

                  <div className="flex justify-between gap-3">

                    <h3 className="text-lg font-bold">
                      {item.name}
                    </h3>

                    <span className="font-bold whitespace-nowrap">
                      ₹{item.price}
                    </span>

                  </div>

                  <p className="text-gray-500 text-sm mt-3 line-clamp-2">
                    {item.description ||
                      "Delicious food prepared fresh for you."}
                  </p>

                  <button
                    onClick={() => addToCart(item)}
                    className="w-full mt-5 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800"
                  >
                    Add to Cart 🛒
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

        {/* VIEW ALL */}

        <div className="text-center mt-10">

          <Link
            to="/menu"
            className="inline-block border border-black px-7 py-3 rounded-lg font-semibold hover:bg-black hover:text-white transition"
          >
            View Full Menu →
          </Link>

        </div>

      </section>

      {/* =========================
          WHY CHOOSE US
      ========================= */}

      <section className="bg-white">

        <div className="max-w-7xl mx-auto px-6 py-16">

          <div className="text-center mb-10">

            <h2 className="text-3xl font-bold">
              Why Choose TastyBites?
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="text-center p-6">

              <div className="text-5xl mb-4">
                🍴
              </div>

              <h3 className="text-xl font-bold">
                Fresh Food
              </h3>

              <p className="text-gray-500 mt-3">
                Fresh ingredients and carefully prepared meals.
              </p>

            </div>

            <div className="text-center p-6">

              <div className="text-5xl mb-4">
                🚀
              </div>

              <h3 className="text-xl font-bold">
                Fast Delivery
              </h3>

              <p className="text-gray-500 mt-3">
                Get your favourite food delivered quickly.
              </p>

            </div>

            <div className="text-center p-6">

              <div className="text-5xl mb-4">
                ❤️
              </div>

              <h3 className="text-xl font-bold">
                Made With Love
              </h3>

              <p className="text-gray-500 mt-3">
                Every meal is prepared with care for you.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =========================
          FOOTER
      ========================= */}

      <footer className="bg-black text-gray-400">

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

export default Home;