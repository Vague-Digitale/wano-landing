"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/v2/SiteHeader";
import { SiteFooter } from "@/components/v2/SiteFooter";
import { Container } from "@/components/v2/Container";
import { H2 } from "@/components/v2/Typography";

// ============================================================================
// PRICING DATA - Simple et clair
// ============================================================================

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    target: "Pour démarrer",
    price: 2000,
    features: [
      "1 utilisateur",
      "3 produits",
      "1 point de vente",
      "10 factures / mois",
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
      "Site en ligne",
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

const ADDONS = [
  {
    id: "extra-users",
    name: "Utilisateurs supplémentaires",
    description: "Ajoutez des membres à votre équipe",
    price: 1000,
    unit: "/ utilisateur / mois",
  },
  {
    id: "extra-products",
    name: "Produits supplémentaires",
    description: "Augmentez votre catalogue au-delà du plan",
    options: [
      { label: "+50 produits", price: 1500 },
      { label: "+200 produits", price: 5000 },
      { label: "Illimité", price: 15000 },
    ],
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    description: "Commandes en ligne et paiement mobile",
    options: [
      { label: "100 commandes / mois", price: 5000 },
      { label: "500 commandes / mois", price: 20000 },
      { label: "Illimité", price: 35000 },
    ],
  },
  {
    id: "domain",
    name: "Domaine personnalisé",
    description: "Votre propre nom de domaine (ex: maboutique.com)",
    price: 3000,
    unit: "/ mois",
  },
];

// ============================================================================
// ICONS
// ============================================================================

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function TarifsPage() {
  const [selectedPlan, setSelectedPlan] = useState<string>("basic");

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[var(--wn-bg)] pt-24 pb-16">
        <Container>
          {/* Header */}
          <div className="text-center mb-12">
            <H2 className="mb-4">Tarifs simples et transparents</H2>
            <p
              className="text-base md:text-lg text-[var(--wn-n-500)] mb-6"
              style={{ fontFamily: "var(--wn-font-display)" }}
            >
              Choisissez votre plan, ajoutez des options si besoin.
            </p>

            {/* 14-day trial badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--wn-green-100)] border border-[var(--wn-green-600)] text-[var(--wn-green-700)]">
              <ClockIcon />
              <span
                className="text-sm font-semibold"
                style={{ fontFamily: "var(--wn-font-display)" }}
              >
                14 jours gratuits · sans paiement requis
              </span>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="grid md:grid-cols-3 gap-6">
              {PLANS.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative p-6 cursor-pointer transition-all ${
                    selectedPlan === plan.id
                      ? "border-2 border-[var(--wn-green-600)] bg-[var(--wn-green-50)]"
                      : plan.featured
                      ? "border-2 border-[var(--wn-green-600)] border-t-4 bg-[var(--wn-surface)]"
                      : "border border-[var(--wn-n-200)] bg-[var(--wn-surface)] hover:border-[var(--wn-green-400)]"
                  }`}
                >
                  {plan.featured && selectedPlan !== plan.id && (
                    <span
                      className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[var(--wn-green-600)] text-white text-xs font-semibold"
                      style={{ fontFamily: "var(--wn-font-display)" }}
                    >
                      Recommandé
                    </span>
                  )}

                  {selectedPlan === plan.id && (
                    <div className="absolute top-4 right-4 w-6 h-6 bg-[var(--wn-green-600)] text-white flex items-center justify-center">
                      <CheckIcon />
                    </div>
                  )}

                  <h3
                    className="text-xl font-semibold text-[var(--wn-text)] mb-1"
                    style={{ fontFamily: "var(--wn-font-display)" }}
                  >
                    {plan.name}
                  </h3>

                  <p
                    className="text-sm text-[var(--wn-n-500)] mb-4"
                    style={{ fontFamily: "var(--wn-font-display)" }}
                  >
                    {plan.target}
                  </p>

                  <div className="mb-6">
                    <span
                      className="text-4xl font-bold text-[var(--wn-text)] tabular-nums"
                      style={{ fontFamily: "var(--wn-font-display)" }}
                    >
                      {plan.price.toLocaleString("fr-FR")}
                    </span>
                    <span
                      className="text-sm text-[var(--wn-n-500)] ml-1"
                      style={{ fontFamily: "var(--wn-font-display)" }}
                    >
                      F / mois
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-[var(--wn-n-500)]"
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

            {/* CTA */}
            <div className="text-center mt-8">
              <Link
                href={`https://console.wanoapp.com/signup?plan=${selectedPlan}`}
                className="inline-flex items-center justify-center h-12 px-8 bg-[var(--wn-green-600)] text-white font-semibold text-base hover:bg-[var(--wn-green-700)] transition-colors"
                style={{ fontFamily: "var(--wn-font-display)" }}
              >
                Démarrer avec {PLANS.find(p => p.id === selectedPlan)?.name} →
              </Link>
            </div>
          </div>

          {/* Add-ons Section */}
          <div className="max-w-4xl mx-auto">
            <h3
              className="text-2xl font-bold text-[var(--wn-text)] mb-2 text-center"
              style={{ fontFamily: "var(--wn-font-display)" }}
            >
              Besoin de plus ?
            </h3>
            <p
              className="text-base text-[var(--wn-n-500)] mb-8 text-center"
              style={{ fontFamily: "var(--wn-font-display)" }}
            >
              Ajoutez des options à votre plan selon vos besoins.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {ADDONS.map((addon) => (
                <div
                  key={addon.id}
                  className="p-5 bg-[var(--wn-surface)] border border-[var(--wn-n-200)]"
                >
                  <h4
                    className="text-base font-semibold text-[var(--wn-text)] mb-1"
                    style={{ fontFamily: "var(--wn-font-display)" }}
                  >
                    {addon.name}
                  </h4>
                  <p
                    className="text-sm text-[var(--wn-n-500)] mb-3"
                    style={{ fontFamily: "var(--wn-font-display)" }}
                  >
                    {addon.description}
                  </p>

                  {addon.price !== undefined ? (
                    <p
                      className="text-lg font-bold text-[var(--wn-green-600)] tabular-nums"
                      style={{ fontFamily: "var(--wn-font-display)" }}
                    >
                      {addon.price.toLocaleString("fr-FR")} F
                      <span className="text-sm font-normal text-[var(--wn-n-500)]">
                        {" "}{addon.unit}
                      </span>
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {addon.options?.map((option) => (
                        <span
                          key={option.label}
                          className="inline-block px-3 py-1 bg-[var(--wn-n-100)] text-sm"
                          style={{ fontFamily: "var(--wn-font-display)" }}
                        >
                          {option.label}: <strong>{option.price.toLocaleString("fr-FR")} F</strong>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Enterprise CTA */}
          <div className="max-w-4xl mx-auto mt-12">
            <div className="p-8 bg-[var(--wn-n-800)] text-center">
              <h3
                className="text-2xl font-bold text-white mb-2"
                style={{ fontFamily: "var(--wn-font-display)" }}
              >
                Besoin d'un plan sur mesure ?
              </h3>
              <p
                className="text-base text-[var(--wn-n-400)] mb-6"
                style={{ fontFamily: "var(--wn-font-display)" }}
              >
                Pour les grandes équipes ou besoins spécifiques, contactez-nous.
              </p>
              <Link
                href="https://wa.me/2250545476305"
                className="inline-flex items-center justify-center h-11 px-6 border border-white text-white font-semibold text-sm hover:bg-white hover:text-[var(--wn-n-800)] transition-colors"
                style={{ fontFamily: "var(--wn-font-display)" }}
              >
                Contactez-nous sur WhatsApp →
              </Link>
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-2xl mx-auto mt-16">
            <h3
              className="text-2xl font-bold text-[var(--wn-text)] mb-8 text-center"
              style={{ fontFamily: "var(--wn-font-display)" }}
            >
              Questions fréquentes
            </h3>

            <div className="space-y-4">
              {[
                {
                  q: "Puis-je changer de plan à tout moment ?",
                  a: "Oui, vous pouvez passer à un plan supérieur ou inférieur à tout moment. La différence sera calculée au prorata.",
                },
                {
                  q: "Comment fonctionne la période d'essai ?",
                  a: "Vous avez 14 jours gratuits avec accès complet. Aucune carte bancaire requise pour commencer.",
                },
                {
                  q: "Que se passe-t-il si je dépasse mes limites ?",
                  a: "Vous recevrez une notification. Vous pourrez soit passer à un plan supérieur, soit ajouter une option.",
                },
                {
                  q: "Comment payer ?",
                  a: "Nous acceptons Mobile Money (Orange, Wave, MTN), cartes bancaires et virements.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="p-5 bg-[var(--wn-surface)] border border-[var(--wn-n-200)]"
                >
                  <h4
                    className="text-base font-semibold text-[var(--wn-text)] mb-2"
                    style={{ fontFamily: "var(--wn-font-display)" }}
                  >
                    {faq.q}
                  </h4>
                  <p
                    className="text-sm text-[var(--wn-n-500)]"
                    style={{ fontFamily: "var(--wn-font-display)" }}
                  >
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
