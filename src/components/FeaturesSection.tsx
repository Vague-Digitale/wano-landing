"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import {
  ArrowRight02Icon,
  ReloadIcon,
  Notification03Icon,
  Clock01Icon,
  Building03Icon,
  Store04Icon,
  Money01Icon,
  SmartPhone01Icon,
  Invoice01Icon,
  ChartLineData02Icon,
  PieChartIcon,
  AnalyticsUpIcon,
  FileExportIcon,
  UserGroupIcon,
  ShoppingBag01Icon,
  Mail01Icon,
  GiftIcon,
} from "hugeicons-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const features = [
  {
    id: "stock",
    title: "Stock",
    highlight: "toujours à jour",
    description: "Inventaire en temps réel, alertes automatiques, mouvements tracés. Zéro surprise.",
    points: [
      { text: "Sync multi-canaux", icon: ReloadIcon },
      { text: "Alertes stock bas", icon: Notification03Icon },
      { text: "Historique complet", icon: Clock01Icon },
      { text: "Multi-entrepôts", icon: Building03Icon },
    ],
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=700&h=500&fit=crop",
    reverse: false,
  },
  {
    id: "sales",
    title: "Ventes",
    highlight: "en ligne et en boutique",
    description: "Site e-commerce, caisse en magasin, réseaux sociaux. Un seul tableau de bord.",
    points: [
      { text: "Boutique en ligne", icon: Store04Icon },
      { text: "Caisse tactile POS", icon: SmartPhone01Icon },
      { text: "Paiements mobiles", icon: Money01Icon },
      { text: "Factures auto", icon: Invoice01Icon },
    ],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&h=500&fit=crop",
    reverse: true,
  },
  {
    id: "analytics",
    title: "Décisions",
    highlight: "basées sur les données",
    description: "Tableaux de bord clairs, rapports automatisés, tendances et prévisions.",
    points: [
      { text: "Dashboard temps réel", icon: ChartLineData02Icon },
      { text: "Rentabilité produit", icon: PieChartIcon },
      { text: "Prévisions ventes", icon: AnalyticsUpIcon },
      { text: "Export Excel/PDF", icon: FileExportIcon },
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=500&fit=crop",
    reverse: false,
  },
  {
    id: "customers",
    title: "Clients",
    highlight: "fidèles",
    description: "Base unifiée, historique d'achats, relances ciblées. Construisez des relations.",
    points: [
      { text: "Fichier clients", icon: UserGroupIcon },
      { text: "Historique achats", icon: ShoppingBag01Icon },
      { text: "SMS & Email", icon: Mail01Icon },
      { text: "Programme fidélité", icon: GiftIcon },
    ],
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=700&h=500&fit=crop",
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
              <ul className="grid sm:grid-cols-2 gap-3 mb-6">
                {feature.points.map((point, i) => {
                  const IconComponent = point.icon;
                  return (
                    <li
                      key={i}
                      className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#eff0f0] flex items-center justify-center flex-shrink-0">
                        <IconComponent size={18} className="text-[#028175]" />
                      </div>
                      <span className="text-sm md:text-base text-gray-900 font-medium">
                        {point.text}
                      </span>
                    </li>
                  );
                })}
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
