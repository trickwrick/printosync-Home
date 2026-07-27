import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEntry, resources } from "@/entities/marketing";
import { breadcrumbSchema, createMetadata, webPageSchema } from "@/shared/lib/seo";
import { JsonLd } from "@/shared/ui/seo";
import { DetailLanding } from "@/widgets/marketing";

export const dynamicParams = false;

export function generateStaticParams() {
  return resources.map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = getEntry(resources, slug);
  if (!resource) return {};
  return createMetadata({
    title: resource.title,
    description: resource.description,
    path: `/resources/${resource.slug}`,
    keywords: [...resource.keywords],
  });
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getEntry(resources, slug);
  if (!resource) notFound();

  const path = `/resources/${resource.slug}`;
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/blog" },
            { name: resource.title, path },
          ]),
          webPageSchema({
            title: resource.title,
            description: resource.description,
            path,
          }),
        ]}
      />
      <DetailLanding
        entry={resource}
        path={path}
        categoryLabel="Resources"
        related={resources.filter((item) => item.slug !== resource.slug)}
      />
    </>
  );
}
