"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight02Icon } from "hugeicons-react";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-content > *", {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 px-[5%] bg-[#028175]"
    >
      <div className="cta-content max-w-4xl mx-auto text-center text-white">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
          Pret a simplifier la gestion de votre business ?
        </h2>
        <p className="text-lg md:text-xl mb-10 opacity-95 max-w-2xl mx-auto">
          Rejoignez des milliers de commercants qui font confiance a Wano.
          Commencez gratuitement, sans engagement.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://console.wanoapp.com"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-[#028175] rounded-full font-bold text-lg hover:-translate-y-1 hover:shadow-xl transition-all"
          >
            Commencer gratuitement
            <ArrowRight02Icon size={20} />
          </a>
          <a
            href="#contact"
            className="px-10 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 hover:-translate-y-1 transition-all"
          >
            Nous contacter
          </a>
        </div>
      </div>
    </section>
  );
}
