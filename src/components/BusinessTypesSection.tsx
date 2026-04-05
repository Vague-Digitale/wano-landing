"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Store04Icon,
  Restaurant01Icon,
  Scissor01Icon,
  PackageIcon,
  ShoppingCart01Icon,
  Building03Icon,
} from "hugeicons-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const businessTypes = [
  { icon: Store04Icon, name: "Commerce de détail", description: "Boutiques, supérettes, magasins" },
  { icon: Restaurant01Icon, name: "Restauration", description: "Restaurants, cafés, food trucks" },
  { icon: Scissor01Icon, name: "Services", description: "Salons de coiffure, beauté" },
  { icon: PackageIcon, name: "Grossistes", description: "Distribution, vente en gros" },
  { icon: ShoppingCart01Icon, name: "E-commerce", description: "Vente en ligne" },
  { icon: Building03Icon, name: "Hébergement", description: "Hôtels, résidences" },
];

export default function BusinessTypesSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const header = containerRef.current?.querySelector(".business-header");
    const grid = containerRef.current?.querySelector(".business-grid");
    const cards = containerRef.current?.querySelectorAll(".business-card");

    if (header) {
      gsap.fromTo(header.children,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    if (cards && cards.length > 0) {
      gsap.fromTo(cards,
        { opacity: 0, y: 30, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.05,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: grid,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-20 md:py-28 px-[5%] bg-white bg-grid-pattern">
      <div className="max-w-6xl mx-auto">
        <div className="business-header text-center mb-12">
          <span className="inline-block px-4 py-2 bg-[#F4FCF3] text-[#028175] rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
            Adaptable
          </span>
          <h2 className="text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-extrabold text-gray-900 mb-5 tracking-tight">
            Une app, <span className="highlight">tous les métiers</span>
          </h2>
          <p className="text-base md:text-lg text-[#6b7271] max-w-2xl mx-auto">
            Commerce, restauration, services... Wano s&apos;adapte à votre activité.
          </p>
        </div>

        <div className="business-grid grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {businessTypes.map((business, i) => {
            const IconComponent = business.icon;
            return (
              <div
                key={i}
                className="business-card group bg-[#eff0f0] rounded-xl p-5 md:p-6 text-center hover:bg-[#028175] transition-all duration-300 cursor-pointer"
              >
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
                  <IconComponent size={36} className="text-[#028175] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-[1rem] md:text-[1.125rem] font-bold text-gray-900 group-hover:text-white mb-2 transition-colors">
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
