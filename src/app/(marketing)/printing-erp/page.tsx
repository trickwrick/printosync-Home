import type { Metadata } from "next";
import { MarketingPage, generatePageMetadata } from "@/widgets/page-shell";

export const metadata: Metadata = generatePageMetadata("printingErp");

export default function PrintingErpPage() {
  return <MarketingPage pageKey="printingErp" />;
}
