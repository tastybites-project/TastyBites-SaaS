import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function MyOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // FETCH MY ORDERS
  // =========================

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await API.get("/orders/my-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("My Orders:", response.data);

      setOrders(
        response.data.orders ||
        response.data.data ||
        []
      );

    } catch (error) {
      console.error("My Orders Error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
        return;
      }

      setError(
        error.response?.data?.message ||
        "Failed to load your orders."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // =========================
  // STATUS STYLE
  // =========================

  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      case "Preparing":
        return "bg-yellow-100 text-yellow-700";

      case "Out for Delivery":
        return "bg-blue-100 text-blue-700";

      case "Confirmed":
        return "bg-purple-100 text-purple-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* =========================
          NAVBAR
      ========================= */}

      <Navbar />


      {/* =========================
          HEADER
      ========================= */}

      <section className="bg-black text-white">

        <div className="max-w-7xl mx-auto px-6 py-12">

          <h1 className="text-4xl font-bold">
            My Orders 📦
          </h1>

          <p className="text-gray-400 mt-2">
            Track all your TastyBites orders here.
          </p>

        </div>

      </section>


      {/* =========================
          CONTENT
      ========================= */}

      <main className="max-w-7xl mx-auto px-6 py-12">

        {/* Loading */}

        {loading && (

          <div className="text-center py-20">

            <div className="text-6xl mb-5">
              🍔
            </div>

            <p className="text-gray-500 text-lg">
              Loading your orders...
            </p>

          </div>

        )}


        {/* Error */}

        {!loading && error && (

          <div className="max-w-xl mx-auto bg-red-100 border border-red-300 text-red-700 p-5 rounded-xl text-center">

            <p>
              {error}
            </p>

            <button
              onClick={fetchOrders}
              className="mt-4 bg-black text-white px-6 py-2 rounded-lg"
            >
              Try Again
            </button>

          </div>

        )}


        {/* No Orders */}

        {!loading &&
          !error &&
          orders.length === 0 && (

            <div className="text-center py-20">

              <div className="text-8xl mb-6">
                📦
              </div>

              <h2 className="text-3xl font-bold text-gray-800">
                No Orders Yet
              </h2>

              <p className="text-gray-500 mt-3">
                You haven't placed any orders yet.
              </p>

              <button
                onClick={() => navigate("/menu")}
                className="mt-7 bg-black text-white px-7 py-3 rounded-lg font-semibold"
              >
                Order Food 🍔
              </button>

            </div>

          )}


        {/* =========================
            ORDERS
        ========================= */}

        {!loading &&
          !error &&
          orders.length > 0 && (

            <div className="space-y-6">

              {orders.map((order) => (

                <div
                  key={order._id}
                  className="bg-white rounded-2xl shadow-md p-6"
                >

                  {/* Order Header */}

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-5">

                    <div>

                      <p className="text-sm text-gray-500">
                        Order ID
                      </p>

                      <p className="font-semibold break-all">
                        #{order._id}
                      </p>

                    </div>


                    <div>

                      <p className="text-sm text-gray-500">
                        Order Date
                      </p>

                      <p className="font-medium">
                        {order.createdAt
                          ? new Date(
                              order.createdAt
                            ).toLocaleDateString()
                          : "N/A"}
                      </p>

                    </div>


                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusClass(
                        order.status
                      )}`}
                    >
                      {order.status || "Pending"}
                    </span>

                  </div>


                  {/* Order Items */}

                  <div className="py-5 space-y-4">

                    {order.items?.map(
                      (item, index) => (

                        <div
                          key={
                            item._id ||
                            index
                          }
                          className="flex justify-between items-center gap-4"
                        >

                          <div>

                            <p className="font-semibold text-gray-800">
                              {item.name ||
                                item.menuItem?.name ||
                                "Food Item"}
                            </p>

                            <p className="text-sm text-gray-500">
                              ₹{item.price} ×{" "}
                              {item.quantity}
                            </p>

                          </div>

                          <p className="font-bold">
                            ₹
                            {Number(
                              item.price
                            ) *
                              Number(
                                item.quantity
                              )}
                          </p>

                        </div>

                      )
                    )}

                  </div>


                  {/* Delivery Information */}

                  <div className="border-t pt-5 grid md:grid-cols-2 gap-5">

                    <div>

                      <p className="text-sm text-gray-500">
                        Phone
                      </p>

                      <p className="font-medium mt-1">
                        {order.phone || "N/A"}
                      </p>

                    </div>


                    <div>

                      <p className="text-sm text-gray-500">
                        Delivery Address
                      </p>

                      <p className="font-medium mt-1">
                        {order.deliveryAddress ||
                          "N/A"}
                      </p>

                    </div>

                  </div>


                  {/* Total */}

                  <div className="border-t mt-5 pt-5 flex justify-between items-center">

                    <span className="text-lg font-semibold">
                      Total Amount
                    </span>

                    <span className="text-2xl font-bold">
                      ₹{order.totalAmount}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          )}

      </main>


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

export default MyOrders;