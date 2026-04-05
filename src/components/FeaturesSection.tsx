"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ArrowRight02Icon } from "hugeicons-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    id: "stock",
    title: "Gestion de stock",
    highlight: "intelligente",
    description:
      "Suivez votre inventaire en temps reel, que vous vendiez en ligne ou en boutique. Alertes automatiques, mouvements de stock, tout est synchronise.",
    points: [
      "Synchronisation automatique multi-canaux",
      "Alertes de stock bas personnalisables",
      "Historique complet des mouvements",
      "Gestion de plusieurs depots",
    ],
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=700&h=500&fit=crop",
    imageAlt: "Gestion de stock et inventaire",
    reverse: false,
  },
  {
    id: "sales",
    title: "Vendez",
    highlight: "partout",
    description:
      "Boutique en ligne, point de vente en magasin, reseaux sociaux... Centralisez toutes vos ventes dans une seule interface.",
    points: [
      "Boutique en ligne personnalisable",
      "Caisse tactile pour vos ventes en magasin",
      "Tous les moyens de paiement acceptes",
      "Rapports de ventes automatiques",
    ],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&h=500&fit=crop",
    imageAlt: "Point de vente et e-commerce",
    reverse: true,
  },
  {
    id: "analytics",
    title: "Pilotez avec des",
    highlight: "donnees precises",
    description:
      "Tableaux de bord clairs, rapports automatises, analyses de performance. Prenez les bonnes decisions pour votre business.",
    points: [
      "Dashboard personnalisable en temps reel",
      "Analyse de rentabilite par produit",
      "Previsions de ventes intelligentes",
      "Export de donnees en un clic",
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=500&fit=crop",
    imageAlt: "Tableau de bord et analytics",
    reverse: false,
  },
  {
    id: "customers",
    title: "Fidelisez vos",
    highlight: "clients",
    description:
      "Gardez le contact avec vos clients, suivez leurs achats et creez des relations durables pour les faire revenir.",
    points: [
      "Base de donnees clients unifiee",
      "Historique d'achats complet",
      "Communications personnalisees",
      "Suivi du parcours client",
    ],
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=700&h=500&fit=crop",
    imageAlt: "Gestion de la relation client",
    reverse: true,
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each feature section
      features.forEach((feature) => {
        const section = document.querySelector(`#feature-${feature.id}`);
        if (!section) return;

        const image = section.querySelector(".feature-image img");
        const text = section.querySelector(".feature-text");
        const items = section.querySelectorAll(".feature-list li");

        gsap.from(image, {
          opacity: 0,
          scale: 0.9,
          x: feature.reverse ? 80 : -80,
          duration: 1.3,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from(
          [
            text?.querySelector("h2"),
            text?.querySelector("p"),
            text?.querySelector("a"),
          ],
          {
            opacity: 0,
            y: 50,
            stagger: 0.15,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 65%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.from(items, {
          opacity: 0,
          x: -20,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        });

        // Parallax on image
        gsap.to(image, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} id="features">
      {features.map((feature, index) => (
        <section
          key={feature.id}
          id={`feature-${feature.id}`}
          className={`min-h-screen flex items-center py-24 md:py-32 px-[5%] ${
            index % 2 === 0 ? "bg-white" : "bg-[#eff0f0]"
          }`}
        >
          <div
            className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center w-full ${
              feature.reverse ? "lg:[direction:rtl]" : ""
            }`}
          >
            <div
              className={`feature-image relative overflow-hidden rounded-3xl ${
                index % 2 === 0
                  ? "bg-[#F4FCF3]"
                  : "bg-white"
              } p-6 md:p-10 ${feature.reverse ? "lg:[direction:ltr]" : ""}`}
            >
              <div className="relative w-full aspect-[7/5] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={feature.image}
                  alt={feature.imageAlt}
                  fill
                  sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 600px"
                  className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
              </div>
            </div>

            <div
              className={`feature-text ${
                feature.reverse ? "lg:[direction:ltr]" : ""
              }`}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 md:mb-8 leading-tight tracking-tight">
                {feature.title}{" "}
                <span className="highlight">{feature.highlight}</span>
              </h2>
              <p className="text-lg md:text-xl text-[#6b7271] leading-relaxed mb-8 md:mb-10">
                {feature.description}
              </p>
              <ul className="feature-list grid gap-4 md:gap-5 mb-8 md:mb-10">
                {feature.points.map((point, i) => (
                  <li
                    key={i}
                    className={`text-base md:text-lg text-[#6b7271] font-medium p-4 md:p-5 rounded-xl ${
                      index % 2 === 0
                        ? "bg-[#eff0f0]"
                        : "bg-white"
                    } hover:shadow-md transition-all`}
                  >
                    {point}
                  </li>
                ))}
              </ul>
              <a
                href="https://console.wanoapp.com"
                className="inline-flex items-center gap-2 px-8 md:px-12 py-4 md:py-5 bg-[#028175] hover:bg-[#027469] text-white rounded-full font-bold text-base md:text-lg hover:-translate-y-1 hover:shadow-xl hover:shadow-[#028175]/30 transition-all"
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
