export default function ThinkingLoader() {
  return (
    <div className="relative w-16 h-14 mx-auto">
      <style>{`
        @keyframes cloudOpenLeft {
          0%, 12% { transform: translateX(0); }
          30%, 68% { transform: translateX(-9px); }
          85%, 100% { transform: translateX(0); }
        }
        @keyframes cloudOpenRight {
          0%, 12% { transform: translateX(0); }
          30%, 68% { transform: translateX(9px); }
          85%, 100% { transform: translateX(0); }
        }
        @keyframes sunPop {
          0%, 15% { opacity: 0; transform: scale(0.5); }
          32%, 62% { opacity: 1; transform: scale(1); }
          75%, 100% { opacity: 0; transform: scale(0.5); }
        }
        @keyframes sunRay {
          0%, 15% { opacity: 0; }
          32%, 62% { opacity: 1; }
          75%, 100% { opacity: 0; }
        }
        @keyframes boltFlash {
          0%, 74% { opacity: 0; }
          78% { opacity: 1; }
          82% { opacity: 0.3; }
          86% { opacity: 1; }
          92% { opacity: 0.2; }
          96% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes rainDrop {
          0%, 76% { opacity: 0; transform: translateY(0); }
          80% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(12px); }
        }
        .cloud-left { animation: cloudOpenLeft 4.5s ease-in-out infinite; }
        .cloud-right { animation: cloudOpenRight 4.5s ease-in-out infinite; }
        .sun-body { animation: sunPop 4.5s ease-in-out infinite; }
        .sun-ray { animation: sunRay 4.5s ease-in-out infinite; }
        .bolt { animation: boltFlash 4.5s ease-in-out infinite; }
        .drop1 { animation: rainDrop 4.5s ease-in-out infinite; animation-delay: 0s; }
        .drop2 { animation: rainDrop 4.5s ease-in-out infinite; animation-delay: 0.2s; }
        .drop3 { animation: rainDrop 4.5s ease-in-out infinite; animation-delay: 0.4s; }
        .drop4 { animation: rainDrop 4.5s ease-in-out infinite; animation-delay: 0.1s; }
      `}</style>

      <svg viewBox="0 0 64 56" className="w-full h-full">
        <g className="sun-ray" stroke="#facc15" strokeWidth="2" strokeLinecap="round">
          <line x1="32" y1="6" x2="32" y2="1" />
          <line x1="20" y1="10" x2="17" y2="6" />
          <line x1="44" y1="10" x2="47" y2="6" />
          <line x1="14" y1="18" x2="9" y2="18" />
          <line x1="50" y1="18" x2="55" y2="18" />
        </g>

        <circle className="sun-body" cx="32" cy="18" r="9" fill="#facc15" />

        <path
          className="bolt"
          d="M30 26 L26 34 L30 34 L27 42 L36 30 L31 30 L34 26 Z"
          fill="#fde68a"
        />

        <line className="drop1" x1="16" y1="40" x2="14" y2="47" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" />
        <line className="drop2" x1="24" y1="42" x2="22" y2="49" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" />
        <line className="drop3" x1="40" y1="42" x2="38" y2="49" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" />
        <line className="drop4" x1="48" y1="40" x2="46" y2="47" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" />

        <g className="cloud-left">
          <ellipse cx="18" cy="30" rx="12" ry="9" fill="#e2e8f0" />
          <ellipse cx="10" cy="33" rx="8" ry="6" fill="#e2e8f0" />
        </g>

        <g className="cloud-right">
          <ellipse cx="46" cy="30" rx="12" ry="9" fill="#e2e8f0" />
          <ellipse cx="54" cy="33" rx="8" ry="6" fill="#e2e8f0" />
        </g>
      </svg>
    </div>
  )
}