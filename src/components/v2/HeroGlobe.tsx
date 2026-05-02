"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";

// Dataset continents: [lng, lat, weight]
// ~250 points avec densité plus forte sur l'Afrique
const CONTINENT_DOTS: [number, number, number][] = [
  // AFRIQUE (weight = 1) - densité élevée
  // Afrique du Nord
  [-5, 34, 1], [0, 32, 1], [3, 36, 1], [8, 33, 1], [10, 32, 1],
  [-8, 31, 1], [-6, 28, 1], [0, 28, 1], [5, 28, 1], [10, 28, 1],
  [15, 28, 1], [20, 25, 1], [25, 28, 1], [30, 30, 1], [32, 31, 1],
  // Sahel
  [-15, 15, 1], [-10, 14, 1], [-5, 14, 1], [0, 15, 1], [5, 13, 1],
  [10, 12, 1], [15, 13, 1], [20, 15, 1], [25, 14, 1], [30, 15, 1],
  // Afrique de l'Ouest
  [-17, 14, 1], [-16, 12, 1], [-15, 10, 1], [-12, 8, 1], [-10, 7, 1],
  [-8, 5, 1], [-5, 7, 1], [-3, 5, 1], [0, 6, 1], [2, 6, 1],
  [5, 8, 1], [8, 10, 1], [3, 10, 1], [7, 5, 1], [10, 6, 1],
  // Côte d'Ivoire - Abidjan area (extra density)
  [-4, 5.5, 1], [-5, 6, 1], [-6, 7, 1], [-4, 7, 1], [-3, 6.5, 1],
  [-5.5, 5, 1], [-4.5, 6.5, 1], [-3.5, 5.5, 1],
  // Afrique Centrale
  [12, 4, 1], [15, 5, 1], [18, 4, 1], [20, 2, 1], [22, 0, 1],
  [25, 2, 1], [28, 4, 1], [15, 0, 1], [18, -2, 1], [12, -4, 1],
  [15, -5, 1], [20, -5, 1], [25, -4, 1], [28, -6, 1],
  // Afrique de l'Est
  [32, 10, 1], [35, 8, 1], [38, 5, 1], [40, 3, 1], [42, 5, 1],
  [36, 0, 1], [38, -2, 1], [35, -4, 1], [40, -5, 1], [37, -6, 1],
  [32, -8, 1], [35, -10, 1], [38, -8, 1], [33, -5, 1], [30, -3, 1],
  // Afrique Australe
  [28, -15, 1], [25, -18, 1], [22, -20, 1], [18, -22, 1], [25, -25, 1],
  [28, -28, 1], [30, -26, 1], [32, -28, 1], [28, -30, 1], [25, -32, 1],
  [20, -28, 1], [18, -25, 1], [15, -20, 1], [12, -18, 1], [15, -15, 1],
  [35, -20, 1], [32, -22, 1], [30, -18, 1],
  // Madagascar
  [47, -19, 1], [48, -22, 1], [46, -16, 1], [49, -18, 1],

  // EUROPE (weight = 0.85)
  [-8, 42, 0.85], [-4, 40, 0.85], [-3, 37, 0.85], [0, 41, 0.85],
  [2, 48, 0.85], [0, 45, 0.85], [5, 46, 0.85], [3, 44, 0.85], [-1, 47, 0.85],
  [-3, 52, 0.85], [0, 54, 0.85], [-4, 56, 0.85],
  [5, 52, 0.85], [8, 50, 0.85], [10, 52, 0.85], [12, 48, 0.85], [6, 48, 0.85],
  [12, 42, 0.85], [10, 44, 0.85], [14, 41, 0.85], [16, 40, 0.85], [12, 38, 0.85],
  [15, 50, 0.85], [18, 52, 0.85], [20, 48, 0.85], [15, 46, 0.85],
  [10, 60, 0.85], [15, 62, 0.85], [18, 58, 0.85], [25, 62, 0.85],
  [25, 50, 0.85], [30, 52, 0.85], [28, 48, 0.85], [35, 55, 0.85], [38, 56, 0.85],
  [20, 42, 0.85], [22, 38, 0.85], [25, 40, 0.85], [28, 38, 0.85],

  // ASIE (weight = 0.7)
  [35, 32, 0.7], [38, 34, 0.7], [42, 36, 0.7], [45, 35, 0.7],
  [48, 30, 0.7], [50, 28, 0.7], [55, 25, 0.7], [45, 25, 0.7],
  [60, 40, 0.7], [65, 42, 0.7], [70, 40, 0.7], [68, 38, 0.7],
  [72, 22, 0.7], [78, 18, 0.7], [82, 22, 0.7], [88, 24, 0.7],
  [75, 28, 0.7], [80, 15, 0.7], [77, 12, 0.7], [85, 20, 0.7],
  [100, 15, 0.7], [102, 18, 0.7], [105, 12, 0.7], [108, 16, 0.7],
  [110, 5, 0.7], [115, 0, 0.7], [120, 5, 0.7], [98, 8, 0.7],
  [105, 35, 0.7], [110, 32, 0.7], [115, 30, 0.7], [120, 32, 0.7],
  [118, 38, 0.7], [112, 40, 0.7], [125, 42, 0.7], [100, 30, 0.7],
  [95, 28, 0.7], [90, 30, 0.7],
  [135, 35, 0.7], [138, 38, 0.7], [140, 42, 0.7], [130, 33, 0.7],
  [127, 36, 0.7], [128, 38, 0.7],
  [45, 60, 0.7], [55, 58, 0.7], [70, 55, 0.7], [85, 55, 0.7],
  [100, 52, 0.7], [115, 50, 0.7], [130, 48, 0.7], [140, 50, 0.7],

  // AMÉRIQUES (weight = 0.6)
  [-75, 48, 0.6], [-80, 45, 0.6], [-95, 50, 0.6], [-110, 52, 0.6],
  [-120, 50, 0.6], [-125, 48, 0.6], [-65, 48, 0.6],
  [-72, 42, 0.6], [-78, 40, 0.6], [-82, 35, 0.6], [-85, 32, 0.6],
  [-80, 28, 0.6], [-88, 30, 0.6], [-92, 32, 0.6],
  [-95, 38, 0.6], [-100, 42, 0.6], [-105, 40, 0.6], [-98, 32, 0.6],
  [-118, 35, 0.6], [-122, 38, 0.6], [-120, 42, 0.6], [-115, 38, 0.6],
  [-100, 22, 0.6], [-105, 20, 0.6], [-98, 18, 0.6], [-92, 18, 0.6],
  [-85, 12, 0.6], [-88, 15, 0.6], [-82, 10, 0.6], [-78, 8, 0.6],
  [-72, 18, 0.6], [-78, 22, 0.6], [-68, 18, 0.6],
  [-72, 8, 0.6], [-68, 5, 0.6], [-60, 5, 0.6], [-55, 2, 0.6],
  [-75, 0, 0.6], [-78, -2, 0.6], [-48, -2, 0.6],
  [-45, -8, 0.6], [-42, -15, 0.6], [-48, -20, 0.6], [-52, -25, 0.6],
  [-55, -12, 0.6], [-38, -12, 0.6], [-50, -5, 0.6],
  [-72, -12, 0.6], [-75, -8, 0.6], [-78, -5, 0.6], [-68, -18, 0.6],
  [-70, -22, 0.6], [-68, -25, 0.6],
  [-58, -35, 0.6], [-62, -38, 0.6], [-70, -35, 0.6], [-68, -42, 0.6],
  [-72, -48, 0.6],

  // OCÉANIE (weight = 0.6)
  [145, -20, 0.6], [150, -25, 0.6], [140, -18, 0.6], [135, -20, 0.6],
  [148, -32, 0.6], [152, -28, 0.6], [130, -25, 0.6], [125, -20, 0.6],
  [175, -40, 0.6], [172, -42, 0.6],
];

// Villes avec markers
const CITIES: { name: string; lng: number; lat: number; isMain?: boolean }[] = [
  { name: "ABIDJAN", lng: -4, lat: 5.3, isMain: true },
  { name: "Lagos", lng: 3.4, lat: 6.5 },
  { name: "Dakar", lng: -17.4, lat: 14.7 },
  { name: "Cape Town", lng: 18.4, lat: -33.9 },
  { name: "Nairobi", lng: 36.8, lat: -1.3 },
  { name: "Paris", lng: 2.3, lat: 48.9 },
  { name: "New York", lng: -74, lat: 40.7 },
  { name: "Hong Kong", lng: 114.2, lat: 22.3 },
];

const TILT_DEG = 18;
const TILT_RAD = (TILT_DEG * Math.PI) / 180;
const cosT = Math.cos(TILT_RAD);
const sinT = Math.sin(TILT_RAD);

type HeroGlobeProps = {
  size?: number;
  dark?: boolean;
  paused?: boolean;
};

// Round to 2 decimal places to avoid hydration mismatches
const round = (n: number) => Math.round(n * 100) / 100;

export function HeroGlobe({ size = 420, dark = false, paused = false }: HeroGlobeProps) {
  const [mounted, setMounted] = useState(false);
  const [lngOffset, setLngOffset] = useState(20); // Centré sur l'Afrique
  const [satelliteAngle, setSatelliteAngle] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Mount effect - ensures client-only rendering for dynamic content
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check for reduced motion
  const prefersReducedMotion = mounted && typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const shouldAnimate = mounted && !paused && !prefersReducedMotion;

  // Animation loop
  useEffect(() => {
    if (!shouldAnimate) return;

    const animate = (time: number) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = time;
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      // Globe: 360° en 60s = 6°/s = 0.006°/ms
      setLngOffset(prev => (prev + delta * 0.006) % 360);

      // Satellite: 360° en 22s, sens inverse
      setSatelliteAngle(prev => (prev - delta * (360 / 22000)) % 360);

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [shouldAnimate]);

  // Project point to screen coordinates
  const projectPoint = useCallback((lng: number, lat: number, cx: number, cy: number, r: number, offset: number) => {
    const lngRad = ((lng + offset) * Math.PI) / 180;
    const latRad = (lat * Math.PI) / 180;

    // Sphère unitaire → 3D
    const x = Math.cos(latRad) * Math.sin(lngRad);
    let y = -Math.sin(latRad);
    let z = Math.cos(latRad) * Math.cos(lngRad);

    // Inclinaison axiale autour de X
    const y2 = y * cosT - z * sinT;
    const z2 = y * sinT + z * cosT;

    // Si z2 < 0.02 → point à l'arrière
    if (z2 < 0.02) return null;

    // Projection orthographique
    const screenX = cx + x * r;
    const screenY = cy + y2 * r;

    return { x: round(screenX), y: round(screenY), z: round(z2) };
  }, []);

  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 20;

  // Colors based on theme
  const colors = dark ? {
    sphereGradient: ['#13302A', '#0E1A18', '#050C0B'],
    continentFill: '#7DE3C4',
    gridColor: 'rgba(255,255,255,0.10)',
    haloColor: 'rgba(80,220,180,0.16)',
    pinColor: '#7DE3C4',
    labelBg: '#FFFFFF',
    labelText: '#0F1410',
    specular: 'rgba(255,255,255,0.12)',
  } : {
    sphereGradient: ['#FFFCF6', '#F0EAE0', '#D9D2C5'],
    continentFill: '#0E8A6B',
    gridColor: 'rgba(14,138,107,0.18)',
    haloColor: 'rgba(14,138,107,0.10)',
    pinColor: '#0E8A6B',
    labelBg: '#0F1410',
    labelText: '#FFFFFF',
    specular: 'rgba(255,255,255,0.45)',
  };

  // Compute projected points only on client
  const projectedDots = useMemo(() => {
    if (!mounted) return [];
    return CONTINENT_DOTS.map(([lng, lat, weight], i) => {
      const point = projectPoint(lng, lat, cx, cy, r, lngOffset);
      if (!point) return null;
      const baseSize = 1.8;
      const opacity = round(0.55 + 0.45 * point.z);
      const pointRadius = round(baseSize * (0.78 + 0.32 * point.z) * weight);
      return { i, point, opacity, pointRadius };
    }).filter(Boolean);
  }, [mounted, lngOffset, cx, cy, r, projectPoint]);

  const projectedCities = useMemo(() => {
    if (!mounted) return [];
    return CITIES.map((city) => {
      const point = projectPoint(city.lng, city.lat, cx, cy, r, lngOffset);
      if (!point) return null;
      const pinHeight = city.isMain ? 18 : 10;
      const pinRadius = city.isMain ? 5 : 3;
      const opacity = round(0.6 + 0.4 * point.z);
      return { ...city, point, pinHeight, pinRadius, opacity };
    }).filter(Boolean);
  }, [mounted, lngOffset, cx, cy, r, projectPoint]);

  return (
    <div
      className="relative"
      style={{ width: size, height: size }}
    >
      {/* Halo atmosphérique externe */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${colors.haloColor} 60%, transparent 70%)`,
          transform: 'scale(1.15)',
        }}
      />

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label="Globe terrestre centré sur l'Afrique avec marqueur Abidjan"
        className="relative z-10"
      >
        <defs>
          {/* Gradient sphère décentré */}
          <radialGradient id={`sphereGradient-${size}`} cx="35%" cy="32%" r="65%" fx="35%" fy="32%">
            <stop offset="0%" stopColor={colors.sphereGradient[0]} />
            <stop offset="50%" stopColor={colors.sphereGradient[1]} />
            <stop offset="100%" stopColor={colors.sphereGradient[2]} />
          </radialGradient>

          {/* Gradient atmosphère */}
          <radialGradient id={`atmosGradient-${size}`} cx="50%" cy="50%" r="50%">
            <stop offset="92%" stopColor="transparent" />
            <stop offset="98%" stopColor={colors.pinColor} stopOpacity={0.3} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Gradient highlight spéculaire */}
          <radialGradient id={`specularGradient-${size}`} cx="32%" cy="28%" r="40%">
            <stop offset="0%" stopColor={colors.specular} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Gradient ombre */}
          <radialGradient id={`shadowGradient-${size}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.28)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Clip circle pour les grilles */}
          <clipPath id={`globeClip-${size}`}>
            <circle cx={cx} cy={cy} r={r} />
          </clipPath>
        </defs>

        {/* Ombre portée au sol */}
        <ellipse
          cx={cx}
          cy={round(cy + r + 15)}
          rx={round(r * 0.78)}
          ry={round(r * 0.08)}
          fill={`url(#shadowGradient-${size})`}
        />

        {/* Anneau atmosphère */}
        <circle
          cx={cx}
          cy={cy}
          r={round(r * 1.06)}
          fill={`url(#atmosGradient-${size})`}
        />

        {/* Sphère principale */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill={`url(#sphereGradient-${size})`}
        />

        {/* Grilles (méridiens + parallèles) - statiques */}
        <g clipPath={`url(#globeClip-${size})`} opacity={0.6}>
          {/* Parallèles */}
          {[0.18, 0.42, 0.66, 0.86].map((ratio, i) => (
            <ellipse
              key={`parallel-${i}`}
              cx={cx}
              cy={round(cy + r * (ratio - 0.5) * 1.4)}
              rx={round(r * Math.sqrt(1 - Math.pow(ratio - 0.5, 2) * 1.5))}
              ry={round(r * ratio * 0.15)}
              fill="none"
              stroke={colors.gridColor}
              strokeWidth={0.5}
            />
          ))}
          {/* Équateur */}
          <ellipse
            cx={cx}
            cy={cy}
            rx={r}
            ry={round(r * 0.2)}
            fill="none"
            stroke={colors.gridColor}
            strokeWidth={1}
          />
        </g>

        {/* Points des continents - client only */}
        {mounted && (
          <g>
            {projectedDots.map((dot) => dot && (
              <circle
                key={`dot-${dot.i}`}
                cx={dot.point.x}
                cy={dot.point.y}
                r={dot.pointRadius}
                fill={colors.continentFill}
                opacity={dot.opacity}
              />
            ))}
          </g>
        )}

        {/* Highlight spéculaire */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill={`url(#specularGradient-${size})`}
          style={{ mixBlendMode: 'overlay' }}
        />

        {/* Terminator (bordure) */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={colors.pinColor}
          strokeWidth={1}
          opacity={0.35}
        />

        {/* Pins des villes - client only */}
        {mounted && (
          <g>
            {projectedCities.map((city) => city && (
              <g key={city.name} opacity={city.opacity}>
                {/* Riser vertical */}
                <line
                  x1={city.point.x}
                  y1={city.point.y}
                  x2={city.point.x}
                  y2={city.point.y - city.pinHeight}
                  stroke={colors.pinColor}
                  strokeWidth={city.isMain ? 2 : 1}
                />
                {/* Pin head */}
                <circle
                  cx={city.point.x}
                  cy={city.point.y - city.pinHeight}
                  r={city.pinRadius}
                  fill={colors.pinColor}
                />
                {/* Halo pulsant pour Abidjan */}
                {city.isMain && (
                  <>
                    <circle
                      cx={city.point.x}
                      cy={city.point.y - city.pinHeight}
                      r={city.pinRadius + 4}
                      fill="none"
                      stroke={colors.pinColor}
                      strokeWidth={1}
                      opacity={0.5}
                      className="animate-ping"
                      style={{ animationDuration: '2s' }}
                    />
                    {/* Label */}
                    <g transform={`translate(${city.point.x + 12}, ${city.point.y - city.pinHeight - 8})`}>
                      <rect
                        x={0}
                        y={-10}
                        width={60}
                        height={18}
                        fill={colors.labelBg}
                        rx={0}
                      />
                      <text
                        x={30}
                        y={2}
                        textAnchor="middle"
                        fill={colors.labelText}
                        fontSize={10}
                        fontWeight={700}
                        fontFamily="var(--wn-font-display)"
                        letterSpacing="0.05em"
                      >
                        {city.name}
                      </text>
                    </g>
                  </>
                )}
              </g>
            ))}
          </g>
        )}

        {/* Orbite satellite - client only */}
        {mounted && (
          <g transform={`rotate(${round(satelliteAngle)}, ${cx}, ${cy})`}>
            <ellipse
              cx={cx}
              cy={cy}
              rx={round(r * 1.25)}
              ry={round(r * 0.35)}
              fill="none"
              stroke={colors.gridColor}
              strokeWidth={1}
              strokeDasharray="4 4"
              transform={`rotate(-15, ${cx}, ${cy})`}
            />
            {/* Satellite point */}
            <circle
              cx={round(cx + r * 1.25)}
              cy={cy}
              r={3}
              fill={colors.pinColor}
              transform={`rotate(-15, ${cx}, ${cy})`}
            />
            {/* Satellite halo */}
            <circle
              cx={round(cx + r * 1.25)}
              cy={cy}
              r={6}
              fill={colors.pinColor}
              opacity={0.3}
              transform={`rotate(-15, ${cx}, ${cy})`}
            />
          </g>
        )}
      </svg>
    </div>
  );
}
