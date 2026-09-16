// src/App.jsx
import ThinkingLoader from './ThinkingLoader'
import { getHelplineForState, nationalHelpline } from './helplines'
import { getMarineAdvisory, marineSeverity } from './weather'
import { useState, useRef, useEffect, lazy, Suspense } from 'react'
import { parseQuery } from './gemini'
import {
  geocode,
  getLocationByIP,
  reverseGeocode,
  deriveAlerts,
  getHistoricalWeather,
  getMonthlyHistoricalStats,
  getWeatherCached,
  getClimateTrends
} from './weather'
import { supabase } from './supabaseClient'
import {
  weatherCode,
  advisoryKey,
  situationalTips,
  agriAdvisoryKey
} from './weatherIcons'
import { languages, t } from './translations'
import { useVoice, speak } from './useVoice'
import LandingPage from './LandingPage'
import HistoricalChart from './HistoricalChart'

const LiveMapModal = lazy(() => import('./LiveMapModal'))

function LocationIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function MicIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="2" width="6" height="11" rx="3" />
      <path d="M5 10v1a7 7 0 0 0 14 0v-1" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  )
}

function ArrowUpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  )
}

export default function App() {
  const [language, setLanguage] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [voiceMode, setVoiceMode] = useState(false)
  const [mapFor, setMapFor] = useState(null)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')
  const [trendsOpen, setTrendsOpen] = useState(false)
  const [trendsData, setTrendsData] = useState(null)
  const [trendsLoading, setTrendsLoading] = useState(false)
  const [currentLoc, setCurrentLoc] = useState(null)
  const [helplineOpen, setHelplineOpen] = useState({})
  const [marineOpen, setMarineOpen] = useState({})
  const [marineData, setMarineData] = useState({})
  const [marineLoading, setMarineLoading] = useState({})
  const [agriOpen, setAgriOpen] = useState({})
  const bottomRef = useRef(null)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme(current => (current === 'dark' ? 'light' : 'dark'))
  }

  async function openTrendsForLocation(loc) {
    setTrendsLoading(true)
    setTrendsOpen(true)

    if (!loc?.lat) {
      setTrendsData(null)
      setTrendsLoading(false)
      return
    }

    setCurrentLoc(loc)
    const data = await getClimateTrends(loc.lat, loc.lon)
    setTrendsData(data)
    setTrendsLoading(false)
  }

  async function openTrends() {
    let loc = currentLoc

    if (!loc) {
      setTrendsLoading(true)
      setTrendsOpen(true)

      try {
        if (navigator.geolocation) {
          loc = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
              async pos => {
                const geo = await reverseGeocode(pos.coords.latitude, pos.coords.longitude)
                resolve({ name: geo.name, lat: pos.coords.latitude, lon: pos.coords.longitude, state: geo.state })
              },
              reject,
              { timeout: 15000, enableHighAccuracy: true, maximumAge: 0 }
            )
          })
        } else {
          loc = await getLocationByIP()
        }
      } catch {
        loc = await getLocationByIP()
      }
    }

    await openTrendsForLocation(loc)
  }

  async function handleMarineClick(index, lat, lon) {
    setMarineOpen(o => ({ ...o, [index]: !o[index] }))
    if (marineData[index] !== undefined) return
    setMarineLoading(l => ({ ...l, [index]: true }))
    const result = await getMarineAdvisory(lat, lon)
    setMarineData(d => ({ ...d, [index]: result }))
    setMarineLoading(l => ({ ...l, [index]: false }))
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function selectLanguage(code) {
    localStorage.setItem('lang', code)
    setLanguage(code)
    setMessages([
      {
        role: 'ai',
        text: t[code].greeting
      }
    ])
  }

  const { listening, start } = useVoice(
    text => {
      setInput(text)
    },
    language ? t[language].voiceLangCode : 'en-IN'
  )

  if (!language) {
    return (
      <LandingPage
        languages={languages}
        onSelect={selectLanguage}
      />
    )
  }

  const L = t[language]
  const quickChipModes = ['today', 'week', 'today', 'today']

  async function handleUseLocation(mode = 'today', chipLabel) {
    setLoading(true)

    function fallbackToIP() {
      getLocationByIP()
        .then(async loc => {
          if (!loc.lat) {
            setMessages(m => [...m, { role: 'ai', text: L.locationError }])
            setLoading(false)
            return
          }
          await finishLocationFlow(loc)
        })
        .catch(() => {
          setMessages(m => [...m, { role: 'ai', text: L.locationError }])
          setLoading(false)
        })
    }

    async function finishLocationFlow(loc) {
      try {
        setCurrentLoc(loc)

        if (mode === 'week') {
          const weather = await getWeatherCached(loc)
          const d = weather.daily

          const days = d.time.map((dateStr, i) => ({
            dateLabel: new Date(`${dateStr}T00:00:00`).toLocaleDateString(undefined, { weekday: 'short' }),
            code: d.weather_code[i],
            tempMax: d.temperature_2m_max[i],
            tempMin: d.temperature_2m_min[i],
            rainChance: d.precipitation_probability_max[i]
          }))

          setMessages(m => [
            ...m,
            { role: 'user', text: chipLabel || L.myLocationMsg },
            { role: 'ai', type: 'week', data: { name: loc.name, days } }
          ])

          setLoading(false)
          return
        }

        const weather = await getWeatherCached(loc)
        const c = weather.current
        const d = weather.daily
        const alerts = deriveAlerts(c, d)

        setMessages(m => [
          ...m,
          { role: 'user', text: chipLabel || L.myLocationMsg },
          {
            role: 'ai',
            type: 'weather',
            data: {
              name: loc.name,
              lat: loc.lat,
              lon: loc.lon,
              state: loc.state,
              rainMm: c.precipitation,
              dateLabel: null,
              temp: c.temperature_2m,
              wind: c.wind_speed_10m,
              tempMin: d.temperature_2m_min[0],
              tempMax: d.temperature_2m_max[0],
              rainChance: d.precipitation_probability_max[0],
              code: c.weather_code,
              alerts
            }
          }
        ])

        const alertText = alerts.length > 0
          ? ` ${L.voice.warning}: ${alerts.map(alert => L.alerts[alert.key]).join('. ')}.`
          : ''

        const tipsText = situationalTips(
          d.precipitation_probability_max[0],
          d.temperature_2m_max[0],
          alerts,
          c.weather_code
        ).map(key => L.tips[key]).join('. ')

        const spokenSummary = `${loc.name}. ${
          L.weather[weatherCode(c.weather_code).key]
        }, ${c.temperature_2m} ${L.voice.degrees}. ${L.voice.todayHigh} ${d.temperature_2m_max[0]} ${L.voice.degrees}, ${L.voice.low} ${d.temperature_2m_min[0]} ${L.voice.degrees}. ${L.voice.chanceOfRain} ${d.precipitation_probability_max[0]} ${L.voice.percent}. ${
          L.advisory[advisoryKey(d.precipitation_probability_max[0], d.temperature_2m_max[0])]
        }.${alertText} ${tipsText}`

        if (voiceMode) {
          speak(spokenSummary, L.voiceLangCode)
        }
      } catch (err) {
        console.error(err)
        setMessages(m => [...m, { role: 'ai', text: L.locationError }])
      }

      setLoading(false)
    }

    if (!navigator.geolocation) {
      fallbackToIP()
      return
    }

    navigator.geolocation.getCurrentPosition(
      async pos => {
        try {
          const { latitude, longitude, accuracy } = pos.coords
          console.log('Location accuracy (meters):', accuracy)
          const geo = await reverseGeocode(latitude, longitude)
          await finishLocationFlow({ name: geo.name, lat: latitude, lon: longitude, state: geo.state })
        } catch (err) {
          console.error(err)
          fallbackToIP()
        }
      },
      err => {
        console.error('Geolocation failed:', err.code, err.message)
        fallbackToIP()
      },
      { timeout: 15000, enableHighAccuracy: true, maximumAge: 0 }
    )
  }

  async function handleSend(quickText) {
    const textToSend = quickText ?? input
    if (!textToSend.trim() || loading) return

    const userText = textToSend.trim()

    setMessages(m => [...m, { role: 'user', text: userText }])
    setInput('')
    setLoading(true)

    try {
      const parsed = await parseQuery(userText)

      if (!parsed.location) {
        setMessages(m => [...m, { role: 'ai', text: L.whichLocation }])
        setLoading(false)
        return
      }

      const loc = await geocode(parsed.location)
      if (loc) setCurrentLoc(loc)

      if (!loc) {
        setMessages(m => [...m, { role: 'ai', text: L.notFound(parsed.location) }])
        setLoading(false)
        return
      }

      if (parsed.intent === 'historical' && parsed.historicalDate) {
        const hist = await getHistoricalWeather(loc.lat, loc.lon, parsed.historicalDate)
        const hd = hist.daily

        if (!hd || !hd.time || hd.time.length === 0) {
          setMessages(m => [...m, { role: 'ai', text: L.fetchError }])
          setLoading(false)
          return
        }

        const histDateLabel = new Date(`${hd.time[0]}T00:00:00`).toLocaleDateString(undefined, {
          weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'
        })

        setMessages(m => [
          ...m,
          {
            role: 'ai',
            type: 'historical',
            data: {
              name: loc.name,
              dateLabel: histDateLabel,
              tempMax: hd.temperature_2m_max[0],
              tempMin: hd.temperature_2m_min[0],
              rainfall: hd.precipitation_sum[0]
            }
          }
        ])

        await supabase.from('queries').insert({ raw_text: userText, intent: 'historical', language })

        setLoading(false)
        return
      }

      if (parsed.intent === 'historical-trend' && parsed.historicalMonth) {
        const yearsBack = Math.min(parsed.historicalYearsBack || 3, 5)
        const stats = await getMonthlyHistoricalStats(loc.lat, loc.lon, parsed.historicalMonth, yearsBack)

        if (stats.length === 0) {
          setMessages(m => [...m, { role: 'ai', text: L.fetchError }])
          setLoading(false)
          return
        }

        const monthName = new Date(2000, parsed.historicalMonth - 1, 1).toLocaleDateString(undefined, { month: 'long' })

        const avgMaxOverall = stats.reduce((sum, stat) => sum + stat.avgMax, 0) / stats.length
        const avgMinOverall = stats.reduce((sum, stat) => sum + stat.avgMin, 0) / stats.length
        const avgRainOverall = stats.reduce((sum, stat) => sum + stat.totalRain, 0) / stats.length

        const sortedByYear = [...stats].sort((a, b) => a.year - b.year)
        const tempTrend = sortedByYear[sortedByYear.length - 1].avgMax - sortedByYear[0].avgMax
        const rainTrend = sortedByYear[sortedByYear.length - 1].totalRain - sortedByYear[0].totalRain

        setMessages(m => [
          ...m,
          {
            role: 'ai',
            type: 'historical-trend',
            data: { name: loc.name, monthName, years: sortedByYear, avgMaxOverall, avgMinOverall, avgRainOverall, tempTrend, rainTrend }
          }
        ])

        await supabase.from('queries').insert({ raw_text: userText, intent: 'historical-trend', language })

        setLoading(false)
        return
      }

      if ((parsed.daysFromNow || 0) > 6) {
        setMessages(m => [...m, { role: 'ai', text: L.forecastTooFar }])
        setLoading(false)
        return
      }

      const weather = await getWeatherCached(loc)
      const c = weather.current
      const d = weather.daily

      const dayIndex = Math.min(Math.max(parsed.daysFromNow || 0, 0), 6)
      const isToday = dayIndex === 0

      const selectedRainChance = d.precipitation_probability_max[dayIndex]
      const selectedTempMax = d.temperature_2m_max[dayIndex]
      const selectedTempMin = d.temperature_2m_min[dayIndex]
      const selectedCode = isToday ? c.weather_code : d.weather_code[dayIndex]

      const dayAlerts = deriveAlerts(
        isToday ? c : { wind_speed_10m: 0, weather_code: selectedCode },
        {
          precipitation_probability_max: [selectedRainChance],
          temperature_2m_max: [selectedTempMax],
          precipitation_sum: [d.precipitation_sum[dayIndex]]
        }
      )

      const dateLabel = new Date(`${d.time[dayIndex]}T00:00:00`).toLocaleDateString(undefined, {
        weekday: 'long', month: 'short', day: 'numeric'
      })

      setMessages(m => [
        ...m,
        {
          role: 'ai',
          type: 'weather',
          data: {
            name: loc.name,
            lat: loc.lat,
            lon: loc.lon,
            state: loc.state,
            rainMm: isToday ? c.precipitation : null,
            dateLabel: isToday ? null : dateLabel,
            temp: isToday ? c.temperature_2m : selectedTempMax,
            wind: isToday ? c.wind_speed_10m : null,
            tempMin: selectedTempMin,
            tempMax: selectedTempMax,
            rainChance: selectedRainChance,
            code: selectedCode,
            alerts: dayAlerts
          }
        }
      ])

      const alertText = dayAlerts.length > 0
        ? ` ${L.voice.warning}: ${dayAlerts.map(alert => L.alerts[alert.key]).join('. ')}.`
        : ''

      const tipsText = situationalTips(selectedRainChance, selectedTempMax, dayAlerts, selectedCode).map(key => L.tips[key]).join('. ')
      const forecastLabel = isToday ? '' : `${dateLabel}. `

      const spokenSummary = `${loc.name}. ${forecastLabel}${
        L.weather[weatherCode(selectedCode).key]
      }, ${isToday ? c.temperature_2m : selectedTempMax} ${L.voice.degrees}. ${L.voice.todayHigh} ${selectedTempMax} ${L.voice.degrees}, ${L.voice.low} ${selectedTempMin} ${L.voice.degrees}. ${L.voice.chanceOfRain} ${selectedRainChance} ${L.voice.percent}. ${
        L.advisory[advisoryKey(selectedRainChance, selectedTempMax)]
      }.${alertText} ${tipsText}`

      if (voiceMode) {
        speak(spokenSummary, L.voiceLangCode)
      }

      await supabase.from('locations').insert({ name: loc.name, lat: loc.lat, lon: loc.lon }).select()
      await supabase.from('queries').insert({ raw_text: userText, intent: parsed.intent, language })
    } catch (err) {
      console.error(err)
      setMessages(m => [...m, { role: 'ai', text: L.fetchError }])
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-sky-100 to-sky-50 dark:from-sky-950 dark:via-sky-800 dark:to-sky-950 transition-colors duration-500 flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-md md:max-w-2xl lg:max-w-4xl flex flex-col h-[90vh] rounded-3xl overflow-hidden relative">
        <div className="px-5 py-4 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-sky-300 flex items-center justify-center text-sm font-bold">
              ☁️
            </div>
            <h1 className="text-sky-900 dark:text-white font-semibold text-lg">
              WeatherBuddy
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              title="Toggle theme"
              className="liquid-glass w-8 h-8 rounded-full flex items-center justify-center text-sky-700 dark:text-sky-200 transition-colors"
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>

            <button
              onClick={openTrends}
              title="Climate trends"
              className="liquid-glass w-8 h-8 rounded-full flex items-center justify-center text-sky-700 dark:text-sky-200"
            >
              📊
            </button>

            <button
              onClick={() => setVoiceMode(value => !value)}
              className={`liquid-glass text-xs rounded-full px-3 py-1 transition-colors ${
                voiceMode
                  ? 'text-sky-700 dark:text-sky-300'
                  : 'text-sky-700/60 dark:text-slate-400'
              }`}
            >
              {voiceMode ? '🔊 Voice On' : '🔇 Voice Off'}
            </button>

            <button
              onClick={() => {
                localStorage.removeItem('lang')
                setLanguage(null)
              }}
              className="liquid-glass text-xs text-sky-700/60 dark:text-slate-400 rounded-full px-3 py-1"
            >
              {languages.find(item => item.code === language)?.label}
            </button>
          </div>
        </div>

        {messages.length <= 1 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
            <div
              className="w-20 h-20 rounded-full mb-6"
              style={{
                background: 'linear-gradient(120deg, #2e9bd1, #82c3e3, #2e9bd1)',
                backgroundSize: '200% 200%',
                animation: 'orb-pulse 3s ease-in-out infinite, orb-rotate 6s linear infinite',
                boxShadow: '0 0 40px rgba(46,155,209,0.5)'
              }}
            />

            <h2 className="text-sky-900 dark:text-white text-xl font-semibold mb-1">
              Hello there!
            </h2>

            <p className="text-sky-600 dark:text-sky-300 text-sm mb-1">
              I'm WeatherBuddy
            </p>

            <p className="text-sky-700/70 dark:text-slate-400 text-sm md:text-base text-center max-w-xs md:max-w-sm mb-6">
              {L.greeting}
            </p>

            <div className="flex flex-wrap justify-center gap-2 max-w-sm md:max-w-md">
              {L.quickChips.map((chip, index) => (
                <button
                  key={index}
                  onClick={() => handleUseLocation(quickChipModes[index], chip)}
                  disabled={loading}
                  className="text-xs md:text-sm text-sky-700 dark:text-sky-300 border border-sky-500/30 bg-sky-900/5 dark:bg-white/5 rounded-full px-3 py-1.5 hover:bg-sky-900/10 dark:hover:bg-white/10 transition-colors disabled:opacity-50"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 relative z-10">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.type === 'weather' ? (
                  <div className="max-w-[85%] bg-sky-900/5 dark:bg-white/10 rounded-2xl rounded-bl-sm p-4 text-sky-900 dark:text-white">
                    <div className="font-semibold text-base mb-1">
                      {message.data.name}
                    </div>

                    {message.data.dateLabel && (
                      <div className="text-xs text-sky-600 dark:text-slate-400 mb-1">
                        {message.data.dateLabel}
                      </div>
                    )}

                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-4xl">{weatherCode(message.data.code).icon}</span>
                      <span className="text-3xl font-bold">{message.data.temp}°C</span>
                      <span className="text-sm text-sky-600 dark:text-slate-300">
                        {L.weather[weatherCode(message.data.code).key]}
                      </span>
                    </div>

                    <div className="flex gap-4 text-sm text-sky-600 dark:text-slate-300 mb-2">
                      <span>↓{message.data.tempMin}° ↑{message.data.tempMax}°</span>
                      <span>💧 {message.data.rainChance}%</span>
                      {message.data.wind !== null && <span>💨 {message.data.wind} km/h</span>}
                    </div>

                    {message.data.alerts && message.data.alerts.length > 0 && (
                      <div className="space-y-1.5 mb-2">
                        {message.data.alerts.map((alert, alertIndex) => (
                          <div
                            key={alertIndex}
                            className={`text-xs px-3 py-1.5 rounded-md font-medium ${
                              alert.severity === 'red'
                                ? 'bg-red-500/10 dark:bg-red-500/20 text-red-700 dark:text-red-300 border border-red-500/30'
                                : 'bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                            }`}
                          >
                            ⚠️ {L.alerts[alert.key]}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mb-2">
                      <button
                        onClick={() => setHelplineOpen(h => ({ ...h, [index]: !h[index] }))}
                        className="text-xs text-red-700 dark:text-red-300 bg-red-500/10 dark:bg-red-500/20 border border-red-500/30 rounded-lg px-3 py-1.5 hover:bg-red-500/20 transition-colors"
                      >
                        📞 {L.helpline.button}
                      </button>

                      {helplineOpen[index] && (() => {
                        const stateInfo = getHelplineForState(message.data.state)
                        const info = stateInfo || nationalHelpline
                        return (
                          <div className="mt-1.5 text-xs bg-red-500/10 dark:bg-red-500/20 text-red-700 dark:text-red-300 border border-red-500/30 rounded-lg px-3 py-2">
                            <div className="font-medium">{info.name}: {info.number}</div>
                            {!stateInfo && (
                              <div className="mt-1 text-[10px] opacity-80">
                                {L.helpline.nationalWarning}
                              </div>
                            )}
                          </div>
                        )
                      })()}
                    </div>

                    <div className="text-sm bg-sky-500/10 dark:bg-sky-500/20 text-sky-700 dark:text-sky-300 rounded-lg px-3 py-2 mb-2">
                      {L.advisory[advisoryKey(message.data.rainChance, message.data.tempMax)]}
                    </div>

                    {situationalTips(message.data.rainChance, message.data.tempMax, message.data.alerts || [], message.data.code).map((tipKey, tipIndex) => (
                      <div key={tipIndex} className="text-sm bg-sky-900/5 dark:bg-white/5 text-sky-700 dark:text-slate-300 rounded-lg px-3 py-2 mt-1.5">
                        💡 {L.tips[tipKey]}
                      </div>
                    ))}

                    {message.data.lat && (
                      <div className="flex gap-2 mt-2 flex-wrap">
                        <button
                          onClick={() => setMapFor(message.data)}
                          className="text-xs text-sky-600 dark:text-sky-300 bg-sky-900/5 dark:bg-white/5 hover:bg-sky-900/10 dark:hover:bg-white/10 rounded-lg px-3 py-1.5 transition-colors"
                        >
                          🗺️ Live map
                        </button>
                        <button
                          onClick={() => openTrendsForLocation({ name: message.data.name, lat: message.data.lat, lon: message.data.lon })}
                          className="text-xs text-sky-600 dark:text-sky-300 bg-sky-900/5 dark:bg-white/5 hover:bg-sky-900/10 dark:hover:bg-white/10 rounded-lg px-3 py-1.5 transition-colors"
                        >
                          📊 Climate trends
                        </button>
                        <button
                          onClick={() => handleMarineClick(index, message.data.lat, message.data.lon)}
                          className="text-xs text-sky-600 dark:text-sky-300 bg-sky-900/5 dark:bg-white/5 hover:bg-sky-900/10 dark:hover:bg-white/10 rounded-lg px-3 py-1.5 transition-colors"
                        >
                          🌊 {L.marine.button}
                        </button>
                        <button
                          onClick={() => setAgriOpen(o => ({ ...o, [index]: !o[index] }))}
                          className="text-xs text-sky-600 dark:text-sky-300 bg-sky-900/5 dark:bg-white/5 hover:bg-sky-900/10 dark:hover:bg-white/10 rounded-lg px-3 py-1.5 transition-colors"
                        >
                          🌾 {L.agri.button}
                        </button>
                      </div>
                    )}

                    {marineOpen[index] && (
                      <div className="mt-1.5 text-sm bg-sky-900/5 dark:bg-white/5 text-sky-700 dark:text-slate-300 rounded-lg px-3 py-2 leading-relaxed">
                        {marineLoading[index] ? (
                          L.thinking
                        ) : marineData[index] ? (
                          <>
                            <div className="mb-1">{L.marine[marineSeverity(marineData[index].waveHeight)]}</div>
                            <div className="text-xs text-sky-600 dark:text-slate-400">
                              {L.marine.waveHeight}: {marineData[index].waveHeight} m
                              {marineData[index].windWaveHeight !== null && ` · ${L.marine.windWaveHeight}: ${marineData[index].windWaveHeight} m`}
                            </div>
                          </>
                        ) : (
                          L.marine.notCoastal
                        )}
                      </div>
                    )}

                    {agriOpen[index] && (
                      <div className="mt-1.5 text-sm bg-green-500/10 dark:bg-green-500/20 text-green-700 dark:text-green-300 rounded-lg px-3 py-2 leading-relaxed">
                        {L.agri[agriAdvisoryKey(message.data.rainChance, message.data.tempMax, message.data.alerts || [])]}
                      </div>
                    )}
                  </div>
                ) : message.type === 'week' ? (
                  <div className="max-w-[90%] bg-sky-900/5 dark:bg-white/10 rounded-2xl rounded-bl-sm p-4 text-sky-900 dark:text-white">
                    <div className="font-semibold text-base mb-3">
                      {message.data.name} — 7-day forecast
                    </div>

                    <div className="flex gap-3 overflow-x-auto pb-1">
                      {message.data.days.map((day, dayIndex) => (
                        <div key={dayIndex} className="flex-shrink-0 w-20 bg-sky-900/5 dark:bg-white/5 rounded-xl p-2 flex flex-col items-center text-center">
                          <div className="text-xs text-sky-600 dark:text-slate-400 mb-1">{day.dateLabel}</div>
                          <div className="text-2xl mb-1">{weatherCode(day.code).icon}</div>
                          <div className="text-sm font-semibold">{day.tempMax}°</div>
                          <div className="text-xs text-sky-600 dark:text-slate-400">{day.tempMin}°</div>
                          <div className="text-xs text-sky-600 dark:text-sky-300 mt-1">💧{day.rainChance}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : message.type === 'historical-trend' ? (
                  <div className="max-w-[90%] bg-sky-900/5 dark:bg-white/10 rounded-2xl rounded-bl-sm p-4 text-sky-900 dark:text-white">
                    <div className="font-semibold text-base mb-1">
                      {message.data.name} — {message.data.monthName}
                    </div>

                    <div className="text-sm text-sky-700 dark:text-slate-300 mb-3 leading-relaxed">
                      Over the past {message.data.years.length} years,
                      average {message.data.monthName} temperatures ranged{' '}
                      {message.data.avgMinOverall.toFixed(1)}°–
                      {message.data.avgMaxOverall.toFixed(1)}°C, with
                      average monthly rainfall around{' '}
                      {message.data.avgRainOverall.toFixed(0)}mm.
                      {' '}
                      {message.data.tempTrend > 0.5
                        ? `Temperatures have trended warmer by about ${message.data.tempTrend.toFixed(1)}°C over this period.`
                        : message.data.tempTrend < -0.5
                          ? `Temperatures have trended cooler by about ${Math.abs(message.data.tempTrend).toFixed(1)}°C over this period.`
                          : 'Temperatures have stayed relatively stable over this period.'}
                      {' '}
                      {message.data.rainTrend > 20
                        ? 'Rainfall has been increasing year over year.'
                        : message.data.rainTrend < -20
                          ? 'Rainfall has been decreasing year over year.'
                          : 'Rainfall levels have remained fairly consistent.'}
                    </div>

                    {message.data.years.map((yearData, yearIndex) => (
                      <HistoricalChart key={yearIndex} year={yearData.year} days={yearData.days} />
                    ))}
                  </div>
                ) : message.type === 'historical' ? (
                  <div className="max-w-[85%] bg-sky-900/5 dark:bg-white/10 rounded-2xl rounded-bl-sm p-4 text-sky-900 dark:text-white">
                    <div className="font-semibold text-base mb-1">{message.data.name}</div>
                    <div className="text-xs text-sky-600 dark:text-slate-400 mb-3">{message.data.dateLabel}</div>
                    <div className="flex gap-4 text-sm text-sky-700 dark:text-slate-200">
                      <span>↓{message.data.tempMin}° ↑{message.data.tempMax}°</span>
                      <span>🌧️ {message.data.rainfall}mm</span>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-line ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-sky-500 to-sky-700 text-white rounded-br-sm'
                        : 'bg-sky-900/5 dark:bg-white/10 text-sky-900 dark:text-slate-100 rounded-bl-sm'
                    }`}
                  >
                    {message.text}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-sky-900/5 dark:bg-white/10 rounded-2xl rounded-bl-sm px-4 py-3">
                  <ThinkingLoader />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}

        <div className="px-4 pb-4 pt-2 relative z-10">
          <div className="rounded-3xl border border-sky-900/10 dark:border-white/15 bg-white/70 dark:bg-sky-900/90 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] p-2">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              rows={1}
              placeholder={L.placeholder}
              className="w-full bg-transparent text-sky-900 dark:text-white placeholder-sky-700/40 dark:placeholder-slate-400 text-sm outline-none resize-none px-3 py-2.5 leading-[22px] max-h-32"
              onInput={e => {
                e.target.style.height = 'auto'
                e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px'
              }}
            />

            <div className="flex items-center justify-between gap-2 px-1 pt-1">
              <button
                onClick={handleUseLocation}
                disabled={loading}
                title="Use my location"
                className="liquid-glass flex h-8 w-8 items-center justify-center rounded-full text-sky-600 dark:text-sky-300 transition-colors disabled:opacity-50"
              >
                <LocationIcon />
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={start}
                  disabled={loading}
                  title="Speak your question"
                  style={listening ? { backgroundColor: 'rgba(239,68,68,0.3)', color: '#fff' } : undefined}
                  className={`liquid-glass h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-50 ${
                    listening ? 'scale-110' : 'text-sky-700/70 dark:text-white/70'
                  }`}
                >
                  <MicIcon />
                </button>

                <button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className={`liquid-glass h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-40 ${
                    input.trim()
                      ? 'text-sky-500 dark:text-sky-300'
                      : 'text-sky-700/40 dark:text-white/40'
                  }`}
                >
                  <span className="relative flex h-full w-full items-center justify-center">
                    <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${loading ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                      <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    </span>
                    <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${!loading ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                      <ArrowUpIcon />
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {mapFor && (
        <Suspense fallback={null}>
          <LiveMapModal
            name={mapFor.name}
            lat={mapFor.lat}
            lon={mapFor.lon}
            rainMm={mapFor.rainMm}
            alerts={mapFor.alerts}
            onClose={() => setMapFor(null)}
          />
        </Suspense>
      )}

      {trendsOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 px-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
          onClick={() => setTrendsOpen(false)}
        >
          <div
            className="max-w-md w-full rounded-3xl p-6 max-h-[85vh] overflow-y-auto"
            style={{ backgroundColor: theme === 'dark' ? '#091f2a' : '#ffffff', boxShadow: '0 20px 60px rgba(0,0,0,0.35)' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-sky-900 dark:text-white text-xl font-bold">Climate trends</h3>
              <button onClick={() => setTrendsOpen(false)} className="liquid-glass w-8 h-8 rounded-full flex items-center justify-center text-sky-700 dark:text-sky-200">✕</button>
            </div>
            <p className="text-sky-700/70 dark:text-slate-400 text-sm mb-5">Historical weather for your location · {currentLoc?.name}</p>

            {trendsLoading ? (
              <ThinkingLoader />
            ) : trendsData ? (
              <>
                <p className="text-xs text-sky-600 dark:text-slate-400 uppercase font-semibold mb-2">Last 30 days</p>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="liquid-glass rounded-2xl p-4">
                    <p className="text-xs text-sky-600 dark:text-slate-400">Avg high</p>
                    <p className="text-2xl font-bold text-sky-900 dark:text-white">{trendsData.avgHigh.toFixed(1)}°C</p>
                  </div>
                  <div className="liquid-glass rounded-2xl p-4">
                    <p className="text-xs text-sky-600 dark:text-slate-400">Avg low</p>
                    <p className="text-2xl font-bold text-sky-900 dark:text-white">{trendsData.avgLow.toFixed(1)}°C</p>
                  </div>
                  <div className="liquid-glass rounded-2xl p-4">
                    <p className="text-xs text-sky-600 dark:text-slate-400">Total rain</p>
                    <p className="text-2xl font-bold text-sky-900 dark:text-white">{trendsData.totalRain.toFixed(0)} mm</p>
                  </div>
                  <div className="liquid-glass rounded-2xl p-4">
                    <p className="text-xs text-sky-600 dark:text-slate-400">Hottest day</p>
                    <p className="text-2xl font-bold text-sky-900 dark:text-white">{trendsData.hottestDay.toFixed(1)}°C</p>
                  </div>
                </div>

                <p className="text-xs text-sky-600 dark:text-slate-400 uppercase font-semibold mb-2">Month-by-month (past year)</p>
                <div className="flex items-end gap-1.5" style={{ height: '128px' }}>
                  {trendsData.months.map((m, i) => {
                    const maxRain = Math.max(...trendsData.months.map(x => x.rain), 1)
                    const barPx = Math.max((m.rain / maxRain) * 110, 2)
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1" style={{ height: '128px' }}>
                        <div
                          className="w-full bg-sky-500 rounded-t"
                          style={{ height: `${barPx}px` }}
                        />
                        <span className="text-[10px] text-sky-600 dark:text-slate-400">{m.label}</span>
                      </div>
                    )
                  })}
                </div>
              </>
            ) : (
              <p className="text-sky-700 dark:text-slate-300 text-sm">No data available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}