import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================
  // CUSTOMER LOGIN
  // =========================

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      if (!email || !password) {
        setError("Please enter email and password.");
        setLoading(false);
        return;
      }

      // =========================
      // CALL BACKEND API
      // =========================

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log("Customer Login Response:", data);

      // =========================
      // LOGIN FAILED
      // =========================

      if (!response.ok) {
        setError(
          data.message ||
          data.error ||
          "Invalid email or password."
        );

        return;
      }

      // =========================
      // CHECK TOKEN
      // =========================

      if (!data.token) {
        setError(
          "Login successful, but JWT token was not received."
        );

        return;
      }

      // =========================
      // SAVE TOKEN
      // =========================

      localStorage.setItem(
        "token",
        data.token
      );

      // =========================
      // SAVE USER
      // =========================

      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      console.log("Customer login successful");

      // =========================
      // GO TO MENU
      // =========================

      navigate("/menu");

    } catch (error) {
      console.error("Login Error:", error);

      setError(
        "Cannot connect to server. Please make sure backend is running."
      );

    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UI
  // =========================

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        {/* Header */}

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold">
            TastyBites
          </h1>

          <p className="text-gray-500 mt-2">
            Customer Login
          </p>

        </div>


        {/* Error */}

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}


        {/* Login Form */}

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          {/* Email */}

          <div>

            <label className="block font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />

          </div>


          {/* Password */}

          <div>

            <label className="block font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />

          </div>


          {/* Login Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-400"
          >

            {loading
              ? "Logging in..."
              : "Login"}

          </button>

        </form>


        {/* Register */}

        <p className="text-center text-gray-500 mt-6">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-black font-semibold hover:underline"
          >
            Register
          </Link>

        </p>


        {/* Admin Login */}

        <div className="text-center mt-4">

          <Link
            to="/admin/login"
            className="text-sm text-gray-500 hover:text-black"
          >
            Admin Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;