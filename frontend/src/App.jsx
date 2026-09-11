import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// =========================
// Public Pages
// =========================

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MenuDetails from "./pages/MenuDetails";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";



// =========================
// Admin Pages
// =========================

import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import MenuManagement from "./pages/admin/MenuManagement";
import AddMenuItem from "./pages/admin/AddMenuItem";
import EditMenuItem from "./pages/admin/EditMenuItem";
import Users from "./pages/admin/Users";
import Orders from "./pages/admin/Orders";

// =========================
// Protected Route
// =========================

import ProtectedRoute from "./components/ProtectedRoute";


// =========================
// App
// =========================

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =================================
            PUBLIC ROUTES
        ================================= */}

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Customer Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Customer Register */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* Customer Menu */}
        <Route
          path="/menu"
          element={<Menu />}
        />

        {/* Customer Cart */}
        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />
        <Route
          path="/my-orders"
          element={<MyOrders />}
          />

        {/* Menu Details */}
        <Route
          path="/menu/:id"
          element={<MenuDetails />}
        />


        {/* =================================
            ADMIN LOGIN
        ================================= */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />


        {/* =================================
            ADMIN DASHBOARD
        ================================= */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute adminOnly>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        {/* =================================
            ADMIN MENU MANAGEMENT
        ================================= */}

        <Route
          path="/admin/menu"
          element={
            <ProtectedRoute adminOnly>
              <MenuManagement />
            </ProtectedRoute>
          }
        />


        {/* =================================
            ADD MENU ITEM
        ================================= */}

        <Route
          path="/admin/menu/add"
          element={
            <ProtectedRoute adminOnly>
              <AddMenuItem />
            </ProtectedRoute>
          }
        />


        {/* =================================
            EDIT MENU ITEM
        ================================= */}

        <Route
          path="/admin/menu/edit/:id"
          element={
            <ProtectedRoute adminOnly>
              <EditMenuItem />
            </ProtectedRoute>
          }
        />


        {/* =================================
            ADMIN USERS
        ================================= */}

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute adminOnly>
              <Users />
            </ProtectedRoute>
          }
        />


        {/* =================================
            ADMIN ORDERS
        ================================= */}

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute adminOnly>
              <Orders />
            </ProtectedRoute>
          }
        />


        {/* =================================
            UNKNOWN URL
        ================================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;