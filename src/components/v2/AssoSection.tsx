"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "./Container";
import { CTA } from "./CTA";

const chatExamples = [
  "Combien j'ai vendu cette semaine ?",
  "Préviens-moi quand le Doliprane passe sous 20",
  "Crée un produit Pack Famille à 12 000 F",
];

export function AssoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-[88px] bg-[var(--wn-n-800)]">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="flex-1">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.6 }}
            >
              <span
                className="inline-block px-4 py-2 text-xs font-medium uppercase tracking-[0.04em] border border-[var(--wn-green-acid)] text-[var(--wn-green-acid)] mb-6"
                style={{ fontFamily: "var(--wn-font-display)" }}
              >
                Asso &middot; l&apos;assistant intégré
              </span>

              <h2
                className="text-[32px] md:text-[56px] font-bold leading-[1.1] tracking-[-0.02em] text-white mb-6"
                style={{ fontFamily: "var(--wn-font-display)" }}
              >
                Vous avez une question.<br />
                Asso a la réponse.
              </h2>

              <p
                className="text-base md:text-[17px] leading-[1.55] text-[var(--wn-n-400)] mb-8 max-w-lg"
                style={{ fontFamily: "var(--wn-font-display)" }}
              >
                L&apos;assistant IA intégré qui comprend votre business. Posez vos questions, recevez des alertes, automatisez vos tâches.
              </p>

              <CTA href="https://console.wanoapp.com" variant="secondary" className="border-white text-white hover:bg-white hover:text-[var(--wn-n-800)]">
                Essayer Asso &rarr;
              </CTA>
            </motion.div>
          </div>

          {/* Right - Chat Examples */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 w-full"
          >
            <div className="space-y-4">
              {chatExamples.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="bg-[#272620] border border-[var(--wn-n-700)] p-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[var(--wn-green-500)] flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">U</span>
                    </div>
                    <p
                      className="text-white text-base"
                      style={{ fontFamily: "var(--wn-font-display)" }}
                    >
                      {message}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Asso Response */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="bg-[var(--wn-green-500)]/10 border border-[var(--wn-green-500)]/30 p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[var(--wn-green-acid)] flex items-center justify-center flex-shrink-0">
                    <span className="text-[var(--wn-n-800)] text-xs font-bold">A</span>
                  </div>
                  <div>
                    <p
                      className="text-[var(--wn-green-acid)] text-base mb-1"
                      style={{ fontFamily: "var(--wn-font-display)" }}
                    >
                      Cette semaine, vous avez vendu pour 847 500 F CFA.
                    </p>
                    <p
                      className="text-[var(--wn-n-400)] text-sm"
                      style={{ fontFamily: "var(--wn-font-display)" }}
                    >
                      +12% par rapport à la semaine dernière
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
