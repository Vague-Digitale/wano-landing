import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://wanoapp.com"),
  title: "Wano - Gérez votre business en toute simplicité",
  description:
    "Wano est la plateforme tout-en-un pour gérer votre commerce. Stock, ventes en ligne et en boutique, facturation, analytics. Commencez gratuitement et évoluez à votre rythme.",
  keywords: [
    "gestion de stock",
    "logiciel de caisse",
    "e-commerce",
    "point de vente",
    "POS",
    "facturation",
    "gestion commerciale",
    "Côte d'Ivoire",
    "Afrique",
    "FCFA",
  ],
  authors: [{ name: "Wano" }],
  creator: "Wano",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://wanoapp.com",
    siteName: "Wano",
    title: "Wano - Gérez votre business en toute simplicité",
    description:
      "La plateforme tout-en-un pour gérer votre commerce. Commencez gratuitement.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Wano - Plateforme de gestion commerciale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wano - Gérez votre business en toute simplicité",
    description:
      "La plateforme tout-en-un pour gérer votre commerce. Commencez gratuitement.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/wano.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="antialiased">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/wano.webp" />
        <meta name="theme-color" content="#0E8A6B" />
      </head>
      <body
        className="min-h-full flex flex-col bg-[#F4F1EB] text-[#1F1E18]"
        style={{ fontFamily: "var(--wn-font-sans)" }}
      >
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
