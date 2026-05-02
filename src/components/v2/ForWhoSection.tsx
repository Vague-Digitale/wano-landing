"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "./Container";
import { Section } from "./Section";
import { Eyebrow, H2, Body } from "./Typography";

// SVG Icons - using currentColor for theming
const StoreIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18M5 21V10.85c0-.72.72-1.21 1.38-.93l2.62 1.08 3-1.5 3 1.5 2.62-1.08c.66-.28 1.38.21 1.38.93V21M9 21v-6h6v6M4 4h16v3c0 1.5-2 3-4 3s-3-1.5-4-1.5S9 10 7 10s-4-1.5-4-3V4z" />
  </svg>
);

const ShoppingBagIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
  </svg>
);

const WrenchIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const RestaurantIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 010 8h-1M18 8a4 4 0 100 8M18 8V4M18 12V4M6 2v20M6 8h4a4 4 0 010 8H6" />
  </svg>
);

const LicenseIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="12" y1="18" x2="12" y2="12" />
    <line x1="9" y1="15" x2="15" y2="15" />
  </svg>
);

const modules = [
  {
    title: "POS",
    description: "Boutique physique. Caisse, stock, codes-barres.",
    Icon: StoreIcon,
    available: true,
  },
  {
    title: "E-commerce",
    description: "Boutique en ligne. Paiement mobile, livraison.",
    Icon: ShoppingBagIcon,
    available: true,
  },
  {
    title: "Services",
    description: "Pressing, salon, atelier. Tarifs composables.",
    Icon: WrenchIcon,
    available: true,
  },
  {
    title: "Réservation",
    description: "Créneaux ou ressources. Auto-confirmation.",
    Icon: CalendarIcon,
    available: false,
  },
  {
    title: "Restauration",
    description: "Commande à table par QR. Cuisine en direct.",
    Icon: RestaurantIcon,
    available: false,
  },
  {
    title: "Digital",
    description: "Téléchargement, licences, abonnements.",
    Icon: LicenseIcon,
    available: false,
  },
];

export function ForWhoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section id="produit">
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <Eyebrow className="mb-4">Pour quel business ?</Eyebrow>
          <H2 className="mb-4">Wano s&apos;adapte à votre activité,<br className="hidden md:block" /> pas l&apos;inverse.</H2>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {modules.map((module, index) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative p-8 bg-[var(--wn-surface)] border border-[var(--wn-n-200)] text-[var(--wn-green-500)] ${!module.available ? "opacity-60" : ""}`}
            >
              {!module.available && (
                <span
                  className="absolute top-4 right-4 px-2 py-1 text-[10px] font-medium uppercase tracking-wider bg-[var(--wn-n-200)] text-[var(--wn-n-500)]"
                  style={{ fontFamily: "var(--wn-font-display)" }}
                >
                  Bientôt
                </span>
              )}
              <div className="w-12 h-12 flex items-center justify-center mb-6">
                <module.Icon />
              </div>
              <h3
                className="text-xl font-semibold text-[var(--wn-text)] mb-2"
                style={{ fontFamily: "var(--wn-font-display)" }}
              >
                {module.title}
              </h3>
              <Body>{module.description}</Body>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
