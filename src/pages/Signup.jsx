import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError("");
    
    // Validation
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    
    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return;
    }
    
    if (!password.trim()) {
      setError("Password is required");
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const res = await fetch("/.netlify/functions/auth-signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.token) {
  localStorage.setItem("token", data.token);
  navigate("/app"); // ✅ ProtectedRoute will allow access
} else {
      setError(data.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f0f10] text-white p-4">
      <div className="w-full max-w-sm">
        <button
          onClick={() => navigate("/")}
          className="btn mb-6 text-gray-400 hover:text-white transition rounded"
        >
          ← Back
        </button>
        <div className="w-full p-5 sm:p-6 md:p-8 bg-[#111] rounded-xl border border-gray-800">
          <h2 className="text-2xl font-semibold mb-6">Create Account</h2>

          <input
            placeholder="Email"
            className="w-full mb-4 p-3 rounded bg-black text-white placeholder-gray-500 text-base border border-gray-700 focus:border-purple-500 focus:outline-none"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />

          <input
            type="password"
            placeholder="Password (min 6 characters)"
            className="w-full mb-6 p-3 rounded bg-black text-white placeholder-gray-500 text-base border border-gray-700 focus:border-purple-500 focus:outline-none"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
          />

          {error && (
            <div className="mb-4 p-3 bg-red-600/20 border border-red-600 rounded text-red-200 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleSignup}
            className="btn w-full bg-indigo-600 hover:bg-indigo-500 rounded-lg font-semibold"
          >
            Signup
          </button>

          <p className="text-sm mt-4 text-gray-400">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-indigo-400 cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}