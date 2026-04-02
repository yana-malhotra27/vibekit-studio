import { themes } from "../themes.js";

export default function Preview({ theme, hero, features, gallery }) {
  const currentTheme = themes[theme] || themes.dark;

  return (
    <div
      style={currentTheme} // 🔥 APPLY VARIABLES
      className="min-h-screen bg-[var(--bg)] text-[var(--text)]"
    >
      <div className="p-4 md:p-10 text-center">
        <h1 className="text-2xl md:text-4xl font-bold">
          {hero?.title}
        </h1>
        <p className="mt-4 opacity-80 text-sm md:text-base">
          {hero?.subtitle}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
  {features?.map((f, i) => (
    <div
      key={i}
      className="p-4 rounded-xl bg-[var(--card)]"
    >
      <h3 className="text-lg font-semibold">
        {f.title}
      </h3>
      <p className="text-sm opacity-80 mt-2">
        {f.desc}
      </p>
    </div>
  ))}
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
  {gallery?.map((img, i) => (
    img && (
      <img
        key={i}
        src={img}
        alt="gallery"
        className="w-full h-32 md:h-40 object-cover rounded-xl"
      />
    )
  ))}
</div>
      <p className="mt-4 text-sm md:text-base">This is your live preview 🚀</p>
      </div>
    </div>
  );
}