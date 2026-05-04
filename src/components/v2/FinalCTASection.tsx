"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "./Container";
import { CTA } from "./CTA";

export function FinalCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-[120px] bg-[var(--wn-green-500)]">
      <Container>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2
            className="text-[32px] md:text-[56px] lg:text-[72px] font-bold leading-[1.05] tracking-[-0.02em] text-white mb-8"
            style={{ fontFamily: "var(--wn-font-display)" }}
          >
            Prêt à unifier<br className="hidden md:block" /> votre business ?
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CTA
              href="https://console.wanoapp.com/auth/register"
              variant="primary"
              className="!bg-white !text-[var(--wn-green-500)] hover:!bg-[var(--wn-bg-warm)]"
            >
              Démarrer gratuitement
            </CTA>
            <CTA
              href="https://wa.me/2250545476305"
              variant="secondary"
              className="!border-white !text-white hover:!bg-white hover:!text-[var(--wn-green-500)]"
            >
              Parler à un humain
            </CTA>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
