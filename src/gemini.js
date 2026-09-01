export async function parseQuery(text) {
  const res = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  })
  const data = await res.json()
  const raw = data.candidates[0].content.parts[0].text
  const clean = raw.replace(/```json|```/g, '').trim()
  const parsed = JSON.parse(clean)
  if (typeof parsed.daysFromNow !== 'number') parsed.daysFromNow = 0
  return parsed
}