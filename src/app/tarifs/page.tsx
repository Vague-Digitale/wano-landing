"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/v2/SiteHeader";
import { SiteFooter } from "@/components/v2/SiteFooter";
import { Container } from "@/components/v2/Container";
import { H2 } from "@/components/v2/Typography";

const INCLUDED_FEATURES = [
  "Gestion de stock incluse",
  "Tableau de bord complet",
  "1 utilisateur",
  "10 produits",
  "Support email",
];

const MODULES = [
  {
    id: "products",
    name: "Produits",
    description: "+50 produits dans votre catalogue",
    price: 1500,
    unit: "/ mois",
  },
  {
    id: "users",
    name: "Utilisateurs",
    description: "Un membre d'équipe supplémentaire",
    price: 1000,
    unit: "/ utilisateur / mois",
  },
  {
    id: "invoices",
    name: "Factures",
    description: "+50 factures, devis ou avoirs",
    price: 1500,
    unit: "/ mois",
  },
  {
    id: "pos",
    name: "Point de vente",
    description: "Caisse supplémentaire illimitée",
    price: 2000,
    unit: "/ mois",
  },
  {
    id: "online-store",
    name: "Boutique en ligne",
    description: "Commandes en ligne et paiement mobile",
    price: 5000,
    unit: "/ mois",
  },
  {
    id: "domain",
    name: "Domaine personnalisé",
    description: "Votre propre domaine, ex: maboutique.com",
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
  const [selectedModules, setSelectedModules] = useState<Record<string, boolean>>({
    products: true,
    users: false,
    invoices: false,
    pos: false,
    "online-store": false,
    domain: false,
  });

  const activeModules = MODULES.filter((module) => selectedModules[module.id]);
  const monthlyTotal = activeModules.reduce((total, module) => total + module.price, 0);

  const toggleModule = (moduleId: string) => {
    setSelectedModules((current) => ({
      ...current,
      [moduleId]: !current[moduleId],
    }));
  };

  const registrationHref = `https://console.wanoapp.com/auth/register?modules=${activeModules
    .map((module) => module.id)
    .join(",")}`;

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[var(--wn-bg)] pt-24 pb-16">
        <Container>
          {/* Header */}
          <div className="text-center mb-12">
            <H2 className="mb-4">Tarifs simples et modulaires</H2>
            <p
              className="text-base md:text-lg text-[var(--wn-n-500)] mb-6"
              style={{ fontFamily: "var(--wn-font-display)" }}
            >
              Commencez gratuitement, puis activez uniquement les modules dont vous avez besoin.
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

          <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_340px] gap-6 mb-16">
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[var(--wn-surface)] border border-[var(--wn-n-200)]"
            >
              <div className="p-6 md:p-8 border-b border-[var(--wn-n-200)]">
                <h3
                  className="text-2xl font-bold text-[var(--wn-text)] mb-2"
                  style={{ fontFamily: "var(--wn-font-display)" }}
                >
                  Base gratuite
                </h3>
                <div className="flex flex-wrap items-end gap-2 mb-6">
                  <span
                    className="text-5xl font-bold text-[var(--wn-text)] tabular-nums"
                    style={{ fontFamily: "var(--wn-font-display)" }}
                  >
                    0
                  </span>
                  <span
                    className="pb-2 text-sm text-[var(--wn-n-500)]"
                    style={{ fontFamily: "var(--wn-font-display)" }}
                  >
                    F CFA / mois
                  </span>
                </div>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {INCLUDED_FEATURES.map((feature) => (
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
              </div>

              <div className="p-6 md:p-8">
                <div className="mb-6">
                  <h3
                    className="text-2xl font-bold text-[var(--wn-text)] mb-2"
                    style={{ fontFamily: "var(--wn-font-display)" }}
                  >
                    Modules payants
                  </h3>
                  <p
                    className="text-sm text-[var(--wn-n-500)]"
                    style={{ fontFamily: "var(--wn-font-display)" }}
                  >
                    Cochez les modules à activer pour calculer votre facture mensuelle.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {MODULES.map((module, index) => {
                    const isSelected = selectedModules[module.id];

                    return (
                      <motion.button
                        key={module.id}
                        type="button"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        onClick={() => toggleModule(module.id)}
                        className={`text-left p-5 border transition-all ${
                          isSelected
                            ? "bg-[var(--wn-green-50)] border-[var(--wn-green-600)]"
                            : "bg-[var(--wn-bg-warm)] border-[var(--wn-n-200)] hover:border-[var(--wn-green-400)]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div>
                            <h4
                              className="text-base font-semibold text-[var(--wn-text)] mb-1"
                              style={{ fontFamily: "var(--wn-font-display)" }}
                            >
                              {module.name}
                            </h4>
                            <p
                              className="text-sm text-[var(--wn-n-500)]"
                              style={{ fontFamily: "var(--wn-font-display)" }}
                            >
                              {module.description}
                            </p>
                          </div>
                          <span
                            className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center border ${
                              isSelected
                                ? "border-[var(--wn-green-600)] bg-[var(--wn-green-600)] text-white"
                                : "border-[var(--wn-n-300)] text-transparent"
                            }`}
                          >
                            <CheckIcon />
                          </span>
                        </div>
                        <p
                          className="text-xl font-bold text-[var(--wn-green-600)] tabular-nums"
                          style={{ fontFamily: "var(--wn-font-display)" }}
                        >
                          {module.price.toLocaleString("fr-FR")} F CFA
                          <span className="block text-sm font-normal text-[var(--wn-n-500)]">
                            {module.unit}
                          </span>
                        </p>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.section>

            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="h-fit bg-[var(--wn-n-800)] p-6 text-white lg:sticky lg:top-24"
            >
              <p
                className="text-sm text-[var(--wn-n-300)] mb-2"
                style={{ fontFamily: "var(--wn-font-display)" }}
              >
                Calculateur
              </p>
              <h3
                className="text-2xl font-bold mb-6"
                style={{ fontFamily: "var(--wn-font-display)" }}
              >
                Votre estimation
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--wn-n-300)]">Base Wano</span>
                  <span className="font-semibold">0 F</span>
                </div>
                {activeModules.length === 0 ? (
                  <p
                    className="text-sm text-[var(--wn-n-300)]"
                    style={{ fontFamily: "var(--wn-font-display)" }}
                  >
                    Aucun module payant sélectionné.
                  </p>
                ) : (
                  activeModules.map((module) => (
                    <div key={module.id} className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-[var(--wn-n-300)]">{module.name}</span>
                      <span className="font-semibold tabular-nums">
                        {module.price.toLocaleString("fr-FR")} F
                      </span>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-white/15 pt-5 mb-6">
                <span
                  className="block text-sm text-[var(--wn-n-300)] mb-1"
                  style={{ fontFamily: "var(--wn-font-display)" }}
                >
                  Total estimé
                </span>
                <div
                  className="text-4xl font-bold tabular-nums"
                  style={{ fontFamily: "var(--wn-font-display)" }}
                >
                  {monthlyTotal.toLocaleString("fr-FR")}
                  <span className="text-base font-normal text-[var(--wn-n-300)]">
                    {" "}F CFA / mois
                  </span>
                </div>
              </div>

              <Link
                href={registrationHref}
                className="inline-flex h-12 w-full items-center justify-center bg-[var(--wn-green-500)] px-6 text-base font-semibold text-white transition-colors hover:bg-[var(--wn-green-700)]"
                style={{ fontFamily: "var(--wn-font-display)" }}
              >
                Démarrer avec ces modules →
              </Link>
            </motion.aside>
          </div>

          {/* Enterprise CTA */}
          <div className="max-w-4xl mx-auto mt-12">
            <div className="p-8 bg-[var(--wn-n-800)] text-center">
              <h3
                className="text-2xl font-bold text-white mb-2"
                style={{ fontFamily: "var(--wn-font-display)" }}
              >
                Besoin d&apos;un plan sur mesure ?
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
                  q: "Puis-je activer ou retirer un module à tout moment ?",
                  a: "Oui, les modules peuvent être activés selon vos besoins. Votre facturation s'ajuste en fonction des modules actifs.",
                },
                {
                  q: "Comment fonctionne la période d'essai ?",
                  a: "Vous avez 14 jours gratuits avec accès complet. Aucune carte bancaire requise pour commencer.",
                },
                {
                  q: "Que se passe-t-il si je dépasse mes limites incluses ?",
                  a: "Vous recevez une notification et pouvez ajouter le module correspondant, par exemple produits, factures ou point de vente.",
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
