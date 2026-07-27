import type { Metadata } from "next";
import Link from "next/link";
import {
  companyPages,
  industries,
  legalPages,
  modules,
  resources,
} from "@/entities/marketing";
import { createMetadata } from "@/shared/lib/seo";
import { Container } from "@/shared/ui/container";
import { PageHeroBanner } from "@/widgets/page-shell/page-hero-banner";

export const metadata: Metadata = createMetadata({
  title: "Website Sitemap",
  description: "Browse every important page on the PrintoSync website.",
  path: "/sitemap-page",
});

const primaryLinks = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Pricing", "/pricing"],
  ["Blog", "/blog"],
  ["Case Studies", "/case-studies"],
  ["Contact", "/contact"],
  ["Book Demo", "/book-demo"],
  ["Support", "/support"],
  ["Sales Enquiry", "/sales-enquiry"],
] as const;

export default function SitemapPage() {
  const groups = [
    { title: "Main Pages", links: primaryLinks.map(([title, href]) => ({ title, href })) },
    {
      title: "Modules",
      links: modules.map((item) => ({
        title: item.shortTitle ?? item.title,
        href: `/modules/${item.slug}`,
      })),
    },
    {
      title: "Industries",
      links: industries.map((item) => ({
        title: item.title,
        href: `/industries/${item.slug}`,
      })),
    },
    {
      title: "Resources",
      links: resources.map((item) => ({
        title: item.title,
        href: `/resources/${item.slug}`,
      })),
    },
    {
      title: "Company",
      links: companyPages.map((item) => ({
        title: item.title,
        href: `/company/${item.slug}`,
      })),
    },
    {
      title: "Legal",
      links: legalPages.map((item) => ({
        title: item.title,
        href: `/legal/${item.slug}`,
      })),
    },
  ];

  return (
    <>
      <PageHeroBanner title="Website Sitemap" breadcrumbLabel="Sitemap" />
      <section className="py-16 lg:py-20">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
              <nav
                key={group.title}
                aria-label={group.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <h2 className="font-display text-lg font-bold text-foreground">
                  {group.title}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-brand"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
