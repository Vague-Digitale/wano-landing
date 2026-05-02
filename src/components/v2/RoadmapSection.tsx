"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "./Container";
import { Section } from "./Section";
import { Eyebrow, H2 } from "./Typography";

const roadmapItems = [
  {
    title: "Compta intégrée",
    date: "Q3 2026",
    description: "Synchronisation comptable automatique avec vos outils.",
  },
  {
    title: "Paie & RH",
    date: "Q4 2026",
    description: "Gérez vos employés, salaires et congés.",
  },
];

export function RoadmapSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section className="bg-[var(--wn-surface)]">
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <Eyebrow className="mb-4">Sur la feuille de route</Eyebrow>
          <H2>Wano grandit. Avec vous.</H2>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
        >
          {roadmapItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[var(--wn-n-100)] border border-[var(--wn-n-200)] p-8 opacity-75 hover:opacity-100 transition-opacity cursor-pointer"
            >
              {/* Date Badge */}
              <span
                className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-[0.04em] bg-[var(--wn-n-500)] text-white mb-4"
                style={{ fontFamily: "var(--wn-font-display)" }}
              >
                {item.date}
              </span>

              {/* Title */}
              <h3
                className="text-xl font-semibold text-[var(--wn-text)] mb-3"
                style={{ fontFamily: "var(--wn-font-display)" }}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p
                className="text-sm text-[var(--wn-text-muted)] leading-relaxed"
                style={{ fontFamily: "var(--wn-font-display)" }}
              >
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
