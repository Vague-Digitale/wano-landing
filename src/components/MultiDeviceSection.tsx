"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ComputerIcon, SmartPhone01Icon, RefreshIcon, Globe02Icon } from "hugeicons-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const deviceFeatures = [
  { icon: ComputerIcon, title: "Ordinateur", description: "Interface complète" },
  { icon: SmartPhone01Icon, title: "Mobile", description: "Ventes rapides" },
  { icon: RefreshIcon, title: "Synchronisé", description: "Données à jour" },
  { icon: Globe02Icon, title: "100% Web", description: "Rien à installer" },
];

export default function MultiDeviceSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const textContent = containerRef.current?.querySelector(".device-text");
    const devicesContainer = containerRef.current?.querySelector(".devices-container");
    const desktop = containerRef.current?.querySelector(".desktop-mockup");
    const mobile = containerRef.current?.querySelector(".mobile-mockup");

    if (textContent) {
      gsap.fromTo(textContent.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textContent,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    if (desktop) {
      gsap.fromTo(desktop,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: devicesContainer,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Floating animation (slower for subtlety)
      gsap.to(desktop, {
        y: -10,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    if (mobile) {
      gsap.fromTo(mobile,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: devicesContainer,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Floating animation
      gsap.to(mobile, {
        y: 10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-20 md:py-28 px-[5%] bg-[#eff0f0] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="device-text">
            <span className="inline-block px-4 py-2 bg-[#F4FCF3] text-[#028175] rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
              Multi-plateforme
            </span>
            <h2 className="text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-extrabold text-gray-900 mb-5 tracking-tight leading-tight">
              Accessible <span className="highlight">partout</span>
            </h2>
            <p className="text-base md:text-lg text-[#6b7271] leading-relaxed mb-6">
              Ordi, tablette ou téléphone. Vos données synchronisées en temps réel.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {deviceFeatures.map((feature, i) => {
                const IconComponent = feature.icon;
                return (
                  <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-[#028175] flex items-center justify-center flex-shrink-0">
                      <IconComponent size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{feature.title}</h4>
                      <p className="text-sm text-[#6b7271]">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="devices-container relative h-[400px] sm:h-[500px] md:h-[600px]">
            <div className="desktop-mockup absolute left-0 top-1/2 -translate-y-1/2 w-[80%] sm:w-[85%] bg-gray-900 rounded-xl p-2 shadow-2xl">
              <div className="flex items-center gap-1.5 mb-2 px-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>
              <div className="bg-gray-100 rounded-lg overflow-hidden aspect-video relative">
                <Image
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=500&fit=crop"
                  alt="Wano sur ordinateur"
                  fill
                  sizes="500px"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="mobile-mockup absolute right-0 bottom-10 w-[35%] max-w-[180px] bg-gray-900 rounded-3xl p-2 shadow-2xl">
              <div className="w-16 h-1 bg-gray-700 rounded-full mx-auto mb-2" />
              <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-[9/19] relative">
                <Image
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=800&fit=crop"
                  alt="Wano sur mobile"
                  fill
                  sizes="180px"
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
