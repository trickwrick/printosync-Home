import type { Metadata } from "next";
import { MarketingPage, generatePageMetadata } from "@/widgets/page-shell";

export const metadata: Metadata = generatePageMetadata("about");

export default function AboutPage() {
  return <MarketingPage pageKey="about" />;
}
