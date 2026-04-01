import { Link } from "react-router-dom";

export default function Landing() {
return ( <div className="min-h-screen bg-black text-white px-6 py-10">

  {/* NAVBAR */}
  <nav className="flex justify-between items-center mb-20">
    <h1 className="text-xl font-semibold tracking-wide">VibeKit</h1>

    <div className="flex gap-4">
      {/* LOGIN */}
      <Link
        to="/login"
        className="text-sm text-gray-400 hover:text-white transition"
      >
        Login
      </Link>

      {/* GET STARTED */}
      <Link
        to="/login"
        className="bg-[var(--primary)] px-4 py-2 rounded-xl text-sm text-white"
      >
        Get Started
      </Link>
    </div>
  </nav>

  {/* HERO */}
  <section className="text-center max-w-4xl mx-auto mb-24">
    <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
      Create stunning pages <br /> with zero effort
    </h2>

    <p className="text-gray-300 mb-8 text-lg">
      Pick a theme, customize your content, and publish instantly.
    </p>

    <div className="flex justify-center gap-4">
      {/* START BUILDING */}
      <Link
        to="/login"
        className="bg-[var(--primary)] px-6 py-3 rounded-xl text-lg text-white"
      >
        Start Building
      </Link>

      {/* LIVE DEMO */}
      <button className="border border-gray-700 px-6 py-3 rounded-xl text-lg hover:bg-white hover:text-black transition">
        Live Demo
      </button>
    </div>
  </section>

  {/* THEME PREVIEW */}
  <section className="max-w-6xl mx-auto">
    <h3 className="text-2xl font-semibold mb-10 text-center">
      Choose your vibe
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* Theme Card 1 */}
      <div className="rounded-2xl p-6 bg-[#111] border border-gray-800 hover:scale-105 transition">
        <div className="h-40 rounded-xl mb-4 bg-gradient-to-br from-purple-500 to-pink-500"></div>
        <h4 className="text-lg font-semibold mb-2">Dark Neon</h4>
        <p className="text-gray-400 text-sm">
          Bold, glowing and futuristic feel.
        </p>
      </div>

      {/* Theme Card 2 */}
      <div className="rounded-2xl p-6 bg-white text-black hover:scale-105 transition">
        <div className="h-40 rounded-xl mb-4 bg-gray-200"></div>
        <h4 className="text-lg font-semibold mb-2">Minimal Light</h4>
        <p className="text-gray-600 text-sm">
          Clean and distraction-free design.
        </p>
      </div>

      {/* Theme Card 3 */}
      <div className="rounded-2xl p-6 bg-yellow-200 text-black hover:scale-105 transition">
        <div className="h-40 rounded-xl mb-4 bg-yellow-400"></div>
        <h4 className="text-lg font-semibold mb-2">Retro Pop</h4>
        <p className="text-sm">
          Fun, colorful and expressive vibe.
        </p>
      </div>

    </div>
  </section>

</div>
);
}
