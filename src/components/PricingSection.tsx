"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckmarkCircle02Icon, PackageIcon, UserGroupIcon, Invoice01Icon, Store04Icon } from "hugeicons-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const includedFeatures = ["Gestion de stock illimitée", "Tableau de bord complet", "1 utilisateur", "10 produits", "Support email"];

const pricingOptions = [
  { icon: PackageIcon, name: "Produits", description: "+50 produits", price: "1 500", unit: "/ mois" },
  { icon: UserGroupIcon, name: "Utilisateurs", description: "Par membre", price: "1 000", unit: "/ mois" },
  { icon: Invoice01Icon, name: "Factures", description: "+50 factures", price: "1 500", unit: "/ mois" },
  { icon: Store04Icon, name: "Point de vente", description: "Caisse illimitée", price: "2 000", unit: "/ mois" },
];

export default function PricingSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const header = containerRef.current?.querySelector(".pricing-header");
    const card = containerRef.current?.querySelector(".pricing-card");
    const evolveSection = containerRef.current?.querySelector(".evolve-section");
    const optionsGrid = containerRef.current?.querySelector(".pricing-options");
    const options = containerRef.current?.querySelectorAll(".pricing-option");
    const onlineSection = containerRef.current?.querySelector(".online-section");

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

    if (card) {
      gsap.fromTo(card,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    if (evolveSection) {
      gsap.fromTo(evolveSection.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: evolveSection,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    if (options && options.length > 0) {
      gsap.fromTo(options,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: optionsGrid,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    if (onlineSection) {
      gsap.fromTo(onlineSection,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: onlineSection,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="tarifs" className="py-20 md:py-28 px-[5%] bg-[#eff0f0]">
      <div className="max-w-6xl mx-auto">
        <div className="pricing-header text-center mb-12">
          <span className="inline-block px-4 py-2 bg-[#F4FCF3] text-[#028175] rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
            Tarification flexible
          </span>
          <h2 className="text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-extrabold text-gray-900 mb-5 tracking-tight">
            Gratuit <span className="highlight">pour commencer</span>
          </h2>
          <p className="text-base md:text-lg text-[#6b7271] max-w-2xl mx-auto">
            Pas d&apos;abonnement fixe. Payez uniquement quand vous grandissez.
          </p>
        </div>

        <div className="pricing-card bg-white rounded-2xl shadow-lg border border-[#e5e6e6] overflow-hidden mb-12">
          <div className="bg-[#028175] p-6 md:p-8 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-[1.375rem] md:text-[1.5rem] font-bold mb-2">Wano Gratuit</h3>
                <p className="text-white/90">Tout pour démarrer</p>
              </div>
              <div className="text-left md:text-right">
                <div className="text-[1.75rem] md:text-[2rem] font-extrabold">0 FCFA</div>
                <div className="text-white/80">pour toujours</div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <h4 className="text-lg font-bold text-gray-900 mb-6">Inclus :</h4>
            <ul className="grid md:grid-cols-2 gap-4 mb-8">
              {includedFeatures.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-[#6b7271]">
                  <span className="w-6 h-6 rounded-full bg-[#028175] flex items-center justify-center">
                    <CheckmarkCircle02Icon size={16} className="text-white" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href="https://console.wanoapp.com"
              className="inline-block w-full md:w-auto px-6 py-3 bg-[#028175] hover:bg-[#027469] text-white rounded-full font-semibold text-base text-center transition-all"
            >
              Commencer gratuitement
            </a>
          </div>
        </div>

        <div className="evolve-section text-center mb-8">
          <h3 className="text-[1.375rem] md:text-[1.5rem] font-bold text-gray-900 mb-3">Évoluez selon vos besoins</h3>
          <p className="text-[#6b7271]">Ajoutez des fonctionnalités quand vous en avez besoin</p>
        </div>

        <div className="pricing-options grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {pricingOptions.map((option, i) => {
            const IconComponent = option.icon;
            return (
              <div key={i} className="pricing-option bg-white rounded-xl p-5 border border-[#e5e6e6] hover:border-[#028175] hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-lg bg-[#F4FCF3] flex items-center justify-center mb-4">
                  <IconComponent size={20} className="text-[#028175]" />
                </div>
                <h4 className="text-base font-bold text-gray-900 mb-2">{option.name}</h4>
                <p className="text-[#6b7271] text-sm mb-4">{option.description}</p>
                <div className="text-[1.25rem] font-extrabold text-[#028175]">
                  {option.price}
                  <span className="text-sm font-normal text-[#6b7271] block">{option.unit}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="online-section mt-10 bg-[#F4FCF3] rounded-xl p-6 text-center">
          <h4 className="text-lg font-bold text-gray-900 mb-3">Ventes en ligne ?</h4>
          <p className="text-[#6b7271] max-w-xl mx-auto">
            Choisissez entre un forfait fixe ou une commission de <strong className="text-[#028175]">2%</strong> par vente.
          </p>
        </div>
      </div>
    </section>
  );
}
