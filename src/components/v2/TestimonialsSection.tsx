"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "./Container";
import { Section } from "./Section";
import { Eyebrow, H2 } from "./Typography";

const testimonials = [
  {
    quote: "Asso m'a fait gagner 4 heures par semaine.",
    name: "Aicha K.",
    role: "Pharmacie",
    location: "Cocody",
  },
  {
    quote: "L'assistant me previent des ruptures avant que je m'en rende compte.",
    name: "Mamadou D.",
    role: "Boutique",
    location: "Bamako",
  },
  {
    quote: "Mon site est en ligne en 2 jours. Les commandes arrivent depuis WhatsApp.",
    name: "Fatou S.",
    role: "Atelier",
    location: "Dakar",
  },
];

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section className="bg-white">
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <Eyebrow className="mb-4">Ils utilisent Wano</Eyebrow>
          <H2>Le terrain parle.</H2>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#F4F1EB] border border-[#DDD8C8] p-8"
            >
              {/* Quote mark */}
              <span
                className="block text-[64px] text-[#0E8A6B] leading-none mb-4"
                style={{ fontFamily: "var(--wn-font-cond)" }}
              >
                &ldquo;
              </span>

              {/* Quote */}
              <p
                className="text-[17px] font-medium text-[#1F1E18] mb-6 leading-relaxed"
                style={{ fontFamily: "var(--wn-font-display)" }}
              >
                {testimonial.quote}
              </p>

              {/* Divider */}
              <div className="h-px bg-[#DDD8C8] mb-4" />

              {/* Author */}
              <div>
                <p
                  className="font-semibold text-[#1F1E18]"
                  style={{ fontFamily: "var(--wn-font-display)" }}
                >
                  {testimonial.name}
                </p>
                <p
                  className="text-sm text-[#5E5B48]"
                  style={{ fontFamily: "var(--wn-font-display)" }}
                >
                  {testimonial.role} &middot; {testimonial.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
