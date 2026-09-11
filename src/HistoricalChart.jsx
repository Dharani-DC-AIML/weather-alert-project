export default function HistoricalChart({ year, days }) {
  const width = 280
  const height = 80
  const max = Math.max(...days)
  const min = Math.min(...days)
  const range = max - min || 1

  const points = days.map((d, i) => {
    const x = (i / (days.length - 1)) * width
    const y = height - ((d - min) / range) * height
    return `${x},${y}`
  }).join(' ')

  return (
    <div className="mb-3">
      <div className="text-xs text-slate-400 mb-1">{year}</div>
      <svg width={width} height={height} className="w-full">
        <polyline
          points={points}
          fill="none"
          stroke="#7dd3fc"
          strokeWidth="2"
        />
      </svg>
      <div className="flex justify-between text-xs text-slate-500 mt-1">
        <span>Low {min.toFixed(1)}°</span>
        <span>High {max.toFixed(1)}°</span>
      </div>
    </div>
  )
}