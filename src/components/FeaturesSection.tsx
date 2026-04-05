"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ArrowRight02Icon } from "hugeicons-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const features = [
  {
    id: "stock",
    title: "Stock",
    highlight: "toujours à jour",
    description: "Inventaire en temps réel, alertes automatiques, mouvements tracés. Zéro surprise.",
    points: ["Sync multi-canaux", "Alertes stock bas", "Historique complet", "Multi-entrepôts"],
    image: "/wano-desktop-view.webp",
    reverse: false,
  },
  {
    id: "sales",
    title: "Ventes",
    highlight: "en ligne et en boutique",
    description: "Site e-commerce, caisse en magasin, réseaux sociaux. Un seul tableau de bord.",
    points: ["Boutique en ligne", "Caisse tactile POS", "Paiements mobiles", "Factures auto"],
    image: "/wano-phoneview.webp",
    reverse: true,
  },
  {
    id: "analytics",
    title: "Décisions",
    highlight: "basées sur les données",
    description: "Tableaux de bord clairs, rapports automatisés, tendances et prévisions.",
    points: ["Dashboard temps réel", "Rentabilité produit", "Prévisions ventes", "Export Excel/PDF"],
    image: "/wano-desktop-view.webp",
    reverse: false,
  },
  {
    id: "customers",
    title: "Clients",
    highlight: "fidèles",
    description: "Base unifiée, historique d'achats, relances ciblées. Construisez des relations.",
    points: ["Fichier clients", "Historique achats", "SMS & Email", "Programme fidélité"],
    image: "/wano-phoneview.webp",
    reverse: true,
  },
];

export default function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    features.forEach((feature) => {
      const section = containerRef.current?.querySelector(`#feature-${feature.id}`);
      if (!section) return;

      const image = section.querySelector(".feature-image");
      const textElements = section.querySelectorAll(".feature-text > *");

      if (image) {
        gsap.fromTo(image,
          { opacity: 0, scale: 0.95, x: feature.reverse ? 50 : -50 },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (textElements.length > 0) {
        gsap.fromTo(textElements,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.06,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} id="features">
      {features.map((feature, index) => (
        <section
          key={feature.id}
          id={`feature-${feature.id}`}
          className={`min-h-screen flex items-center py-20 md:py-28 px-[5%] ${
            index % 2 === 0 ? "bg-white" : "bg-[#eff0f0]"
          }`}
        >
          <div
            className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full ${
              feature.reverse ? "lg:[direction:rtl]" : ""
            }`}
          >
            <div
              className={`feature-image relative overflow-hidden rounded-2xl ${
                index % 2 === 0 ? "bg-[#F4FCF3]" : "bg-white"
              } p-5 md:p-8 ${feature.reverse ? "lg:[direction:ltr]" : ""}`}
            >
              <div className="relative w-full aspect-[7/5] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  sizes="600px"
                  className="object-cover"
                />
              </div>
            </div>

            <div className={`feature-text ${feature.reverse ? "lg:[direction:ltr]" : ""}`}>
              <h2 className="text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-extrabold text-gray-900 mb-5 leading-tight tracking-tight">
                {feature.title} <span className="highlight">{feature.highlight}</span>
              </h2>
              <p className="text-base md:text-lg text-[#6b7271] leading-relaxed mb-6">
                {feature.description}
              </p>
              <ul className="grid gap-3 mb-6">
                {feature.points.map((point, i) => (
                  <li
                    key={i}
                    className={`text-sm md:text-base text-[#6b7271] font-medium p-3 rounded-xl ${
                      index % 2 === 0 ? "bg-[#eff0f0]" : "bg-white"
                    }`}
                  >
                    {point}
                  </li>
                ))}
              </ul>
              <a
                href="https://console.wanoapp.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#028175] hover:bg-[#027469] text-white rounded-full font-semibold text-base transition-all"
              >
                En savoir plus
                <ArrowRight02Icon size={20} />
              </a>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
