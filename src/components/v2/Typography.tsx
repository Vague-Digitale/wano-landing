import { ReactNode } from "react";

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

// Eyebrow — pill blanche bordée, uppercase, 12px
export function Eyebrow({ children, className = "" }: TypographyProps) {
  return (
    <span
      className={`inline-block px-4 py-2 text-xs font-medium uppercase tracking-[0.04em] border border-[#DDD8C8] bg-white text-[#5E5B48] ${className}`}
      style={{ fontFamily: "var(--wn-font-display)" }}
    >
      {children}
    </span>
  );
}

// DisplayHeading — font-cond, 88px desktop / 56px mobile
export function DisplayHeading({ children, className = "" }: TypographyProps) {
  return (
    <h1
      className={`text-[56px] md:text-[88px] font-bold leading-[0.95] tracking-[-0.03em] text-[#1F1E18] ${className}`}
      style={{ fontFamily: "var(--wn-font-cond)" }}
    >
      {children}
    </h1>
  );
}

// H2 — font-display, 56px
export function H2({ children, className = "" }: TypographyProps) {
  return (
    <h2
      className={`text-[32px] md:text-[56px] font-bold leading-[1.1] tracking-[-0.02em] text-[#1F1E18] ${className}`}
      style={{ fontFamily: "var(--wn-font-display)" }}
    >
      {children}
    </h2>
  );
}

// Body — 17px desktop / 16px mobile
export function Body({ children, className = "" }: TypographyProps) {
  return (
    <p
      className={`text-base md:text-[17px] leading-[1.55] text-[#5E5B48] ${className}`}
      style={{ fontFamily: "var(--wn-font-display)" }}
    >
      {children}
    </p>
  );
}
