import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    if (password !== confirmPassword) {
      setError("Password and confirm password must match");
      return;
    }

    setIsSubmitting(true);

    try {
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
    } catch (err) {
      setError("Signup failed due to a network error");
      console.error(err);
    } finally {
      setIsSubmitting(false);
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
        <div className="w-full p-5 sm:p-6 md:p-8 bg-gradient-to-br from-[#12131a] to-[#0c1014] rounded-xl border border-gray-800 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-white">Create Account</h2>

          <div className="relative mb-3">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">👤</span>
            <input
              placeholder="Email"
              className="w-full pl-11 pr-3 py-3 rounded bg-[#0f1116] text-white placeholder-gray-500 text-base border border-gray-700 focus:border-purple-500 focus:outline-none"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
          </div>

          <div className="relative mb-3">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔒</span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password (min 6 characters)"
              className="w-full pl-11 pr-11 py-3 rounded bg-[#0f1116] text-white placeholder-gray-500 text-base border border-gray-700 focus:border-purple-500 focus:outline-none"
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

          <div className="relative mb-6">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔐</span>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              className="w-full pl-11 pr-11 py-3 rounded bg-[#0f1116] text-white placeholder-gray-500 text-base border border-gray-700 focus:border-purple-500 focus:outline-none"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showConfirmPassword ? '🙈' : '👁'}
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-600/20 border border-red-600 rounded text-red-200 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleSignup}
            disabled={isSubmitting}
            className={`btn w-full rounded-lg font-semibold ${isSubmitting ? 'bg-gray-600 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500'}`}
          >
            {isSubmitting ? 'Creating account...' : 'Signup'}
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