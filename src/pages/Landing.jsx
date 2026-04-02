import { Link } from "react-router-dom";

export default function Landing() {
return ( <div className="h-screen bg-black text-white px-4 md:px-6 py-6 overflow-hidden flex flex-col">

  {/* NAVBAR */}
  <nav className="flex justify-between items-center mb-8">
    <h1 className="text-2xl font-bold tracking-wide text-white">VibeKit</h1>

    <div className="flex gap-4">
      {/* LOGIN */}
      <Link
        to="/login"
        className="text-sm text-gray-300 hover:text-white transition py-2 px-4 rounded-full hover:bg-white/10"
      >
        Login
      </Link>

      {/* SIGN UP */}
      <Link
        to="/signup"
        className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full text-sm text-white transition shadow-lg"
      >
        Sign Up
      </Link>
    </div>
  </nav>

  {/* HERO */}
  <section className="text-center flex-1 flex flex-col justify-center">
    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-float" style={{
      textShadow: '0 0 20px rgba(147, 51, 234, 0.6), 0 0 40px rgba(147, 51, 234, 0.4), 0 0 80px rgba(147, 51, 234, 0.25)'
    }}>
      Create stunning pages <br className="hidden md:block" /> with zero effort
    </h2>

    <p className="text-gray-300 mb-6 text-base md:text-lg max-w-2xl mx-auto">
      Pick a theme, customize your content, and publish instantly.
    </p>

    <div className="flex flex-col sm:flex-row justify-center gap-4">
      {/* START BUILDING */}
      <Link
        to="/signup"
        className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-full text-lg text-white font-semibold transition transform hover:scale-105 shadow-lg"
      >
        Start Building
      </Link>

      {/* LIVE DEMO */}
      <button className="border-2 border-white/30 px-6 py-3 rounded-full text-lg text-white transition hover:bg-white/10 hover:scale-105">
        Live Demo
      </button>
    </div>
  </section>

  {/* THEME PREVIEW */}
  <section className="max-w-6xl mx-auto px-4 md:px-6">
    <h3 className="text-xl md:text-2xl font-semibold mb-10 text-center">
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
