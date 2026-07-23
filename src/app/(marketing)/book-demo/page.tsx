import type { Metadata } from "next";
import { MarketingPage, generatePageMetadata } from "@/widgets/page-shell";

export const metadata: Metadata = generatePageMetadata("bookDemo");

export default function BookDemoPage() {
  return <MarketingPage pageKey="bookDemo" />;
}
