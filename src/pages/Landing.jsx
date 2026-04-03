import { Link } from "react-router-dom";

export default function Landing() {
return ( <div className="min-h-screen lg:h-screen overflow-y-auto lg:overflow-hidden bg-black text-white px-4 md:px-6 py-4 md:py-6 lg:py-4 flex flex-col">

  {/* NAVBAR */}
  <nav className="flex justify-between items-center mb-8 md:mb-12">
    <h1 className="text-2xl font-bold tracking-wide text-white">VibeKit</h1>

    <div className="flex gap-3 sm:gap-4">
      {/* LOGIN */}
      <Link
        to="/login"
        className="btn text-xs sm:text-sm text-gray-300 hover:text-white transition rounded-full hover:bg-white/10"
      >
        Login
      </Link>

      {/* SIGN UP */}
      <Link
        to="/signup"
        className="btn bg-purple-600 hover:bg-purple-700 rounded-full text-xs sm:text-sm text-white transition shadow-lg"
      >
        Sign Up
      </Link>
    </div>
  </nav>

  {/* HERO */}
  <section className="text-center py-6 md:py-8 lg:py-5">
    <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-float" style={{
      textShadow: '0 0 10px rgba(147, 51, 234, 0.4), 0 0 20px rgba(147, 51, 234, 0.25)'
    }}>
      Create stunning pages <br className="hidden md:block" /> with zero effort
    </h2>

    <p className="text-gray-300 mb-6 text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-2">
      Pick a theme, customize your content, and publish instantly.
    </p>

    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-2 sm:px-0">
      {/* START BUILDING */}
      <Link
        to="/signup"
        className="btn bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white text-sm md:text-base font-semibold transition transform hover:scale-105 shadow-lg"
      >
        Start Building
      </Link>

      {/* LIVE DEMO */}
      <Link
        to="/signup"
        className="btn border-2 border-white/40 rounded-full text-white text-sm md:text-base transition hover:bg-white/10 hover:scale-105"
      >
        Live Demo
      </Link>
    </div>
  </section>

  {/* THEME PREVIEW */}
  <section className="w-full py-6 md:py-10 lg:py-6">
    <div className="max-w-6xl mx-auto">
      <h3 className="text-lg md:text-2xl font-semibold mb-6 md:mb-10 text-center">
        Choose your vibe
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 px-2 md:px-0">
        
        {/* Theme Card 1 */}
        <div className="rounded-2xl p-4 sm:p-6 bg-[#111] border border-gray-800 hover:scale-105 transition">
          <div className="h-32 sm:h-40 rounded-xl mb-4 bg-gradient-to-br from-purple-500 to-pink-500"></div>
          <h4 className="text-base md:text-lg font-semibold mb-2">Dark Neon</h4>
          <p className="text-gray-400 text-xs sm:text-sm">
            Bold, glowing and futuristic feel.
          </p>
        </div>

        {/* Theme Card 2 */}
        <div className="rounded-2xl p-4 sm:p-6 bg-white text-black hover:scale-105 transition">
          <div className="h-32 sm:h-40 rounded-xl mb-4 bg-gray-200"></div>
          <h4 className="text-base md:text-lg font-semibold mb-2">Minimal Light</h4>
          <p className="text-gray-600 text-xs sm:text-sm">
            Clean and distraction-free design.
          </p>
        </div>

        {/* Theme Card 3 */}
        <div className="rounded-2xl p-4 sm:p-6 bg-yellow-200 text-black hover:scale-105 transition">
          <div className="h-32 sm:h-40 rounded-xl mb-4 bg-yellow-400"></div>
          <h4 className="text-base md:text-lg font-semibold mb-2">Retro Pop</h4>
          <p className="text-xs sm:text-sm">
            Fun, colorful and expressive vibe.
          </p>
        </div>

      </div>
    </div>
  </section>

</div>
);
}
