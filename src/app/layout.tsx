import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Recoup — IEEPA Tariff Refund Recovery",
  description:
    "File your IEEPA tariff refund declaration or receive a non-recourse cash advance. Flat fee. No percentage. Licensed customs brokers.",
  keywords: [
    "IEEPA tariff refund",
    "CAPE portal",
    "CBP refund",
    "tariff recovery",
    "importer refund 2026",
  ],
  openGraph: {
    title: "Get Your IEEPA Tariff Refund",
    description:
      "Federal court ruled IEEPA tariffs unlawful. File your refund claim or get an advance.",
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
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
