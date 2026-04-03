import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { themes } from "../themes";

export default function PublicPage() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      const res = await fetch(`/.netlify/functions/page-public?slug=${slug}`);

      if (!res.ok) {
        setError("Page not found");
        setPage(null);
        return;
      }

      const data = await res.json();
      if (!data) {
        setError("Page not found");
        setPage(null);
        return;
      }

      setPage(data);
      setError(null);
    };

    fetchPage();
  }, [slug]);

  if (!page) return <div className="p-10 text-center">Loading...</div>;

  if (error) return <div className="p-10 text-center">{error}</div>;

  const features = page.sections?.features || [];
  const currentTheme = themes[page.theme] || themes.dark;
  const gallery = page.sections?.gallery || [];
  console.log("FULL PAGE:", page);

  const contactEnabled = page.sections?.contact?.enabled;
  const contactEmail = page.sections?.contact?.email;
  const handleSubmit = async () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  await fetch("/.netlify/functions/contact-submit", {
    method: "POST",
    body: JSON.stringify({
      pageId: page._id,
      name,
      email,
      message,
    }),
  });

  alert("Message sent!");
};


  return (
  <div
    style={currentTheme}
    className="min-h-screen bg-[var(--bg)] text-[var(--text)] overflow-x-hidden"
  >
    <div className="w-full p-4 sm:p-6 md:p-10 text-center">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
        {page.sections?.hero?.title}
      </h1>

      <p className="mt-3 md:mt-4 opacity-80 text-xs sm:text-sm md:text-base">
        {page.sections?.hero?.subtitle}
      </p>

      {/* FEATURES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mt-8 md:mt-10">
        {features.map((f, i) => (
          <div key={i} className="p-4 sm:p-5 rounded-xl bg-[var(--card)]">
            <h3 className="text-base md:text-lg font-semibold">{f.title}</h3>
            <p className="text-xs md:text-sm opacity-80 mt-2">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* ✅ GALLERY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-8 md:mt-10">
        {gallery.map((img, i) => (
          img?.trim() && (
            <img
              key={i}
              src={img}
              alt="gallery"
              className="w-full h-32 sm:h-36 md:h-40 object-cover rounded-xl"
            />
          )
        ))}
      </div>

      {contactEnabled && (
        <div className="mt-12 md:mt-14 max-w-2xl mx-auto text-left px-2 sm:px-4 md:px-0">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Contact Us</h2>

          <div className="grid gap-3 md:gap-4">
            <input
              placeholder="Your Name"
              className="w-full p-3 rounded bg-[var(--card)] text-xs sm:text-sm md:text-base border border-gray-700 focus:border-purple-500 focus:outline-none"
              id="name"
            />

            <input
              placeholder="Email"
              className="w-full p-3 rounded bg-[var(--card)] text-xs sm:text-sm md:text-base border border-gray-700 focus:border-purple-500 focus:outline-none"
              id="email"
            />

            <textarea
              placeholder="Message"
              className="w-full p-3 rounded bg-[var(--card)] text-xs sm:text-sm md:text-base min-h-[120px] border border-gray-700 focus:border-purple-500 focus:outline-none resize-none"
              id="message"
            />

            <button
              onClick={handleSubmit}
              className="btn w-full bg-[var(--primary)] rounded text-white font-semibold hover:opacity-90"
            >
              Send
            </button>
          </div>
        </div>
      )}

      
    </div>
  </div>
);
}
