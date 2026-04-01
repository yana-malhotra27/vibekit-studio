import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PublicPage() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      const res = await fetch(
        `/.netlify/functions/page-public?slug=${slug}`
      );
      const data = await res.json();
      setPage(data);
    };

    fetchPage();
  }, [slug]);

  if (!page) return <div>Loading...</div>;

  let styles = {};

if (page.theme === "dark") {
  styles = {
    background: "#0b0b0c",
    color: "#fff",
  };
} else if (page.theme === "light") {
  styles = {
    background: "#fff",
    color: "#000",
  };
} else if (page.theme === "retro") {
  styles = {
    background: "#fef08a",
    color: "#000",
  };
}
return (
  <div style={styles} className="min-h-screen flex items-center justify-center">
  <div className="text-center max-w-xl">
    <h1 className="text-4xl font-bold">
      {page.sections?.hero?.title}
    </h1>

    <p className="mt-4 text-lg opacity-80">
      {page.sections?.hero?.subtitle}
    </p>
  </div>
</div>
);
}