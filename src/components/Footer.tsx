import Link from "next/link";
import Image from "next/image";
import {
  Facebook02Icon,
  NewTwitterIcon,
  Linkedin02Icon,
  InstagramIcon,
} from "hugeicons-react";

const footerLinks = {
  product: {
    title: "Produit",
    links: [
      { label: "Fonctionnalites", href: "#features" },
      { label: "Tarifs", href: "#tarifs" },
      { label: "Documentation", href: "#" },
      { label: "API", href: "#" },
    ],
  },
  company: {
    title: "Entreprise",
    links: [
      { label: "A propos", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#contact" },
      { label: "Carrieres", href: "#" },
    ],
  },
  resources: {
    title: "Ressources",
    links: [
      { label: "Centre d'aide", href: "#" },
      { label: "Tutoriels", href: "#" },
      { label: "Support", href: "#" },
      { label: "Statut", href: "#" },
    ],
  },
};

const socialLinks = [
  { label: "Facebook", href: "#", icon: Facebook02Icon },
  { label: "Twitter", href: "#", icon: NewTwitterIcon },
  { label: "LinkedIn", href: "#", icon: Linkedin02Icon },
  { label: "Instagram", href: "#", icon: InstagramIcon },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-16 md:py-20 px-[5%]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                  src="/logo.svg"
                  alt="Wano"
                  fill
                  sizes="32px"
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-bold highlight">Wano</span>
            </Link>
            <p className="text-[#bcbebd] leading-relaxed mb-6 max-w-sm">
              La plateforme tout-en-un pour gerer votre business. Stock, ventes,
              analytics - tout au meme endroit.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#028175] hover:-translate-y-1 transition-all"
                  >
                    <IconComponent size={18} className="text-white" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-bold highlight mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#bcbebd] hover:text-[#94DD8B] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-[#6b7271] text-sm gap-4">
          <p>&copy; {new Date().getFullYear()} Wano. Tous droits reserves.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-[#94DD8B] transition-colors">
              Confidentialite
            </Link>
            <Link href="#" className="hover:text-[#94DD8B] transition-colors">
              Conditions
            </Link>
            <Link href="#" className="hover:text-[#94DD8B] transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
