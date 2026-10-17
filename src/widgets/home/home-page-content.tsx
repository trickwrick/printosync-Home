"use client";

import dynamic from "next/dynamic";
import { HeroSection } from "@/widgets/hero";
import { ProofSection } from "@/widgets/home/proof-section";

import { FaqSection } from "@/widgets/home/faq-section";
import {
  AboutOverviewSection,
  BenefitsAndProcessSection,
  DigitizeCtaSection,
  IndustriesOverviewSection,
} from "@/widgets/home/business-sections";

import { NationwideReachSection } from "@/widgets/home/nationwide-reach-section";

const WorkflowSection = dynamic(
  () => import("@/widgets/home/workflow-section").then((m) => m.WorkflowSection),
  { loading: () => <div className="min-h-80" aria-hidden="true" /> },
);

export function HomePageContent() {
  return (
    <>
      <HeroSection />
      <IndustriesOverviewSection />
      <AboutOverviewSection />
      <WorkflowSection />
      <NationwideReachSection />
      <BenefitsAndProcessSection />
      <ProofSection />

      <FaqSection />
      <DigitizeCtaSection />
    </>
  );
}
