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
    primary: "bg-[var(--wn-green-500)] text-white hover:bg-[var(--wn-green-700)]",
    secondary: "bg-transparent border border-[var(--wn-text)] text-[var(--wn-text)] hover:bg-[var(--wn-text)] hover:text-white",
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
