import type { Metadata } from "next";
import { MarketingPage, generatePageMetadata } from "@/widgets/page-shell";

export const metadata: Metadata = generatePageMetadata("services");

export default function ServicesPage() {
  return <MarketingPage pageKey="services" />;
}
