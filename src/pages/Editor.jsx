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
    }

    setLoading(false);
  };

  fetchPage();
}, [id]);

const [gallery, setGallery] = useState([""]);

const handleSave = async () => {
  const token = localStorage.getItem("token");

  await fetch("/.netlify/functions/pages-update", {
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
  },
})
  });
  console.log("gallery:", gallery);

  alert("Saved!");
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
    <div className="flex min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* LEFT PANEL */}
      <div className="w-[320px] p-6 border-r border-gray-800 bg-[#0f0f10] backdrop-blur">
        <h2 className="text-lg font-semibold mb-6">Page Settings</h2>

        <label className="text-sm text-gray-400">Title</label>
        <input
          className="w-full mt-1 mb-4 p-2 rounded bg-[#111]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="text-sm text-gray-400">Theme</label>
        <select
  value={theme}
  onChange={(e) => setTheme(e.target.value)}
  className="w-full mt-1 mb-6 p-2 rounded bg-[#111]"
>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
          <option value="retro">Retro</option>
        </select>

        <label className="text-sm text-gray-400">Hero Title</label>
        <input
          className="w-full mt-1 mb-3 p-2 rounded bg-[#111]"
          value={hero.title}
          onChange={(e) => setHero({ ...hero, title: e.target.value })}
        />

        <label className="text-sm text-gray-400">Hero Subtitle</label>
        <input
          className="w-full mt-1 mb-4 p-2 rounded bg-[#111]"
          value={hero.subtitle}
          onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
        />

        <div className="mt-8">
  <h2 className="text-lg mb-2">Features</h2>

  {features.map((f, i) => (
    <div key={i} className="mb-3 p-3 bg-[var(--card)] rounded">
      <input
        placeholder="Title"
        className="w-full mb-2 p-2 bg-black rounded"
        value={f.title}
        onChange={(e) => {
          const updated = [...features];
          updated[i].title = e.target.value;
          setFeatures(updated);
        }}
      />

      <input
        placeholder="Description"
        className="w-full p-2 bg-black rounded"
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
    className="mt-2 px-3 py-1 bg-[var(--primary)] rounded"
  >
    + Add Feature
  </button>

<div className="mt-8">
  <h2 className="text-lg mb-2">Gallery</h2>

  {gallery.map((img, i) => (
    <input
      key={i}
      placeholder="Image URL"
      className="w-full mb-2 p-2 bg-black rounded"
      value={img}
      onChange={(e) => {
        const updated = [...gallery];
        updated[i] = e.target.value;
        setGallery(updated);
      }}
    />
  ))}

  <button
    onClick={() => setGallery([...gallery, ""])}
    className="mt-2 px-3 py-1 bg-[var(--primary)] rounded"
  >
    + Add Image
  </button>
</div>


        {/* BUTTONS 🔥 */}
        <button
  onClick={handleSave}
  className="w-full mb-2 bg-indigo-600 hover:bg-indigo-500 transition py-2 rounded-lg"
>
  Save
</button>

<button
  onClick={handlePublish}
  className="w-full border border-gray-600 hover:bg-gray-800 transition py-2 rounded-lg"
>
  Publish
</button>
      </div>

      {/* PREVIEW */}
      <div className="flex-1 p-6">
        <Preview
  title={title}
  theme={theme}
  hero={hero}
  features={features}
  gallery={gallery}
/>
      </div>
    </div>
  );
}
