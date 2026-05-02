import Link from "next/link";

const footerLinks = {
  produit: [
    { label: "POS", href: "#produit" },
    { label: "E-commerce", href: "#produit" },
    { label: "Services", href: "#produit" },
    { label: "Réservation", href: "#produit" },
    { label: "Restauration", href: "#produit" },
  ],
  entreprise: [
    { label: "Console", href: "https://console.wanoapp.com" },
    { label: "WhatsApp", href: "https://wa.me/2250545476305" },
  ],
  ressources: [
    { label: "Démarrer", href: "https://console.wanoapp.com" },
    { label: "Connexion", href: "https://console.wanoapp.com/login" },
  ],
  legal: [
    { label: "Confidentialité", href: "/privacy" },
    { label: "Conditions", href: "/terms" },
  ],
};

export function SiteFooter() {
  return (
    <footer className="bg-[var(--wn-n-800)] text-white py-16 md:py-20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-14">
        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Produit */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--wn-n-400)] uppercase tracking-wide mb-4" style={{ fontFamily: "var(--wn-font-display)" }}>
              Produit
            </h4>
            <ul className="space-y-3">
              {footerLinks.produit.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--wn-n-300)] hover:text-white transition-colors"
                    style={{ fontFamily: "var(--wn-font-display)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Entreprise */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--wn-n-400)] uppercase tracking-wide mb-4" style={{ fontFamily: "var(--wn-font-display)" }}>
              Entreprise
            </h4>
            <ul className="space-y-3">
              {footerLinks.entreprise.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--wn-n-300)] hover:text-white transition-colors"
                    style={{ fontFamily: "var(--wn-font-display)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--wn-n-400)] uppercase tracking-wide mb-4" style={{ fontFamily: "var(--wn-font-display)" }}>
              Ressources
            </h4>
            <ul className="space-y-3">
              {footerLinks.ressources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--wn-n-300)] hover:text-white transition-colors"
                    style={{ fontFamily: "var(--wn-font-display)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--wn-n-400)] uppercase tracking-wide mb-4" style={{ fontFamily: "var(--wn-font-display)" }}>
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--wn-n-300)] hover:text-white transition-colors"
                    style={{ fontFamily: "var(--wn-font-display)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-[var(--wn-n-700)] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white flex items-center justify-center">
                <span className="text-[var(--wn-n-800)] font-bold text-sm" style={{ fontFamily: "var(--wn-font-display)" }}>W</span>
              </div>
              <span className="text-sm font-bold text-white" style={{ fontFamily: "var(--wn-font-display)" }}>wano</span>
            </div>
            <span className="text-sm text-[var(--wn-n-500)]">|</span>
            <span className="text-sm text-[var(--wn-n-400)]">&copy; 2026 Wano</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://wa.me/2250545476305"
              className="text-sm text-[var(--wn-n-300)] hover:text-[var(--wn-green-acid)] transition-colors"
              style={{ fontFamily: "var(--wn-font-display)" }}
            >
              WhatsApp +225 0545 47 63 05
            </a>
            <span className="text-sm text-[var(--wn-n-400)]">wanoapp.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
