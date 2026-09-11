import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";

function Dashboard() {
  const [menuCount, setMenuCount] = useState(0);
  const [user, setUser] = useState(null);

  // =========================
  // LOAD USER + MENU COUNT
  // =========================

  useEffect(() => {
    // Get logged-in user
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("User data error:", error);
      }
    }

    // Get menu items
    fetchMenuItems();
  }, []);


  // =========================
  // FETCH MENU ITEMS
  // =========================

  const fetchMenuItems = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/menu-items"
      );

      const data = await response.json();

      if (response.ok) {
        // যদি backend সরাসরি array দেয়
        if (Array.isArray(data)) {
          setMenuCount(data.length);
        }

        // যদি backend { menuItems: [] } দেয়
        else if (Array.isArray(data.menuItems)) {
          setMenuCount(data.menuItems.length);
        }

        // যদি backend { count: 2 } দেয়
        else if (typeof data.count === "number") {
          setMenuCount(data.count);
        }
      }

    } catch (error) {
      console.error("Menu fetch error:", error);
    }
  };


  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/admin/login";
  };


  // =========================
  // DASHBOARD
  // =========================

  return (
    <AdminLayout>

      {/* ================= HEADER ================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            Admin Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome, {user?.name || "TastyBites Admin"}
          </p>

        </div>

      </div>


      {/* ================= ADMIN INFORMATION ================= */}

      <div className="bg-white rounded-xl shadow p-6 mb-8">

        <h2 className="text-xl font-bold mb-5">
          Admin Information
        </h2>

        <div className="space-y-3">

          <p className="text-gray-700">

            <span className="font-semibold">
              Email:
            </span>{" "}

            {user?.email || "admin@tastybites.com"}

          </p>


          <p className="text-gray-700">

            <span className="font-semibold">
              Role:
            </span>{" "}

            {user?.role || "Admin"}

          </p>

        </div>

      </div>


      {/* ================= DASHBOARD CARDS ================= */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


        {/* MENU ITEMS */}

        <div className="bg-white rounded-xl shadow p-6">

          <p className="text-gray-500">
            Total Menu Items
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {menuCount}
          </h2>

        </div>


        {/* USERS */}

        <div className="bg-white rounded-xl shadow p-6">

          <p className="text-gray-500">
            Total Users
          </p>

          <h2 className="text-4xl font-bold mt-3">
            0
          </h2>

        </div>


        {/* ORDERS */}

        <div className="bg-white rounded-xl shadow p-6">

          <p className="text-gray-500">
            Total Orders
          </p>

          <h2 className="text-4xl font-bold mt-3">
            0
          </h2>

        </div>

      </div>


      {/* ================= QUICK ACTIONS ================= */}

      <div className="bg-white rounded-xl shadow p-6 mt-8">

        <h2 className="text-xl font-bold mb-5">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">

          <a
            href="/admin/menu"
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
          >
            Manage Menu
          </a>


          <a
            href="/admin/users"
            className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100"
          >
            Manage Users
          </a>


          <a
            href="/admin/orders"
            className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100"
          >
            View Orders
          </a>

        </div>

      </div>

    </AdminLayout>
  );
}

export default Dashboard;