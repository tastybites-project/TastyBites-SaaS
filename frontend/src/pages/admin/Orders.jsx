import { useEffect, useState } from "react";
import API from "../../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // GET ALL ORDERS
  // =========================

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/orders");

      console.log("Orders Response:", response.data);

      setOrders(response.data.orders || []);

    } catch (error) {
      console.error("Fetch Orders Error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to fetch orders"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOAD ORDERS
  // =========================

  useEffect(() => {
    fetchOrders();
  }, []);

  // =========================
  // UPDATE STATUS
  // =========================

  const updateStatus = async (orderId, status) => {
    try {
      await API.put(
        `/orders/${orderId}/status`,
        { status }
      );

      fetchOrders();

    } catch (error) {
      console.error(
        "Update Status Error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to update order status"
      );
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold">
          TastyBites Order Management
        </h1>

        <p className="mt-6">
          Loading orders...
        </p>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <div className="p-8">

        <h1 className="text-3xl font-bold mb-6">
          TastyBites Order Management
        </h1>

        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          {error}
        </div>

      </div>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-3xl font-bold">
              TastyBites Order Management
            </h1>

            <p className="text-gray-500 mt-2">
              Manage customer orders
            </p>

          </div>

          <button
            onClick={fetchOrders}
            className="bg-black text-white px-5 py-2 rounded-lg"
          >
            Refresh
          </button>

        </div>


        {/* No Orders */}

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">

            <h2 className="text-xl font-semibold">
              No Orders Found
            </h2>

            <p className="text-gray-500 mt-2">
              Customer orders will appear here.
            </p>

          </div>
        ) : (

          <div className="space-y-6">

            {orders.map((order) => (

              <div
                key={order._id}
                className="bg-white rounded-xl shadow p-6"
              >

                {/* Order Header */}

                <div className="flex justify-between items-center mb-6">

                  <div>

                    <h2 className="text-lg font-bold">
                      Order #{order._id.slice(-6)}
                    </h2>

                    <p className="text-sm text-gray-500">
                      {new Date(
                        order.createdAt
                      ).toLocaleString()}
                    </p>

                  </div>


                  {/* Status */}

                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(
                        order._id,
                        e.target.value
                      )
                    }
                    className="border rounded-lg px-4 py-2"
                  >

                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Confirmed">
                      Confirmed
                    </option>

                    <option value="Preparing">
                      Preparing
                    </option>

                    <option value="Out for Delivery">
                      Out for Delivery
                    </option>

                    <option value="Delivered">
                      Delivered
                    </option>

                    <option value="Cancelled">
                      Cancelled
                    </option>

                  </select>

                </div>


                {/* Customer Information */}

                <div className="grid md:grid-cols-3 gap-4 mb-6">

                  <div className="border rounded-lg p-4">

                    <p className="text-sm text-gray-500">
                      Customer
                    </p>

                    <p className="font-semibold">
                      {order.user?.name || "Unknown"}
                    </p>

                  </div>


                  <div className="border rounded-lg p-4">

                    <p className="text-sm text-gray-500">
                      Email
                    </p>

                    <p className="font-semibold">
                      {order.user?.email || "N/A"}
                    </p>

                  </div>


                  <div className="border rounded-lg p-4">

                    <p className="text-sm text-gray-500">
                      Phone
                    </p>

                    <p className="font-semibold">
                      {order.phone || order.user?.phone || "N/A"}
                    </p>

                  </div>

                </div>


                {/* Delivery Address */}

                <div className="border rounded-lg p-4 mb-6">

                  <p className="text-sm text-gray-500">
                    Delivery Address
                  </p>

                  <p className="font-semibold">
                    {order.deliveryAddress || "N/A"}
                  </p>

                </div>


                {/* Food Items */}

                <div>

                  <h3 className="font-bold text-lg mb-3">
                    Food Items
                  </h3>

                  <div className="space-y-3">

                    {order.items?.map(
                      (item, index) => (

                        <div
                          key={index}
                          className="flex justify-between items-center border-b pb-3"
                        >

                          <div>

                            <p className="font-semibold">
                              {item.name ||
                                item.menuItem?.name ||
                                "Food Item"}
                            </p>

                            <p className="text-sm text-gray-500">
                              ₹{item.price} ×{" "}
                              {item.quantity}
                            </p>

                          </div>

                          <p className="font-semibold">
                            ₹
                            {item.price *
                              item.quantity}
                          </p>

                        </div>

                      )
                    )}

                  </div>

                </div>


                {/* Total */}

                <div className="border-t mt-6 pt-5 flex justify-between">

                  <span className="text-xl font-bold">
                    Total Amount
                  </span>

                  <span className="text-xl font-bold">
                    ₹{order.totalAmount}
                  </span>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Orders;