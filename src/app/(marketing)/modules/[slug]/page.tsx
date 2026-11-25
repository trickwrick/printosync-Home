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
import { DetailLanding, PrintingBillingContent } from "@/widgets/marketing";
import {
  getLiveModules,
  getLiveModuleBySlug,
} from "@/shared/lib/models/get-live-modules";
import { modules as defaultModules } from "@/entities/marketing/content";

export const revalidate = 60;

export function generateStaticParams() {
  return defaultModules.map((m) => ({ slug: m.slug }));
}

const billingDefaultFaqs = [
  {
    question: "What is printing press billing software?",
    answer:
      "It is a digital solution that helps printing businesses generate invoices, manage customer payments, calculate printing charges, maintain transaction records, and organize daily billing activities.",
  },
  {
    question: "Can I generate GST invoices for printing orders?",
    answer:
      "Yes, depending on the software's capabilities, you can generate invoices with applicable GST rates, tax calculations, and customer billing details.",
  },
  {
    question: "Can I track pending customer payments?",
    answer:
      "Yes. Payment management features can help you record received payments, monitor outstanding balances, and identify invoices that require follow-up.",
  },
  {
    question: "Is billing software suitable for small printing shops?",
    answer:
      "Yes. Small printing businesses can use billing solutions to simplify invoice generation, manage customer transactions, track payments, and reduce manual paperwork.",
  },
  {
    question: "Can I manage different printing products through one billing system?",
    answer:
      "Yes. You can organize billing for different products and services, including business cards, brochures, flyers, banners, books, packaging, and customized printing orders.",
  },
  {
    question: "How does billing software help improve printing business operations?",
    answer:
      "It simplifies invoicing, reduces repetitive calculations, organizes financial records, improves payment tracking, and provides better visibility into daily business transactions.",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const moduleEntry = await getLiveModuleBySlug(slug);
  if (!moduleEntry) return {};

  const isBilling = slug === "billing-software-for-printing-press";

  const customTitle = moduleEntry.seoTitle?.trim()
    ? moduleEntry.seoTitle
    : isBilling
    ? "Printing Press Billing Software – GST Invoicing & Costing | PrintoSync"
    : `${moduleEntry.title} for Printing Presses`;

  const customDesc = moduleEntry.seoDescription?.trim()
    ? moduleEntry.seoDescription
    : isBilling
    ? "Professional printing press billing software for offset, digital, and packaging print shops. Simplify GST invoicing, job costing, quotations, and payment tracking."
    : moduleEntry.description;

  const extraKeywords = isBilling
    ? [
        "printing press billing software",
        "billing software for printing press",
        "print shop billing software",
        "gst invoice software for printing press",
        "offset printing billing software",
        "print quotation to invoice",
      ]
    : [];

  return createMetadata({
    title: customTitle,
    description: customDesc,
    path: `/modules/${moduleEntry.slug}`,
    keywords: [...moduleEntry.keywords, ...extraKeywords],
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
  const isBilling = slug === "billing-software-for-printing-press";

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

  const activeFaqs =
    moduleEntry.faqs && moduleEntry.faqs.length > 0
      ? moduleEntry.faqs
      : isBilling
      ? billingDefaultFaqs
      : [];

  if (activeFaqs.length > 0) {
    jsonLdData.push(faqSchema(activeFaqs));
  }

  return (
    <>
      <JsonLd data={jsonLdData} />
      {isBilling ? (
        <PrintingBillingContent />
      ) : (
        <DetailLanding
          entry={moduleEntry}
          path={path}
          categoryLabel="Modules"
          related={related}
        />
      )}
    </>
  );
}
