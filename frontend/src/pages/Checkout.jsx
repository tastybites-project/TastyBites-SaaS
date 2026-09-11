import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import API from "../services/api";

function Checkout() {
  const navigate = useNavigate();

  const { cart, clearCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // TOTAL
  // =========================

  const totalPrice = cart.reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.quantity),
    0
  );

  // =========================
  // PLACE ORDER
  // =========================

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    setError("");

    // Check cart
    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    // Check login
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login before placing an order.");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

      return;
    }

    // Validate phone
    if (phone.trim().length < 10) {
      setError("Please enter a valid phone number.");
      return;
    }

    // Validate address
    if (address.trim().length < 5) {
      setError("Please enter a valid delivery address.");
      return;
    }

    try {
      setLoading(true);

      // =========================
      // ORDER DATA
      // =========================

      const orderData = {
        items: cart.map((item) => ({
          menuItem: item._id,
          name: item.name,
          price: Number(item.price),
          quantity: Number(item.quantity),
        })),

        totalAmount: totalPrice,

        phone: phone.trim(),

        deliveryAddress: address.trim(),
      };

      console.log("Order Data:", orderData);

      // =========================
      // CREATE ORDER
      // =========================

      const response = await API.post(
        "/orders",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "Order Response:",
        response.data
      );

      // =========================
      // SUCCESS
      // =========================

      if (
        response.data.success ||
        response.status === 201
      ) {
        clearCart();

        alert("Order placed successfully! 🎉");

        navigate("/my-orders");
      }

    } catch (error) {
      console.error(
        "Place Order Error:",
        error
      );

      // Token problem
      if (
        error.response?.status === 401
      ) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setError(
          "Session expired. Please login again."
        );

        setTimeout(() => {
          navigate("/login");
        }, 1500);

        return;
      }

      setError(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to place order."
      );

    } finally {
      setLoading(false);
    }
  };


  // =========================
  // EMPTY CART
  // =========================

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">

        <Navbar />

        <div className="max-w-3xl mx-auto px-6 py-20 text-center">

          <div className="text-8xl mb-6">
            🛒
          </div>

          <h1 className="text-3xl font-bold">
            Your Cart is Empty
          </h1>

          <p className="text-gray-500 mt-3">
            Add some food before checkout.
          </p>

          <button
            onClick={() => navigate("/menu")}
            className="mt-7 bg-black text-white px-7 py-3 rounded-lg"
          >
            Go to Menu
          </button>

        </div>

      </div>
    );
  }


  // =========================
  // CHECKOUT UI
  // =========================

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      {/* Header */}

      <section className="bg-black text-white">

        <div className="max-w-7xl mx-auto px-6 py-12">

          <h1 className="text-4xl font-bold">
            Checkout
          </h1>

          <p className="text-gray-400 mt-2">
            Enter your delivery information.
          </p>

        </div>

      </section>


      {/* Content */}

      <main className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid lg:grid-cols-3 gap-8">


          {/* =========================
              CUSTOMER INFORMATION
          ========================= */}

          <div className="lg:col-span-2">

            <div className="bg-white rounded-2xl shadow-md p-7">

              <h2 className="text-2xl font-bold mb-6">
                Customer Information
              </h2>


              {/* Error */}

              {error && (

                <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg mb-6">
                  {error}
                </div>

              )}


              <form
                onSubmit={handlePlaceOrder}
                className="space-y-5"
              >

                {/* Name */}

                <div>

                  <label className="block font-medium mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    placeholder="Enter your name"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                  />

                </div>


                {/* Phone */}

                <div>

                  <label className="block font-medium mb-2">
                    Phone
                  </label>

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                    placeholder="Enter phone number"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                  />

                </div>


                {/* Address */}

                <div>

                  <label className="block font-medium mb-2">
                    Delivery Address
                  </label>

                  <textarea
                    value={address}
                    onChange={(e) =>
                      setAddress(e.target.value)
                    }
                    placeholder="Enter complete delivery address"
                    rows="5"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                  />

                </div>


                {/* Place Order */}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 disabled:bg-gray-400 transition"
                >

                  {loading
                    ? "Placing Order..."
                    : "Place Order 🎉"}

                </button>

              </form>

            </div>

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


              {/* Items */}

              <div className="space-y-4">

                {cart.map((item) => (

                  <div
                    key={item._id}
                    className="flex justify-between gap-4"
                  >

                    <div>

                      <p className="font-medium">
                        {item.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        ₹{item.price} × {item.quantity}
                      </p>

                    </div>

                    <p className="font-semibold">
                      ₹{item.price * item.quantity}
                    </p>

                  </div>

                ))}

              </div>


              <div className="border-b my-5" />


              <div className="flex justify-between text-gray-600">

                <span>
                  Delivery
                </span>

                <span className="text-green-600">
                  FREE
                </span>

              </div>


              <div className="border-b my-5" />


              <div className="flex justify-between">

                <span className="text-xl font-bold">
                  Total
                </span>

                <span className="text-2xl font-bold">
                  ₹{totalPrice}
                </span>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Checkout;