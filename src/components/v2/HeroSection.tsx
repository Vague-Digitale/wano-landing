"use client";

import { motion } from "framer-motion";
import { Container } from "./Container";
import { Eyebrow, DisplayHeading, Body } from "./Typography";
import { CTA } from "./CTA";
import { Globe } from "./Globe";

const clientLogos = [
  "Pharmacie du Commerce",
  "Boutique Elegance",
  "Restaurant Le Maquis",
  "Pressing Express",
];

export function HeroSection() {
  return (
    <section className="min-h-screen bg-[#F4F1EB] pt-[60px] md:pt-[72px]">
      <Container className="py-12 md:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Eyebrow className="mb-6">Tout-en-un. Africain. Disponible.</Eyebrow>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <DisplayHeading className="mb-6">
                Le systeme<br />
                d&apos;exploitation<br />
                de votre business.
              </DisplayHeading>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Body className="text-[22px] mb-8 max-w-xl mx-auto lg:mx-0">
                POS, e-commerce, facturation, paiement mobile — tout ce dont vous avez besoin pour gérer et développer votre activité.
              </Body>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <CTA href="https://console.wanoapp.com" variant="primary">
                Démarrer gratuitement
              </CTA>
              <CTA href="https://wa.me/2250545476305" variant="secondary">
                Parler à un humain
              </CTA>
            </motion.div>
          </div>

          {/* Right - Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 flex justify-center lg:justify-end"
          >
            <Globe />
          </motion.div>
        </div>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 md:mt-24 pt-8 border-t border-[#DDD8C8]"
        >
          <p className="text-sm text-[#9A9384] text-center mb-6" style={{ fontFamily: "var(--wn-font-display)" }}>
            Ils nous font confiance
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {clientLogos.map((logo) => (
              <span
                key={logo}
                className="text-sm font-medium text-[#9A9384] opacity-60"
                style={{ fontFamily: "var(--wn-font-display)" }}
              >
                {logo}
              </span>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
