import type { Metadata } from "next";
import { MarketingPage, generatePageMetadata } from "@/widgets/page-shell";
import { ContactForm } from "@/features/contact";

export const metadata: Metadata = generatePageMetadata("contact");

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string }>;
}) {
  const { intent } = await searchParams;
  const formIntent = intent === "quote" ? "quote" : "contact";

  return (
    <MarketingPage pageKey="contact" showPlaceholder={false}>
      <ContactForm intent={formIntent} />
    </MarketingPage>
  );
}
