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
    quickChips: ["Today's weather", "This week's forecast", "Any alerts near me?", "Do I need an umbrella?"],
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
      moderateRain: 'Moderate rain expected — minor flooding possible in low areas',
      extremeHeat: 'Extreme heat warning — avoid outdoor exposure',
      highWind: 'High wind advisory — secure loose objects',
      thunderstorm: 'Thunderstorm warning in this area'
    },
    helpline: {
      button: 'Emergency helpline',
      nationalWarning: 'This is the national helpline — not specific to your location.'
    },
    marine: {
      button: 'Marine advisory',
      safe: 'Sea conditions look calm and safe for coastal fishing today. Normal fishing operations can continue as planned, but always keep a radio or phone on board.',
      caution: 'Sea conditions are moderate today, with somewhat rough waves. Experienced fishermen can go out, but stay closer to shore and keep a close watch on changing weather.',
      avoid: 'Rough seas are expected today — this is not a safe day to go out on the water. Please stay ashore, secure your boats, and wait for calmer conditions before heading out.',
      waveHeight: 'Wave height',
      windWaveHeight: 'Wind wave height',
      notCoastal: 'This location is inland and does not have marine or coastal weather data available.'
    },
    agri: {
      button: 'Agri advisory',
      floodRisk: 'Heavy rain is expected — protect standing crops from waterlogging, clear field drainage channels, and delay any pesticide or fertilizer application until the rain passes.',
      skipIrrigation: 'High chance of rain today — you can skip irrigation for now and let natural rainfall water the fields.',
      droughtStress: 'Very high temperatures are expected — crops may face heat stress. Irrigate early morning or evening, and consider mulching to help retain soil moisture.',
      goodForFieldWork: 'Clear, mild conditions today — a good day for sowing, weeding, or other field work.',
      normalConditions: 'Weather conditions are moderate today — continue with your regular farming schedule.'
    },
    tips: {
      laundry: 'Rain expected — better to skip drying laundry outside today',
      floodSafety: 'Flood risk — stay indoors, avoid low-lying areas, keep emergency numbers handy',
      heatSafety: 'Avoid outdoor work between 11am–4pm during extreme heat',
      stormSafety: 'Thunderstorm risk — stay indoors, avoid open fields and unplug electronics',
      hydration: 'Hot day — drink water regularly even if you don\'t feel thirsty',
      sunnyTip: 'Clear skies today — good day for outdoor plans, but don\'t forget sunscreen',
      cloudyTip: 'Cloudy skies — pleasant weather for a walk, keep a light jacket just in case',
      rainyTip: 'Wet roads likely — drive carefully and watch out for puddles'
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
    quickChips: ["இன்றைய வானிலை", "இந்த வார முன்னறிவிப்பு", "எனக்கு அருகில் எச்சரிக்கைகள்?", "குடை தேவையா?"],
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
      moderateRain: 'மிதமான மழை எதிர்பார்க்கப்படுகிறது — தாழ்வான பகுதிகளில் சிறிய வெள்ளம் ஏற்படலாம்',
      extremeHeat: 'கடும் வெப்ப எச்சரிக்கை',
      highWind: 'அதிக காற்று எச்சரிக்கை',
      thunderstorm: 'இடி மின்னல் எச்சரிக்கை'
    },
    helpline: {
      button: 'அவசர உதவி எண்',
      nationalWarning: 'இது தேசிய உதவி எண் — உங்கள் இருப்பிடத்திற்கு குறிப்பிட்டது அல்ல.'
    },
    marine: {
      button: 'கடல் ஆலோசனை',
      safe: 'இன்று கடல் நிலைமைகள் அமைதியாகவும் மீன்பிடிக்க பாதுகாப்பாகவும் உள்ளன. வழக்கம் போல் மீன்பிடி நடவடிக்கைகளைத் தொடரலாம், ஆனால் படகில் ரேடியோ அல்லது தொலைபேசியை வைத்திருங்கள்.',
      caution: 'இன்று கடல் நிலைமைகள் மிதமானவை, அலைகள் சற்று கொந்தளிப்பாக உள்ளன. அனுபவமுள்ள மீனவர்கள் செல்லலாம், ஆனால் கரைக்கு அருகில் இருந்து வானிலையை கவனியுங்கள்.',
      avoid: 'இன்று கொந்தளிப்பான கடல் எதிர்பார்க்கப்படுகிறது — கடலுக்குச் செல்ல பாதுகாப்பான நாள் அல்ல. தயவுசெய்து கரையில் தங்கி, படகுகளை பாதுகாப்பாக கட்டி, வானிலை அமைதியாகும் வரை காத்திருங்கள்.',
      waveHeight: 'அலை உயரம்',
      windWaveHeight: 'காற்று அலை உயரம்',
      notCoastal: 'இந்த இடம் உள்நாட்டில் உள்ளது, கடல்சார் தகவல் கிடைக்கவில்லை.'
    },
    agri: {
      button: 'விவசாய ஆலோசனை',
      floodRisk: 'கனமழை எதிர்பார்க்கப்படுகிறது — நின்றுள்ள பயிர்களை நீர்தேக்கத்திலிருந்து பாதுகாக்கவும், வயல் வடிகால்களை சுத்தமாக வைக்கவும், பூச்சிக்கொல்லி அல்லது உரம் தெளிப்பதை மழை முடியும் வரை தள்ளிவைக்கவும்.',
      skipIrrigation: 'இன்று மழைக்கு அதிக வாய்ப்பு உள்ளது — தற்போதைக்கு பாசனத்தை தவிர்த்து, இயற்கை மழையை வயல்களுக்கு பயன்படுத்தலாம்.',
      droughtStress: 'மிக அதிக வெப்பநிலை எதிர்பார்க்கப்படுகிறது — பயிர்கள் வெப்ப அழுத்தத்தை எதிர்கொள்ளலாம். காலை அல்லது மாலை நேரங்களில் பாசனம் செய்யவும், மண் ஈரப்பதத்தை தக்கவைக்க மல்ச்சிங் செய்யவும்.',
      goodForFieldWork: 'இன்று தெளிவான, மிதமான வானிலை — விதைப்பு, களை எடுத்தல் அல்லது பிற வயல் வேலைகளுக்கு நல்ல நாள்.',
      normalConditions: 'இன்று வானிலை நிலைமைகள் மிதமானவை — உங்கள் வழக்கமான விவசாய அட்டவணையைத் தொடரவும்.'
    },
    tips: {
      laundry: 'மழை எதிர்பார்க்கப்படுகிறது — இன்று வெளியில் துணி காயப்போட வேண்டாம்',
      floodSafety: 'வெள்ள ஆபத்து — வீட்டிற்குள் இருங்கள், தாழ்வான பகுதிகளைத் தவிர்க்கவும், அவசர எண்களை தயாராக வைக்கவும்',
      heatSafety: 'கடும் வெப்பத்தின் போது காலை 11 முதல் மாலை 4 வரை வெளியில் வேலை செய்வதைத் தவிர்க்கவும்',
      stormSafety: 'இடிமின்னல் ஆபத்து — வீட்டிற்குள் இருங்கள், திறந்த வெளிகளைத் தவிர்க்கவும்',
      hydration: 'வெப்பமான நாள் — தாகம் இல்லாவிட்டாலும் தண்ணீர் குடித்துக்கொண்டே இருங்கள்',
      sunnyTip: 'இன்று தெளிவான வானம் — வெளியே செல்ல நல்ல நாள், சன்ஸ்கிரீன் மறக்காதீர்கள்',
      cloudyTip: 'மேகமூட்டமான வானிலை — நடைப்பயிற்சிக்கு ஏற்றது, ஒரு இலகு ஜாக்கெட்டை வைத்திருங்கள்',
      rainyTip: 'சாலைகள் ஈரமாக இருக்கலாம் — கவனமாக ஓட்டுங்கள், குட்டைகளை கவனியுங்கள்'
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
    quickChips: ["ఈరోజు వాతావరణం", "ఈ వారం అంచనా", "నా దగ్గర హెచ్చరికలు?", "గొడుగు అవసరమా?"],
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
      moderateRain: 'మితమైన వర్షం అంచనా — తక్కువ ప్రాంతాల్లో స్వల్ప వరద అవకాశం',
      extremeHeat: 'తీవ్ర వేడి హెచ్చరిక',
      highWind: 'అధిక గాలుల హెచ్చరిక',
      thunderstorm: 'ఉరుములతో కూడిన వర్షం హెచ్చరిక'
    },
    helpline: {
      button: 'అత్యవసర హెల్ప్‌లైన్',
      nationalWarning: 'ఇది జాతీయ హెల్ప్‌లైన్ — మీ ప్రదేశానికి ప్రత్యేకమైనది కాదు.'
    },
    marine: {
      button: 'సముద్ర సలహా',
      safe: 'ఈరోజు సముద్ర పరిస్థితులు ప్రశాంతంగా, తీర మత్స్యకారులకు సురక్షితంగా ఉన్నాయి. మామూలుగా చేపలు పట్టే పనులు కొనసాగించవచ్చు, కానీ పడవలో రేడియో లేదా ఫోన్ ఉంచుకోండి.',
      caution: 'ఈరోజు సముద్ర పరిస్థితులు మధ్యస్థంగా ఉన్నాయి, అలలు కొంచెం కఠినంగా ఉన్నాయి. అనుభవజ్ఞులైన మత్స్యకారులు వెళ్లవచ్చు, కానీ తీరానికి దగ్గరగా ఉండి వాతావరణాన్ని గమనించండి.',
      avoid: 'ఈరోజు అల్లకల్లోల సముద్రం ఉంటుందని అంచనా — సముద్రంలోకి వెళ్లడానికి సురక్షితమైన రోజు కాదు. దయచేసి తీరంలోనే ఉండి, పడవలను భద్రపరచి, పరిస్థితులు శాంతించే వరకు వేచి ఉండండి.',
      waveHeight: 'అల ఎత్తు',
      windWaveHeight: 'గాలి అల ఎత్తు',
      notCoastal: 'ఈ ప్రదేశం లోతట్టు ప్రాంతంలో ఉంది, సముద్ర సమాచారం అందుబాటులో లేదు.'
    },
    agri: {
      button: 'వ్యవసాయ సలహా',
      floodRisk: 'భారీ వర్షం అంచనా వేయబడింది — నిలబడి ఉన్న పంటలను నీటి నిల్వ నుండి రక్షించండి, పొలం కాలువలను శుభ్రంగా ఉంచండి, వర్షం తగ్గే వరకు పురుగుమందులు లేదా ఎరువుల వాడకాన్ని వాయిదా వేయండి.',
      skipIrrigation: 'ఈరోజు వర్షం అవకాశం ఎక్కువగా ఉంది — ప్రస్తుతానికి నీటిపారుదల మానేసి, సహజ వర్షాన్ని పొలాలకు ఉపయోగించుకోవచ్చు.',
      droughtStress: 'చాలా అధిక ఉష్ణోగ్రతలు అంచనా వేయబడ్డాయి — పంటలు వేడి ఒత్తిడిని ఎదుర్కోవచ్చు. ఉదయం లేదా సాయంత్రం నీరు పెట్టండి, మట్టిలో తేమను నిలుపుకోవడానికి మల్చింగ్ చేయండి.',
      goodForFieldWork: 'ఈరోజు నిర్మలమైన, మధ్యస్థ వాతావరణం — విత్తనాలు వేయడానికి, కలుపు తీయడానికి లేదా ఇతర పొలం పనులకు మంచి రోజు.',
      normalConditions: 'ఈరోజు వాతావరణ పరిస్థితులు మధ్యస్థంగా ఉన్నాయి — మీ సాధారణ వ్యవసాయ షెడ్యూల్‌ను కొనసాగించండి.'
    },
    tips: {
      laundry: 'వర్షం అవకాశం ఉంది — ఈరోజు బట్టలు బయట ఆరవేయవద్దు',
      floodSafety: 'వరద ప్రమాదం — ఇంట్లోనే ఉండండి, తక్కువ ఎత్తు ప్రాంతాలను నివారించండి, అత్యవసర నంబర్లు సిద్ధంగా ఉంచండి',
      heatSafety: 'తీవ్ర వేడిలో ఉదయం 11 నుండి సాయంత్రం 4 వరకు బయట పని చేయడం మానుకోండి',
      stormSafety: 'ఉరుముల ప్రమాదం — ఇంట్లోనే ఉండండి, తెరిచిన ప్రదేశాలను నివారించండి',
      hydration: 'వేడి రోజు — దాహం అనిపించకపోయినా నీరు తాగుతూ ఉండండి',
      sunnyTip: 'ఈరోజు నిర్మలమైన ఆకాశం — బయట తిరగడానికి మంచి రోజు, సన్‌స్క్రీన్ మర్చిపోవద్దు',
      cloudyTip: 'మేఘావృత వాతావరణం — నడకకు ఆహ్లాదకరం, తేలికపాటి జాకెట్ ఉంచుకోండి',
      rainyTip: 'రోడ్లు తడిగా ఉండవచ్చు — జాగ్రత్తగా డ్రైవ్ చేయండి, గుంతలను గమనించండి'
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
    quickChips: ["ഇന്നത്തെ കാലാവസ്ഥ", "ഈ ആഴ്ചത്തെ പ്രവചനം", "എനിക്ക് സമീപം മുന്നറിയിപ്പുകൾ?", "കുട വേണോ?"],
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
      moderateRain: 'മിതമായ മഴ പ്രതീക്ഷിക്കുന്നു — താഴ്ന്ന പ്രദേശങ്ങളിൽ ചെറിയ വെള്ളപ്പൊക്ക സാധ്യത',
      extremeHeat: 'അതിതീവ്ര ചൂട് മുന്നറിയിപ്പ്',
      highWind: 'ശക്തമായ കാറ്റ് മുന്നറിയിപ്പ്',
      thunderstorm: 'ഇടിമിന്നൽ മുന്നറിയിപ്പ്'
    },
    helpline: {
      button: 'അടിയന്തര ഹെൽപ്‌ലൈൻ',
      nationalWarning: 'ഇത് ദേശീയ ഹെൽപ്‌ലൈനാണ് — നിങ്ങളുടെ സ്ഥലത്തിന് പ്രത്യേകമല്ല.'
    },
    marine: {
      button: 'സമുദ്ര ഉപദേശം',
      safe: 'ഇന്ന് കടൽ സാഹചര്യങ്ങൾ ശാന്തവും തീരദേശ മത്സ്യബന്ധനത്തിന് സുരക്ഷിതവുമാണ്. പതിവ് മത്സ്യബന്ധന പ്രവർത്തനങ്ങൾ തുടരാം, എന്നാൽ വള്ളത്തിൽ റേഡിയോയോ ഫോണോ കരുതുക.',
      caution: 'ഇന്ന് കടൽ സാഹചര്യം മിതമാണ്, തിരമാലകൾ അല്പം പരുഷമാണ്. പരിചയസമ്പന്നരായ മത്സ്യത്തൊഴിലാളികൾക്ക് പോകാം, പക്ഷേ തീരത്തിനോട് അടുത്ത് നിന്ന് കാലാവസ്ഥ ശ്രദ്ധിക്കുക.',
      avoid: 'ഇന്ന് പ്രക്ഷുബ്ധമായ കടൽ പ്രതീക്ഷിക്കുന്നു — കടലിൽ പോകാൻ സുരക്ഷിതമായ ദിവസമല്ല. ദയവായി തീരത്ത് തന്നെ തുടരുക, വള്ളങ്ങൾ സുരക്ഷിതമായി കെട്ടിവയ്ക്കുക, സാഹചര്യം ശാന്തമാകുന്നത് വരെ കാത്തിരിക്കുക.',
      waveHeight: 'തിരമാല ഉയരം',
      windWaveHeight: 'കാറ്റ് തിരമാല ഉയരം',
      notCoastal: 'ഈ സ്ഥലം ഉൾനാടൻ പ്രദേശമാണ്, സമുദ്ര വിവരങ്ങൾ ലഭ്യമല്ല.'
    },
    agri: {
      button: 'കാർഷിക ഉപദേശം',
      floodRisk: 'കനത്ത മഴ പ്രതീക്ഷിക്കുന്നു — നിൽക്കുന്ന വിളകളെ വെള്ളക്കെട്ടിൽ നിന്ന് സംരക്ഷിക്കുക, വയൽ ഡ്രെയിനേജ് വൃത്തിയായി സൂക്ഷിക്കുക, മഴ മാറുന്നത് വരെ കീടനാശിനി അല്ലെങ്കിൽ വളപ്രയോഗം മാറ്റിവയ്ക്കുക.',
      skipIrrigation: 'ഇന്ന് മഴയ്ക്ക് സാധ്യത കൂടുതലാണ് — ഇപ്പോൾ ജലസേചനം ഒഴിവാക്കി, സ്വാഭാവിക മഴ വയലുകൾക്ക് ഉപയോഗിക്കാം.',
      droughtStress: 'വളരെ ഉയർന്ന താപനില പ്രതീക്ഷിക്കുന്നു — വിളകൾക്ക് ചൂട് സമ്മർദ്ദം നേരിടേണ്ടി വന്നേക്കാം. രാവിലെയോ വൈകുന്നേരമോ ജലസേചനം നടത്തുക, മണ്ണിലെ ഈർപ്പം നിലനിർത്താൻ മൾച്ചിംഗ് പരിഗണിക്കുക.',
      goodForFieldWork: 'ഇന്ന് തെളിഞ്ഞ, മിതമായ കാലാവസ്ഥ — വിതയ്ക്കാനോ കള പറിക്കാനോ മറ്റ് വയൽ ജോലികൾക്കോ നല്ല ദിവസം.',
      normalConditions: 'ഇന്ന് കാലാവസ്ഥാ സാഹചര്യങ്ങൾ മിതമാണ് — നിങ്ങളുടെ പതിവ് കാർഷിക ഷെഡ്യൂൾ തുടരുക.'
    },
    tips: {
      laundry: 'മഴ പ്രതീക്ഷിക്കുന്നു — ഇന്ന് പുറത്ത് തുണി ഉണക്കാൻ ഇടരുത്',
      floodSafety: 'വെള്ളപ്പൊക്ക സാധ്യത — വീടിനുള്ളിൽ തുടരുക, താഴ്ന്ന പ്രദേശങ്ങൾ ഒഴിവാക്കുക, അടിയന്തര നമ്പറുകൾ കരുതുക',
      heatSafety: 'കടുത്ത ചൂടിൽ രാവിലെ 11 മുതൽ വൈകുന്നേരം 4 വരെ പുറത്ത് ജോലി ഒഴിവാക്കുക',
      stormSafety: 'ഇടിമിന്നൽ സാധ്യത — വീടിനുള്ളിൽ തുടരുക, തുറസ്സായ സ്ഥലങ്ങൾ ഒഴിവാക്കുക',
      hydration: 'ചൂടേറിയ ദിവസം — ദാഹം തോന്നിയില്ലെങ്കിലും ഇടയ്ക്കിടെ വെള്ളം കുടിക്കുക',
      sunnyTip: 'ഇന്ന് തെളിഞ്ഞ ആകാശം — പുറത്തിറങ്ങാൻ നല്ല ദിവസം, സൺസ്ക്രീൻ മറക്കരുത്',
      cloudyTip: 'മേഘാവൃതമായ കാലാവസ്ഥ — നടത്തത്തിന് അനുയോജ്യം, ഒരു ലഘു ജാക്കറ്റ് കരുതുക',
      rainyTip: 'റോഡുകൾ നനഞ്ഞിരിക്കാം — ശ്രദ്ധയോടെ ഓടിക്കുക, കുഴികൾ ശ്രദ്ധിക്കുക'
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
    quickChips: ["आज का मौसम", "इस हफ्ते का पूर्वानुमान", "मेरे पास चेतावनियां?", "क्या छाता चाहिए?"],
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
      moderateRain: 'मध्यम बारिश की संभावना — निचले इलाकों में हल्की बाढ़ संभव',
      extremeHeat: 'अत्यधिक गर्मी की चेतावनी',
      highWind: 'तेज हवा की चेतावनी',
      thunderstorm: 'आंधी-तूफान की चेतावनी'
    },
    helpline: {
      button: 'आपातकालीन हेल्पलाइन',
      nationalWarning: 'यह राष्ट्रीय हेल्पलाइन है — आपकी जगह के लिए विशेष नहीं है।'
    },
    marine: {
      button: 'समुद्री सलाह',
      safe: 'आज समुद्र की स्थिति शांत है और तटीय मछली पकड़ने के लिए सुरक्षित है। सामान्य मछली पकड़ने का काम जारी रखा जा सकता है, लेकिन नाव में रेडियो या फोन ज़रूर रखें।',
      caution: 'आज समुद्र की स्थिति मध्यम है, लहरें थोड़ी तेज़ हैं। अनुभवी मछुआरे जा सकते हैं, लेकिन किनारे के पास रहें और मौसम पर नज़र रखें।',
      avoid: 'आज तेज़ लहरों की संभावना है — समुद्र में जाने के लिए यह सुरक्षित दिन नहीं है। कृपया किनारे पर रहें, नावों को सुरक्षित बांधें, और स्थिति शांत होने का इंतज़ार करें।',
      waveHeight: 'लहर की ऊंचाई',
      windWaveHeight: 'हवा से बनी लहर की ऊंचाई',
      notCoastal: 'यह स्थान अंतर्देशीय है और यहां समुद्री जानकारी उपलब्ध नहीं है।'
    },
    agri: {
      button: 'कृषि सलाह',
      floodRisk: 'भारी बारिश की संभावना है — खड़ी फसलों को जलभराव से बचाएं, खेत की जल निकासी साफ रखें, और बारिश थमने तक कीटनाशक या उर्वरक का छिड़काव टाल दें।',
      skipIrrigation: 'आज बारिश की अधिक संभावना है — फिलहाल सिंचाई छोड़ें और प्राकृतिक बारिश को खेतों में पानी देने दें।',
      droughtStress: 'बहुत अधिक तापमान की संभावना है — फसलों पर गर्मी का तनाव पड़ सकता है। सुबह या शाम को सिंचाई करें और मिट्टी की नमी बनाए रखने के लिए मल्चिंग पर विचार करें।',
      goodForFieldWork: 'आज साफ, सामान्य मौसम है — बुवाई, निराई या अन्य खेत के काम के लिए अच्छा दिन है।',
      normalConditions: 'आज मौसम की स्थिति सामान्य है — अपना नियमित खेती कार्यक्रम जारी रखें।'
    },
    tips: {
      laundry: 'बारिश की संभावना है — आज कपड़े बाहर न सुखाएं',
      floodSafety: 'बाढ़ का खतरा — घर के अंदर रहें, निचले इलाकों से बचें, आपातकालीन नंबर तैयार रखें',
      heatSafety: 'अत्यधिक गर्मी में सुबह 11 से शाम 4 बजे तक बाहर काम करने से बचें',
      stormSafety: 'आंधी-तूफान का खतरा — घर के अंदर रहें, खुले मैदानों से बचें',
      hydration: 'गर्म दिन — प्यास न लगे तो भी नियमित रूप से पानी पिएं',
      sunnyTip: 'आज साफ आसमान है — बाहर जाने के लिए अच्छा दिन, सनस्क्रीन लगाना न भूलें',
      cloudyTip: 'बादल छाए हैं — टहलने के लिए सुहावना मौसम, हल्की जैकेट साथ रखें',
      rainyTip: 'सड़कें गीली हो सकती हैं — सावधानी से गाड़ी चलाएं, गड्ढों का ध्यान रखें'
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