import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { label: "Fonctionnalités", href: "#features" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-14 md:py-16 px-[5%]">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pb-8 border-b border-white/10">
          {/* Brand */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                  src="/logo.svg"
                  alt="Wano"
                  fill
                  sizes="32px"
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold highlight">Wano</span>
            </Link>
            <p className="text-[#bcbebd] text-sm max-w-xs">
              La plateforme tout-en-un pour gérer votre business.
            </p>
          </div>

          {/* Links */}
          <nav>
            <ul className="flex flex-wrap gap-6">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#bcbebd] text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://console.wanoapp.com"
                  className="text-[#94DD8B] text-sm font-medium hover:text-white transition-colors"
                >
                  Mon espace
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center text-[#6b7271] text-xs gap-4">
          <p>&copy; {new Date().getFullYear()} Wano. Tous droits réservés.</p>
          <p>
            Conçu avec soin en Côte d&apos;Ivoire
          </p>
        </div>
      </div>
    </footer>
  );
}
