import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================
  // REGISTER
  // =========================

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Password check
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            phone,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log("Register Response:", data);

      if (!response.ok) {
        setError(
          data.message ||
          data.error ||
          "Registration failed."
        );

        return;
      }

      // =========================
      // SUCCESS
      // =========================

      setSuccess(
        data.message ||
        "Registration successful!"
      );

      // Clear form
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");

      // Go to login after 1 second
      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
      console.error("Register Error:", error);

      setError(
        "Cannot connect to server. Please make sure backend is running on port 5000."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        {/* Header */}

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold">
            TastyBites
          </h1>

          <p className="text-gray-500 mt-2">
            Create your account
          </p>

        </div>


        {/* Error */}

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-5">
            {error}
          </div>
        )}


        {/* Success */}

        {success && (
          <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg mb-5">
            {success}
          </div>
        )}


        {/* Form */}

        <form
          onSubmit={handleRegister}
          className="space-y-4"
        >

          {/* Name */}

          <div>

            <label className="block font-medium mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />

          </div>


          {/* Email */}

          <div>

            <label className="block font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />

          </div>


          {/* Phone */}

          <div>

            <label className="block font-medium mb-2">
              Phone
            </label>

            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
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
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />

          </div>


          {/* Confirm Password */}

          <div>

            <label className="block font-medium mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />

          </div>


          {/* Register Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-400"
          >
            {loading
              ? "Creating Account..."
              : "Register"}
          </button>

        </form>


        {/* Login Link */}

        <p className="text-center text-gray-500 mt-6">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-black font-semibold hover:underline"
          >
            Login
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

export default Register;