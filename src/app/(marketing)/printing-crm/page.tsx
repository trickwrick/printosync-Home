import type { Metadata } from "next";
import { MarketingPage, generatePageMetadata } from "@/widgets/page-shell";

export const metadata: Metadata = generatePageMetadata("printingCrm");

export default function PrintingCrmPage() {
  return <MarketingPage pageKey="printingCrm" />;
}
