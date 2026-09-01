import { useState, useRef } from 'react'

export function useVoice(onResult, lang) {
  const [listening, setListening] = useState(false)
  const recognitionRef = useRef(null)

  function start() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert('Voice input is not supported on this browser. Try Chrome.')
      return
    }
    const recognition = new SpeechRecognition()
    recognition.lang = lang
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onstart = () => setListening(true)
    recognition.onend = () => setListening(false)
    recognition.onerror = (e) => {
      console.error('Speech recognition error:', e.error)
      setListening(false)
    }
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript
      onResult(text)
    }

    recognitionRef.current = recognition
    recognition.start()
  }

  return { listening, start }
}

export function speak(text, langCode) {
  if (!window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = langCode
  utterance.rate = 0.95

  const resumeInterval = setInterval(() => {
    if (!window.speechSynthesis.speaking) {
      clearInterval(resumeInterval)
    } else {
      window.speechSynthesis.pause()
      window.speechSynthesis.resume()
    }
  }, 10000)

  utterance.onend = () => clearInterval(resumeInterval)
  utterance.onerror = () => clearInterval(resumeInterval)

  window.speechSynthesis.speak(utterance)
}