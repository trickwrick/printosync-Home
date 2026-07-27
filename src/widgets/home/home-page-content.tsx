"use client";

import dynamic from "next/dynamic";
import { HeroSection } from "@/widgets/hero";
import { ProofSection } from "@/widgets/home/proof-section";
import { PricingSection } from "@/widgets/home/pricing-section";
import { FaqSection } from "@/widgets/home/faq-section";
import {
  AboutOverviewSection,
  BenefitsAndProcessSection,
  DigitizeCtaSection,
  IndustriesOverviewSection,
} from "@/widgets/home/business-sections";

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
      <IndustriesOverviewSection />
      <AboutOverviewSection />
      <WorkflowSection />
      <DashboardShowcaseSection />
      <BenefitsAndProcessSection />
      <ProofSection />
      <PricingSection />
      <FaqSection />
      <DigitizeCtaSection />
    </>
  );
}
