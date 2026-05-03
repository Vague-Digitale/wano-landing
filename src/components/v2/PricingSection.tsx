"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Container } from "./Container";
import { Section } from "./Section";
import { Eyebrow, H2 } from "./Typography";

// Icons
const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const CalculatorIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <line x1="8" y1="6" x2="16" y2="6" />
    <line x1="8" y1="10" x2="8" y2="10.01" />
    <line x1="12" y1="10" x2="12" y2="10.01" />
    <line x1="16" y1="10" x2="16" y2="10.01" />
    <line x1="8" y1="14" x2="8" y2="14.01" />
    <line x1="12" y1="14" x2="12" y2="14.01" />
    <line x1="16" y1="14" x2="16" y2="14.01" />
    <line x1="8" y1="18" x2="8" y2="18.01" />
    <line x1="12" y1="18" x2="16" y2="18" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const plans = [
  {
    id: "starter",
    name: "Starter",
    target: "Pour démarrer",
    price: 2000,
    features: [
      "1 utilisateur",
      "3 produits",
      "1 point de vente",
      "Module principal",
      "Support email",
    ],
    featured: false,
  },
  {
    id: "basic",
    name: "Basic",
    target: "Commerces en croissance",
    price: 5000,
    features: [
      "2 utilisateurs",
      "50 produits",
      "2 points de vente",
      "Site en ligne basique",
      "Crédit IA inclus",
      "Support email",
    ],
    featured: true,
  },
  {
    id: "pro",
    name: "Pro",
    target: "Entreprises",
    price: 9000,
    features: [
      "3 utilisateurs",
      "Produits illimités",
      "Points POS illimités",
      "Site personnalisable",
      "Rapports avancés",
      "Support prioritaire",
    ],
    featured: false,
  },
];

export function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  return (
    <Section id="tarifs">
      <Container>
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <Eyebrow className="mb-4">Tarifs simples</Eyebrow>
          <H2 className="mb-4">
            Démarrez en 14 jours gratuits.
          </H2>
          <p
            className="text-base md:text-lg text-[var(--wn-n-500)] mb-6"
            style={{ fontFamily: "var(--wn-font-display)" }}
          >
            Activez votre plan quand vous êtes prêt.
          </p>

          {/* 14-day trial badge */}
          <div className="inline-flex items-center gap-2 px-[18px] h-9 bg-[var(--wn-green-100)] border border-[var(--wn-green-600)] text-[var(--wn-green-700)]">
            <ClockIcon />
            <span
              className="text-[13px] font-semibold tracking-[0.02em]"
              style={{ fontFamily: "var(--wn-font-display)" }}
            >
              14 jours gratuits · sans paiement requis
            </span>
          </div>
        </div>

        {/* Plans Grid - 3 columns joined */}
        <div
          ref={ref}
          className="max-w-[1100px] mx-auto border border-[var(--wn-n-200)] mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative p-9 ${
                  plan.featured
                    ? "bg-[var(--wn-green-50)] border-t-4 border-t-[var(--wn-green-600)]"
                    : "bg-[var(--wn-surface)]"
                } ${index < 2 ? "md:border-r border-b md:border-b-0 border-[var(--wn-n-200)]" : ""}`}
              >
                {/* Recommended Badge */}
                {plan.featured && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[var(--wn-green-600)] text-white text-xs font-semibold"
                    style={{ fontFamily: "var(--wn-font-display)" }}
                  >
                    Recommandé
                  </span>
                )}

                {/* Plan Name */}
                <h3
                  className="text-xl font-semibold text-[var(--wn-text)] mb-1"
                  style={{ fontFamily: "var(--wn-font-display)" }}
                >
                  {plan.name}
                </h3>

                {/* Target */}
                <p
                  className="text-[13px] text-[var(--wn-n-500)] mb-4"
                  style={{ fontFamily: "var(--wn-font-display)" }}
                >
                  {plan.target}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span
                    className="text-[48px] font-bold text-[var(--wn-text)] tabular-nums"
                    style={{ fontFamily: "var(--wn-font-display)" }}
                  >
                    {plan.price.toLocaleString("fr-FR")}
                  </span>
                  <span
                    className="text-[13px] text-[var(--wn-n-500)] ml-1"
                    style={{ fontFamily: "var(--wn-font-display)" }}
                  >
                    F CFA / mois
                  </span>
                </div>

                {/* CTA Button */}
                <Link
                  href={`https://console.wanoapp.com/signup?plan=${plan.id}`}
                  className={`flex items-center justify-center w-full h-11 font-semibold text-sm transition-colors mb-6 ${
                    plan.featured
                      ? "bg-[var(--wn-green-600)] text-white hover:bg-[var(--wn-green-700)]"
                      : "border border-[var(--wn-text)] text-[var(--wn-text)] hover:bg-[var(--wn-text)] hover:text-white"
                  }`}
                  style={{ fontFamily: "var(--wn-font-display)" }}
                >
                  Choisir ce plan
                </Link>

                {/* Features */}
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-[13px] text-[var(--wn-n-500)]"
                      style={{ fontFamily: "var(--wn-font-display)" }}
                    >
                      <span className="text-[var(--wn-green-600)]">
                        <CheckIcon />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Calculator CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-[1100px] mx-auto p-6 bg-[var(--wn-bg-warm)] border border-[var(--wn-n-200)] mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="text-[var(--wn-green-600)] flex-shrink-0">
                <CalculatorIcon />
              </div>
              <div>
                <h4
                  className="text-base font-semibold text-[var(--wn-text)] mb-1"
                  style={{ fontFamily: "var(--wn-font-display)" }}
                >
                  Calculez votre tarif en 30 secondes
                </h4>
                <p
                  className="text-[13px] text-[var(--wn-n-500)]"
                  style={{ fontFamily: "var(--wn-font-display)" }}
                >
                  Sélectionnez vos besoins, voyez votre facture mensuelle estimée.
                </p>
              </div>
            </div>
            <Link
              href="/tarifs"
              className="inline-flex items-center justify-center h-10 px-5 border border-[var(--wn-text)] text-[var(--wn-text)] font-semibold text-sm hover:bg-[var(--wn-text)] hover:text-white transition-colors whitespace-nowrap"
              style={{ fontFamily: "var(--wn-font-display)" }}
            >
              Ouvrir le calculateur →
            </Link>
          </div>
        </motion.div>

        {/* Link to full pricing page */}
        <div className="text-center">
          <Link
            href="/tarifs"
            className="text-sm font-medium text-[var(--wn-green-600)] hover:underline"
            style={{ fontFamily: "var(--wn-font-display)" }}
          >
            Voir tous les détails →
          </Link>
        </div>
      </Container>
    </Section>
  );
}
