import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Recoup — Get your IEEPA tariff money back",
  description:
    "We file your CAPE declaration. You get paid when CBP pays — or take a cash advance today. No upfront fee. No percentage. Zero-tier pricing.",
  keywords: [
    "IEEPA tariff refund",
    "CAPE portal",
    "CBP refund",
    "tariff recovery",
    "importer refund 2026",
  ],
  openGraph: {
    title: "Recoup — Your tariff money, back in your bank",
    description:
      "File through CAPE with zero upfront fee, or take a non-recourse cash advance today.",
    url: "https://recoup.claims",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
