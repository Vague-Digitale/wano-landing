"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Organized in rows for the marquee effect
const clientRows = [
  ["Paginfiks", "Boutique Élégance", "Tech Communication", "Bar le Boss"],
  ["Vague Digitale", "Bar le Boss", "Paginfiks", "Tech Communication"],
  ["Boutique Élégance", "Vague Digitale", "Bar le Boss", "Paginfiks"],
];

export function AssoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 lg:py-40 bg-[var(--wn-n-900)] overflow-hidden">
      {/* Left fade gradient - text emerges from here */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 md:w-48 lg:w-64 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, var(--wn-n-900) 0%, transparent 100%)",
        }}
      />

      {/* Right fade gradient - text disappears here */}
      <div
        className="absolute right-0 top-0 bottom-0 w-24 md:w-48 lg:w-64 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(270deg, var(--wn-n-900) 0%, transparent 100%)",
        }}
      />

      {/* Title */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 text-center text-xs text-[var(--wn-n-600)] uppercase tracking-[0.2em] mb-12 md:mb-16"
        style={{ fontFamily: "var(--wn-font-display)" }}
      >
        Ils nous font confiance
      </motion.p>

      {/* Scrolling rows - centered */}
      <div className="flex flex-col items-center justify-center space-y-6 md:space-y-8">
        {clientRows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="relative overflow-hidden"
          >
            <motion.div
              className="flex whitespace-nowrap"
              animate={{
                x: rowIndex % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25 + rowIndex * 5,
                  ease: "linear",
                },
              }}
            >
              {/* Double the items for seamless loop */}
              {[...row, ...row].map((client, index) => (
                <span
                  key={`${client}-${index}`}
                  className="inline-block mx-8 md:mx-16 text-[32px] md:text-[52px] lg:text-[68px] font-bold tracking-tight"
                  style={{
                    fontFamily: "var(--wn-font-display)",
                    background: "linear-gradient(180deg, rgba(244, 241, 235, 0.85) 0%, rgba(244, 241, 235, 0.5) 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(244, 241, 235, 0.2)",
                  }}
                >
                  {client}
                </span>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
