import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");

    try {

      await API.post("/auth/register", {
        name,
        email,
        password
      });

      setSuccess("Account created successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {

  console.log("FULL ERROR:", err);
  console.log("RESPONSE DATA:", err.response?.data);

  setError(
    err.response?.data?.message ||
    JSON.stringify(err.response?.data) ||
    "Registration failed"
  );

}

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h1>

        <p className="text-gray-500 text-center mb-6">
          Join LifeAtlas and track your productivity
        </p>

        {/* Error Message */}

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Success Message */}

        {success && (
          <div className="bg-green-100 text-green-700 p-2 rounded mb-4 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Register
          </button>

        </form>

        <p className="text-sm text-center text-gray-500 mt-4">

          Already have an account?

          <Link to="/" className="text-blue-500 ml-1">
            Login
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Register;
