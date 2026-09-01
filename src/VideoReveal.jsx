// src/VideoReveal.jsx
import { useRef, useEffect } from 'react'
import sunnyVid from './assets/field-sunny.mp4'
import stormVid from './assets/field-storm.mp4'
import snowyVid from './assets/field-snowy.mp4'

const CLIP_DURATION = 5
const FLASH_LEAD = 0.75
const FLASH_MAX_ALPHA = 0.5

export default function VideoReveal() {
  const canvasRef = useRef(null)
  const vid0Ref = useRef(null)
  const vid1Ref = useRef(null)
  const vid2Ref = useRef(null)
  const bottomVidRef = useRef(null)
  const flashRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const videos = [vid0Ref.current, vid1Ref.current, vid2Ref.current]
    const bottomVid = bottomVidRef.current
    const flash = flashRef.current

    let activeIndex = 0
    let transitioning = false
    let raf

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let curX = mx
    let curY = my
    let curR = 0
    let targetR = 0
    let time = 0

    function updateBottomVideo() {
      const nextIndex = (activeIndex + 1) % videos.length

      bottomVid.src = videos[nextIndex].currentSrc || videos[nextIndex].src
      bottomVid.currentTime = 0
      bottomVid.play()
    }

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    function handleMove(e) {
      mx = e.clientX
      my = e.clientY
      targetR = 130
    }

    function handleLeave() {
      targetR = 0
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseleave', handleLeave)

    videos.forEach((video, index) => {
      if (index === 0) {
        video.currentTime = 0
        video.play()
      } else {
        video.pause()
        video.currentTime = 0
      }
    })

    updateBottomVideo()

    function drawCover(video) {
      const vw = video.videoWidth
      const vh = video.videoHeight

      if (!vw || !vh) return

      const cw = canvas.width
      const ch = canvas.height
      const scale = Math.max(cw / vw, ch / vh)
      const width = vw * scale
      const height = vh * scale
      const x = (cw - width) / 2
      const y = (ch - height) / 2

      ctx.drawImage(video, x, y, width, height)
    }

    function drawMorphBlob(cx, cy, r, t) {
      if (r < 2) return

      const points = 24
      const path = []

      for (let i = 0; i < points; i++) {
        const angle = (i / points) * Math.PI * 2
        const n1 = Math.sin(angle * 3 + t * 1.4) * 0.45
        const n2 = Math.sin(angle * 5 - t * 0.9) * 0.3
        const n3 = Math.cos(angle * 2 + t * 1.8) * 0.25
        const noise = (n1 + n2 + n3) * 40 * (r / 130)
        const rr = r + noise

        path.push({
          x: cx + Math.cos(angle) * rr,
          y: cy + Math.sin(angle) * rr
        })
      }

      ctx.beginPath()

      ctx.moveTo(
        (path[0].x + path[points - 1].x) / 2,
        (path[0].y + path[points - 1].y) / 2
      )

      for (let i = 0; i < points; i++) {
        const next = path[(i + 1) % points]
        const midX = (path[i].x + next.x) / 2
        const midY = (path[i].y + next.y) / 2

        ctx.quadraticCurveTo(
          path[i].x,
          path[i].y,
          midX,
          midY
        )
      }

      ctx.closePath()
      ctx.fill()
    }

    function startTransition() {
      transitioning = true

      const startTime = performance.now()
      const totalDuration = FLASH_LEAD * 1000
      const half = totalDuration / 2
      let swapped = false

      function flashTick(now) {
        const elapsed = now - startTime
        let alpha

        if (elapsed < half) {
          alpha = (elapsed / half) * FLASH_MAX_ALPHA
        } else if (elapsed < totalDuration) {
          if (!swapped) {
            swapped = true

            const oldActive = videos[activeIndex]
            oldActive.pause()
            oldActive.currentTime = 0

            activeIndex = (activeIndex + 1) % videos.length

            const newActive = videos[activeIndex]
            newActive.currentTime = 0
            newActive.play()

            updateBottomVideo()
          }

          const t2 = (elapsed - half) / half
          alpha = (1 - t2) * FLASH_MAX_ALPHA
        } else {
          alpha = 0
          transitioning = false

          if (flash) {
            flash.style.opacity = '0'
          }

          return
        }

        if (flash) {
          flash.style.opacity = String(alpha)
        }

        requestAnimationFrame(flashTick)
      }

      requestAnimationFrame(flashTick)
    }

    function tick() {
      const active = videos[activeIndex]

      curX += (mx - curX) * 0.15
      curY += (my - curY) * 0.15
      curR += (targetR - curR) * 0.08
      time += 0.02

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawCover(active)

      if (curR > 1) {
        ctx.save()
        ctx.filter = 'blur(6px)'
        ctx.globalCompositeOperation = 'destination-out'
        ctx.fillStyle = 'rgba(0, 0, 0, 1)'
        drawMorphBlob(curX, curY, curR, time)
        ctx.restore()

        ctx.globalCompositeOperation = 'source-over'
      }

      const duration =
        active.duration && !Number.isNaN(active.duration)
          ? active.duration
          : CLIP_DURATION

      if (!transitioning && active.currentTime >= duration - FLASH_LEAD) {
        startTransition()
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseleave', handleLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <video
        ref={bottomVidRef}
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover"
      />

      <video
        ref={vid0Ref}
        src={sunnyVid}
        muted
        playsInline
        className="hidden"
      />

      <video
        ref={vid1Ref}
        src={stormVid}
        muted
        playsInline
        className="hidden"
      />

      <video
        ref={vid2Ref}
        src={snowyVid}
        muted
        playsInline
        className="hidden"
      />

      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full"
      />

      <div
        ref={flashRef}
        className="fixed inset-0 bg-white pointer-events-none"
        style={{ opacity: 0 }}
      />
    </>
  )
}