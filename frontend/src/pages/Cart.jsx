import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  // =========================
  // TOTAL PRICE
  // =========================

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // =========================
  // EMPTY CART
  // =========================

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">

        <Navbar />

        <div className="max-w-4xl mx-auto px-6 py-20 text-center">

          <div className="text-8xl mb-6">
            🛒
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            Your Cart is Empty
          </h1>

          <p className="text-gray-500 mt-3">
            Add some delicious food to your cart first.
          </p>

          <Link
            to="/menu"
            className="inline-block mt-7 bg-black text-white px-7 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Browse Menu 🍔
          </Link>

        </div>

      </div>
    );
  }

  // =========================
  // CART
  // =========================

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      {/* =========================
          HEADER
      ========================= */}

      <section className="bg-black text-white">

        <div className="max-w-7xl mx-auto px-6 py-12">

          <h1 className="text-4xl font-bold">
            Your Cart 🛒
          </h1>

          <p className="text-gray-400 mt-2">
            Review your items before checkout.
          </p>

        </div>

      </section>


      {/* =========================
          CART CONTENT
      ========================= */}

      <main className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid lg:grid-cols-3 gap-8">

          {/* =========================
              CART ITEMS
          ========================= */}

          <div className="lg:col-span-2 space-y-5">

            {cart.map((item) => (

              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-md p-5"
              >

                <div className="flex flex-col sm:flex-row gap-5">

                  {/* Image */}

                  <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">

                    {item.image ? (

                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />

                    ) : (

                      <span className="text-6xl">
                        🍔
                      </span>

                    )}

                  </div>


                  {/* Details */}

                  <div className="flex-1">

                    <div className="flex justify-between gap-4">

                      <div>

                        <h2 className="text-xl font-bold text-gray-800">
                          {item.name}
                        </h2>

                        <p className="text-gray-500 mt-1">
                          ₹{item.price} each
                        </p>

                      </div>

                      <p className="text-xl font-bold">
                        ₹{item.price * item.quantity}
                      </p>

                    </div>


                    {/* Quantity */}

                    <div className="flex items-center justify-between mt-6">

                      <div className="flex items-center border rounded-lg overflow-hidden">

                        <button
                          onClick={() =>
                            decreaseQuantity(item._id)
                          }
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-lg font-bold"
                        >
                          −
                        </button>

                        <span className="px-5 py-2 font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(item._id)
                          }
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-lg font-bold"
                        >
                          +
                        </button>

                      </div>


                      {/* Remove */}

                      <button
                        onClick={() =>
                          removeFromCart(item._id)
                        }
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>


          {/* =========================
              ORDER SUMMARY
          ========================= */}

          <div>

            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-6">

              <h2 className="text-2xl font-bold">
                Order Summary
              </h2>

              <div className="border-b my-5" />

              <div className="flex justify-between text-gray-600">
                <span>Items</span>

                <span>
                  {cart.reduce(
                    (total, item) =>
                      total + item.quantity,
                    0
                  )}
                </span>
              </div>


              <div className="flex justify-between mt-4 text-gray-600">

                <span>Subtotal</span>

                <span>
                  ₹{totalPrice}
                </span>

              </div>


              <div className="flex justify-between mt-4 text-gray-600">

                <span>Delivery</span>

                <span className="text-green-600">
                  FREE
                </span>

              </div>


              <div className="border-b my-5" />


              <div className="flex justify-between items-center">

                <span className="text-xl font-bold">
                  Total
                </span>

                <span className="text-2xl font-bold">
                  ₹{totalPrice}
                </span>

              </div>


              {/* Checkout */}

              <Link
                to="/checkout"
                className="block w-full mt-7 bg-black text-white py-3 rounded-lg text-center font-semibold hover:bg-gray-800 transition"
              >
                Proceed to Checkout →
              </Link>


              {/* Continue Shopping */}

              <Link
                to="/menu"
                className="block w-full mt-3 border border-gray-300 text-gray-700 py-3 rounded-lg text-center font-medium hover:bg-gray-100 transition"
              >
                ← Continue Shopping
              </Link>

            </div>

          </div>

        </div>

      </main>


      {/* =========================
          FOOTER
      ========================= */}

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

export default Cart;