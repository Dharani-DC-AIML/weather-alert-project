// src/weatherIcons.js
export function weatherCode(code) {
  if (code === 0) return { icon: '☀️', key: 'clear' }
  if ([1, 2].includes(code)) return { icon: '⛅', key: 'partlyCloudy' }
  if (code === 3) return { icon: '☁️', key: 'fog' }
  if ([45, 48].includes(code)) return { icon: '🌫️', key: 'fog' }
  if ([51, 53, 55, 56, 57].includes(code)) return { icon: '🌦️', key: 'drizzle' }
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { icon: '🌧️', key: 'rain' }
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { icon: '❄️', key: 'snow' }
  if ([80, 81, 82].includes(code)) return { icon: '🌦️', key: 'rainShowers' }
  if ([95, 96, 99].includes(code)) return { icon: '⛈️', key: 'thunderstorm' }
  return { icon: '🌤️', key: 'default' }
}

export function advisoryKey(rainChance, tempMax) {
  if (rainChance >= 80) return 'rainHigh'
  if (rainChance >= 50) return 'rainPossible'
  if (tempMax >= 38) return 'veryHot'
  return 'clearGood'
}

export function situationalTips(rainChance, tempMax, alerts, code) {
  const tips = []
  const weatherKey = code !== undefined ? weatherCode(code).key : null

  if (alerts.some(a => a.key === 'heavyRain')) {
    tips.push('floodSafety')
  } else if (rainChance >= 50) {
    tips.push('laundry')
  }

  if (alerts.some(a => a.key === 'extremeHeat')) {
    tips.push('heatSafety')
  } else if (tempMax >= 34) {
    tips.push('hydration')
  }

  if (alerts.some(a => a.key === 'thunderstorm')) tips.push('stormSafety')

  if (tips.length === 0) {
    if (weatherKey === 'clear') tips.push('sunnyTip')
    else if (weatherKey === 'partlyCloudy' || weatherKey === 'fog') tips.push('cloudyTip')
    else if (['drizzle', 'rain', 'rainShowers'].includes(weatherKey)) tips.push('rainyTip')
  }

  return tips
}
export function agriAdvisoryKey(rainChance, tempMax, alerts) {
  if (alerts.some(a => a.key === 'heavyRain')) return 'floodRisk'
  if (rainChance >= 70) return 'skipIrrigation'
  if (tempMax >= 38) return 'droughtStress'
  if (rainChance < 30 && tempMax < 34) return 'goodForFieldWork'
  return 'normalConditions'
}