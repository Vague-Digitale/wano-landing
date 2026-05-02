"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { CTA } from "./CTA";

const navItems = [
  { label: "Produit", href: "#produit" },
  { label: "POS", href: "/produit/pos" },
  { label: "Boutique", href: "/produit/ecommerce" },
  { label: "Asso", href: "/asso" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "Ressources", href: "#ressources" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-[60px] md:h-[72px] bg-[#F4F1EB]/90 backdrop-blur-md border-b border-[#DDD8C8]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-14 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#161612] flex items-center justify-center">
              <span className="text-white font-bold text-lg" style={{ fontFamily: "var(--wn-font-display)" }}>W</span>
            </div>
            <span className="text-xl font-bold text-[#1F1E18]" style={{ fontFamily: "var(--wn-font-display)" }}>wano</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-[#5E5B48] hover:text-[#1F1E18] transition-colors"
                style={{ fontFamily: "var(--wn-font-display)" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <CTA href="https://console.wanoapp.com" variant="primary">
              Démarrer
            </CTA>
            <CTA href="https://console.wanoapp.com/login" variant="secondary">
              Connexion
            </CTA>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2"
            aria-label="Ouvrir le menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1F1E18" strokeWidth="2" strokeLinecap="round">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#161612] lg:hidden">
          <div className="p-6 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-12">
              <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <div className="w-8 h-8 bg-white flex items-center justify-center">
                  <span className="text-[#161612] font-bold text-lg" style={{ fontFamily: "var(--wn-font-display)" }}>W</span>
                </div>
                <span className="text-xl font-bold text-white" style={{ fontFamily: "var(--wn-font-display)" }}>wano</span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2"
                aria-label="Fermer le menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
              </button>
            </div>

            {/* Nav Items */}
            <nav className="flex flex-col gap-6 flex-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-medium text-white hover:text-[#7CFC9E] transition-colors"
                  style={{ fontFamily: "var(--wn-font-display)" }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* CTAs */}
            <div className="flex flex-col gap-3 mt-auto">
              <CTA href="https://console.wanoapp.com" variant="primary" className="w-full justify-center">
                Démarrer
              </CTA>
              <CTA href="https://console.wanoapp.com/login" variant="secondary" className="w-full justify-center border-white text-white hover:bg-white hover:text-[#161612]">
                Connexion
              </CTA>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
