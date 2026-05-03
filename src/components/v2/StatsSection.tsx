"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "./Container";
import { Section } from "./Section";

const stats = [
  { value: "8", label: "pays UEMOA couverts" },
  { value: "100%", label: "paiement mobile money" },
  { value: "24/7", label: "support WhatsApp" },
];

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section>
      <Container>
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`text-center ${
                index < stats.length - 1
                  ? "md:border-r md:border-[var(--wn-n-200)]"
                  : ""
              }`}
            >
              <span
                className="block text-[56px] md:text-[88px] font-bold text-[var(--wn-text)] leading-none mb-2"
                style={{ fontFamily: "var(--wn-font-cond)" }}
              >
                {stat.value}
              </span>
              <span
                className="text-sm text-[var(--wn-text-muted)]"
                style={{ fontFamily: "var(--wn-font-display)" }}
              >
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
