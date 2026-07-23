import { HeroSection } from "@/widgets/hero";
import { ProblemsSection } from "./problems-section";
import { SolutionsSection } from "./solutions-section";
import { FeaturesSection } from "./features-section";
import { WorkflowSection } from "./workflow-section";
import { IndustriesSection } from "./industries-section";
import { ServicesSection } from "./services-section";
import { DashboardShowcaseSection } from "./dashboard-showcase-section";
import { WhyChooseSection } from "./why-choose-section";
import { TestimonialsSection } from "./testimonials-section";
import { CaseStudiesSection } from "./case-studies-section";
import { PricingSection } from "./pricing-section";
import { FaqSection } from "./faq-section";
import { ContactCtaSection } from "./contact-cta-section";

/** @deprecated Import sections directly from page.tsx (server component) */
export function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemsSection />
      <SolutionsSection />
      <FeaturesSection />
      <WorkflowSection />
      <IndustriesSection />
      <ServicesSection />
      <DashboardShowcaseSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <CaseStudiesSection />
      <PricingSection />
      <FaqSection />
      <ContactCtaSection />
    </>
  );
}
