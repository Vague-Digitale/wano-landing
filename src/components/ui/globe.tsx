"use client"

import { useEffect, useRef, useCallback } from "react"
import createGlobe from "cobe"

interface GlobeProps {
  className?: string
  speed?: number
}

// Points représentant des villes africaines où Wano est utilisé
const markers: { location: [number, number]; size: number }[] = [
  { location: [5.36, -4.01], size: 0.08 },   // Abidjan (principal)
  { location: [14.69, -17.44], size: 0.06 }, // Dakar
  { location: [6.52, 3.38], size: 0.06 },    // Lagos
  { location: [5.56, -0.19], size: 0.05 },   // Accra
  { location: [12.37, -1.52], size: 0.05 },  // Ouagadougou
  { location: [12.65, -8.0], size: 0.05 },   // Bamako
  { location: [4.05, 9.7], size: 0.05 },     // Douala
  { location: [48.86, 2.35], size: 0.04 },   // Paris
]

// Position initiale pour montrer l'Afrique de l'Ouest
const INITIAL_PHI = 0.4 // Rotation horizontale (longitude)
const INITIAL_THETA = 0.15 // Inclinaison (latitude)

export function Globe({ className = "", speed = 0.002 }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null)
  const dragOffset = useRef({ phi: 0, theta: 0 })
  const phiOffsetRef = useRef(0)
  const thetaOffsetRef = useRef(0)
  const isPausedRef = useRef(false)

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY }
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing"
    isPausedRef.current = true
  }, [])

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi
      thetaOffsetRef.current += dragOffset.current.theta
      dragOffset.current = { phi: 0, theta: 0 }
    }
    pointerInteracting.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = "grab"
    isPausedRef.current = false
  }, [])

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (e.clientX - pointerInteracting.current.x) / 300,
          theta: (e.clientY - pointerInteracting.current.y) / 1000,
        }
      }
    }
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerup", handlePointerUp, { passive: true })
    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
    }
  }, [handlePointerUp])

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    let globe: ReturnType<typeof createGlobe> | null = null
    let phi = 0

    function init() {
      const width = canvas.offsetWidth
      if (width === 0 || globe) return

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width,
        height: width,
        phi: INITIAL_PHI,
        theta: INITIAL_THETA,
        dark: 0,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 4,
        baseColor: [0.92, 0.92, 0.92],
        markerColor: [0.01, 0.51, 0.46], // Couleur Wano #028175
        glowColor: [0.85, 0.85, 0.85],
        markers,
        onRender: (state: { phi: number; theta: number }) => {
          if (!isPausedRef.current) {
            phi += speed
          }
          state.phi = INITIAL_PHI + phi + phiOffsetRef.current + dragOffset.current.phi
          state.theta = INITIAL_THETA + thetaOffsetRef.current + dragOffset.current.theta
        },
      } as Parameters<typeof createGlobe>[1])

      setTimeout(() => {
        if (canvas) canvas.style.opacity = "1"
      }, 100)
    }

    if (canvas.offsetWidth > 0) {
      init()
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          ro.disconnect()
          init()
        }
      })
      ro.observe(canvas)
    }

    return () => {
      if (globe) globe.destroy()
    }
  }, [speed])

  return (
    <div className={`relative aspect-square select-none ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          opacity: 0,
          transition: "opacity 1.2s ease",
          touchAction: "none",
        }}
      />
    </div>
  )
}
