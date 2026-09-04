// src/App.jsx
import ThinkingLoader from './ThinkingLoader'
import { useState, useRef, useEffect } from 'react'
import { parseQuery } from './gemini'
import {
  geocode,
  getLocationByIP,
  reverseGeocode,
  deriveAlerts,
  getHistoricalWeather,
  getMonthlyHistoricalStats,
  getWeatherCached
} from './weather'
import { supabase } from './supabaseClient'
import {
  weatherCode,
  advisoryKey,
  situationalTips
} from './weatherIcons'
import { languages, t } from './translations'
import { useVoice, speak } from './useVoice'
import LandingPage from './LandingPage'
import HistoricalChart from './HistoricalChart'

function LocationIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function MicIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="2" width="6" height="11" rx="3" />
      <path d="M5 10v1a7 7 0 0 0 14 0v-1" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  )
}

function ArrowUpIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  )
}

export default function App() {
  const [language, setLanguage] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [voiceMode, setVoiceMode] = useState(false)
  const bottomRef = useRef(null)

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

  async function handleUseLocation() {
    setLoading(true)

    function fallbackToIP() {
      getLocationByIP()
        .then(async loc => {
          if (!loc.lat) {
            setMessages(m => [
              ...m,
              {
                role: 'ai',
                text: L.locationError
              }
            ])
            setLoading(false)
            return
          }

          await finishLocationFlow(loc)
        })
        .catch(() => {
          setMessages(m => [
            ...m,
            {
              role: 'ai',
              text: L.locationError
            }
          ])
          setLoading(false)
        })
    }

    async function finishLocationFlow(loc) {
      try {
        const weather = await getWeatherCached(loc)
        const c = weather.current
        const d = weather.daily
        const alerts = deriveAlerts(c, d)

        setMessages(m => [
          ...m,
          {
            role: 'user',
            text: L.myLocationMsg
          },
          {
            role: 'ai',
            type: 'weather',
            data: {
              name: loc.name,
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
          ? ` ${L.voice.warning}: ${alerts
              .map(alert => L.alerts[alert.key])
              .join('. ')}.`
          : ''

        const tipsText = situationalTips(
          d.precipitation_probability_max[0],
          d.temperature_2m_max[0],
          alerts
        )
          .map(key => L.tips[key])
          .join('. ')

        const spokenSummary = `${loc.name}. ${
          L.weather[weatherCode(c.weather_code).key]
        }, ${c.temperature_2m} ${L.voice.degrees}. ${
          L.voice.todayHigh
        } ${d.temperature_2m_max[0]} ${L.voice.degrees}, ${
          L.voice.low
        } ${d.temperature_2m_min[0]} ${L.voice.degrees}. ${
          L.voice.chanceOfRain
        } ${d.precipitation_probability_max[0]} ${
          L.voice.percent
        }. ${
          L.advisory[
            advisoryKey(
              d.precipitation_probability_max[0],
              d.temperature_2m_max[0]
            )
          ]
        }.${alertText} ${tipsText}`

        if (voiceMode) {
          speak(spokenSummary, L.voiceLangCode)
        }
      } catch (err) {
        console.error(err)

        setMessages(m => [
          ...m,
          {
            role: 'ai',
            text: L.locationError
          }
        ])
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

          const name = await reverseGeocode(latitude, longitude)

          await finishLocationFlow({
            name,
            lat: latitude,
            lon: longitude
          })
        } catch (err) {
          console.error(err)
          fallbackToIP()
        }
      },
      err => {
        console.error('Geolocation failed:', err.code, err.message)
        fallbackToIP()
      },
      {
        timeout: 15000,
        enableHighAccuracy: true,
        maximumAge: 0
      }
    )
  }

  async function handleSend() {
    if (!input.trim() || loading) return

    const userText = input.trim()

    setMessages(m => [
      ...m,
      {
        role: 'user',
        text: userText
      }
    ])

    setInput('')
    setLoading(true)

    try {
      const parsed = await parseQuery(userText)

      if (!parsed.location) {
        setMessages(m => [
          ...m,
          {
            role: 'ai',
            text: L.whichLocation
          }
        ])
        setLoading(false)
        return
      }

      const loc = await geocode(parsed.location)

      if (!loc) {
        setMessages(m => [
          ...m,
          {
            role: 'ai',
            text: L.notFound(parsed.location)
          }
        ])
        setLoading(false)
        return
      }

      if (parsed.intent === 'historical' && parsed.historicalDate) {
        const hist = await getHistoricalWeather(
          loc.lat,
          loc.lon,
          parsed.historicalDate
        )

        const hd = hist.daily

        if (!hd || !hd.time || hd.time.length === 0) {
          setMessages(m => [
            ...m,
            {
              role: 'ai',
              text: L.fetchError
            }
          ])
          setLoading(false)
          return
        }

        const histDateLabel = new Date(
          `${hd.time[0]}T00:00:00`
        ).toLocaleDateString(undefined, {
          weekday: 'long',
          year: 'numeric',
          month: 'short',
          day: 'numeric'
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

        await supabase
          .from('queries')
          .insert({
            raw_text: userText,
            intent: 'historical',
            language
          })

        setLoading(false)
        return
      }

      if (
        parsed.intent === 'historical-trend' &&
        parsed.historicalMonth
      ) {
        const yearsBack = Math.min(
          parsed.historicalYearsBack || 3,
          5
        )

        const stats = await getMonthlyHistoricalStats(
          loc.lat,
          loc.lon,
          parsed.historicalMonth,
          yearsBack
        )

        if (stats.length === 0) {
          setMessages(m => [
            ...m,
            {
              role: 'ai',
              text: L.fetchError
            }
          ])
          setLoading(false)
          return
        }

        const monthName = new Date(
          2000,
          parsed.historicalMonth - 1,
          1
        ).toLocaleDateString(undefined, {
          month: 'long'
        })

        const avgMaxOverall =
          stats.reduce((sum, stat) => sum + stat.avgMax, 0) /
          stats.length

        const avgMinOverall =
          stats.reduce((sum, stat) => sum + stat.avgMin, 0) /
          stats.length

        const avgRainOverall =
          stats.reduce((sum, stat) => sum + stat.totalRain, 0) /
          stats.length

        const sortedByYear = [...stats].sort(
          (a, b) => a.year - b.year
        )

        const tempTrend =
          sortedByYear[sortedByYear.length - 1].avgMax -
          sortedByYear[0].avgMax

        const rainTrend =
          sortedByYear[sortedByYear.length - 1].totalRain -
          sortedByYear[0].totalRain

        setMessages(m => [
          ...m,
          {
            role: 'ai',
            type: 'historical-trend',
            data: {
              name: loc.name,
              monthName,
              years: sortedByYear,
              avgMaxOverall,
              avgMinOverall,
              avgRainOverall,
              tempTrend,
              rainTrend
            }
          }
        ])

        await supabase
          .from('queries')
          .insert({
            raw_text: userText,
            intent: 'historical-trend',
            language
          })

        setLoading(false)
        return
      }

      if ((parsed.daysFromNow || 0) > 6) {
        setMessages(m => [
          ...m,
          {
            role: 'ai',
            text: L.forecastTooFar
          }
        ])
        setLoading(false)
        return
      }

      const weather = await getWeatherCached(loc)
      const c = weather.current
      const d = weather.daily

      const dayIndex = Math.min(
        Math.max(parsed.daysFromNow || 0, 0),
        6
      )

      const isToday = dayIndex === 0

      const selectedRainChance =
        d.precipitation_probability_max[dayIndex]

      const selectedTempMax =
        d.temperature_2m_max[dayIndex]

      const selectedTempMin =
        d.temperature_2m_min[dayIndex]

      const selectedCode = isToday
        ? c.weather_code
        : d.weather_code[dayIndex]

      const dayAlerts = deriveAlerts(
        isToday
          ? c
          : {
              wind_speed_10m: 0,
              weather_code: selectedCode
            },
        {
          precipitation_probability_max: [
            selectedRainChance
          ],
          temperature_2m_max: [
            selectedTempMax
          ]
        }
      )

      const dateLabel = new Date(
        `${d.time[dayIndex]}T00:00:00`
      ).toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
      })

      setMessages(m => [
        ...m,
        {
          role: 'ai',
          type: 'weather',
          data: {
            name: loc.name,
            dateLabel: isToday ? null : dateLabel,
            temp: isToday
              ? c.temperature_2m
              : selectedTempMax,
            wind: isToday
              ? c.wind_speed_10m
              : null,
            tempMin: selectedTempMin,
            tempMax: selectedTempMax,
            rainChance: selectedRainChance,
            code: selectedCode,
            alerts: dayAlerts
          }
        }
      ])

      const alertText = dayAlerts.length > 0
        ? ` ${L.voice.warning}: ${dayAlerts
            .map(alert => L.alerts[alert.key])
            .join('. ')}.`
        : ''

      const tipsText = situationalTips(
        selectedRainChance,
        selectedTempMax,
        dayAlerts
      )
        .map(key => L.tips[key])
        .join('. ')

      const forecastLabel = isToday
        ? ''
        : `${dateLabel}. `

      const spokenSummary = `${loc.name}. ${forecastLabel}${
        L.weather[weatherCode(selectedCode).key]
      }, ${
        isToday ? c.temperature_2m : selectedTempMax
      } ${L.voice.degrees}. ${L.voice.todayHigh} ${
        selectedTempMax
      } ${L.voice.degrees}, ${L.voice.low} ${
        selectedTempMin
      } ${L.voice.degrees}. ${L.voice.chanceOfRain} ${
        selectedRainChance
      } ${L.voice.percent}. ${
        L.advisory[
          advisoryKey(
            selectedRainChance,
            selectedTempMax
          )
        ]
      }.${alertText} ${tipsText}`

      if (voiceMode) {
        speak(spokenSummary, L.voiceLangCode)
      }

      await supabase
        .from('locations')
        .insert({
          name: loc.name,
          lat: loc.lat,
          lon: loc.lon
        })
        .select()

      await supabase
        .from('queries')
        .insert({
          raw_text: userText,
          intent: parsed.intent,
          language
        })
    } catch (err) {
      console.error(err)

      setMessages(m => [
        ...m,
        {
          role: 'ai',
          text: L.fetchError
        }
      ])
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#04121b] via-[#0a2540] to-[#04121b] flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-md flex flex-col h-[90vh] rounded-3xl overflow-hidden relative">
        <div className="px-5 py-4 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0cc8e8] to-[#7dd3fc] flex items-center justify-center text-sm font-bold">
              ☁️
            </div>

            <h1 className="text-white font-semibold text-lg">
              WeatherBuddy
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setVoiceMode(value => !value)}
              className={`text-xs rounded-full px-3 py-1 border transition-colors ${
                voiceMode
                  ? 'bg-[#2E86FF]/30 text-[#7dd3fc] border-[#0cc8e8]/40'
                  : 'text-slate-400 border-white/10 hover:bg-white/10'
              }`}
            >
              {voiceMode ? '🔊 Voice On' : '🔇 Voice Off'}
            </button>

            <button
              onClick={() => {
                localStorage.removeItem('lang')
                setLanguage(null)
              }}
              className="text-xs text-slate-400 border border-white/10 rounded-full px-3 py-1 hover:bg-white/10"
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
                background:
                  'linear-gradient(120deg, #0cc8e8, #6ae6f6, #0cc8e8)',
                backgroundSize: '200% 200%',
                animation:
                  'orb-pulse 3s ease-in-out infinite, orb-rotate 6s linear infinite',
                boxShadow: '0 0 40px rgba(46,134,255,0.5)'
              }}
            />

            <h2 className="text-white text-xl font-semibold mb-1">
              Hello there!
            </h2>

            <p className="text-[#7dd3fc] text-sm mb-1">
              I'm WeatherBuddy
            </p>

            <p className="text-slate-400 text-sm text-center max-w-xs">
              {L.greeting}
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 relative z-10">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user'
                    ? 'justify-end'
                    : 'justify-start'
                }`}
              >
                {message.type === 'weather' ? (
                  <div className="max-w-[85%] bg-white/10 rounded-2xl rounded-bl-sm p-4 text-white">
                    <div className="font-semibold text-base mb-1">
                      {message.data.name}
                    </div>

                    {message.data.dateLabel && (
                      <div className="text-xs text-slate-400 mb-1">
                        {message.data.dateLabel}
                      </div>
                    )}

                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-4xl">
                        {weatherCode(message.data.code).icon}
                      </span>

                      <span className="text-3xl font-bold">
                        {message.data.temp}°C
                      </span>

                      <span className="text-sm text-slate-300">
                        {L.weather[
                          weatherCode(message.data.code).key
                        ]}
                      </span>
                    </div>

                    <div className="flex gap-4 text-sm text-slate-300 mb-2">
                      <span>
                        ↓{message.data.tempMin}° ↑{message.data.tempMax}°
                      </span>

                      <span>
                        💧 {message.data.rainChance}%
                      </span>

                      {message.data.wind !== null && (
                        <span>
                          💨 {message.data.wind} km/h
                        </span>
                      )}
                    </div>

                    {message.data.alerts &&
                      message.data.alerts.length > 0 && (
                        <div className="space-y-1.5 mb-2">
                          {message.data.alerts.map((alert, alertIndex) => (
                            <div
                              key={alertIndex}
                              className={`text-xs px-3 py-1.5 rounded-md font-medium ${
                                alert.severity === 'red'
                                  ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              }`}
                            >
                              ⚠️ {L.alerts[alert.key]}
                            </div>
                          ))}
                        </div>
                      )}

                    <div className="text-sm bg-[#2E86FF]/20 text-[#7dd3fc] rounded-lg px-3 py-2 mb-2">
                      {L.advisory[
                        advisoryKey(
                          message.data.rainChance,
                          message.data.tempMax
                        )
                      ]}
                    </div>

                    {situationalTips(
                      message.data.rainChance,
                      message.data.tempMax,
                      message.data.alerts || []
                    ).map((tipKey, tipIndex) => (
                      <div
                        key={tipIndex}
                        className="text-sm bg-white/5 text-slate-300 rounded-lg px-3 py-2 mt-1.5"
                      >
                        💡 {L.tips[tipKey]}
                      </div>
                    ))}
                  </div>
                ) : message.type === 'historical-trend' ? (
                  <div className="max-w-[90%] bg-white/10 rounded-2xl rounded-bl-sm p-4 text-white">
                    <div className="font-semibold text-base mb-1">
                      {message.data.name} — {message.data.monthName}
                    </div>

                    <div className="text-sm text-slate-300 mb-3 leading-relaxed">
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
                      <HistoricalChart
                        key={yearIndex}
                        year={yearData.year}
                        days={yearData.days}
                      />
                    ))}
                  </div>
                ) : message.type === 'historical' ? (
                  <div className="max-w-[85%] bg-white/10 rounded-2xl rounded-bl-sm p-4 text-white">
                    <div className="font-semibold text-base mb-1">
                      {message.data.name}
                    </div>

                    <div className="text-xs text-slate-400 mb-3">
                      {message.data.dateLabel}
                    </div>

                    <div className="flex gap-4 text-sm text-slate-200">
                      <span>
                        ↓{message.data.tempMin}° ↑{message.data.tempMax}°
                      </span>

                      <span>
                        🌧️ {message.data.rainfall}mm
                      </span>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-line ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-[#2E86FF] to-[#1d6fe0] text-white rounded-br-sm'
                        : 'bg-white/10 text-slate-100 rounded-bl-sm'
                    }`}
                  >
                    {message.text}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/10 rounded-2xl rounded-bl-sm px-4 py-3">
                  <ThinkingLoader />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}

        <div className="px-4 pb-4 pt-2 relative z-10">
          <div className="rounded-3xl border border-white/15 bg-[#0d1b28]/90 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] p-2">
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
              className="w-full bg-transparent text-white placeholder-slate-400 text-sm outline-none resize-none px-3 py-2.5 leading-[22px] max-h-32"
              onInput={e => {
                e.target.style.height = 'auto'
                e.target.style.height =
                  Math.min(e.target.scrollHeight, 128) + 'px'
              }}
            />

            <div className="flex items-center justify-between gap-2 px-1 pt-1">
              <button
                onClick={handleUseLocation}
                disabled={loading}
                title="Use my location"
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#7dd3fc] hover:bg-white/10 transition-colors disabled:opacity-50"
              >
                <LocationIcon />
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={start}
                  disabled={loading}
                  title="Speak your question"
                  className={`h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-50 ${
                    listening
                      ? 'bg-red-500/30 text-white scale-110'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <MicIcon />
                </button>

                <button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-40"
                  style={{
                    background: input.trim()
                      ? 'linear-gradient(135deg, #2E86FF, #7dd3fc)'
                      : 'rgba(255,255,255,0.1)'
                  }}
                >
                  <span className="relative flex h-full w-full items-center justify-center">
                    <span
                      className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                        loading
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-50'
                      }`}
                    >
                      <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    </span>

                    <span
                      className={`absolute inset-0 flex items-center justify-center text-white transition-all duration-300 ${
                        !loading
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-50'
                      }`}
                    >
                      <ArrowUpIcon />
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}