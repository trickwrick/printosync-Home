import type { Metadata } from "next";
import { MarketingPage, generatePageMetadata } from "@/widgets/page-shell";
import { AboutPageContent } from "@/widgets/about";

export const metadata: Metadata = generatePageMetadata("about");

export default function AboutPage() {
  return (
    <MarketingPage pageKey="about" showPlaceholder={false}>
      <AboutPageContent />
    </MarketingPage>
  );
}
