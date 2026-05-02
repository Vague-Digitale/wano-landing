"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "./Container";
import { Section } from "./Section";

const stats = [
  { value: "2400+", label: "marchands actifs" },
  { value: "18", label: "pays couverts" },
  { value: "47M F", label: "GMV mensuelle traitee" },
  { value: "99.9%", label: "uptime" },
];

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section>
      <Container>
        <div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`text-center ${
                index < stats.length - 1
                  ? "md:border-r md:border-[#DDD8C8]"
                  : ""
              }`}
            >
              <span
                className="block text-[56px] md:text-[88px] font-bold text-[#1F1E18] leading-none mb-2"
                style={{ fontFamily: "var(--wn-font-cond)" }}
              >
                {stat.value}
              </span>
              <span
                className="text-sm text-[#5E5B48]"
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
