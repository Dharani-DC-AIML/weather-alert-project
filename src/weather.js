import { supabase } from './supabaseClient'
export async function geocode(location) {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`
  )
  const data = await res.json()
  if (data.results && data.results.length > 0) {
    const r = data.results[0]
    return { name: r.name, lat: r.latitude, lon: r.longitude }
  }

  const nomRes = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&limit=1`
  )
  const nomData = await nomRes.json()
  if (nomData.length > 0) {
    const r = nomData[0]
    return { name: r.display_name.split(',')[0], lat: parseFloat(r.lat), lon: parseFloat(r.lon) }
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
  return name
}
export async function getLocationByIP() {
  const res = await fetch('https://ipapi.co/json/')
  const data = await res.json()
  return { name: data.city, lat: data.latitude, lon: data.longitude }
}

export async function getWeather(lat, lon) {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,precipitation,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code&timezone=auto`
  )
  return res.json()
}

export function deriveAlerts(current, daily) {
  const alerts = []
  if (daily.precipitation_probability_max[0] >= 80) alerts.push({ severity: 'amber', key: 'heavyRain' })
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