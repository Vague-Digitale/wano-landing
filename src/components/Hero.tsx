"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

// Pre-split text into characters for animation
function splitText(text: string, isHighlight = false) {
  return text.split("").map((char, i) => (
    <span key={i} className={`char ${isHighlight ? "highlight" : ""}`}>
      {char === " " ? "\u00A0" : char}
    </span>
  ));
}

const backgroundImages = [
  {
    src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=500&fit=crop",
    alt: "Business management",
    style: { top: "8%", left: "8%" },
    speed: 0.8,
  },
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=500&fit=crop",
    alt: "Analytics dashboard",
    style: { top: "15%", right: "12%" },
    speed: 0.6,
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=500&fit=crop",
    alt: "Sales tracking",
    style: { bottom: "12%", left: "15%" },
    speed: 0.9,
  },
  {
    src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=500&fit=crop",
    alt: "Team collaboration",
    style: { bottom: "18%", right: "18%" },
    speed: 0.7,
  },
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Wait for mount to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const hero = heroRef.current;
    if (!hero) return;

    // Initial text animation - text-1 chars animate in
    gsap.to(".text-1 .char", {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.03,
      ease: "power4.out",
      delay: 0.8,
    });

    // Scroll indicator animation
    gsap.from(scrollIndicatorRef.current, {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 2,
      ease: "power3.out",
    });

    // Main scroll timeline
    const heroTL = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "+=400%",
        scrub: 1.5,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Hide scroll indicator at start
    heroTL.to(
      scrollIndicatorRef.current,
      {
        opacity: 0,
        y: -30,
        duration: 0.5,
      },
      0
    );

    // Text 1 chars go out
    heroTL.to(
      ".text-1 .char",
      {
        y: -80,
        opacity: 0,
        stagger: 0.02,
        duration: 1,
        ease: "power3.in",
      },
      0.8
    );

    // Text 2 appears + background images
    heroTL
      .to(".text-2", { opacity: 1, duration: 0.3 }, 1.2)
      .to(
        ".text-2 .char",
        {
          y: 0,
          opacity: 1,
          stagger: 0.02,
          duration: 1,
          ease: "power3.out",
        },
        1.2
      )
      .fromTo(
        ".bg-image",
        {
          opacity: 0,
          scale: 1.3,
          filter: "blur(20px)",
          y: (i: number) => [100, 120, 80, 110][i],
        },
        {
          opacity: 0.5,
          scale: 1,
          filter: "blur(0px)",
          y: 0,
          stagger: 0.15,
          duration: 1.5,
          ease: "power4.out",
        },
        1.2
      );

    // Text 2 chars go out
    heroTL.to(
      ".text-2 .char",
      {
        y: -80,
        opacity: 0,
        stagger: 0.02,
        duration: 1,
        ease: "power3.in",
      },
      3
    );

    // Text 3 appears + image movement
    heroTL
      .to(".text-3", { opacity: 1, duration: 0.3 }, 3.4)
      .to(
        ".text-3 .char",
        {
          y: 0,
          opacity: 1,
          stagger: 0.02,
          duration: 1,
          ease: "power3.out",
        },
        3.4
      )
      .to(
        ".bg-image",
        {
          x: (i: number) => [60, -70, 50, -60][i],
          y: (i: number) => [-40, -50, 40, 50][i],
          rotate: (i: number) => [3, -3, 2, -2][i],
          stagger: 0.08,
          duration: 1.5,
          ease: "power2.out",
        },
        3.4
      );

    // Text 3 slides left
    heroTL.to(
      ".text-3",
      {
        x: -500,
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut",
      },
      4.8
    );

    // Background images fade
    heroTL.to(
      ".bg-image",
      {
        opacity: 0.1,
        scale: 0.9,
        duration: 1,
      },
      6
    );

    // Text 4 appears
    heroTL
      .to(".text-4", { opacity: 1, duration: 0.3 }, 6.5)
      .to(
        ".text-4 .char",
        {
          y: 0,
          opacity: 1,
          stagger: 0.02,
          duration: 1,
          ease: "power3.out",
        },
        6.5
      );

    // Main image appears
    heroTL.fromTo(
      ".main-image",
      {
        opacity: 0,
        scale: 0.6,
        y: 100,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 2,
        ease: "power4.out",
      },
      7
    );

    // Text 4 chars go out
    heroTL.to(
      ".text-4 .char",
      {
        y: -50,
        opacity: 0,
        stagger: 0.01,
        duration: 0.8,
      },
      8.5
    );

    // Main image scales up
    heroTL.to(
      ".main-image",
      {
        scale: 1.15,
        duration: 1.5,
        ease: "power2.inOut",
      },
      9
    );

    // Background images container fades
    heroTL.to(
      ".background-images",
      {
        opacity: 0,
        duration: 1,
      },
      9
    );

    // Parallax for background images
    gsap.utils.toArray<HTMLElement>(".bg-image").forEach((img) => {
      const speed = parseFloat(img.dataset.speed || "0.5");
      gsap.to(img, {
        y: () => -100 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // Scroll indicator click
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
      scrollIndicatorRef.current?.removeEventListener(
        "click",
        handleScrollClick
      );
    };
  }, [mounted]);

  return (
    <section
      ref={heroRef}
      id="accueil"
      className="hero min-h-screen relative flex items-center justify-center pt-24 overflow-hidden bg-[#fbfbfc]"
    >
      {/* Auras */}
      <div className="hero-aura-1" />
      <div className="hero-aura-2" />

      {/* Hero content */}
      <div className="hero-content relative z-10 text-center w-full px-[5%]">
        {/* Text 1: Gerez votre business en toute simplicite */}
        <h1 className="text-1 text-[clamp(2.8rem,7vw,7rem)] font-extrabold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[90%] leading-[1.05] tracking-[-0.04em] text-gray-900 pointer-events-none opacity-100">
          <span className="word">{splitText("Gerez")}</span>{" "}
          <span className="word">{splitText("votre")}</span>{" "}
          <span className="word">{splitText("business")}</span>
          <br />
          <span className="word">{splitText("en")}</span>{" "}
          <span className="word">{splitText("toute")}</span>{" "}
          <span className="word">{splitText("simplicite", true)}</span>
        </h1>

        {/* Text 2: Commencez gratuitement evoluez a votre rythme */}
        <h1 className="text-2 text-[clamp(2.8rem,7vw,7rem)] font-extrabold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[90%] leading-[1.05] tracking-[-0.04em] text-gray-900 pointer-events-none opacity-0">
          <span className="word">{splitText("Commencez")}</span>{" "}
          <span className="word">{splitText("gratuitement", true)}</span>
          <br />
          <span className="word">{splitText("evoluez")}</span>{" "}
          <span className="word">{splitText("a")}</span>{" "}
          <span className="word">{splitText("votre")}</span>{" "}
          <span className="word">{splitText("rythme", true)}</span>
        </h1>

        {/* Text 3: En ligne et en boutique */}
        <h1 className="text-3 text-[clamp(2.8rem,7vw,7rem)] font-extrabold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[90%] leading-[1.05] tracking-[-0.04em] text-gray-900 pointer-events-none opacity-0">
          <span className="word">{splitText("En")}</span>{" "}
          <span className="word">{splitText("ligne", true)}</span>{" "}
          <span className="word">{splitText("et")}</span>
          <br />
          <span className="word">{splitText("en boutique", true)}</span>
        </h1>

        {/* Text 4: Votre nouvelle plateforme */}
        <h1 className="text-4 text-[clamp(2.8rem,7vw,7rem)] font-extrabold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[90%] leading-[1.05] tracking-[-0.04em] text-gray-900 pointer-events-none opacity-0">
          <span className="word">{splitText("Votre")}</span>{" "}
          <span className="word">{splitText("nouvelle")}</span>
          <br />
          <span className="word">{splitText("plateforme", true)}</span>
        </h1>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 z-20 text-center cursor-pointer"
      >
        <p className="text-xs uppercase tracking-[4px] mb-4 text-[#6b7271] font-semibold">
          Decouvrir
        </p>
        <div className="scroll-arrow w-6 h-10 border-2 border-[#028175] rounded-[20px] mx-auto relative hover:border-[#027469] transition-colors" />
      </div>

      {/* Background images */}
      <div className="background-images absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {backgroundImages.map((img, index) => (
          <div
            key={index}
            className="bg-image absolute w-[200px] h-[280px] sm:w-[240px] sm:h-[320px] md:w-[280px] md:h-[380px] rounded-3xl opacity-0 shadow-[0_25px_60px_rgba(0,0,0,0.1)] will-change-transform overflow-hidden"
            style={img.style}
            data-speed={img.speed}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 200px, (max-width: 768px) 240px, 280px"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Main laptop mockup */}
      <div
        className="main-image absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[15] opacity-0 rounded-[20px] bg-white p-3 sm:p-5 pb-10 sm:pb-[60px] will-change-transform"
        style={{
          width: "min(90vw, 900px)",
          aspectRatio: "16/10",
          boxShadow: "0 40px 100px rgba(0, 0, 0, 0.15)",
        }}
      >
        <div className="screen w-full h-full rounded-xl overflow-hidden bg-[#eff0f0] relative">
          <Image
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop"
            alt="Interface Wano - Tableau de bord de gestion"
            fill
            sizes="(max-width: 768px) 90vw, 900px"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
