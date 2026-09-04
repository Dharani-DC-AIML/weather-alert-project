// src/LandingPage.jsx
import VideoReveal from './VideoReveal'

export default function LandingPage({ languages, onSelect }) {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col relative">
      <VideoReveal />

      <nav className="relative z-10 flex justify-between items-center px-6 sm:px-10 py-4 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2E86FF] to-[#7dd3fc]" />

          <span
            className="text-white text-base font-medium"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            WeatherBuddy
          </span>
        </div>
      </nav>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 min-h-0">
        <h1
          className="text-white font-normal leading-[1.05] tracking-tight text-4xl sm:text-6xl md:text-7xl"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Know the sky.
          <br />
          <span className="text-slate-300">
            Decide with confidence.
          </span>
        </h1>

        <p
          className="text-slate-200 text-sm sm:text-base mt-4 max-w-lg leading-relaxed font-medium"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Real forecasts and alerts, in your own language.
        </p>

        <div className="mt-8 w-full max-w-sm">
          <p
            className="text-slate-300 text-xs tracking-widest uppercase mb-3 font-medium"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Choose your language
          </p>

          <div className="grid grid-cols-2 gap-2.5">
            {languages.map((l, i) => (
              <button
                key={l.code}
                onClick={() => onSelect(l.code)}
                className={`bg-black/30 border border-white/20 rounded-full px-5 py-3 text-sm text-white hover:bg-black/50 transition-colors font-medium ${
                  i === 4 ? 'col-span-2' : ''
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}