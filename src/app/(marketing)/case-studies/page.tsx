import type { Metadata } from "next";
import { MarketingPage, generatePageMetadata } from "@/widgets/page-shell";

export const metadata: Metadata = generatePageMetadata("caseStudies");

export default function CaseStudiesPage() {
  return <MarketingPage pageKey="caseStudies" />;
}
