"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Image from "next/image";
import { Menu01Icon, Cancel01Icon } from "hugeicons-react";

gsap.registerPlugin(useGSAP);

const navLinks = [
  { href: "#accueil", label: "Accueil" },
  { href: "#features", label: "Fonctionnalités" },
  { href: "#tarifs", label: "Tarifs" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Animate navbar in on mount
  useGSAP(() => {
    gsap.to(navRef.current, {
      opacity: 1,
      duration: 0.5,
      delay: 0.2,
      ease: "power2.out",
    });
  }, { scope: navRef });

  // Handle scroll effect (not GSAP, stays in useEffect)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate mobile menu
  useGSAP(() => {
    if (mobileMenuRef.current) {
      if (mobileMenuOpen) {
        gsap.to(mobileMenuRef.current, {
          opacity: 1,
          yPercent: 0,
          duration: 0.3,
          ease: "power3.out",
        });
      } else {
        gsap.to(mobileMenuRef.current, {
          opacity: 0,
          yPercent: -5,
          duration: 0.2,
          ease: "power3.in",
        });
      }
    }
  }, { dependencies: [mobileMenuOpen] });

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 backdrop-blur-xl border border-white/50 rounded-full px-4 sm:px-8 py-3 transition-all duration-400 opacity-0 ${
          scrolled ? "bg-white/95 shadow-xl" : "bg-white/85 shadow-lg"
        }`}
      >
        <div className="flex items-center gap-4 sm:gap-10">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image
                src="/logo.svg"
                alt="Wano"
                fill
                sizes="32px"
                className="object-contain"
                priority
              />
            </div>
            <span className="hidden sm:inline text-lg font-extrabold highlight tracking-tight">
              Wano
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-8 list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[#6b7271] font-semibold text-sm hover:text-[#028175] transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[#028175] hover:after:w-full after:transition-all"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="https://console.wanoapp.com"
                className="bg-[#028175] hover:bg-[#027469] text-white font-bold text-sm px-5 lg:px-6 py-2.5 rounded-full hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#028175]/30 transition-all"
              >
                Mon espace
              </a>
            </li>
          </ul>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#F4FCF3] transition-colors"
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {mobileMenuOpen ? (
              <Cancel01Icon size={22} className="text-[#028175]" />
            ) : (
              <Menu01Icon size={22} className="text-[#6b7271]" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-24 left-[5%] right-[5%] z-40 max-w-sm mx-auto bg-white rounded-2xl shadow-xl border border-[#e5e6e6] p-6 md:hidden ${
          mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{ opacity: 0 }}
      >
        <ul className="space-y-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={handleLinkClick}
                className="block py-3 px-4 text-[#6b7271] font-semibold text-base hover:text-[#028175] hover:bg-[#F4FCF3] rounded-xl transition-all"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-4 pt-4 border-t border-[#e5e6e6]">
          <a
            href="https://console.wanoapp.com"
            className="block w-full text-center bg-[#028175] hover:bg-[#027469] text-white font-bold text-base px-6 py-3 rounded-full transition-colors"
          >
            Mon espace
          </a>
        </div>
      </div>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
