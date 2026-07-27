import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { companyPages, getEntry } from "@/entities/marketing";
import { breadcrumbSchema, createMetadata, webPageSchema } from "@/shared/lib/seo";
import { JsonLd } from "@/shared/ui/seo";
import { DetailLanding } from "@/widgets/marketing";

export const dynamicParams = false;

export function generateStaticParams() {
  return companyPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getEntry(companyPages, slug);
  if (!page) return {};
  return createMetadata({
    title: page.title,
    description: page.description,
    path: `/company/${page.slug}`,
    keywords: [...page.keywords],
  });
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getEntry(companyPages, slug);
  if (!page) notFound();

  const path = `/company/${page.slug}`;
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: page.title, path },
          ]),
          webPageSchema({
            title: page.title,
            description: page.description,
            path,
          }),
        ]}
      />
      <DetailLanding
        entry={page}
        path={path}
        categoryLabel="Company"
        related={companyPages.filter((item) => item.slug !== page.slug)}
      />
    </>
  );
}
