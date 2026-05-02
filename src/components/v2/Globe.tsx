"use client";

import { motion } from "framer-motion";

// Points sur l'Afrique et quelques points mondiaux
const points = [
  // Afrique de l'Ouest
  { cx: 48, cy: 52, delay: 0 },    // Abidjan
  { cx: 44, cy: 48, delay: 0.3 },  // Dakar
  { cx: 52, cy: 52, delay: 0.6 },  // Lagos
  { cx: 50, cy: 48, delay: 0.9 },  // Ouagadougou
  // Afrique du Nord
  { cx: 50, cy: 42, delay: 1.2 },  // Alger
  { cx: 56, cy: 44, delay: 1.5 },  // Le Caire
  // Afrique de l'Est
  { cx: 58, cy: 54, delay: 1.8 },  // Nairobi
  // Afrique du Sud
  { cx: 54, cy: 66, delay: 2.1 },  // Johannesburg
  // Europe
  { cx: 50, cy: 36, delay: 2.4 },  // Paris
  // Moyen-Orient
  { cx: 62, cy: 46, delay: 2.7 },  // Dubai
];

export function Globe() {
  return (
    <div className="relative w-full max-w-[400px] md:max-w-[500px] aspect-square">
      <motion.svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        {/* Globe outline */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#0E8A6B"
          strokeWidth="0.5"
          opacity="0.3"
        />

        {/* Latitude lines */}
        {[30, 40, 50, 60, 70].map((cy) => (
          <ellipse
            key={`lat-${cy}`}
            cx="50"
            cy={cy}
            rx={Math.sqrt(45 * 45 - (cy - 50) * (cy - 50))}
            ry="3"
            fill="none"
            stroke="#0E8A6B"
            strokeWidth="0.3"
            opacity="0.2"
          />
        ))}

        {/* Longitude lines */}
        {[0, 30, 60, 90, 120, 150].map((angle) => (
          <ellipse
            key={`lng-${angle}`}
            cx="50"
            cy="50"
            rx="3"
            ry="45"
            fill="none"
            stroke="#0E8A6B"
            strokeWidth="0.3"
            opacity="0.2"
            transform={`rotate(${angle} 50 50)`}
          />
        ))}

        {/* Central meridian */}
        <line
          x1="50"
          y1="5"
          x2="50"
          y2="95"
          stroke="#0E8A6B"
          strokeWidth="0.3"
          opacity="0.3"
        />

        {/* Equator */}
        <ellipse
          cx="50"
          cy="50"
          rx="45"
          ry="6"
          fill="none"
          stroke="#0E8A6B"
          strokeWidth="0.3"
          opacity="0.3"
        />
      </motion.svg>

      {/* Points animés (ne tournent pas avec le globe) */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
      >
        {points.map((point, index) => (
          <g key={index}>
            {/* Point principal */}
            <motion.circle
              cx={point.cx}
              cy={point.cy}
              r="1.2"
              fill="#0E8A6B"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: point.delay, duration: 0.5 }}
            />
            {/* Pulse */}
            <motion.circle
              cx={point.cx}
              cy={point.cy}
              r="1.2"
              fill="none"
              stroke="#0E8A6B"
              strokeWidth="0.3"
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: [0.6, 0], scale: [1, 3] }}
              transition={{
                delay: point.delay,
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          </g>
        ))}

        {/* Orbiting dot */}
        <motion.circle
          cx="50"
          cy="50"
          r="1.5"
          fill="#7CFC9E"
          animate={{
            cx: [50, 75, 50, 25, 50],
            cy: [25, 50, 75, 50, 25],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </svg>
    </div>
  );
}
