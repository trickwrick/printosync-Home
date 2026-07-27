import type { Metadata } from "next";
import { MarketingPage, generatePageMetadata } from "@/widgets/page-shell";
import { CaseStudiesContent } from "@/widgets/case-studies";

export const metadata: Metadata = generatePageMetadata("caseStudies");

export default function CaseStudiesPage() {
  return (
    <MarketingPage pageKey="caseStudies" showPlaceholder={false}>
      <CaseStudiesContent />
    </MarketingPage>
  );
}
