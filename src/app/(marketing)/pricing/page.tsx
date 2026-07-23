import type { Metadata } from "next";
import { MarketingPage, generatePageMetadata } from "@/widgets/page-shell";

export const metadata: Metadata = generatePageMetadata("pricing");

export default function PricingPage() {
  return <MarketingPage pageKey="pricing" />;
}
