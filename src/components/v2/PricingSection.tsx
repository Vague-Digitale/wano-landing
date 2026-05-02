"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Container } from "./Container";
import { Section } from "./Section";
import { Eyebrow, H2 } from "./Typography";
import { CTA } from "./CTA";

const plans = [
  {
    name: "Starter",
    price: "Gratuit",
    features: ["1 caisse", "100 produits", "1 utilisateur"],
    cta: "Demarrer",
    href: "https://console.wanoapp.com",
    featured: false,
  },
  {
    name: "Standard",
    price: "15 000 F/mois",
    features: ["Multi-caisses", "Produits illimites", "Asso IA", "Site web inclus"],
    cta: "Choisir Standard",
    href: "https://console.wanoapp.com",
    featured: true,
  },
  {
    name: "Pro",
    price: "Sur devis",
    features: ["Multi-organisations", "API complete", "Support prioritaire"],
    cta: "Nous contacter",
    href: "/contact",
    featured: false,
  },
];

export function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section>
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <Eyebrow className="mb-4">Tarifs simples</Eyebrow>
          <H2>Choisissez votre plan.<br className="hidden md:block" /> Changez quand vous voulez.</H2>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-white p-8 ${
                plan.featured
                  ? "border-2 border-[#0E8A6B]"
                  : "border border-[#DDD8C8]"
              }`}
            >
              {/* Popular Badge */}
              {plan.featured && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#0E8A6B] text-white text-xs font-medium"
                  style={{ fontFamily: "var(--wn-font-display)" }}
                >
                  Populaire
                </span>
              )}

              {/* Plan Name */}
              <h3
                className="text-xl font-semibold text-[#1F1E18] mb-2"
                style={{ fontFamily: "var(--wn-font-display)" }}
              >
                {plan.name}
              </h3>

              {/* Price */}
              <p
                className="text-[32px] font-bold text-[#1F1E18] mb-6"
                style={{ fontFamily: "var(--wn-font-cond)" }}
              >
                {plan.price}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-[#5E5B48]"
                    style={{ fontFamily: "var(--wn-font-display)" }}
                  >
                    <span className="w-4 h-4 bg-[#0E8A6B] flex items-center justify-center">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <CTA
                href={plan.href}
                variant={plan.featured ? "primary" : "secondary"}
                className="w-full justify-center"
              >
                {plan.cta}
              </CTA>
            </motion.div>
          ))}
        </div>

        {/* Link to full pricing */}
        <div className="text-center mt-8">
          <Link
            href="/tarifs"
            className="text-sm font-medium text-[#0E8A6B] hover:underline"
            style={{ fontFamily: "var(--wn-font-display)" }}
          >
            Voir tous les details &rarr;
          </Link>
        </div>
      </Container>
    </Section>
  );
}
