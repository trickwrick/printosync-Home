import type { Metadata } from "next";
import { createMetadata, faqSchema, softwareApplicationSchema } from "@/shared/lib/seo";
import { getLiveHomeSeo } from "@/shared/lib/seo/get-home-seo";
import { JsonLd } from "@/shared/ui/seo";
import { faqs } from "@/widgets/home/content";
import { HomePageContent } from "@/widgets/home/home-page-content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getLiveHomeSeo();
  return createMetadata(seo);
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={[softwareApplicationSchema(), faqSchema([...faqs])]} />
      <HomePageContent />
    </>
  );
}
