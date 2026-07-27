import type { Metadata } from "next";
import { MarketingPage, generatePageMetadata } from "@/widgets/page-shell";
import { PricingSection } from "@/widgets/home/pricing-section";

export const metadata: Metadata = generatePageMetadata("pricing");

export default function PricingPage() {
  return (
    <MarketingPage pageKey="pricing" showPlaceholder={false}>
      <PricingSection />
    </MarketingPage>
  );
}
