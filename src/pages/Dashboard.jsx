import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [pages, setPages] = useState([]); // ✅ only one declaration
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPages = async () => {
    try {
      const res = await axios.get("/.netlify/functions/pages-get", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      setPages(res.data || []);
      setLoading(false); // ✅ important
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const createPage = async () => {
    try {
      await axios.post(
        "/.netlify/functions/pages-create",
        { title: "New Page" },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      fetchPages();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Loading check
  if (loading) return <div className="p-10">Loading pages...</div>;

  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl">Your Pages</h1>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="bg-red-600 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      <button
        onClick={createPage}
        className="mb-4 bg-[var(--primary)] px-4 py-2 rounded"
      >
        + Create Page
      </button>

      <div className="grid md:grid-cols-2 gap-4">
        {pages.length === 0 ? (
          <p className="text-gray-400">No pages yet</p>
        ) : (
          pages.map((p) => (
            <div
              key={p._id}
              onClick={() => navigate(`/editor/${p._id}`)}
              className="p-4 bg-[#111] rounded-xl cursor-pointer hover:scale-105 transition"
            >
              <h2 className="text-lg">{p.title}</h2>
              <p className="text-sm text-gray-400">{p.status}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}