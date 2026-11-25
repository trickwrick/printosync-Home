"use client";

import { HeroSection } from "@/widgets/hero";
import { ProofSection } from "@/widgets/home/proof-section";
import { FaqSection } from "@/widgets/home/faq-section";
import {
  AboutOverviewSection,
  DigitizeCtaSection,
  IndustriesOverviewSection,
  KeyFeaturesErpSection,
  WhyChooseSection,
} from "@/widgets/home/business-sections";
import { NationwideReachSection } from "@/widgets/home/nationwide-reach-section";
import { WorkflowSection } from "@/widgets/home/workflow-section";

export function HomePageContent() {
  return (
    <>
      <HeroSection />
      <IndustriesOverviewSection />
      <AboutOverviewSection />
      <KeyFeaturesErpSection />
      <WorkflowSection />
      <WhyChooseSection />
      <NationwideReachSection />
      <ProofSection />
      <FaqSection />
      <DigitizeCtaSection />
    </>
  );
}
