import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLiveIndustries, getLiveIndustryBySlug } from "@/shared/lib/models/get-live-industries";
import { breadcrumbSchema, createMetadata, webPageSchema } from "@/shared/lib/seo";
import { JsonLd } from "@/shared/ui/seo";
import { DetailLanding } from "@/widgets/marketing";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = await getLiveIndustryBySlug(slug);
  if (!industry) return {};

  return createMetadata({
    title: industry.seoTitle || `${industry.title} Management Software | PrintoSync`,
    description: industry.seoDescription || industry.description,
    path: `/industries/${industry.slug}`,
    keywords: [...(industry.keywords || [])],
  });
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = await getLiveIndustryBySlug(slug);
  if (!industry) notFound();

  const allIndustries = await getLiveIndustries();
  const path = `/industries/${industry.slug}`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Industries", path: "/#industries" },
            { name: industry.title, path },
          ]),
          webPageSchema({
            title: industry.seoTitle || `${industry.title} Management Software`,
            description: industry.seoDescription || industry.description,
            path,
          }),
        ]}
      />
      <DetailLanding
        entry={industry}
        path={path}
        categoryLabel="Industries"
        related={allIndustries.filter((item) => item.slug !== industry.slug)}
      />
    </>
  );
}
