import { Link } from "react-router-dom";

function MenuItems() {

  const menuItems = [
    {
      id: 1,
      name: "Classic Burger",
      category: "Main Course",
      price: 250,
      availability: true
    },
    {
      id: 2,
      name: "Cheese Pizza",
      category: "Main Course",
      price: 350,
      availability: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Menu Items
        </h1>

        <Link
          to="/admin/menu-items/add"
          className="bg-black text-white px-5 py-3 rounded-lg"
        >
          + Add Menu Item
        </Link>

      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="text-left p-4">
                Name
              </th>

              <th className="text-left p-4">
                Category
              </th>

              <th className="text-left p-4">
                Price
              </th>

              <th className="text-left p-4">
                Availability
              </th>

              <th className="text-left p-4">
                Action
              </th>
            </tr>

          </thead>

          <tbody>

            {menuItems.map((item) => (
              <tr key={item.id} className="border-t">

                <td className="p-4">
                  {item.name}
                </td>

                <td className="p-4">
                  {item.category}
                </td>

                <td className="p-4">
                  ₹{item.price}
                </td>

                <td className="p-4">
                  {item.availability
                    ? "In Stock"
                    : "Out of Stock"}
                </td>

                <td className="p-4">

                  <Link
                    to={`/admin/menu-items/edit/${item.id}`}
                    className="mr-4 text-blue-600"
                  >
                    Edit
                  </Link>

                  <button className="text-red-600">
                    Delete
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default MenuItems;