"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CheckmarkCircle02Icon,
  PackageIcon,
  UserGroupIcon,
  Invoice01Icon,
  Store04Icon,
} from "hugeicons-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const includedFeatures = [
  "Gestion de stock illimitee",
  "Tableau de bord complet",
  "1 utilisateur inclus",
  "10 produits inclus",
  "Support par email",
];

const pricingOptions = [
  {
    icon: PackageIcon,
    name: "Produits",
    description: "Ajoutez plus de produits",
    price: "1 500",
    unit: "/ 50 produits / mois",
  },
  {
    icon: UserGroupIcon,
    name: "Utilisateurs",
    description: "Invitez votre equipe",
    price: "1 000",
    unit: "/ utilisateur / mois",
  },
  {
    icon: Invoice01Icon,
    name: "Factures",
    description: "Facturation professionnelle",
    price: "1 500",
    unit: "/ 50 factures / mois",
  },
  {
    icon: Store04Icon,
    name: "Point de vente",
    description: "Caisse pour votre boutique",
    price: "2 000",
    unit: "/ mois (illimite)",
  },
];

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      gsap.from(".pricing-header > *", {
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

      gsap.from(".pricing-card", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".pricing-card",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".pricing-option", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".pricing-options",
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
      id="tarifs"
      className="py-24 md:py-32 px-[5%] bg-[#eff0f0]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="pricing-header text-center mb-16 md:mb-20">
          <span className="inline-block px-4 py-2 bg-[#F4FCF3] text-[#028175] rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
            Tarification flexible
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Commencez <span className="highlight">gratuitement</span>
          </h2>
          <p className="text-lg md:text-xl text-[#6b7271] max-w-2xl mx-auto leading-relaxed">
            Pas d&apos;abonnement fixe. Payez uniquement ce que vous utilisez et
            faites evoluer votre plan selon vos besoins.
          </p>
        </div>

        {/* Main pricing card */}
        <div className="pricing-card bg-white rounded-3xl shadow-xl border border-[#e5e6e6] overflow-hidden mb-16">
          <div className="bg-[#028175] p-8 md:p-10 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  Wano Gratuit
                </h3>
                <p className="text-white/90">
                  Tout ce qu&apos;il faut pour demarrer
                </p>
              </div>
              <div className="text-left md:text-right">
                <div className="text-4xl md:text-5xl font-extrabold">0 FCFA</div>
                <div className="text-white/80">pour toujours</div>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-10">
            <h4 className="text-lg font-bold text-gray-900 mb-6">
              Inclus dans le plan gratuit :
            </h4>
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
              className="inline-block w-full md:w-auto px-10 py-4 bg-[#028175] hover:bg-[#027469] text-white rounded-full font-bold text-lg text-center hover:-translate-y-1 hover:shadow-xl hover:shadow-[#028175]/30 transition-all"
            >
              Commencer gratuitement
            </a>
          </div>
        </div>

        {/* Additional options */}
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Evoluez selon vos besoins
          </h3>
          <p className="text-[#6b7271]">
            Ajoutez des fonctionnalites quand vous en avez besoin
          </p>
        </div>

        <div className="pricing-options grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingOptions.map((option, i) => {
            const IconComponent = option.icon;
            return (
              <div
                key={i}
                className="pricing-option bg-white rounded-2xl p-6 border border-[#e5e6e6] hover:border-[#028175] hover:shadow-lg transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-[#F4FCF3] flex items-center justify-center mb-4">
                  <IconComponent size={20} className="text-[#028175]" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {option.name}
                </h4>
                <p className="text-[#6b7271] text-sm mb-4">{option.description}</p>
                <div className="text-2xl font-extrabold text-[#028175]">
                  {option.price}
                  <span className="text-sm font-normal text-[#6b7271] block">
                    {option.unit}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* E-commerce note */}
        <div className="mt-12 bg-[#F4FCF3] rounded-2xl p-8 text-center">
          <h4 className="text-xl font-bold text-gray-900 mb-3">
            Ventes en ligne ?
          </h4>
          <p className="text-[#6b7271] max-w-xl mx-auto">
            Choisissez entre un forfait fixe par commandes ou une commission de{" "}
            <strong className="text-[#028175]">2%</strong> par vente. Vous gardez le controle de vos couts.
          </p>
        </div>
      </div>
    </section>
  );
}
