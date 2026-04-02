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

      const sortedPages = (res.data || []).sort((a, b) => {
        const dateA = new Date(b.updatedAt || b.createdAt);
        const dateB = new Date(a.updatedAt || a.createdAt);
        return dateA - dateB;
      });

      setPages(sortedPages);
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

  const handleDelete = async (pageId) => {
  const token = localStorage.getItem("token");

  const confirmDelete = window.confirm("Delete this page?");
  if (!confirmDelete) return;

  await fetch(getApiUrl("/.netlify/functions/pages-delete"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ pageId }),
  });

  // 🔥 remove from UI instantly
  setPages((prev) => prev.filter((p) => p._id !== pageId));
};

  // ✅ Loading check
  if (loading) return <div className="p-10">Loading pages...</div>;

  return (
    <div className="min-h-screen p-4 md:p-6 bg-black text-white">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-300 via-white to-pink-300 bg-clip-text text-transparent">Your Pages</h1>
          <p className="text-sm text-gray-400 mt-1">{pages.length} drafts (newest first)</p>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="bg-red-600 px-4 py-2 rounded-full text-sm md:text-base hover:bg-red-500 transition"
        >
          Logout
        </button>
      </div>

      <button
        onClick={createPage}
        className="mb-4 bg-gradient-to-r from-purple-500 to-blue-500 px-5 py-3 rounded-full text-base font-semibold shadow-lg hover:from-purple-600 hover:to-blue-600 transition"
      >
        + Create Page
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {pages.length === 0 ? (
    <p className="text-gray-400">No pages yet</p>
  ) : (
    pages.map((p) => (
      <div
        key={p._id}
        className="p-5 bg-gradient-to-br from-[#111] to-[#0f0f15] border border-gray-800 rounded-2xl shadow-xl"
      >
        <h2 className="text-lg text-white font-semibold">{p.title}</h2>
        <p className="text-sm text-gray-400">{p.status}</p>

        {/* 🔥 ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-2 mt-4">

          {/* VIEW */}
          {p.status === "published" && (
            <button
              onClick={() => window.open(`/site/${p.slug}`, "_blank")}
              className="px-4 py-2 text-sm bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full shadow-lg transition"
            >
              View
            </button>
          )}

          {/* EDIT */}
          <button
            onClick={() => navigate(`/editor/${p._id}`)}
            className="px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-full shadow-lg transition"
          >
            Edit
          </button>

          {/* DELETE */}
          <button
            onClick={() => handleDelete(p._id)}
            className="px-4 py-2 text-sm bg-red-600 hover:bg-red-500 rounded-full shadow-lg transition"
          >
            Delete
          </button>

        </div>
      </div>
    ))
  )}
</div>
    </div>
  );
}