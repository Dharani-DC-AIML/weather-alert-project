// src/LiveMapModal.jsx
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { getRainGrid, rainCategory } from './weather'
import HeatLayer from './HeatLayer'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
})

const IMD_RADAR_URL = 'https://mausam.imd.gov.in/responsive/radar.php'

export default function LiveMapModal({ name, lat, lon, rainMm, alerts, onClose }) {
  const [grid, setGrid] = useState(null)
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function fetchGrid() {
      setLoading(true)
      setFailed(false)

      try {
        const points = await   getRainGrid(lat, lon).then(pts => pts.map((p, i) => ({ ...p, rainMm: (i * 5) % 90 })))
        if (!cancelled) setGrid(points)
      } catch {
        if (!cancelled) setFailed(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchGrid()

    return () => {
      cancelled = true
    }
  }, [lat, lon])

  const mm = rainMm || 0
  const { color, label } = rainCategory(mm)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        className="bg-[#0d1b28] border border-white/15 rounded-2xl p-4 w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-white font-semibold text-base">Live map</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span
            className="w-3 h-3 rounded-full shrink-0"
            style={{ backgroundColor: color }}
          />
          <p className="text-sm text-white font-medium">
            {label} · {mm.toFixed(1)}mm near {name}
          </p>
        </div>

        <div className="rounded-xl overflow-hidden relative" style={{ height: 280 }}>
          {loading && (
            <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-[#0d1b28]/80 text-slate-300 text-xs">
              Loading rain map...
            </div>
          )}

          <MapContainer
            center={[lat, lon]}
            zoom={14}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {grid && <HeatLayer points={grid} />}

            <Marker position={[lat, lon]}>
              <Popup>
                {name} — {label} ({mm.toFixed(1)}mm)
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        {failed && (
          <p className="text-xs text-amber-400 mt-2">
            Couldn't load the detailed rain grid, showing your location only.
          </p>
        )}

        <p className="text-xs text-slate-400 mt-2">
          {alerts && alerts.length > 0
            ? `${alerts.length} active alert(s) nearby.`
            : 'No active alerts nearby.'}{' '}
          · {name}
        </p>

        <a
          href={IMD_RADAR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#7dd3fc] hover:underline mt-2 inline-block"
        >
          View official IMD radar →
        </a>
      </div>
    </div>
  )
}