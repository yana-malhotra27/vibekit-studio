import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setIsSubmitting(true);

    // Validation
    if (!email.trim()) {
      setError("Email is required");
      setIsSubmitting(false);
      return;
    }

    if (!password.trim()) {
      setError("Password is required");
      setIsSubmitting(false);
      return;
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      setIsSubmitting(false);
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
    } finally {
      setIsSubmitting(false);
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
        <div className="bg-gradient-to-br from-[#12131a] to-[#0c1014] p-5 sm:p-6 md:p-8 rounded-xl border border-gray-800 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Login</h2>

          <div className="relative mb-4">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">📧</span>
            <input
              className="w-full pl-11 pr-3 py-3 rounded bg-[#0f1116] text-white placeholder-gray-500 text-base border border-gray-700 focus:border-purple-500 focus:outline-none"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
          </div>

          <div className="relative mb-6">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔒</span>
            <input
              className="w-full pl-11 pr-11 py-3 rounded bg-[#0f1116] text-white placeholder-gray-500 text-base border border-gray-700 focus:border-purple-500 focus:outline-none"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? '🙈' : '👁'}
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-600/20 border border-red-600 rounded text-red-200 text-sm">
              {error}
            </div>
          )}  

          <button
            onClick={handleLogin}
            disabled={isSubmitting}
            className={`btn w-full rounded text-white font-semibold ${isSubmitting ? 'bg-gray-600 cursor-not-allowed' : 'bg-[var(--primary)] hover:opacity-90'}`}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
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