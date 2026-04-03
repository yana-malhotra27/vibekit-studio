import { useState } from "react";
import Preview from "../components/Preview";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function Editor() {
  
  const [theme, setTheme] = useState("dark");
  const [title, setTitle] = useState("My Page");
  const [hero, setHero] = useState({
    title: "Welcome to my site",
    subtitle: "This is my page",
  });
  const [features, setFeatures] = useState([
  { title: "", desc: "" }
]);
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
  const fetchPage = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("/.netlify/functions/pages-get", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    const page = data.find((p) => String(p._id) === id);
    
    if (page) {
      setTitle(page.title || "My Page");
      setTheme(page.theme || "dark");
      setHero(
  page.sections?.hero || {
    title: "Welcome",
    subtitle: "Start editing",
  }
);
setFeatures(page.sections?.features || [{ title: "", desc: "" }]);
setGallery(page.sections?.gallery || [""]);
setContactEnabled(page.sections?.contact?.enabled ?? true);
setContactEmail(page.sections?.contact?.email || "");
    }

    setLoading(false);
  };

  fetchPage();
}, [id]);

const [gallery, setGallery] = useState([""]);

const [contactEnabled, setContactEnabled] = useState(true);
const [contactEmail, setContactEmail] = useState("");
const [saveError, setSaveError] = useState("");
const [saveSuccess, setSaveSuccess] = useState("");

const handleSave = async () => {
  setSaveError("");
  setSaveSuccess("");

  // Validation
  if (!title.trim()) {
    setSaveError("Page title is required");
    return;
  }

  if (!hero.title.trim()) {
    setSaveError("Hero title is required");
    return;
  }

  if (!hero.subtitle.trim()) {
    setSaveError("Hero subtitle is required");
    return;
  }

  if (contactEnabled && !contactEmail.trim()) {
    setSaveError("Email is required for contact form");
    return;
  }

  if (contactEnabled) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail)) {
      setSaveError("Please enter a valid email address");
      return;
    }
  }

  const token = localStorage.getItem("token");

  try {
    const res = await fetch("/.netlify/functions/pages-update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
    pageId: id,
    title,
    theme,
    sections: {
      hero,
      features,
      gallery: gallery.filter((img) => img.trim() !== ""),
      contact: {
      enabled: contactEnabled,
      email: contactEmail,
    },
    },
  })
    });

    if (res.ok) {
      setSaveSuccess("Page saved successfully!");
      setTimeout(() => setSaveSuccess(""), 3000);
    } else {
      setSaveError("Failed to save page");
    }
  } catch (err) {
    setSaveError("Error saving page");
    console.error(err);
  }
};

const handlePublish = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch("/.netlify/functions/pages-publish", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ pageId: id, title }),
  });

  const data = await res.json();

  const url = `${window.location.origin}/site/${data.slug}`;

  navigator.clipboard.writeText(url);

  alert("Published & link copied!");
};

if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-black text-white overflow-x-hidden">
      {/* MOBILE SIDEBAR TOGGLE */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="btn md:hidden fixed top-4 left-4 z-50 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg"
      >
        {sidebarOpen ? '✕' : '☰'}
      </button>

      {/* LEFT PANEL */}
      <aside className={`w-full md:w-[360px] p-4 sm:p-5 md:p-6 border-r border-gray-800 bg-[#0f0f10]/80 backdrop-blur fixed md:relative z-40 h-screen md:h-auto overflow-y-auto transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="mb-4 flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">Page Settings</h2>
          <button
            onClick={() => window.history.back()}
            className="btn text-xs md:text-sm text-gray-300 hover:text-white transition rounded bg-white/10"
          >
            Back
          </button>
        </div>

        <label className="text-xs md:text-sm text-gray-400">Title</label>
        <input
          className="w-full mt-2 mb-4 p-3 rounded-lg bg-[#111] border border-gray-700 placeholder-gray-500 text-base focus:border-purple-500 focus:outline-none"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setSaveError("");
          }}
        />

        <label className="text-xs md:text-sm text-gray-400">Theme</label>
        <select
  value={theme}
  onChange={(e) => setTheme(e.target.value)}
  className="w-full mt-2 mb-6 p-3 rounded-lg bg-[#111] border border-gray-700 text-base focus:border-purple-500 focus:outline-none"
>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
          <option value="retro">Retro</option>
        </select>

        <label className="text-xs md:text-sm text-gray-400">Hero Title</label>
        <input
          className="w-full mt-1 mb-3 p-3 rounded bg-[#111] text-base border border-gray-700 focus:border-purple-500 focus:outline-none"
          value={hero.title}
          onChange={(e) => setHero({ ...hero, title: e.target.value })}
        />

        <label className="text-xs md:text-sm text-gray-400">Hero Subtitle</label>
        <input
          className="w-full mt-1 mb-4 p-3 rounded bg-[#111] text-base border border-gray-700 focus:border-purple-500 focus:outline-none"
          value={hero.subtitle}
          onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
        />

        <div className="mt-8">
  <h2 className="text-lg mb-2">Features</h2>

  {features.map((f, i) => (
    <div key={i} className="mb-3 p-3 bg-[var(--card)] rounded">
      <div className="flex justify-between items-start gap-2 mb-2">
        <div className="grow">
          <input
            placeholder="Title"
            className="w-full p-2 bg-black rounded"
            value={f.title}
            onChange={(e) => {
              const updated = [...features];
              updated[i].title = e.target.value;
              setFeatures(updated);
            }}
          />
        </div>

        <button
          onClick={() => setFeatures(features.filter((_, idx) => idx !== i))}
          className="text-xs px-2 py-1 bg-red-600 rounded text-white hover:bg-red-500"
        >
          Remove
        </button>
      </div>

      <textarea
        placeholder="Description"
        className="w-full p-2 bg-black rounded min-h-[72px]"
        value={f.desc}
        onChange={(e) => {
          const updated = [...features];
          updated[i].desc = e.target.value;
          setFeatures(updated);
        }}
      />
    </div>
  ))}

  </div>

  <button
    onClick={() =>
      setFeatures([...features, { title: "", desc: "" }])
    }
    className="btn mt-2 bg-[var(--primary)] rounded"
  >
    + Add Feature
  </button>

<div className="mt-6 md:mt-8">
  <h2 className="text-base md:text-lg mb-3">Gallery</h2>

  {gallery.map((img, i) => {
    const isValidUrl = img && (() => {
      try {
        const url = new URL(img);
        if (!['http:', 'https:'].includes(url.protocol)) return false;
        const path = url.pathname.toLowerCase();
        const hasImageExtension = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(path);
        const hasImageHint = /(jpg|jpeg|png|gif|webp|svg)/i.test(url.search);
        const gstaticImage = url.hostname.endsWith('gstatic.com');
        return hasImageExtension || hasImageHint || gstaticImage;
      } catch {
        return false;
      }
    })();
    
    return (
    <div key={i} className="flex items-center gap-2 mb-3">
      <input
        placeholder="Image URL (https://...)"
        className={`grow p-3 bg-black rounded text-base border focus:border-purple-500 focus:outline-none ${
          img && !isValidUrl ? 'border-red-600' : 'border-gray-700'
        }`}
        value={img}
        onChange={(e) => {
          const updated = [...gallery];
          updated[i] = e.target.value;
          setGallery(updated);
        }}
      />
      {img && !isValidUrl && (
        <span className="text-xs text-red-400 shrink-0">Invalid URL</span>
      )}

      <button
        onClick={() => setGallery(gallery.filter((_, idx) => idx !== i))}
        className="btn text-xs bg-red-600 text-white rounded hover:bg-red-500 shrink-0"
      >
        Remove
      </button>
    </div>
  );
  })}

  <button
    onClick={() => setGallery([...gallery, ""])}
    className="btn mt-2 bg-[var(--primary)] rounded"
  >
    + Add Image
  </button>
</div>

<div className="mt-6 md:mt-8">
  <h2 className="text-base md:text-lg mb-3">Contact Form</h2>

  <label className="flex items-center gap-2 text-sm">
    <input
      type="checkbox"
      checked={contactEnabled}
      onChange={(e) => setContactEnabled(e.target.checked)}
      className="w-4 h-4 cursor-pointer"
    />
    Enable Contact Form
  </label>
  <input
  type="email"
  placeholder="Receive messages at email"
  className={`w-full mt-3 p-3 rounded bg-black text-base border focus:border-purple-500 focus:outline-none ${
    contactEnabled && contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail) ? 'border-red-600' : 'border-gray-700'
  }`}
  value={contactEmail}
  disabled={!contactEnabled}
  onChange={(e) => {
    setContactEmail(e.target.value);
    setSaveError("");
  }}
/>
</div>

{saveError && (
  <div className="mt-4 p-3 bg-red-600/20 border border-red-600 rounded text-red-200 text-sm">
    {saveError}
  </div>
)}

{saveSuccess && (
  <div className="mt-4 p-3 bg-green-600/20 border border-green-600 rounded text-green-200 text-sm">
    {saveSuccess}
  </div>
)}

        {/* BUTTONS 🔥 */}
        <button
  onClick={handleSave}
  className="btn w-full mt-6 md:mt-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition rounded-full text-white font-semibold shadow-lg"
>
  Save
</button>

<button
  onClick={handlePublish}
  className="btn w-full mt-3 border border-gray-600 hover:bg-gray-800 transition rounded-full text-white font-semibold"
>
  Publish
</button>
<p className="text-xs text-gray-400 mt-2">Save before you publish</p>
      </aside>

      {/* PREVIEW */}
      <main className="flex-1 p-3 sm:p-4 md:p-6 pt-20 sm:pt-16 md:pt-6 w-full md:w-auto overflow-x-hidden">
        <div className="h-full rounded-2xl border border-gray-800 bg-[#05050a] shadow-2xl overflow-hidden">
          <Preview
            title={title}
            theme={theme}
            hero={hero}
            features={features}
            gallery={gallery}
          />
        </div>
      </main>
    </div>
  );
}
