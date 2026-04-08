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
      "Administrative preparation for IEEPA tariff refund recovery through the CAPE portal.",
    url: "https://recoup.claims",
    priceRange: "$297–$2,497",
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
        name: "Do I need a lawyer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For the CAPE portal filing, no. CBP built a self-service system. We handle the data preparation and declaration formatting.",
        },
      },
      {
        "@type": "Question",
        name: "How does advance funding work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We verify your refund amount, then purchase your claim at up to 75% of its value. You receive the cash in days. When CBP pays, we collect. Non-recourse — if CBP reduces the refund, we absorb the risk.",
        },
      },
      {
        "@type": "Question",
        name: "Why flat fee, not a percentage?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Preparing a declaration for a $50K refund takes the same work as $5M. Percentage pricing is a legacy model. We price for the work.",
        },
      },
      {
        "@type": "Question",
        name: "When will CBP issue refunds?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The CAPE portal opens late April 2026. CBP estimates up to 45 days from filing to refund. If you choose advance funding, you get paid in days regardless.",
        },
      },
      {
        "@type": "Question",
        name: "Is Recoup a law firm or broker?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. We're an administrative preparation service. We work with licensed customs brokers for all CBP filings. We don't provide legal advice.",
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
