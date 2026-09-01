export function weatherCode(code) {
  if (code === 0) return { icon: '☀️', key: 'clear' }
  if (code <= 3) return { icon: '⛅', key: 'partlyCloudy' }
  if (code <= 48) return { icon: '🌫️', key: 'fog' }
  if (code <= 57) return { icon: '🌦️', key: 'drizzle' }
  if (code <= 67) return { icon: '🌧️', key: 'rain' }
  if (code <= 77) return { icon: '❄️', key: 'snow' }
  if (code <= 82) return { icon: '🌧️', key: 'rainShowers' }
  if (code <= 99) return { icon: '⛈️', key: 'thunderstorm' }
  return { icon: '🌡️', key: 'default' }
}

export function advisoryKey(rainChance, tempMax) {
  if (rainChance >= 70) return 'rainHigh'
  if (rainChance >= 40) return 'rainPossible'
  if (tempMax >= 38) return 'veryHot'
  return 'clearGood'
}

export function situationalTips(rainChance, tempMax, alerts) {
  const tips = []
  if (rainChance >= 50) tips.push('laundry')
  if (alerts.some(a => a.key === 'heavyRain')) tips.push('floodSafety')
  if (alerts.some(a => a.key === 'extremeHeat')) tips.push('heatSafety')
  if (alerts.some(a => a.key === 'thunderstorm')) tips.push('stormSafety')
  return tips
}