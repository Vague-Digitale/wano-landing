"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "./Container";
import { Section } from "./Section";
import { H2, Body } from "./Typography";

const modules = [
  {
    number: 1,
    title: "Boutique physique",
    description: "POS tablette, stock multi-points, étiquettes, scan code-barres.",
    available: true,
  },
  {
    number: 2,
    title: "E-commerce",
    description: "Site web prêt à vendre, paiement mobile money, livraison.",
    available: true,
  },
  {
    number: 3,
    title: "Services",
    description: "Pressing, salon, atelier — créneaux, packs composables, fidélité.",
    available: true,
  },
  {
    number: 4,
    title: "Réservation",
    description: "Résidence, voiture, table — calendrier, caution, contrat.",
    available: true,
  },
  {
    number: 5,
    title: "Restauration",
    description: "Commande à table par QR, ticket cuisine, addition split.",
    available: true,
  },
  {
    number: 6,
    title: "Produits digitaux",
    description: "Téléchargement, clé de licence, abonnement.",
    available: true,
  },
  {
    number: 7,
    title: "Comptabilité",
    description: "Bilans, déclarations, journaux.",
    available: false,
  },
  {
    number: 8,
    title: "Fiches de paie",
    description: "Salaires, cotisations, bulletins.",
    available: false,
  },
];

export function ForWhoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section id="produit">
      <Container>
        {/* Header with title on left, description on right */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-12 md:mb-16">
          <H2 className="lg:max-w-md">
            Conçu pour toutes les{" "}
            <br className="hidden md:block" />
            façons de vendre.
          </H2>
          <Body className="lg:max-w-xl text-[var(--wn-n-500)]">
            Quel que soit votre métier, Wano s&apos;adapte. Vous activez les modules dont vous avez besoin, le reste reste invisible.
          </Body>
        </div>

        {/* 4-column grid */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {modules.map((module, index) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="relative p-6 bg-[var(--wn-surface)] border border-[var(--wn-n-200)]"
            >
              {/* Number badge */}
              <div
                className="w-8 h-8 flex items-center justify-center border border-[var(--wn-green-500)] text-[var(--wn-green-500)] text-sm font-medium mb-4"
                style={{ fontFamily: "var(--wn-font-display)" }}
              >
                {module.number}
              </div>

              {/* Title with optional "BIENTÔT" tag */}
              <div className="flex items-center gap-2 mb-2">
                <h3
                  className="text-base font-semibold text-[var(--wn-text)]"
                  style={{ fontFamily: "var(--wn-font-display)" }}
                >
                  {module.title}
                </h3>
                {!module.available && (
                  <span
                    className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider bg-[var(--wn-n-200)] text-[var(--wn-n-500)]"
                    style={{ fontFamily: "var(--wn-font-display)" }}
                  >
                    Bientôt
                  </span>
                )}
              </div>

              {/* Description */}
              <p
                className="text-sm text-[var(--wn-n-500)] leading-relaxed"
                style={{ fontFamily: "var(--wn-font-display)" }}
              >
                {module.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
