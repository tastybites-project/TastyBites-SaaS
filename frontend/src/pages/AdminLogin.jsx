import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";


function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      console.log("Login Response:", response.data);

      const { token, user } = response.data;

      // Check user data
      if (!user) {
        setError("User information not received.");
        return;
      }

      // Admin check
      const role = String(user.role || "").toLowerCase();

      if (role !== "admin") {
        setError("Only Admin can login here.");
        return;
      }

      // Save JWT
      localStorage.setItem("token", token);

      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      // Go to dashboard
      navigate("/admin/dashboard");

    } catch (error) {
      console.error("Login error:", error);

      setError(
        error.response?.data?.message ||
        "Login failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">

      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold text-center">
          TastyBites
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Admin Login
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-5">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Email */}

          <label className="block font-medium mb-2">
            Email
          </label>

          <input
            type="email"
            placeholder="admin@tastybites.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
            className="w-full border p-3 rounded-lg mb-5"
          />

          {/* Password */}

          <label className="block font-medium mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Admin123"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
            className="w-full border p-3 rounded-lg mb-6"
          />

          {/* Login */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 disabled:bg-gray-400"
          >
            {loading
              ? "Logging in..."
              : "Login as Admin"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default AdminLogin;