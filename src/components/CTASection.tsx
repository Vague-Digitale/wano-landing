"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight02Icon } from "hugeicons-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function CTASection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const content = containerRef.current?.querySelector(".cta-content");

    if (content) {
      gsap.fromTo(content.children,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: content,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-20 md:py-28 px-[5%] bg-[#028175] bg-dots-light">
      <div className="cta-content max-w-4xl mx-auto text-center text-white">
        <h2 className="text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-extrabold mb-5 leading-tight">
          Prêt à tout gérer depuis une seule app ?
        </h2>
        <p className="text-base md:text-lg mb-8 opacity-95 max-w-2xl mx-auto">
          Rejoignez les commerçants qui ont simplifié leur quotidien avec Wano.
          Gratuit pour démarrer, évoluez selon vos besoins.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://console.wanoapp.com/auth/register"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-[#028175] rounded-full font-semibold text-base hover:-translate-y-0.5 hover:shadow-lg transition-all"
          >
            Commencer gratuitement
            <ArrowRight02Icon size={20} />
          </a>
          <a
            href="#contact"
            className="px-6 py-3.5 bg-transparent border-2 border-white text-white rounded-full font-semibold text-base hover:bg-white/10 hover:-translate-y-0.5 transition-all"
          >
            Nous contacter
          </a>
        </div>
      </div>
    </section>
  );
}
