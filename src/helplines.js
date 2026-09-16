// State-specific disaster helplines. All numbers verified against official
// state disaster management authority sources (Sep 2026).
export const stateHelplines = {
  'Tamil Nadu': { name: 'Tamil Nadu State Emergency Operations Centre', number: '1070' },
  'Kerala': { name: 'Kerala State Emergency Operations Centre', number: '1070' },
  'Andhra Pradesh': { name: 'Andhra Pradesh State Disaster Management Authority', number: '1070' }
}

// National Disaster Management Authority helpline — used as a fallback
// whenever the queried location's state isn't in stateHelplines above.
export const nationalHelpline = { name: 'NDMA National Helpline', number: '1078' }

export function getHelplineForState(state) {
  if (!state) return null
  return stateHelplines[state] || null
}