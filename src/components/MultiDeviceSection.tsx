"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import {
  ComputerIcon,
  SmartPhone01Icon,
  RefreshIcon,
  Globe02Icon,
} from "hugeicons-react";

gsap.registerPlugin(ScrollTrigger);

const deviceFeatures = [
  {
    icon: ComputerIcon,
    title: "Ordinateur",
    description: "Interface complete pour la gestion avancee",
  },
  {
    icon: SmartPhone01Icon,
    title: "Mobile",
    description: "Ventes rapides et suivi en temps reel",
  },
  {
    icon: RefreshIcon,
    title: "Synchronise",
    description: "Donnees a jour sur tous vos appareils",
  },
  {
    icon: Globe02Icon,
    title: "100% Web",
    description: "Rien a installer, accessible partout",
  },
];

export default function MultiDeviceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text animation
      gsap.from(".device-text > *", {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      });

      // Desktop mockup
      gsap.from(".desktop-mockup", {
        opacity: 0,
        x: -80,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".devices-container",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Mobile mockup
      gsap.from(".mobile-mockup", {
        opacity: 0,
        x: 80,
        duration: 1.2,
        delay: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".devices-container",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Floating animation
      gsap.to(".desktop-mockup", {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".mobile-mockup", {
        y: 15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 px-[5%] bg-[#eff0f0] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text content */}
          <div className="device-text">
            <span className="inline-block px-4 py-2 bg-[#F4FCF3] text-[#028175] rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
              Multi-plateforme
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
              Gerez votre business{" "}
              <span className="highlight">partout</span>
            </h2>
            <p className="text-lg md:text-xl text-[#6b7271] leading-relaxed mb-8">
              Sur ordinateur au bureau, sur tablette en deplacement ou sur telephone
              en boutique. Wano vous suit partout avec une interface optimisee pour
              chaque appareil.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {deviceFeatures.map((feature, i) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#028175] flex items-center justify-center">
                      <IconComponent size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{feature.title}</h4>
                      <p className="text-sm text-[#6b7271]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Devices mockup */}
          <div className="devices-container relative h-[400px] sm:h-[500px] md:h-[600px]">
            {/* Desktop mockup */}
            <div className="desktop-mockup absolute left-0 top-1/2 -translate-y-1/2 w-[80%] sm:w-[85%] bg-gray-900 rounded-xl p-1.5 sm:p-2 shadow-2xl">
              <div className="flex items-center gap-1 sm:gap-1.5 mb-1.5 sm:mb-2 px-1.5 sm:px-2">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500" />
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500" />
              </div>
              <div className="bg-gray-100 rounded-md sm:rounded-lg overflow-hidden aspect-video relative">
                <Image
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=500&fit=crop"
                  alt="Wano sur ordinateur - tableau de bord"
                  fill
                  sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 500px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Mobile mockup */}
            <div className="mobile-mockup absolute right-0 bottom-5 sm:bottom-10 w-[30%] sm:w-[35%] max-w-[140px] sm:max-w-[180px] bg-gray-900 rounded-2xl sm:rounded-3xl p-1.5 sm:p-2 shadow-2xl">
              <div className="w-10 sm:w-16 h-0.5 sm:h-1 bg-gray-700 rounded-full mx-auto mb-1.5 sm:mb-2" />
              <div className="bg-gray-100 rounded-xl sm:rounded-2xl overflow-hidden aspect-[9/19] relative">
                <Image
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=800&fit=crop"
                  alt="Wano sur mobile - point de vente"
                  fill
                  sizes="(max-width: 640px) 100px, 180px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
