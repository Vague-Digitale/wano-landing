import Link from "next/link";
import { ReactNode } from "react";

interface CTAProps {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  className?: string;
}

export function CTA({ children, href, variant = "primary", className = "" }: CTAProps) {
  const baseStyles = "inline-flex items-center justify-center h-10 md:h-12 px-6 font-semibold text-base transition-all duration-200";

  const variants = {
    primary: "bg-[#0E8A6B] text-white hover:bg-[#0A6E54]",
    secondary: "bg-transparent border border-[#1F1E18] text-[#1F1E18] hover:bg-[#1F1E18] hover:text-white",
  };

  return (
    <Link
      href={href}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={{ fontFamily: "var(--wn-font-display)" }}
    >
      {children}
    </Link>
  );
}
