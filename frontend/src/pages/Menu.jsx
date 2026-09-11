import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import API from "../services/api";

function Menu() {
  const { addToCart } = useCart();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // FILTER STATES
  // =========================

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  // =========================
  // FETCH MENU
  // =========================

  const fetchMenu = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/menu-items");

      console.log("Menu Response:", response.data);

      setItems(
        response.data.menuItems ||
          response.data.items ||
          response.data.data ||
          []
      );
    } catch (error) {
      console.error("Menu Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load menu."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // =========================
  // ADD TO CART
  // =========================

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  // =========================
  // FILTER + SEARCH + SORT
  // =========================

  const filteredItems = items
    .filter((item) => {
      const searchText = search.toLowerCase();

      return (
        item.name?.toLowerCase().includes(searchText) ||
        item.description
          ?.toLowerCase()
          .includes(searchText)
      );
    })
    .filter((item) => {
      if (category === "All") {
        return true;
      }

      return item.category === category;
    })
    .sort((a, b) => {
      if (sort === "low") {
        return Number(a.price) - Number(b.price);
      }

      if (sort === "high") {
        return Number(b.price) - Number(a.price);
      }

      if (sort === "name") {
        return a.name.localeCompare(b.name);
      }

      return 0;
    });

  // =========================
  // PAGE
  // =========================

  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR */}

      <Navbar />

      {/* HEADER */}

      <section className="bg-black text-white">

        <div className="max-w-7xl mx-auto px-6 py-14 text-center">

          <p className="text-yellow-400 font-semibold mb-3">
            🍽️ TastyBites Menu
          </p>

          <h1 className="text-4xl md:text-5xl font-bold">
            Choose Your Favourite Food
          </h1>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Fresh, delicious and carefully prepared food
            delivered straight to your doorstep.
          </p>

        </div>

      </section>

      {/* MENU CONTENT */}

      <main className="max-w-7xl mx-auto px-6 py-12">

        {/* =========================
            SEARCH + FILTER
        ========================= */}

        <div className="bg-white rounded-2xl shadow-md p-5 mb-10">

          <div className="grid md:grid-cols-3 gap-4">

            {/* SEARCH */}

            <div className="md:col-span-1">

              <label className="block font-medium mb-2">
                Search Food
              </label>

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search burger, pizza..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              />

            </div>

            {/* CATEGORY */}

            <div>

              <label className="block font-medium mb-2">
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              >

                <option value="All">
                  All Categories
                </option>

                <option value="Burger">
                  Burger
                </option>

                <option value="Pizza">
                  Pizza
                </option>

                <option value="Chicken">
                  Chicken
                </option>

                <option value="Drinks">
                  Drinks
                </option>

                <option value="Dessert">
                  Dessert
                </option>

              </select>

            </div>

            {/* SORT */}

            <div>

              <label className="block font-medium mb-2">
                Sort By
              </label>

              <select
                value={sort}
                onChange={(e) =>
                  setSort(e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              >

                <option value="default">
                  Default
                </option>

                <option value="low">
                  Price: Low to High
                </option>

                <option value="high">
                  Price: High to Low
                </option>

                <option value="name">
                  Name: A to Z
                </option>

              </select>

            </div>

          </div>

        </div>

        {/* =========================
            LOADING
        ========================= */}

        {loading && (

          <div className="flex justify-center items-center py-20">

            <p className="text-lg text-gray-500">
              Loading delicious food... 🍔
            </p>

          </div>

        )}

        {/* =========================
            ERROR
        ========================= */}

        {!loading && error && (

          <div className="bg-red-100 border border-red-300 text-red-700 p-5 rounded-lg text-center">

            {error}

            <button
              onClick={fetchMenu}
              className="block mx-auto mt-4 bg-black text-white px-5 py-2 rounded-lg"
            >
              Try Again
            </button>

          </div>

        )}

        {/* =========================
            NO RESULT
        ========================= */}

        {!loading &&
          !error &&
          filteredItems.length === 0 && (

            <div className="text-center py-20">

              <div className="text-7xl mb-5">
                🍽️
              </div>

              <h2 className="text-2xl font-bold">
                No Food Found
              </h2>

              <p className="text-gray-500 mt-2">
                Try another search or category.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                  setSort("default");
                }}
                className="mt-5 bg-black text-white px-6 py-3 rounded-lg"
              >
                Clear Filters
              </button>

            </div>

          )}

        {/* =========================
            FOOD GRID
        ========================= */}

        {!loading &&
          !error &&
          filteredItems.length > 0 && (

            <>
              <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold">
                  Our Menu
                </h2>

                <p className="text-gray-500">
                  {filteredItems.length} food item
                  {filteredItems.length !== 1
                    ? "s"
                    : ""}
                </p>

              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">

                {filteredItems.map((item) => (

                  <div
                    key={item._id}
                    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
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

                      <div className="flex justify-between items-start gap-3">

                        <h2 className="text-xl font-bold text-gray-800">
                          {item.name}
                        </h2>

                        <span className="text-lg font-bold whitespace-nowrap">
                          ₹{item.price}
                        </span>

                      </div>

                      {/* DESCRIPTION */}

                      <p className="text-gray-500 text-sm mt-3 min-h-\[40px]">
                        {item.description ||
                          "Delicious food prepared fresh for you."}
                      </p>

                      {/* CATEGORY */}

                      {item.category && (

                        <span className="inline-block bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full mt-4">
                          {item.category}
                        </span>

                      )}

                      {/* AVAILABILITY */}

                      <div className="mt-4">

                        {item.availability ? (

                          <span className="text-green-600 text-sm font-medium">
                            ● Available
                          </span>

                        ) : (

                          <span className="text-red-600 text-sm font-medium">
                            ● Unavailable
                          </span>

                        )}

                      </div>

                      {/* View Details */}

                        <Link
                            to={`/menu/${item._id}`}
                            className="block w-full mt-5 py-3 rounded-lg border border-black text-center font-semibold hover:bg-black hover:text-white transition">
                               View Details →
                          </Link>

                      {/* CART BUTTON */}

                      <button
                        onClick={() =>
                          handleAddToCart(item)
                        }
                        disabled={!item.availability}
                        className={`w-full mt-5 py-3 rounded-lg font-semibold transition ${
                          item.availability
                            ? "bg-black text-white hover:bg-gray-800"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >

                        {item.availability
                          ? "Add to Cart 🛒"
                          : "Unavailable"}

                      </button>

                    </div>

                  </div>

                ))}

              </div>

            </>

          )}

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

export default Menu;