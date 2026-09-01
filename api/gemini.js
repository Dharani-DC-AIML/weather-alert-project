export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { text } = req.body
  const apiKey = process.env.GEMINI_API_KEY
  const today = new Date().toISOString().split('T')[0]

  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You understand weather questions in any language, including Tamil, Telugu, Malayalam, Hindi, and English.

Today's date is ${today}.

Extract the intent, location, and target day from this weather query, no matter what language it's written in.

Reply ONLY with JSON, no markdown, no backticks. Format:
{"intent":"current|forecast|alert|historical|historical-trend","location":"place name in English/Latin script for geocoding, or null","daysFromNow":0,"historicalDate":null,"historicalMonth":null,"historicalYearsBack":null}

daysFromNow: 0 = today, 1 = tomorrow, up to 6 = six days from now. Work out the correct number based on today's date for phrases like "next Monday", "this Friday", "in 3 days", etc. If unclear or unspecified, use 0. Cap at 6 if further in the future than that (our forecast only covers 7 days).

If the query asks about a SPECIFIC single PAST day (e.g. "what was the weather last Tuesday"), set intent to "historical" and set historicalDate to a specific YYYY-MM-DD date.

If the query asks about a PAST MONTH's trend across multiple years (e.g. "average temperature in September over the past years", "how has July rainfall changed over the years", "climate trend for December"), set intent to "historical-trend", set historicalMonth to the month number (1-12), and set historicalYearsBack to how many past years to compare (default 3 if not specified, max 5).

If the location is written in a native script (e.g. Tamil, Hindi), translate/transliterate it to its standard English place name (e.g. "சென்னை" becomes "Chennai").
Query: "${text}"`
            }]
          }]
        })
      }
    )
    const data = await response.json()
    res.status(200).json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to reach Gemini' })
  }
}