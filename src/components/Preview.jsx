export default function Preview({ title, theme, hero }) {
  let styles = {};

  if (theme === "dark") {
    styles = {
      background: "#0b0b0c",
      color: "#fff",
    };
  } else if (theme === "light") {
    styles = {
      background: "#fff",
      color: "#000",
    };
  } else if (theme === "retro") {
    styles = {
      background: "#fef08a",
      color: "#000",
    };
  }

  return (
    <div
      style={styles}
      className="min-h-[500px] p-10 rounded-xl"
    >
      <h1 className="text-3xl font-bold">
  {hero?.title}
</h1>

<p className="mt-4">
  {hero?.subtitle}
</p>
      <p className="mt-4">This is your live preview 🚀</p>
    </div>
  );
}