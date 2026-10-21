import type { Metadata } from "next";
import { createMetadata, faqSchema, softwareApplicationSchema } from "@/shared/lib/seo";
import { getLiveHomeSeo } from "@/shared/lib/seo/get-home-seo";
import { getLiveHomeFaqs } from "@/shared/lib/models/get-live-faqs";
import { JsonLd } from "@/shared/ui/seo";
import { HomePageContent } from "@/widgets/home/home-page-content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getLiveHomeSeo();
  return createMetadata(seo);
}

export default async function HomePage() {
  const faqs = await getLiveHomeFaqs();

  return (
    <>
      <JsonLd data={[softwareApplicationSchema(), faqSchema([...faqs])]} />
      <HomePageContent />
    </>
  );
}
