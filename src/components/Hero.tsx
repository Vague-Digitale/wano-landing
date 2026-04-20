"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Lenis from "lenis";
import { Globe } from "@/components/ui/globe";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const backgroundImages = [
  {
    src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=500&fit=crop",
    alt: "Business management",
    style: { top: "8%", left: "8%" },
  },
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=500&fit=crop",
    alt: "Analytics dashboard",
    style: { top: "15%", right: "12%" },
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=500&fit=crop",
    alt: "Sales tracking",
    style: { bottom: "12%", left: "15%" },
  },
  {
    src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=500&fit=crop",
    alt: "Team collaboration",
    style: { bottom: "18%", right: "18%" },
  },
];

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const hero = containerRef.current;
    if (!hero) return;

    const title = hero.querySelector(".hero-title");
    const subtitle = hero.querySelector(".hero-subtitle");
    const cta = hero.querySelector(".hero-cta");
    const scrollIndicator = hero.querySelector(".scroll-indicator");
    const bgImages = hero.querySelectorAll(".bg-image");
    const mainImage = hero.querySelector(".main-image");
    const globe = hero.querySelector(".hero-globe");

    // Set initial states - text visible, images hidden
    gsap.set([title, subtitle, cta, scrollIndicator], { opacity: 1, y: 0 });
    gsap.set(globe, { opacity: 0.4 });
    gsap.set(bgImages, { opacity: 0, scale: 1.2, y: 50 });
    gsap.set(mainImage, { opacity: 0, scale: 0.8, y: 100 });

    // Single scroll timeline with scrub - reverses automatically when scrolling back
    const scrollTL = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "+=120%",
        scrub: 0.3,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Phase 1: Fade out text content and globe (faster)
    scrollTL.to(scrollIndicator, { opacity: 0, y: -15, duration: 0.15 }, 0);
    scrollTL.to(globe, { opacity: 0, scale: 0.9, duration: 0.3 }, 0);
    scrollTL.to(title, { y: -40, opacity: 0, scale: 0.97, duration: 0.3 }, 0.05);
    scrollTL.to(subtitle, { y: -25, opacity: 0, duration: 0.25 }, 0.1);
    scrollTL.to(cta, { y: -15, opacity: 0, duration: 0.2 }, 0.15);

    // Phase 2: Fade in background images
    scrollTL.to(bgImages, {
      opacity: 0.5,
      scale: 1,
      y: 0,
      stagger: 0.03,
      duration: 0.3
    }, 0.2);

    // Phase 3: Fade in main image
    scrollTL.to(mainImage, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.4
    }, 0.35);

    // Phase 4: Final zoom on main image, fade background
    scrollTL.to(bgImages, { opacity: 0.15, scale: 0.97, duration: 0.25 }, 0.6);
    scrollTL.to(mainImage, { scale: 1.02, duration: 0.3 }, 0.7);

    // Click handler for scroll indicator
    const handleClick = () => {
      const lenis = (window as unknown as { lenis?: Lenis }).lenis;
      lenis?.scrollTo("#features", { duration: 2 });
    };

    scrollIndicatorRef.current?.addEventListener("click", handleClick);
    return () => scrollIndicatorRef.current?.removeEventListener("click", handleClick);
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="accueil"
      className="hero min-h-screen relative flex items-center justify-center overflow-hidden bg-[#fbfbfc]"
    >
      <div className="hero-aura-1" />
      <div className="hero-aura-2" />
      <div className="hero-dots-overlay" />

      {/* Globe en arrière-plan */}
      <div className="hero-globe absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[5] w-[600px] h-[600px] sm:w-[700px] sm:h-[700px] md:w-[800px] md:h-[800px] opacity-40 pointer-events-none">
        <Globe speed={0.001} />
      </div>

      <div className="hero-content relative z-10 text-center w-full px-[5%] max-w-5xl mx-auto">
        <h1 className="hero-title text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] font-extrabold leading-tight tracking-tight text-gray-900 mb-6">
          Tout votre business<br />
          <span className="highlight">en une seule app</span>
        </h1>

        <p className="hero-subtitle text-base md:text-lg text-[#6b7271] max-w-2xl mx-auto mb-6">
          Stock, ventes, facturation, clients, analytics — une plateforme unique
          pour piloter votre activité où que vous soyez.
        </p>

        <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://console.wanoapp.com"
            className="px-6 py-3.5 bg-[#028175] hover:bg-[#027469] text-white rounded-full font-semibold text-base hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#028175]/25 transition-all"
          >
            Commencer gratuitement
          </a>
          <a
            href="#features"
            className="px-6 py-3.5 border-2 border-[#028175] text-[#028175] rounded-full font-semibold text-base hover:bg-[#F4FCF3] hover:-translate-y-0.5 transition-all"
          >
            Découvrir
          </a>
        </div>
      </div>

      <div
        ref={scrollIndicatorRef}
        className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-center cursor-pointer"
      >
        <p className="text-xs uppercase tracking-[3px] mb-3 text-[#6b7271] font-semibold">Scroll</p>
        <div className="scroll-arrow w-6 h-10 border-2 border-[#028175] rounded-[20px] mx-auto relative" />
      </div>

      <div className="background-images absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {backgroundImages.map((img, index) => (
          <div
            key={index}
            className="bg-image absolute w-[160px] h-[210px] sm:w-[200px] sm:h-[270px] md:w-[240px] md:h-[320px] rounded-xl shadow-lg overflow-hidden"
            style={img.style}
          >
            <Image src={img.src} alt={img.alt} fill sizes="260px" className="object-cover" />
          </div>
        ))}
      </div>

      <div
        className="main-image absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[15] rounded-xl bg-white p-2 sm:p-3 shadow-xl pointer-events-none"
        style={{ width: "min(85vw, 800px)", aspectRatio: "16/10" }}
      >
        <div className="screen w-full h-full rounded-lg overflow-hidden bg-[#eff0f0] relative">
          <Image
            src="/wano-desktop-view.webp"
            alt="Interface Wano"
            fill
            sizes="800px"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
