import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  breadcrumbSchema,
  createMetadata,
  productSchema,
  softwareApplicationSchema,
  webPageSchema,
  faqSchema,
} from "@/shared/lib/seo";
import { JsonLd } from "@/shared/ui/seo";
import { DetailLanding } from "@/widgets/marketing";
import {
  getLiveModules,
  getLiveModuleBySlug,
} from "@/shared/lib/models/get-live-modules";
import { modules as defaultModules } from "@/entities/marketing/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export function generateStaticParams() {
  return defaultModules.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const moduleEntry = await getLiveModuleBySlug(slug);
  if (!moduleEntry) return {};

  const customTitle = moduleEntry.seoTitle?.trim()
    ? moduleEntry.seoTitle
    : `${moduleEntry.title} for Printing Presses`;

  const customDesc = moduleEntry.seoDescription?.trim()
    ? moduleEntry.seoDescription
    : moduleEntry.description;

  return createMetadata({
    title: customTitle,
    description: customDesc,
    path: `/modules/${moduleEntry.slug}`,
    keywords: [...moduleEntry.keywords],
  });
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const moduleEntry = await getLiveModuleBySlug(slug);
  if (!moduleEntry) notFound();

  const allModules = await getLiveModules();
  const path = `/modules/${moduleEntry.slug}`;
  const related = allModules.filter((item) => item.slug !== moduleEntry.slug);

  const jsonLdData: Record<string, unknown>[] = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Modules", path: "/services" },
      { name: moduleEntry.title, path },
    ]),
    softwareApplicationSchema(),
    productSchema({
      name: `PrintoSync ${moduleEntry.title}`,
      description: moduleEntry.seoDescription || moduleEntry.description,
      path,
      category: "Printing Press Management Software",
    }),
    webPageSchema({
      title: moduleEntry.seoTitle || moduleEntry.title,
      description: moduleEntry.seoDescription || moduleEntry.description,
      path,
    }),
  ];

  if (moduleEntry.faqs && moduleEntry.faqs.length > 0) {
    jsonLdData.push(faqSchema(moduleEntry.faqs));
  }

  return (
    <>
      <JsonLd data={jsonLdData} />
      <DetailLanding
        entry={moduleEntry}
        path={path}
        categoryLabel="Modules"
        related={related}
      />
    </>
  );
}
