import type { Metadata } from "next";
import {
  breadcrumbSchema,
  createMetadata,
  faqSchema,
  productSchema,
  softwareApplicationSchema,
  webPageSchema,
} from "@/shared/lib/seo";
import { JsonLd } from "@/shared/ui/seo";
import { PrintingManagementContent } from "@/widgets/marketing";

export const revalidate = 60;

export const metadata: Metadata = createMetadata({
  title: "Printing Press Management Software – PrintoSync ERP",
  description:
    "Complete printing press management software for modern offset, digital, and packaging printing presses in India. Streamline order booking, prepress, live floor job cards, paper stock, and GST billing.",
  path: "/printing-erp",
  keywords: [
    "printing press management software",
    "printing press ERP software",
    "software for offset printing press",
    "print shop management system",
    "print production scheduling software",
    "printing business management software",
  ],
});

const erpFaqs = [
  {
    question: "What is printing press management software?",
    answer:
      "Printing press management software is an integrated digital solution designed specifically for print businesses to manage customer orders, prepress files, production scheduling, paper inventory, job costing, GST billing, and deliveries through a centralized platform.",
  },
  {
    question: "What is the difference between printing press management software and ERP?",
    answer:
      "While basic printing management software focuses primarily on order tracking and job tickets, a full Printing Press ERP (like PrintoSync) integrates your entire enterprise: linking estimating, shop-floor production, machine speeds, raw material inventory, purchases, accounts, GST e-invoicing, and customer CRM in real time.",
  },
  {
    question: "Can this software manage offset printing operations?",
    answer:
      "Yes, absolutely. PrintoSync is specially engineered for commercial offset printing presses. It handles paper sheet sizing (Full Demy, Crown, Royal, etc.), GSM calculations, plate requirements, multi-color machine operations, post-press finishing steps, and job-wise costing.",
  },
  {
    question: "How does printing management software improve productivity?",
    answer:
      "It eliminates manual job card writing, redundant spreadsheet entries, and shop-floor miscommunication. Production managers can view live machine schedules, prepress teams share verified proofs, and dispatch teams generate challans instantly with one click.",
  },
  {
    question: "Is printing press management software suitable for small businesses?",
    answer:
      "Yes. PrintoSync is designed to scale with your business. Small print shops benefit from rapid quote generation, error-free job ticketing, and organized customer billing, helping them handle higher order volumes with minimal administrative overhead.",
  },
  {
    question: "What should I look for when choosing printing management software?",
    answer:
      "Look for essential print-industry features: end-to-end order tracking, prepress file management, paper GSM/reel inventory control, live machine production scheduling, accurate job costing, GST compliance, and easy-to-use mobile and desktop interfaces.",
  },
];

export default function PrintingErpPage() {
  const jsonLdData: Record<string, unknown>[] = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Printing Press Management Software", path: "/printing-erp" },
    ]),
    softwareApplicationSchema(),
    productSchema({
      name: "PrintoSync Printing Press Management Software",
      description:
        "Comprehensive ERP & management software for offset, packaging, and digital printing presses.",
      path: "/printing-erp",
      category: "Printing Press Management Software",
    }),
    webPageSchema({
      title: "Printing Press Management Software – PrintoSync ERP",
      description:
        "Modern printing press management software for offset, digital, and packaging units in India.",
      path: "/printing-erp",
    }),
    faqSchema(erpFaqs),
  ];

  return (
    <>
      <JsonLd data={jsonLdData} />
      <PrintingManagementContent />
    </>
  );
}
