"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "./Container";
import { Section } from "./Section";
import { Eyebrow, H2, Body } from "./Typography";

const steps = [
  {
    number: "01",
    title: "Dites-nous ce que vous vendez.",
    description: "Choix du type d'activité. Wano configure tout automatiquement pour vous.",
  },
  {
    number: "02",
    title: "Importez votre stock ou services.",
    description: "CSV, photo, ou IA qui scanne vos factures. Tout est possible.",
  },
  {
    number: "03",
    title: "Vous etes en ligne.",
    description: "Site, POS, app mobile — tout marche en parallele. Vendez partout.",
  },
];

export function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section className="bg-white">
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <Eyebrow className="mb-4">Démarrer en 5 minutes</Eyebrow>
          <H2>Trois étapes. C&apos;est tout.</H2>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center md:text-left"
            >
              <span
                className="block text-[80px] md:text-[96px] font-bold text-[#0E8A6B] leading-none mb-4"
                style={{ fontFamily: "var(--wn-font-cond)" }}
              >
                {step.number}
              </span>
              <h3
                className="text-xl font-semibold text-[#1F1E18] mb-3"
                style={{ fontFamily: "var(--wn-font-display)" }}
              >
                {step.title}
              </h3>
              <Body>{step.description}</Body>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
