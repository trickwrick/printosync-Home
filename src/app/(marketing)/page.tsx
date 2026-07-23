import type { Metadata } from "next";
import { createMetadata, getPageSeo, faqSchema, softwareApplicationSchema } from "@/shared/lib/seo";
import { JsonLd } from "@/shared/ui/seo";
import { faqs } from "@/widgets/home/content";
import { HomePageContent } from "@/widgets/home/home-page-content";

export const metadata: Metadata = createMetadata(getPageSeo("home"));

export default function HomePage() {
  return (
    <>
      <JsonLd data={[softwareApplicationSchema(), faqSchema([...faqs])]} />
      <HomePageContent />
    </>
  );
}
