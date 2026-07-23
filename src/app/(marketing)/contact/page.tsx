import type { Metadata } from "next";
import { MarketingPage, generatePageMetadata } from "@/widgets/page-shell";

export const metadata: Metadata = generatePageMetadata("contact");

export default function ContactPage() {
  return <MarketingPage pageKey="contact" />;
}
