import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import { GoogleTagManager, GoogleTagManagerNoScript } from "@/components/analytics/GoogleTagManager";
import { FacebookPixel } from "@/components/analytics/FacebookPixel";
import { VisitorTracker } from "@/components/analytics/VisitorTracker";

export const metadata: Metadata = {
  metadataBase: new URL("https://wanoapp.com"),
  title: {
    default: "Wano — Le système d'exploitation de votre business",
    template: "%s | Wano",
  },
  description:
    "POS, e-commerce, facturation, paiement mobile — tout ce dont vous avez besoin pour gérer et développer votre activité. Made in Côte d'Ivoire, 100% pensé pour l'Afrique.",
  keywords: [
    "gestion de stock",
    "logiciel de caisse",
    "e-commerce",
    "point de vente",
    "POS",
    "facturation",
    "paiement mobile",
    "Orange Money",
    "Wave",
    "MTN Money",
    "gestion commerciale",
    "Côte d'Ivoire",
    "Afrique",
    "FCFA",
    "Abidjan",
  ],
  authors: [{ name: "Wano", url: "https://wanoapp.com" }],
  creator: "Wano",
  publisher: "Wano",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://wanoapp.com",
    siteName: "Wano",
    title: "Wano — Le système d'exploitation de votre business",
    description:
      "POS, e-commerce, facturation, paiement mobile — tout ce dont vous avez besoin pour gérer et développer votre activité. Made in Côte d'Ivoire.",
    images: [
      {
        url: "/wano.png",
        width: 1200,
        height: 630,
        alt: "Wano — Le système d'exploitation de votre business",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wano — Le système d'exploitation de votre business",
    description:
      "POS, e-commerce, facturation, paiement mobile — tout ce dont vous avez besoin pour gérer et développer votre activité.",
    images: ["/wano.png"],
    creator: "@wanoapp",
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
    icon: [
      { url: "/wano.png", type: "image/png" },
    ],
    apple: [
      { url: "/wano.png", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://wanoapp.com",
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
        <GoogleTagManager />
        <link rel="icon" href="/wano.png" type="image/png" />
        <link rel="apple-touch-icon" href="/wano.png" />
        <meta name="theme-color" content="#0E8A6B" />
        <meta name="msapplication-TileColor" content="#0E8A6B" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </head>
      <body
        className="min-h-full flex flex-col bg-[#F4F1EB] text-[#1F1E18]"
        style={{ fontFamily: "var(--wn-font-sans)" }}
      >
        <GoogleTagManagerNoScript />
        <FacebookPixel />
        <VisitorTracker />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
