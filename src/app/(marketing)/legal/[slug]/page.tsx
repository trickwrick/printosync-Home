import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEntry, legalPages } from "@/entities/marketing";
import { breadcrumbSchema, createMetadata, webPageSchema } from "@/shared/lib/seo";
import { Container } from "@/shared/ui/container";
import { JsonLd } from "@/shared/ui/seo";
import { PageHeroBanner } from "@/widgets/page-shell/page-hero-banner";

export const dynamicParams = false;

export function generateStaticParams() {
  return legalPages.map((page) => ({ slug: page.slug }));
}

const legalContent: Record<string, { heading: string; body: string }[]> = {
  "privacy-policy": [
    {
      heading: "Information we collect",
      body: "We may collect contact, account, usage, and support information that you provide when evaluating or using PrintoSync.",
    },
    {
      heading: "How information is used",
      body: "Information is used to provide services, respond to enquiries, improve product experience, maintain security, and meet legal obligations.",
    },
    {
      heading: "Your choices",
      body: "You may request access, correction, or deletion of eligible personal information by contacting the PrintoSync team.",
    },
  ],
  "terms-conditions": [
    {
      heading: "Use of services",
      body: "Users must access PrintoSync lawfully, protect their credentials, and use the platform only for authorized business purposes.",
    },
    {
      heading: "Subscriptions and availability",
      body: "Plan scope, fees, implementation, support, and service commitments are defined in the applicable proposal or agreement.",
    },
    {
      heading: "Intellectual property",
      body: "PrintoSync and its product materials remain protected intellectual property; customers retain ownership of their business data.",
    },
  ],
  "refund-policy": [
    {
      heading: "Subscription review",
      body: "Refund eligibility depends on the signed proposal, billing period, implementation work completed, and applicable service agreement.",
    },
    {
      heading: "Cancellation requests",
      body: "Cancellation requests should be submitted to the billing or support contact listed in your agreement before the next renewal date.",
    },
    {
      heading: "Approved refunds",
      body: "Where a refund is approved, processing timelines and the original payment method may vary by provider and jurisdiction.",
    },
  ],
  "cookie-policy": [
    {
      heading: "Essential cookies",
      body: "Essential cookies may be used to maintain security, preferences, sessions, and core website functionality.",
    },
    {
      heading: "Analytics",
      body: "Analytics may be used to understand aggregate website usage and improve content and product experience.",
    },
    {
      heading: "Managing cookies",
      body: "You can manage non-essential cookies using browser controls; disabling essential storage may affect functionality.",
    },
  ],
  "data-security": [
    {
      heading: "Access protection",
      body: "PrintoSync supports role-based access so organizations can limit modules and information according to user responsibilities.",
    },
    {
      heading: "Data safeguards",
      body: "Security practices include encrypted transport, controlled infrastructure access, monitoring, backups, and operational review.",
    },
    {
      heading: "Shared responsibility",
      body: "Customers should maintain strong credentials, appropriate permissions, secure devices, and timely offboarding processes.",
    },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getEntry(legalPages, slug);
  if (!page) return {};
  return createMetadata({
    title: page.title,
    description: page.description,
    path: `/legal/${page.slug}`,
    keywords: [...page.keywords],
  });
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getEntry(legalPages, slug);
  if (!page) notFound();

  const path = `/legal/${page.slug}`;
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Legal", path: "/sitemap-page" },
            { name: page.title, path },
          ]),
          webPageSchema({
            title: page.title,
            description: page.description,
            path,
          }),
        ]}
      />
      <article>
        <PageHeroBanner title={page.title} breadcrumbLabel="Legal" />
        <section className="py-16 lg:py-20">
          <Container>
            <div className="mx-auto max-w-3xl">
              <p className="text-base leading-8 text-muted-foreground">
                {page.description}
              </p>
              <p className="mt-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Last reviewed July 2026
              </p>
              <div className="mt-10 space-y-8">
                {legalContent[page.slug].map((section) => (
                  <section key={section.heading}>
                    <h2 className="font-display text-xl font-bold text-foreground">
                      {section.heading}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {section.body}
                    </p>
                  </section>
                ))}
              </div>
              <div className="mt-12 rounded-2xl border border-border bg-surface p-6">
                <h2 className="font-display text-lg font-bold text-foreground">
                  Questions about this policy?
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Contact PrintoSync for clarification about these terms or practices.
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex text-sm font-semibold text-brand"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </article>
    </>
  );
}
