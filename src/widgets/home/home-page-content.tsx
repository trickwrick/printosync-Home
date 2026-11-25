"use client";

import { HeroSection } from "@/widgets/hero";
import { ProofSection } from "@/widgets/home/proof-section";
import { FaqSection } from "@/widgets/home/faq-section";
import {
  AboutOverviewSection,
  DigitizeCtaSection,
  IndustriesOverviewSection,
  WhyChooseSection,
} from "@/widgets/home/business-sections";
import { InteractiveEstimatorSection } from "@/widgets/home/interactive-estimator-section";
import { TabbedFeaturesShowcase } from "@/widgets/home/tabbed-features-showcase";
import { NationwideReachSection } from "@/widgets/home/nationwide-reach-section";
import { WorkflowSection } from "@/widgets/home/workflow-section";
import { FloatingQuickAction } from "@/widgets/home/floating-quick-action";

export function HomePageContent() {
  return (
    <>
      <HeroSection />
      <IndustriesOverviewSection />
      <InteractiveEstimatorSection />
      <TabbedFeaturesShowcase />
      <AboutOverviewSection />
      <WorkflowSection />
      <WhyChooseSection />
      <NationwideReachSection />
      <ProofSection />
      <FaqSection />
      <DigitizeCtaSection />
      <FloatingQuickAction />
    </>
  );
}
