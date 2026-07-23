import type { Metadata } from "next";
import { createMetadata, getPageSeo, faqSchema, softwareApplicationSchema } from "@/shared/lib/seo";
import { JsonLd } from "@/shared/ui/seo";
import { faqs } from "@/widgets/home/content";
import { HeroSection } from "@/widgets/hero";
import { PlatformSection } from "@/widgets/home/platform-section";
import { WorkflowSection } from "@/widgets/home/workflow-section";
import { DashboardShowcaseSection } from "@/widgets/home/dashboard-showcase-section";
import { ProofSection } from "@/widgets/home/proof-section";
import { PricingSection } from "@/widgets/home/pricing-section";
import { FaqSection } from "@/widgets/home/faq-section";
import { ContactCtaSection } from "@/widgets/home/contact-cta-section";

export const metadata: Metadata = createMetadata(getPageSeo("home"));

export default function HomePage() {
  return (
    <>
      <JsonLd data={[softwareApplicationSchema(), faqSchema([...faqs])]} />
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
