import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    const res = await fetch(getApiUrl("/.netlify/functions/auth-signup"), {
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
      alert(data.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f0f10] text-white p-4">
      <div className="w-full max-w-sm">
        <button
          onClick={() => navigate("/")}
          className="mb-4 text-gray-400 hover:text-white transition"
        >
          ← Back
        </button>
        <div className="w-full max-w-sm p-6 bg-[#111] rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Create Account</h2>

          <input
            placeholder="Email"
            className="w-full mb-3 p-3 rounded bg-black text-base"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-3 rounded bg-black text-base"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleSignup}
            className="w-full bg-indigo-600 hover:bg-indigo-500 py-2 rounded-lg text-base"
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