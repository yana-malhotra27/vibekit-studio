import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
  setError("");
  
  // Validation
  if (!email.trim()) {
    setError("Email is required");
    return;
  }
  
  if (!password.trim()) {
    setError("Password is required");
    return;
  }
  
  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setError("Please enter a valid email");
    return;
  }
  
  try {
    const res = await axios.post(
      "/.netlify/functions/auth-login",
      {
        email,
        password,
      }
    );

    localStorage.setItem("token", res.data.token);
    navigate("/app");
  } catch (err) {
    console.log(err);
    setError(err.response?.data?.message || "Login failed. Check your credentials.");
  }
};

  return (
    <div className="min-h-screen bg-[#0f0f10] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <button
          onClick={() => navigate("/")}
          className="btn mb-6 text-gray-400 hover:text-white transition rounded"
        >
          ← Back
        </button>
        <div className="bg-[#111] p-5 sm:p-6 md:p-8 rounded-xl border border-gray-800">
          <h2 className="text-2xl font-semibold mb-6">Login</h2>

          <input
            className="w-full mb-4 p-3 rounded bg-black text-white placeholder-gray-500 text-base border border-gray-700 focus:border-purple-500 focus:outline-none"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />

          <input
            className="w-full mb-6 p-3 rounded bg-black text-white placeholder-gray-500 text-base border border-gray-700 focus:border-purple-500 focus:outline-none"
            placeholder="Password"
            type="password"
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
            onClick={handleLogin}
            className="btn w-full bg-[var(--primary)] rounded text-white hover:opacity-90 transition font-semibold"
          >
            Login
          </button>
          <p className="text-sm mt-4">
    Don’t have an account?{" "}
    <span
      onClick={() => navigate("/signup")}
      className="text-indigo-400 cursor-pointer"
    >
      Signup
    </span>
  </p>
        </div>
      </div>
    </div>
  );
}