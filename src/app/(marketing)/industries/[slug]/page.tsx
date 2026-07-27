import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEntry, industries } from "@/entities/marketing";
import { breadcrumbSchema, createMetadata, webPageSchema } from "@/shared/lib/seo";
import { JsonLd } from "@/shared/ui/seo";
import { DetailLanding } from "@/widgets/marketing";

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getEntry(industries, slug);
  if (!industry) return {};

  return createMetadata({
    title: `${industry.title} Management Software`,
    description: industry.description,
    path: `/industries/${industry.slug}`,
    keywords: [...industry.keywords],
  });
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getEntry(industries, slug);
  if (!industry) notFound();

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
            title: `${industry.title} Management Software`,
            description: industry.description,
            path,
          }),
        ]}
      />
      <DetailLanding
        entry={industry}
        path={path}
        categoryLabel="Industries"
        related={industries.filter((item) => item.slug !== industry.slug)}
      />
    </>
  );
}
