import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    const res = await axios.post(
      "http://localhost:8888/.netlify/functions/auth-login",
      {
        email,
        password,
      }
    );

    localStorage.setItem("token", res.data.token);
    navigate("/app"); // 👈 THIS is the redirect
  } catch (err) {
    console.log(err);
    alert("Login failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-[#111] p-8 rounded-xl w-full max-w-sm">
        <h2 className="text-xl mb-4">Login</h2>

        <input
          className="w-full mb-4 p-2 rounded bg-black text-white"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full mb-3 p-2 rounded bg-black text-white placeholder-gray-400"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-[var(--primary)] py-2 rounded text-white hover:opacity-90 transition"
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
  );
}