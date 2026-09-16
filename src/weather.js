// src/weather.js
import { supabase } from './supabaseClient'

export async function geocode(location) {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`
  )
  const data = await res.json()
  if (data.results && data.results.length > 0) {
    const r = data.results[0]
    return { name: r.name, lat: r.latitude, lon: r.longitude, state: r.admin1 || null }
  }

  const nomRes = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(location)}&limit=1`
  )
  const nomData = await nomRes.json()
  if (nomData.length > 0) {
    const r = nomData[0]
    return {
      name: r.display_name.split(',')[0],
      lat: parseFloat(r.lat),
      lon: parseFloat(r.lon),
      state: r.address?.state || null
    }
  }

  return null
}

export async function reverseGeocode(lat, lon) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1&accept-language=en`
  )
  const data = await res.json()
  const addr = data.address || {}
  const name = addr.suburb || addr.neighbourhood || addr.city_district || addr.town || addr.village || addr.city || data.display_name?.split(',')[0] || 'Current location'
  return { name, state: addr.state || null }
}

export async function getLocationByIP() {
  const res = await fetch('https://ipapi.co/json/')
  const data = await res.json()
  return { name: data.city, lat: data.latitude, lon: data.longitude, state: data.region || null }
}

export async function getWeather(lat, lon) {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,precipitation,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,weather_code&timezone=auto`
  )
  return res.json()
}

export function deriveAlerts(current, daily) {
  const alerts = []
  const rainAmount = daily.precipitation_sum ? daily.precipitation_sum[0] : 0
  const rainChance = daily.precipitation_probability_max ? daily.precipitation_probability_max[0] : 0

  if (rainAmount >= 115.6 || rainChance >= 90) {
    alerts.push({ severity: 'red', key: 'heavyRain' })
  } else if (rainChance >= 80) {
    alerts.push({ severity: 'amber', key: 'moderateRain' })
  }

  if (daily.temperature_2m_max[0] >= 40) alerts.push({ severity: 'red', key: 'extremeHeat' })
  if (current.wind_speed_10m >= 40) alerts.push({ severity: 'amber', key: 'highWind' })
  if (current.weather_code >= 95) alerts.push({ severity: 'red', key: 'thunderstorm' })
  return alerts
}

export async function getHistoricalWeather(lat, lon, dateStr) {
  const res = await fetch(
    `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${dateStr}&end_date=${dateStr}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`
  )
  return res.json()
}

export async function getMonthlyHistoricalStats(lat, lon, month, yearsBack) {
  const currentYear = new Date().getFullYear()
  const results = []

  for (let i = 1; i <= yearsBack; i++) {
    const year = currentYear - i
    const lastDay = new Date(year, month, 0).getDate()
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`
    const endDate = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`

    const res = await fetch(
      `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`
    )
    const data = await res.json()
    if (data.daily && data.daily.time) {
      const maxTemps = data.daily.temperature_2m_max
      const minTemps = data.daily.temperature_2m_min
      const rain = data.daily.precipitation_sum
      const avgMax = maxTemps.reduce((a, b) => a + b, 0) / maxTemps.length
      const avgMin = minTemps.reduce((a, b) => a + b, 0) / minTemps.length
      const totalRain = rain.reduce((a, b) => a + b, 0)
      results.push({ year, days: maxTemps, avgMax, avgMin, totalRain })
    }
  }

  return results
}

export function rainCategory(mm) {
  if (mm > 204.4) return { color: '#8B008B', label: 'Extremely heavy', level: 1 }
  if (mm >= 115.6) return { color: '#E53E3E', label: 'Very heavy', level: 0.85 }
  if (mm >= 64.5) return { color: '#F97316', label: 'Heavy', level: 0.7 }
  if (mm >= 15.6) return { color: '#F5A623', label: 'Moderate', level: 0.5 }
  if (mm >= 2.5) return { color: '#84CC16', label: 'Light', level: 0.3 }
  if (mm >= 0.1) return { color: '#38BDF8', label: 'Very light', level: 0.15 }
  return { color: '#94A3B8', label: 'No rain', level: 0 }
}

// Fetches a grid of points around (lat, lon) in a SINGLE Open-Meteo request
// (Open-Meteo supports comma-separated coordinates, up to 1000 per call).
export async function getRainGrid(lat, lon) {
  const HALF_EXTENT_DEG = 0.036 // roughly 4km each direction
  const STEPS = 7
  const points = []

  for (let i = 0; i < STEPS; i++) {
    for (let j = 0; j < STEPS; j++) {
      const dLat = -HALF_EXTENT_DEG + (i / (STEPS - 1)) * (HALF_EXTENT_DEG * 2)
      const dLon = -HALF_EXTENT_DEG + (j / (STEPS - 1)) * (HALF_EXTENT_DEG * 2)
      points.push({ lat: lat + dLat, lon: lon + dLon })
    }
  }

  const latStr = points.map(p => p.lat.toFixed(4)).join(',')
  const lonStr = points.map(p => p.lon.toFixed(4)).join(',')

  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latStr}&longitude=${lonStr}&current=precipitation`
  )
  const data = await res.json()
  const list = Array.isArray(data) ? data : [data]

  return points.map((p, index) => ({
    lat: p.lat,
    lon: p.lon,
    rainMm: list[index]?.current?.precipitation ?? 0
  }))
}

const CACHE_FRESH_MS = 30 * 60 * 1000 // 30 minutes

export async function getWeatherCached(loc) {
  const roundedLat = Math.round(loc.lat * 100) / 100
  const roundedLon = Math.round(loc.lon * 100) / 100

  let { data: existingLoc } = await supabase
    .from('locations')
    .select('id')
    .eq('lat', roundedLat)
    .eq('lon', roundedLon)
    .limit(1)
    .maybeSingle()

  let locationId = existingLoc?.id

  if (!locationId) {
    const { data: newLoc } = await supabase
      .from('locations')
      .insert({ name: loc.name, lat: roundedLat, lon: roundedLon })
      .select('id')
      .single()
    locationId = newLoc?.id
  }

  if (locationId) {
    const { data: cached } = await supabase
      .from('weather_cache')
      .select('forecast_json, fetched_at')
      .eq('location_id', locationId)
      .maybeSingle()

    if (cached && (Date.now() - new Date(cached.fetched_at).getTime()) < CACHE_FRESH_MS) {
      return cached.forecast_json
    }
  }

  const fresh = await getWeather(loc.lat, loc.lon)

  if (locationId) {
    await supabase
      .from('weather_cache')
      .upsert({ location_id: locationId, forecast_json: fresh, fetched_at: new Date().toISOString() })
  }

  return fresh
}

export async function getClimateTrends(lat, lon) {
  const end = new Date()
  end.setDate(end.getDate() - 2)
  const start = new Date(end)
  start.setDate(start.getDate() - 395)

  const fmt = d => d.toISOString().split('T')[0]

  const res = await fetch(
    `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${fmt(start)}&end_date=${fmt(end)}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`
  )
  const data = await res.json()
  const d = data.daily
  if (!d || !d.time || d.time.length === 0) return null

  const startOf30 = Math.max(d.time.length - 30, 0)
  const highs30 = d.temperature_2m_max.slice(startOf30)
  const lows30 = d.temperature_2m_min.slice(startOf30)
  const rain30 = d.precipitation_sum.slice(startOf30)

  const avgHigh = highs30.reduce((a, b) => a + b, 0) / highs30.length
  const avgLow = lows30.reduce((a, b) => a + b, 0) / lows30.length
  const totalRain = rain30.reduce((a, b) => a + b, 0)
  const hottestDay = Math.max(...highs30)

  const monthMap = {}
  d.time.forEach((dateStr, i) => {
    const key = dateStr.slice(0, 7)
    if (!monthMap[key]) monthMap[key] = 0
    monthMap[key] += d.precipitation_sum[i]
  })

  const months = Object.keys(monthMap).sort().slice(-12).map(key => {
    const [y, m] = key.split('-')
    return {
      label: new Date(Number(y), Number(m) - 1, 1).toLocaleDateString(undefined, { month: 'short' }),
      rain: monthMap[key]
    }
  })

  return { avgHigh, avgLow, totalRain, hottestDay, months }
}
export async function getMarineAdvisory(lat, lon) {
  try {
    const res = await fetch(
      `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&current=wave_height,wind_wave_height&timezone=auto`
    )
    const data = await res.json()
    const waveHeight = data.current?.wave_height
    if (waveHeight === null || waveHeight === undefined) return null
    return { waveHeight, windWaveHeight: data.current?.wind_wave_height ?? null }
  } catch {
    return null
  }
}

export function marineSeverity(waveHeight) {
  if (waveHeight >= 2.5) return 'avoid'
  if (waveHeight >= 1.25) return 'caution'
  return 'safe'
}