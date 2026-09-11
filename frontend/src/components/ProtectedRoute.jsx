import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, adminOnly = false }) {

  // Get token
  const token = localStorage.getItem("token");

  // Get user safely
  let user = null;

  try {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      user = JSON.parse(storedUser);
    }
  } catch (error) {
    console.error("Invalid user data:", error);

    localStorage.removeItem("user");
  }


  // ========================================
  // NO TOKEN
  // ========================================

  if (!token) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }


  // ========================================
  // ADMIN CHECK
  // ========================================

  if (adminOnly) {

    // No user
    if (!user) {
      return (
        <Navigate
          to="/admin/login"
          replace
        />
      );
    }

    // Convert role to lowercase
    const role = String(
      user.role || ""
    ).toLowerCase();

    // Only admin allowed
    if (role !== "admin") {
      return (
        <Navigate
          to="/admin/login"
          replace
        />
      );
    }
  }


  // ========================================
  // ACCESS GRANTED
  // ========================================

  return children;
}

export default ProtectedRoute;