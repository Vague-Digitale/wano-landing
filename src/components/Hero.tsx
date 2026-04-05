"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const hero = heroRef.current;
    if (!hero) return;

    // Initial animations (on page load)
    const introTL = gsap.timeline();

    // Fade in hero text
    introTL.to(".hero-title", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    });

    introTL.to(".hero-subtitle", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.5");

    introTL.to(".hero-cta", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.5");

    // Scroll indicator
    introTL.to(scrollIndicatorRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
    }, "-=0.3");

    // Main scroll timeline - simplified
    const scrollTL = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "+=200%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Hide scroll indicator
    scrollTL.to(scrollIndicatorRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
    }, 0);

    // Fade out hero text slightly and move up
    scrollTL.to(".hero-title", {
      y: -60,
      opacity: 0.3,
      scale: 0.95,
      duration: 1,
    }, 0);

    scrollTL.to(".hero-subtitle", {
      y: -40,
      opacity: 0,
      duration: 0.8,
    }, 0);

    scrollTL.to(".hero-cta", {
      y: -30,
      opacity: 0,
      duration: 0.6,
    }, 0);

    // Background images appear
    scrollTL.fromTo(".bg-image", {
      opacity: 0,
      scale: 1.2,
      y: 50,
    }, {
      opacity: 0.6,
      scale: 1,
      y: 0,
      stagger: 0.1,
      duration: 1,
    }, 0.3);

    // Main mockup appears
    scrollTL.fromTo(".main-image", {
      opacity: 0,
      scale: 0.8,
      y: 100,
    }, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.5,
    }, 0.8);

    // Hide title completely
    scrollTL.to(".hero-title", {
      opacity: 0,
      duration: 0.5,
    }, 1.5);

    // Background images fade out
    scrollTL.to(".bg-image", {
      opacity: 0.1,
      scale: 0.95,
      duration: 0.8,
    }, 1.8);

    // Main image scales up slightly
    scrollTL.to(".main-image", {
      scale: 1.05,
      duration: 1,
    }, 2);

    // Scroll indicator click handler
    const handleScrollClick = () => {
      const lenis = (window as unknown as { lenis?: Lenis }).lenis;
      if (lenis) {
        lenis.scrollTo("#features", { duration: 2 });
      }
    };

    scrollIndicatorRef.current?.addEventListener("click", handleScrollClick);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf("*");
      scrollIndicatorRef.current?.removeEventListener("click", handleScrollClick);
    };
  }, [mounted]);

  return (
    <section
      ref={heroRef}
      id="accueil"
      className="hero min-h-screen relative flex items-center justify-center overflow-hidden bg-[#fbfbfc]"
    >
      {/* Auras */}
      <div className="hero-aura-1" />
      <div className="hero-aura-2" />

      {/* Hero content */}
      <div className="hero-content relative z-10 text-center w-full px-[5%] max-w-5xl mx-auto">
        <h1 className="hero-title text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[1.1] tracking-tight text-gray-900 mb-6 opacity-0 translate-y-8">
          Gerez votre business<br />
          en toute <span className="highlight">simplicite</span>
        </h1>

        <p className="hero-subtitle text-lg md:text-xl text-[#6b7271] max-w-2xl mx-auto mb-8 opacity-0 translate-y-8">
          Stock, ventes en ligne et en boutique, facturation, analytics.
          Tout au meme endroit, accessible partout.
        </p>

        <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center opacity-0 translate-y-8">
          <a
            href="https://console.wanoapp.com"
            className="px-8 py-4 bg-[#028175] hover:bg-[#027469] text-white rounded-full font-bold text-lg hover:-translate-y-1 hover:shadow-xl hover:shadow-[#028175]/30 transition-all"
          >
            Commencer gratuitement
          </a>
          <a
            href="#features"
            className="px-8 py-4 border-2 border-[#028175] text-[#028175] rounded-full font-bold text-lg hover:bg-[#F4FCF3] hover:-translate-y-1 transition-all"
          >
            Decouvrir
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-center cursor-pointer opacity-0 translate-y-4"
      >
        <p className="text-xs uppercase tracking-[3px] mb-3 text-[#6b7271] font-semibold">
          Scroll
        </p>
        <div className="scroll-arrow w-6 h-10 border-2 border-[#028175] rounded-[20px] mx-auto relative hover:border-[#027469] transition-colors" />
      </div>

      {/* Background images */}
      <div className="background-images absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {backgroundImages.map((img, index) => (
          <div
            key={index}
            className="bg-image absolute w-[180px] h-[240px] sm:w-[220px] sm:h-[300px] md:w-[260px] md:h-[350px] rounded-2xl opacity-0 shadow-xl overflow-hidden"
            style={img.style}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 180px, (max-width: 768px) 220px, 260px"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Main laptop mockup */}
      <div
        className="main-image absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[15] opacity-0 rounded-2xl bg-white p-3 sm:p-4 shadow-2xl"
        style={{
          width: "min(85vw, 800px)",
          aspectRatio: "16/10",
        }}
      >
        <div className="screen w-full h-full rounded-xl overflow-hidden bg-[#eff0f0] relative">
          <Image
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop"
            alt="Interface Wano - Tableau de bord de gestion"
            fill
            sizes="(max-width: 768px) 85vw, 800px"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
