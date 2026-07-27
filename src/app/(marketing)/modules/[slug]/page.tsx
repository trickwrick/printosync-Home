import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEntry, modules } from "@/entities/marketing";
import {
  breadcrumbSchema,
  createMetadata,
  productSchema,
  softwareApplicationSchema,
  webPageSchema,
} from "@/shared/lib/seo";
import { JsonLd } from "@/shared/ui/seo";
import { DetailLanding } from "@/widgets/marketing";

export const dynamicParams = false;

export function generateStaticParams() {
  return modules.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const moduleEntry = getEntry(modules, slug);
  if (!moduleEntry) return {};

  return createMetadata({
    title: `${moduleEntry.title} for Printing Presses`,
    description: moduleEntry.description,
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
  const moduleEntry = getEntry(modules, slug);
  if (!moduleEntry) notFound();

  const path = `/modules/${moduleEntry.slug}`;
  const related = modules.filter((item) => item.slug !== moduleEntry.slug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Modules", path: "/services" },
            { name: moduleEntry.title, path },
          ]),
          softwareApplicationSchema(),
          productSchema({
            name: `PrintoSync ${moduleEntry.title}`,
            description: moduleEntry.description,
            path,
            category: "Printing Press Management Software",
          }),
          webPageSchema({
            title: moduleEntry.title,
            description: moduleEntry.description,
            path,
          }),
        ]}
      />
      <DetailLanding
        entry={moduleEntry}
        path={path}
        categoryLabel="Modules"
        related={related}
      />
    </>
  );
}
