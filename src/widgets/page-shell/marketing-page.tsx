import type { Metadata } from "next";
import {
  breadcrumbSchema,
  createMetadata,
  getPageSeo,
  productSchema,
  softwareApplicationSchema,
  webPageSchema,
  blogSchema,
} from "@/shared/lib/seo";
import { pageSeo, type PageSeoConfig } from "@/shared/lib/seo/pages";
import { JsonLd } from "@/shared/ui/seo";
import { Container } from "@/shared/ui/container";
import { Text } from "@/shared/ui/typography";
import { cn } from "@/shared/lib/cn";
import { PageHeroBanner } from "./page-hero-banner";

type PageSeoKey = keyof typeof pageSeo;

export function generatePageMetadata(key: PageSeoKey): Metadata {
  const seo = getPageSeo(key);
  return createMetadata(seo);
}

function buildSchemas(key: PageSeoKey, seo: PageSeoConfig) {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: seo.breadcrumb, path: seo.path },
  ]);

  const webPage = webPageSchema({
    title: seo.title ?? seo.breadcrumb,
    description: seo.description ?? "",
    path: seo.path,
  });

  const schemas: Record<string, unknown>[] = [breadcrumbs, webPage];

  if (key === "printingCrm") {
    schemas.push(
      softwareApplicationSchema(),
      productSchema({
        name: "PrintoSync Printing CRM",
        description: seo.description ?? "",
        path: seo.path,
        category: "Customer Relationship Management Software",
      }),
    );
  }

  if (key === "printingErp") {
    schemas.push(
      softwareApplicationSchema(),
      productSchema({
        name: "PrintoSync Printing ERP",
        description: seo.description ?? "",
        path: seo.path,
        category: "Enterprise Resource Planning Software",
      }),
    );
  }

  if (key === "pricing") {
    schemas.push(
      productSchema({
        name: "PrintoSync Platform",
        description: seo.description ?? "",
        path: seo.path,
      }),
    );
  }

  if (key === "blog") {
    schemas.push(
      blogSchema({
        name: seo.title,
        description: seo.description,
        path: seo.path,
      }),
    );
  }

  return schemas;
}

interface MarketingPageProps {
  pageKey: PageSeoKey;
  children?: React.ReactNode;
  showPlaceholder?: boolean;
}

export function MarketingPage({
  pageKey,
  children,
  showPlaceholder = !children,
}: MarketingPageProps) {
  const seo = getPageSeo(pageKey);
  const schemas = buildSchemas(pageKey, seo);
  const heroTitle = seo.title ?? seo.breadcrumb;

  return (
    <>
      <JsonLd data={schemas} />
      <article itemScope itemType="https://schema.org/WebPage">
        <PageHeroBanner
          title={heroTitle}
          breadcrumbLabel={seo.breadcrumb}
        />

        <div className={cn(showPlaceholder && "pb-8")}>
          {children ??
            (showPlaceholder && (
              <Container className="pb-16">
                <section
                  aria-label="Page content"
                  className="rounded-xl border border-dashed border-border bg-muted/30 p-12 text-center"
                >
                  <Text variant="muted" className="text-muted-foreground">
                    Content for this page is coming soon.
                  </Text>
                </section>
              </Container>
            ))}
        </div>

      </article>
    </>
  );
}
