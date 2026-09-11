import { Link, useLocation } from "react-router-dom";

function AdminLayout({ children }) {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/admin/login";
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      name: "Menu Management",
      path: "/admin/menu",
    },
    {
      name: "Users",
      path: "/admin/users",
    },
    {
      name: "Orders",
      path: "/admin/orders",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-black text-white min-h-screen hidden md:block">

        {/* Logo */}
        <div className="px-6 py-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold">
            TastyBites
          </h1>

          <p className="text-gray-400 text-sm mt-1">
            Admin Panel
          </p>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">

          {menuItems.map((item) => {
            const active =
              location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-3 rounded-lg ${
                  active
                    ? "bg-white text-black"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                {item.name}
              </Link>
            );
          })}

        </nav>

        {/* Logout */}
        <div className="px-4 mt-8">

          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg"
          >
            Logout
          </button>

        </div>

      </aside>


      {/* Main Content */}
      <div className="flex-1">

        {/* Top Navbar */}
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">

          <h2 className="font-semibold text-lg">
            Admin Panel
          </h2>

          <p className="text-sm text-gray-500">
            TastyBites Admin
          </p>

        </header>


        {/* Page */}
        <main className="p-6 md:p-10">
          {children}
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;