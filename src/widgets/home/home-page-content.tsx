"use client";

import dynamic from "next/dynamic";
import { HeroSection } from "@/widgets/hero";
import { PlatformSection } from "@/widgets/home/platform-section";
import { ProofSection } from "@/widgets/home/proof-section";
import { PricingSection } from "@/widgets/home/pricing-section";
import { FaqSection } from "@/widgets/home/faq-section";
import { ContactCtaSection } from "@/widgets/home/contact-cta-section";

const WorkflowSection = dynamic(
  () => import("@/widgets/home/workflow-section").then((m) => m.WorkflowSection),
  { loading: () => <div className="min-h-[320px]" aria-hidden="true" /> },
);

const DashboardShowcaseSection = dynamic(
  () =>
    import("@/widgets/home/dashboard-showcase-section").then(
      (m) => m.DashboardShowcaseSection,
    ),
  { ssr: false, loading: () => <div className="min-h-[520px]" aria-hidden="true" /> },
);

export function HomePageContent() {
  return (
    <>
      <HeroSection />
      <PlatformSection />
      <WorkflowSection />
      <DashboardShowcaseSection />
      <ProofSection />
      <PricingSection />
      <FaqSection />
      <ContactCtaSection />
    </>
  );
}
