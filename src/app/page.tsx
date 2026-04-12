import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import TwoOptions from "@/components/TwoOptions";
import HowItWorks from "@/components/HowItWorks";
import Calculator from "@/components/Calculator";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

function JsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Recoup",
    description:
      "Zero-upfront IEEPA tariff refund filing through the CBP CAPE portal. Flat $895 or 1.5% of refund — whichever is greater — invoiced only after CBP accepts. Optional non-recourse Cash Now advance, tiered 6–10%.",
    url: "https://recoup.claims",
    priceRange: "$0–1.5%",
    areaServed: "US",
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Am I eligible for a refund?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "If you imported goods into the U.S. between February 2025 and February 2026 from China, the EU, Vietnam, India, or 50+ other countries, you likely paid IEEPA tariffs and are eligible for a refund.",
        },
      },
      {
        "@type": "Question",
        name: "What does \"pay when CBP pays\" mean?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We prepare your entry data, draft the CAPE declaration, and file it through a licensed customs broker. You pay nothing until CBP accepts the filing. Our fee is $895 or 1.5% of the refund, whichever is greater — so small refunds pay the $895 floor and larger refunds scale at 1.5%.",
        },
      },
      {
        "@type": "Question",
        name: "How does Cash Now work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We verify your refund amount and wire up to 85% of it within 72 hours. The fee is tiered by refund size: 10% of the advance for refunds up to $50k, 8% for $50k–$250k, and 6% above $250k. It is non-recourse: if CBP reduces the refund, we absorb the shortfall.",
        },
      },
      {
        "@type": "Question",
        name: "Why this pricing instead of a retainer or contingency?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A retainer asks you to pay before we deliver anything. A pure contingency punishes success. We set an honest $895 floor that covers small refunds where the work is actually a fixed cost, and 1.5% above that so the fee scales gently with refund size.",
        },
      },
      {
        "@type": "Question",
        name: "When will CBP issue refunds?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The CAPE portal opens late April 2026. CBP estimates up to 45 days from filing to refund. If you choose Cash Now, you get paid in days regardless.",
        },
      },
      {
        "@type": "Question",
        name: "Is Recoup a law firm or broker?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Recoup is an administrative preparation service. All CBP filings are executed through licensed customs brokers. We do not provide legal advice.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}

export default function Home() {
  return (
    <>
      <JsonLd />
      <Nav />
      <Hero />
      <Stats />
      <TwoOptions />
      <HowItWorks />
      <Calculator />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}
