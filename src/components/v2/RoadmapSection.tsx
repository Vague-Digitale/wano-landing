"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "./Container";
import { Section } from "./Section";
import { Eyebrow, H2 } from "./Typography";

const roadmapItems = [
  {
    title: "Compta integree",
    date: "Q3 2026",
    description: "Synchronisation comptable automatique avec vos outils.",
  },
  {
    title: "Paie & RH",
    date: "Q4 2026",
    description: "Gerez vos employes, salaires et conges.",
  },
  {
    title: "Banque & financement",
    date: "2027",
    description: "Acces au credit et services bancaires integres.",
  },
];

export function RoadmapSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section className="bg-white">
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <Eyebrow className="mb-4">Sur la feuille de route</Eyebrow>
          <H2>Wano grandit. Avec vous.</H2>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {roadmapItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#E8E5DD] border border-[#DDD8C8] p-8 opacity-75 hover:opacity-100 transition-opacity cursor-pointer"
            >
              {/* Date Badge */}
              <span
                className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-[0.04em] bg-[#5E5B48] text-white mb-4"
                style={{ fontFamily: "var(--wn-font-display)" }}
              >
                {item.date}
              </span>

              {/* Title */}
              <h3
                className="text-xl font-semibold text-[#1F1E18] mb-3"
                style={{ fontFamily: "var(--wn-font-display)" }}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p
                className="text-sm text-[#5E5B48] leading-relaxed"
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
