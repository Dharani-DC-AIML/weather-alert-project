// src/HeatLayer.jsx
import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet.heat'
import { rainCategory } from './weather'

export default function HeatLayer({ points }) {
  const map = useMap()

  useEffect(() => {
    if (!points || points.length === 0) return

    const heatPoints = points.map(p => [
      p.lat,
      p.lon,
      rainCategory(p.rainMm).level || 0.05
    ])

    const layer = L.heatLayer(heatPoints, {
      radius: 40,
      blur: 30,
      maxZoom: 15,
      max: 1,
      gradient: {
        0.0: '#94A3B8',
        0.15: '#38BDF8',
        0.3: '#84CC16',
        0.5: '#F5A623',
        0.7: '#F97316',
        0.85: '#E53E3E',
        1.0: '#8B008B'
      }
    }).addTo(map)

    return () => {
      map.removeLayer(layer)
    }
  }, [map, points])

  return null
}