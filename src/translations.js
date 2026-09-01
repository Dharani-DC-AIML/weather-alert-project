// src/translations.js

export const languages = [
  { code: 'en', label: 'English' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'ml', label: 'മലയാളം' },
  { code: 'hi', label: 'हिन्दी' },
]

export const t = {
  en: {
    voiceLangCode: 'en-IN',
    chooseLanguage: 'Choose your language',
    greeting: 'Hi! Ask me about the weather anywhere. Try "Will it rain in Chennai this week?"',
    placeholder: 'Ask about the weather...',
    thinking: 'thinking...',
    whichLocation: "Which location? e.g. 'weather in Chennai'",
    forecastTooFar: 'I can only forecast up to 7 days ahead. Try a closer date.',
    notFound: (loc) => `Couldn't find "${loc}". Try a bigger nearby city.`,
    fetchError: 'Something went wrong fetching that. Try again.',
    locationError: "Couldn't detect your location right now.",
    myLocationMsg: '📍 Weather at my location',
    wind: 'wind',
    rain: 'rain',
    weather: {
      clear: 'Clear sky',
      partlyCloudy: 'Partly cloudy',
      fog: 'Foggy',
      drizzle: 'Drizzle',
      rain: 'Rain',
      snow: 'Snow',
      rainShowers: 'Rain showers',
      thunderstorm: 'Thunderstorm',
      default: 'Weather'
    },
    advisory: {
      rainHigh: 'High chance of rain — carry an umbrella',
      rainPossible: 'Rain possible later — keep an umbrella handy',
      veryHot: 'Very hot today — stay hydrated, avoid midday sun',
      clearGood: 'Clear conditions — good day to be outside'
    },
    alerts: {
      heavyRain: 'Heavy rainfall likely — risk of local flooding',
      extremeHeat: 'Extreme heat warning — avoid outdoor exposure',
      highWind: 'High wind advisory — secure loose objects',
      thunderstorm: 'Thunderstorm warning in this area'
    },
    tips: {
      laundry: 'Rain expected — better to skip drying laundry outside today',
      floodSafety: 'Flood risk — stay indoors, avoid low-lying areas, keep emergency numbers handy',
      heatSafety: 'Avoid outdoor work between 11am–4pm during extreme heat',
      stormSafety: 'Thunderstorm risk — stay indoors, avoid open fields and unplug electronics',
      hydration: 'Hot day — drink water regularly even if you don’t feel thirsty'
    },
    voice: {
      degrees: 'degrees',
      todayHigh: "Today's high",
      low: 'low',
      chanceOfRain: 'Chance of rain',
      percent: 'percent',
      warning: 'Warning'
    }
  },

  ta: {
    voiceLangCode: 'ta-IN',
    chooseLanguage: 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்',
    greeting: 'வணக்கம்! எந்த இடத்தின் வானிலையையும் கேளுங்கள். "இந்த வாரம் சென்னையில் மழை பெய்யுமா?" என்று முயற்சிக்கவும்',
    placeholder: 'வானிலை பற்றி கேளுங்கள்...',
    thinking: 'யோசிக்கிறேன்...',
    whichLocation: 'எந்த இடம்? எ.கா. "சென்னை வானிலை"',
    forecastTooFar: 'என்னால் 7 நாட்கள் வரை மட்டுமே கணிக்க முடியும். அருகிலுள்ள தேதியை முயற்சிக்கவும்.',
    notFound: (loc) => `"${loc}" கிடைக்கவில்லை. அருகிலுள்ள பெரிய நகரத்தை முயற்சிக்கவும்.`,
    fetchError: 'ஏதோ தவறு நடந்தது. மீண்டும் முயற்சிக்கவும்.',
    locationError: 'உங்கள் இடத்தைக் கண்டறிய முடியவில்லை.',
    myLocationMsg: '📍 எனது இடத்தின் வானிலை',
    wind: 'காற்று',
    rain: 'மழை',
    weather: {
      clear: 'தெளிவான வானம்',
      partlyCloudy: 'ஓரளவு மேகமூட்டம்',
      fog: 'பனிமூட்டம்',
      drizzle: 'தூறல்',
      rain: 'மழை',
      snow: 'பனி',
      rainShowers: 'மழை தூறல்',
      thunderstorm: 'இடி மின்னல்',
      default: 'வானிலை'
    },
    advisory: {
      rainHigh: 'அதிக மழை வாய்ப்பு — குடை எடுத்துச் செல்லுங்கள்',
      rainPossible: 'பின்னர் மழை வரலாம் — குடையை தயாராக வைத்திருங்கள்',
      veryHot: 'இன்று மிகவும் வெப்பமாக உள்ளது — நிறைய தண்ணீர் குடியுங்கள்',
      clearGood: 'தெளிவான வானிலை — வெளியே செல்ல நல்ல நாள்'
    },
    alerts: {
      heavyRain: 'கனமழை எச்சரிக்கை — வெள்ள ஆபத்து',
      extremeHeat: 'கடும் வெப்ப எச்சரிக்கை',
      highWind: 'அதிக காற்று எச்சரிக்கை',
      thunderstorm: 'இடி மின்னல் எச்சரிக்கை'
    },
    tips: {
      laundry: 'மழை எதிர்பார்க்கப்படுகிறது — இன்று வெளியில் துணி காயப்போட வேண்டாம்',
      floodSafety: 'வெள்ள ஆபத்து — வீட்டிற்குள் இருங்கள், தாழ்வான பகுதிகளைத் தவிர்க்கவும், அவசர எண்களை தயாராக வைக்கவும்',
      heatSafety: 'கடும் வெப்பத்தின் போது காலை 11 முதல் மாலை 4 வரை வெளியில் வேலை செய்வதைத் தவிர்க்கவும்',
      stormSafety: 'இடிமின்னல் ஆபத்து — வீட்டிற்குள் இருங்கள், திறந்த வெளிகளைத் தவிர்க்கவும்',
      hydration: 'வெப்பமான நாள் — தாகம் இல்லாவிட்டாலும் தண்ணீர் குடித்துக்கொண்டே இருங்கள்'
    },
    voice: {
      degrees: 'டிகிரி',
      todayHigh: 'இன்றைய அதிகபட்சம்',
      low: 'குறைந்தபட்சம்',
      chanceOfRain: 'மழை வாய்ப்பு',
      percent: 'சதவீதம்',
      warning: 'எச்சரிக்கை'
    }
  },

  te: {
    voiceLangCode: 'te-IN',
    chooseLanguage: 'మీ భాషను ఎంచుకోండి',
    greeting: 'హాయ్! ఏ ప్రదేశంలోనైనా వాతావరణం అడగండి. "ఈ వారం చెన్నైలో వర్షం పడుతుందా?" అని ప్రయత్నించండి',
    placeholder: 'వాతావరణం గురించి అడగండి...',
    thinking: 'ఆలోచిస్తున్నాను...',
    whichLocation: 'ఏ ప్రదేశం? ఉదా. "చెన్నై వాతావరణం"',
    forecastTooFar: 'నేను 7 రోజుల వరకు మాత్రమే అంచనా వేయగలను. దగ్గరి తేదీని ప్రయత్నించండి.',
    notFound: (loc) => `"${loc}" కనుగొనబడలేదు. దగ్గరలోని పెద్ద నగరాన్ని ప్రయత్నించండి.`,
    fetchError: 'ఏదో తప్పు జరిగింది. మళ్లీ ప్రయత్నించండి.',
    locationError: 'మీ స్థానాన్ని గుర్తించలేకపోయాము.',
    myLocationMsg: '📍 నా ప్రదేశంలో వాతావరణం',
    wind: 'గాలి',
    rain: 'వర్షం',
    weather: {
      clear: 'నిర్మలమైన ఆకాశం',
      partlyCloudy: 'పాక్షిక మేఘావృతం',
      fog: 'పొగమంచు',
      drizzle: 'చిరుజల్లులు',
      rain: 'వర్షం',
      snow: 'మంచు',
      rainShowers: 'వర్ష జల్లులు',
      thunderstorm: 'ఉరుములతో వర్షం',
      default: 'వాతావరణం'
    },
    advisory: {
      rainHigh: 'వర్షం అవకాశం ఎక్కువ — గొడుగు తీసుకెళ్లండి',
      rainPossible: 'తర్వాత వర్షం రావచ్చు — గొడుగు సిద్ధంగా ఉంచుకోండి',
      veryHot: 'ఈరోజు చాలా వేడిగా ఉంది — నీరు ఎక్కువగా తాగండి',
      clearGood: 'నిర్మలమైన వాతావరణం — బయట తిరగడానికి మంచి రోజు'
    },
    alerts: {
      heavyRain: 'భారీ వర్షం హెచ్చరిక — వరద ప్రమాదం',
      extremeHeat: 'తీవ్ర వేడి హెచ్చరిక',
      highWind: 'అధిక గాలుల హెచ్చరిక',
      thunderstorm: 'ఉరుములతో కూడిన వర్షం హెచ్చరిక'
    },
    tips: {
      laundry: 'వర్షం అవకాశం ఉంది — ఈరోజు బట్టలు బయట ఆరవేయవద్దు',
      floodSafety: 'వరద ప్రమాదం — ఇంట్లోనే ఉండండి, తక్కువ ఎత్తు ప్రాంతాలను నివారించండి, అత్యవసర నంబర్లు సిద్ధంగా ఉంచండి',
      heatSafety: 'తీవ్ర వేడిలో ఉదయం 11 నుండి సాయంత్రం 4 వరకు బయట పని చేయడం మానుకోండి',
      stormSafety: 'ఉరుముల ప్రమాదం — ఇంట్లోనే ఉండండి, తెరిచిన ప్రదేశాలను నివారించండి',
      hydration: 'వేడి రోజు — దాహం అనిపించకపోయినా నీరు తాగుతూ ఉండండి'
    },
    voice: {
      degrees: 'డిగ్రీలు',
      todayHigh: 'నేటి గరిష్ఠం',
      low: 'కనిష్ఠం',
      chanceOfRain: 'వర్ష అవకాశం',
      percent: 'శాతం',
      warning: 'హెచ్చరిక'
    }
  },

  ml: {
    voiceLangCode: 'ml-IN',
    chooseLanguage: 'നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക',
    greeting: 'ഹായ്! ഏത് സ്ഥലത്തെയും കാലാവസ്ഥയെക്കുറിച്ച് ചോദിക്കൂ. "ഈ ആഴ്ച ചെന്നൈയിൽ മഴ പെയ്യുമോ?" എന്ന് ശ്രമിക്കുക',
    placeholder: 'കാലാവസ്ഥയെക്കുറിച്ച് ചോദിക്കൂ...',
    thinking: 'ചിന്തിക്കുന്നു...',
    whichLocation: 'ഏത് സ്ഥലം? ഉദാ. "ചെന്നൈ കാലാവസ്ഥ"',
    forecastTooFar: 'എനിക്ക് 7 ദിവസം വരെ മാത്രമേ പ്രവചിക്കാൻ കഴിയൂ. അടുത്ത തീയതി ശ്രമിക്കുക.',
    notFound: (loc) => `"${loc}" കണ്ടെത്താനായില്ല. അടുത്തുള്ള വലിയ നഗരം ശ്രമിക്കുക.`,
    fetchError: 'എന്തോ പിശക് സംഭവിച്ചു. വീണ്ടും ശ്രമിക്കുക.',
    locationError: 'നിങ്ങളുടെ സ്ഥാനം കണ്ടെത്താനായില്ല.',
    myLocationMsg: '📍 എന്റെ സ്ഥലത്തെ കാലാവസ്ഥ',
    wind: 'കാറ്റ്',
    rain: 'മഴ',
    weather: {
      clear: 'തെളിഞ്ഞ ആകാശം',
      partlyCloudy: 'ഭാഗിക മേഘാവൃതം',
      fog: 'മൂടൽമഞ്ഞ്',
      drizzle: 'ചാറ്റൽമഴ',
      rain: 'മഴ',
      snow: 'മഞ്ഞ്',
      rainShowers: 'മഴ ചാറ്റൽ',
      thunderstorm: 'ഇടിമിന്നൽ',
      default: 'കാലാവസ്ഥ'
    },
    advisory: {
      rainHigh: 'മഴയ്ക്ക് സാധ്യത കൂടുതൽ — കുട കരുതുക',
      rainPossible: 'പിന്നീട് മഴ സാധ്യത — കുട തയ്യാറാക്കി വയ്ക്കുക',
      veryHot: 'ഇന്ന് വളരെ ചൂടാണ് — ധാരാളം വെള്ളം കുടിക്കുക',
      clearGood: 'തെളിഞ്ഞ കാലാവസ്ഥ — പുറത്തിറങ്ങാൻ നല്ല ദിവസം'
    },
    alerts: {
      heavyRain: 'കനത്ത മഴ മുന്നറിയിപ്പ് — വെള്ളപ്പൊക്ക സാധ്യത',
      extremeHeat: 'അതിതീവ്ര ചൂട് മുന്നറിയിപ്പ്',
      highWind: 'ശക്തമായ കാറ്റ് മുന്നറിയിപ്പ്',
      thunderstorm: 'ഇടിമിന്നൽ മുന്നറിയിപ്പ്'
    },
    tips: {
      laundry: 'മഴ പ്രതീക്ഷിക്കുന്നു — ഇന്ന് പുറത്ത് തുണി ഉണക്കാൻ ഇടരുത്',
      floodSafety: 'വെള്ളപ്പൊക്ക സാധ്യത — വീടിനുള്ളിൽ തുടരുക, താഴ്ന്ന പ്രദേശങ്ങൾ ഒഴിവാക്കുക, അടിയന്തര നമ്പറുകൾ കരുതുക',
      heatSafety: 'കടുത്ത ചൂടിൽ രാവിലെ 11 മുതൽ വൈകുന്നേരം 4 വരെ പുറത്ത് ജോലി ഒഴിവാക്കുക',
      stormSafety: 'ഇടിമിന്നൽ സാധ്യത — വീടിനുള്ളിൽ തുടരുക, തുറസ്സായ സ്ഥലങ്ങൾ ഒഴിവാക്കുക',
      hydration: 'ചൂടേറിയ ദിവസം — ദാഹം തോന്നിയില്ലെങ്കിലും ഇടയ്ക്കിടെ വെള്ളം കുടിക്കുക'
    },
    voice: {
      degrees: 'ഡിഗ്രി',
      todayHigh: 'ഇന്നത്തെ ഉയർന്നത്',
      low: 'താഴ്ന്നത്',
      chanceOfRain: 'മഴ സാധ്യത',
      percent: 'ശതമാനം',
      warning: 'മുന്നറിയിപ്പ്'
    }
  },

  hi: {
    voiceLangCode: 'hi-IN',
    chooseLanguage: 'अपनी भाषा चुनें',
    greeting: 'नमस्ते! किसी भी जगह के मौसम के बारे में पूछें। कोशिश करें "क्या इस हफ्ते चेन्नई में बारिश होगी?"',
    placeholder: 'मौसम के बारे में पूछें...',
    thinking: 'सोच रहा हूँ...',
    whichLocation: 'कौन सी जगह? जैसे "चेन्नई का मौसम"',
    forecastTooFar: 'मैं केवल 7 दिनों तक का पूर्वानुमान बता सकता हूं। नज़दीकी तारीख आज़माएं।',
    notFound: (loc) => `"${loc}" नहीं मिला। पास के किसी बड़े शहर का नाम आज़माएं।`,
    fetchError: 'कुछ गलत हो गया। फिर से कोशिश करें।',
    locationError: 'आपकी जगह का पता नहीं लगा सके।',
    myLocationMsg: '📍 मेरी जगह का मौसम',
    wind: 'हवा',
    rain: 'बारिश',
    weather: {
      clear: 'साफ आसमान',
      partlyCloudy: 'आंशिक बादल',
      fog: 'कोहरा',
      drizzle: 'हल्की बारिश',
      rain: 'बारिश',
      snow: 'बर्फ',
      rainShowers: 'बारिश की बौछारें',
      thunderstorm: 'आंधी-तूफान',
      default: 'मौसम'
    },
    advisory: {
      rainHigh: 'बारिश की अधिक संभावना — छाता साथ रखें',
      rainPossible: 'बाद में बारिश हो सकती है — छाता तैयार रखें',
      veryHot: 'आज बहुत गर्मी है — खूब पानी पिएं',
      clearGood: 'साफ मौसम — बाहर जाने के लिए अच्छा दिन'
    },
    alerts: {
      heavyRain: 'भारी बारिश की चेतावनी — बाढ़ का खतरा',
      extremeHeat: 'अत्यधिक गर्मी की चेतावनी',
      highWind: 'तेज हवा की चेतावनी',
      thunderstorm: 'आंधी-तूफान की चेतावनी'
    },
    tips: {
      laundry: 'बारिश की संभावना है — आज कपड़े बाहर न सुखाएं',
      floodSafety: 'बाढ़ का खतरा — घर के अंदर रहें, निचले इलाकों से बचें, आपातकालीन नंबर तैयार रखें',
      heatSafety: 'अत्यधिक गर्मी में सुबह 11 से शाम 4 बजे तक बाहर काम करने से बचें',
      stormSafety: 'आंधी-तूफान का खतरा — घर के अंदर रहें, खुले मैदानों से बचें',
      hydration: 'गर्म दिन — प्यास न लगे तो भी नियमित रूप से पानी पिएं'
    },
    voice: {
      degrees: 'डिग्री',
      todayHigh: 'आज का अधिकतम',
      low: 'न्यूनतम',
      chanceOfRain: 'बारिश की संभावना',
      percent: 'प्रतिशत',
      warning: 'चेतावनी'
    }
  }
}