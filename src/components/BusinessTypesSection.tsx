"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Store04Icon,
  Restaurant01Icon,
  Scissor01Icon,
  PackageIcon,
  ShoppingCart01Icon,
  Building03Icon,
} from "hugeicons-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const businessTypes = [
  {
    icon: Store04Icon,
    name: "Commerce de detail",
    description: "Boutiques, superettes, magasins de vetements",
  },
  {
    icon: Restaurant01Icon,
    name: "Restauration",
    description: "Restaurants, cafes, food trucks",
  },
  {
    icon: Scissor01Icon,
    name: "Services",
    description: "Salons de coiffure, beaute, reparations",
  },
  {
    icon: PackageIcon,
    name: "Grossistes",
    description: "Distribution, vente en gros et demi-gros",
  },
  {
    icon: ShoppingCart01Icon,
    name: "E-commerce",
    description: "Vente en ligne, reseaux sociaux",
  },
  {
    icon: Building03Icon,
    name: "Hebergement",
    description: "Hotels, residences, locations",
  },
];

export default function BusinessTypesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      gsap.from(".business-header > *", {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".business-card", {
        opacity: 0,
        y: 50,
        scale: 0.95,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".business-grid",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [mounted]);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 px-[5%] bg-white"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="business-header text-center mb-16 md:mb-20">
          <span className="inline-block px-4 py-2 bg-[#F4FCF3] text-[#028175] rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
            Adaptable
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Pour tous les <span className="highlight">types de business</span>
          </h2>
          <p className="text-lg md:text-xl text-[#6b7271] max-w-2xl mx-auto leading-relaxed">
            Que vous vendiez des produits, des services ou les deux, Wano s&apos;adapte
            a votre activite.
          </p>
        </div>

        {/* Business types grid */}
        <div className="business-grid grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {businessTypes.map((business, i) => {
            const IconComponent = business.icon;
            return (
              <div
                key={i}
                className="business-card group bg-[#eff0f0] rounded-2xl p-6 md:p-8 text-center hover:bg-[#028175] hover:text-white transition-all duration-300 cursor-pointer"
              >
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
                  <IconComponent
                    size={48}
                    className="text-[#028175] group-hover:text-white transition-colors"
                  />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-white mb-2 transition-colors">
                  {business.name}
                </h3>
                <p className="text-sm text-[#6b7271] group-hover:text-white/90 transition-colors">
                  {business.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
