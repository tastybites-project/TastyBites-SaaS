import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";

function MenuManagement() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // GET ALL MENU ITEMS
  // =========================

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/menu-items"
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to load menu items.");
        return;
      }

      if (Array.isArray(data)) {
        setMenuItems(data);
      } else if (Array.isArray(data.menuItems)) {
        setMenuItems(data.menuItems);
      } else {
        setMenuItems([]);
      }

    } catch (error) {
      console.error(error);
      setError("Cannot connect to backend server.");
    } finally {
      setLoading(false);
    }
  };


  // =========================
  // DELETE MENU ITEM
  // =========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this menu item?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/menu-items/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Menu item deleted successfully.");

        fetchMenuItems();
      } else {
        alert(
          data.message || "Failed to delete menu item."
        );
      }

    } catch (error) {
      console.error(error);
      alert("Server error.");
    }
  };


  // =========================
  // LOAD DATA
  // =========================

  useEffect(() => {
    fetchMenuItems();
  }, []);


  return (
    <AdminLayout>

      {/* ================= HEADER ================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Menu Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your TastyBites menu items
          </p>
        </div>


        {/* ADD BUTTON */}

        <a
          href="/admin/menu/add"
          className="mt-4 md:mt-0 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
        >
          + Add Menu Item
        </a>

      </div>


      {/* ================= ERROR ================= */}

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}


      {/* ================= MENU TABLE ================= */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        {loading ? (

          <div className="p-8 text-center text-gray-500">
            Loading menu items...
          </div>

        ) : menuItems.length === 0 ? (

          <div className="p-8 text-center text-gray-500">
            No menu items found.
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-100">

                <tr>

                  <th className="text-left px-6 py-4">
                    Name
                  </th>

                  <th className="text-left px-6 py-4">
                    Category
                  </th>

                  <th className="text-left px-6 py-4">
                    Price
                  </th>

                  <th className="text-left px-6 py-4">
                    Availability
                  </th>

                  <th className="text-left px-6 py-4">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {menuItems.map((item) => (

                  <tr
                    key={item._id}
                    className="border-t"
                  >

                    <td className="px-6 py-4 font-medium">
                      {item.name}
                    </td>


                    <td className="px-6 py-4 text-gray-600">
                      {item.category}
                    </td>


                    <td className="px-6 py-4">
                      ₹{item.price}
                    </td>


                    <td className="px-6 py-4">

                      {item.availability ? (

                        <span className="text-green-600 font-medium">
                          Available
                        </span>

                      ) : (

                        <span className="text-red-600 font-medium">
                          Unavailable
                        </span>

                      )}

                    </td>


                    <td className="px-6 py-4">

                      <div className="flex gap-2">

                        {/* EDIT */}

                        <a
                          href={`/admin/menu/edit/${item._id}`}
                          className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                        >
                          Edit
                        </a>


                        {/* DELETE */}

                        <button
                          onClick={() =>
                            handleDelete(item._id)
                          }
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </AdminLayout>
  );
}

export default MenuManagement;