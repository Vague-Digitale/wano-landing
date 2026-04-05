import type { Metadata } from "next";
import localFont from "next/font/local";
import { Sora } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const gtWalsheim = localFont({
  src: [
    {
      path: "../../public/fonts/gtwalsheim-pro/GTWalsheimPro-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/gtwalsheim-pro/GTWalsheimPro-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/gtwalsheim-pro/GTWalsheimPro-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/gtwalsheim-pro/GTWalsheimPro-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-gtw",
  display: "swap",
});

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
    <html lang="fr" className={`${sora.variable} ${gtWalsheim.variable} antialiased`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/wano.webp" />
        <meta name="theme-color" content="#028175" />
      </head>
      <body className="min-h-full flex flex-col font-sora">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
