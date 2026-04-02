import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { themes } from "../themes";

export default function PublicPage() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      const res = await fetch(`/.netlify/functions/page-public?slug=${slug}`);
      const data = await res.json();
      setPage(data);
    };

    fetchPage();
  }, [slug]);

  if (!page) return <div>Loading...</div>;
  const features = page.sections?.features || [];
  const currentTheme = themes[page.theme] || themes.dark;
  const gallery = page.sections?.gallery || [];
  console.log("FULL PAGE:", page);
  return (
  <div
    style={currentTheme}
    className="min-h-screen bg-[var(--bg)] text-[var(--text)]"
  >
    <div className="p-10 text-center">
      <h1 className="text-4xl font-bold">
        {page.sections?.hero?.title}
      </h1>

      <p className="mt-4 opacity-80">
        {page.sections?.hero?.subtitle}
      </p>

      {/* FEATURES */}
      <div className="grid md:grid-cols-3 gap-4 mt-10">
        {features.map((f, i) => (
          <div key={i} className="p-4 rounded-xl bg-[var(--card)]">
            <h3 className="text-lg font-semibold">{f.title}</h3>
            <p className="text-sm opacity-80 mt-2">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* ✅ GALLERY (MOVE HERE) */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
        {gallery.map((img, i) => (
          img?.trim() && (
            <img
              key={i}
              src={img}
              alt="gallery"
              className="w-full h-40 object-cover rounded-xl"
            />
          )
        ))}
      </div>
    </div>
  </div>
);
}
