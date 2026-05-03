"use client";

import { motion } from "framer-motion";
import { Container } from "./Container";
import { Eyebrow, DisplayHeading, Body } from "./Typography";
import { CTA } from "./CTA";
import { HeroGlobe } from "./HeroGlobe";

type HeroSectionProps = {
  dark?: boolean;
};

export function HeroSection({ dark = false }: HeroSectionProps) {
  if (dark) {
    // Mode Audacieux - Layout asymétrique
    return (
      <section className="min-h-screen bg-[var(--wn-bg)] pt-[60px] md:pt-[72px]">
        <Container className="py-12 md:py-20 lg:py-28">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
            {/* Left Content - 60% */}
            <div className="flex-[6] text-left">
              <div className="animate-fade-rise">
                <h1
                  className="text-[56px] lg:text-[132px] font-[800] leading-[0.95] tracking-[-0.02em] text-[var(--wn-text)] mb-8"
                  style={{ fontFamily: "var(--wn-font-display)" }}
                >
                  <span className="block animate-fade-rise">Un seul <span className="text-[var(--wn-green-300)]">outil</span>.</span>
                  <span className="block animate-fade-rise-delay-1">Pour gérer toute</span>
                  <span className="block animate-fade-rise-delay-2">votre activité.</span>
                </h1>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <CTA
                  href="https://console.wanoapp.com"
                  variant="primary"
                  className="text-[20px] px-8 py-5 wn-btn-primary"
                >
                  Démarrer gratuitement &rarr;
                </CTA>
              </motion.div>
            </div>

            {/* Right - Globe - 40% */}
            <div className="flex-[4] flex justify-center lg:justify-end lg:-mr-16 relative">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="animate-globe-fade"
              >
                <HeroGlobe size={460} dark={true} />
              </motion.div>
              {/* Badge Made in CI */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[12px] tracking-[0.1em] uppercase text-[var(--wn-text-muted)] whitespace-nowrap"
                style={{ fontFamily: "var(--wn-font-display)" }}
              >
                Made in Côte d&apos;Ivoire · 100% pensé pour l&apos;Afrique
              </motion.p>
            </div>
          </div>

        </Container>
      </section>
    );
  }

  // Mode Sage (clair) - Layout original
  return (
    <section className="bg-[var(--wn-bg-warm)] pt-[60px] md:pt-[72px]">
      <Container className="py-12 md:py-16 lg:py-20">
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
                Le système<br />
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
            <div className="hidden md:block">
              <HeroGlobe size={420} dark={false} />
            </div>
            <div className="md:hidden">
              <HeroGlobe size={280} dark={false} />
            </div>
          </motion.div>
        </div>

      </Container>
    </section>
  );
}
