import type { PageMetadataOptions } from "./metadata";

export interface PageSeoConfig extends PageMetadataOptions {
  path: string;
  breadcrumb: string;
  h1?: string;
}

export type { PageMetadataOptions } from "./metadata";

export const pageSeo: Record<string, PageSeoConfig> = {
  home: {
    title: undefined,
    h1: "PrintoSync – Smart Printing Press Management Software",
    description:
      "Simplify job cards, production, inventory, challans, invoicing, paper stock, statements, and reports with PrintoSync printing press management software.",
    path: "/",
    keywords: [
      "printosync",
      "printing press management software",
      "printing ERP software",
      "print shop management software",
      "printing business ERP",
      "print production management software",
    ],
    imageAlt: "PrintoSync printing press management dashboard preview",
    breadcrumb: "Home",
  },
  about: {
    title: "About Us",
    h1: "About PrintoSync",
    description:
      "Meet PrintoSync — print shop software built on the shop floor. Our mission, values, and story behind the CRM, ERP, and MIS platform trusted by 500+ printing presses.",
    path: "/about",
    keywords: ["about printosync", "print software company", "printing technology"],
    breadcrumb: "About",
  },
  services: {
    title: "Printing ERP Modules",
    h1: "Everything Your Printing Business Needs",
    description:
      "Explore 19 connected PrintoSync modules for CRM, quotation, job cards, production, inventory, purchasing, GST billing, payments, teams, and reports.",
    path: "/services",
    keywords: [
      "print shop services",
      "MIS printing",
      "print production management",
      "print shop website development",
    ],
    breadcrumb: "Services",
  },
  printingCrm: {
    title: "Printing CRM Software",
    h1: "Printing CRM",
    description:
      "Customer relationship management software for print shops. Manage quotes, proofs, client pipelines, and sales — built specifically for printing businesses.",
    path: "/printing-crm",
    keywords: [
      "printing CRM",
      "print shop CRM software",
      "print sales pipeline",
      "print quoting software",
    ],
    imageAlt: "PrintoSync printing CRM dashboard with client pipeline",
    breadcrumb: "Printing CRM",
  },
  printingErp: {
    title: "Printing ERP Software",
    h1: "Printing ERP",
    description:
      "Enterprise resource planning for print shops. Unify production, inventory, finance, and operations in one intelligent ERP platform.",
    path: "/printing-erp",
    keywords: [
      "printing ERP",
      "print shop ERP software",
      "print production ERP",
      "print manufacturing software",
    ],
    imageAlt: "PrintoSync printing ERP production management interface",
    breadcrumb: "Printing ERP",
  },
  pricing: {
    title: "Pricing Plans",
    h1: "Pricing",
    description:
      "Compare PrintoSync Starter, Professional, and Enterprise plans for printing businesses of every size.",
    path: "/pricing",
    keywords: [
      "print software pricing",
      "print ERP cost",
      "print shop software plans",
    ],
    breadcrumb: "Pricing",
  },
  blog: {
    title: "Blog & Resources",
    h1: "Print Industry Blog",
    description:
      "Expert insights, guides, and industry news for printing press owners. Learn about CRM, ERP, production optimization, and print shop growth.",
    path: "/blog",
    keywords: [
      "printing industry blog",
      "print shop tips",
      "print management guides",
    ],
    breadcrumb: "Blog",
  },
  caseStudies: {
    title: "Case Studies",
    h1: "Customer Case Studies",
    description:
      "See how printing presses transformed operations with PrintoSync. Real results: 40% faster turnaround, 62% less rework, multi-location scaling.",
    path: "/case-studies",
    keywords: [
      "print software case studies",
      "print shop success stories",
      "print ERP results",
    ],
    breadcrumb: "Case Studies",
  },
  contact: {
    title: "Contact Us",
    h1: "Contact PrintoSync",
    description:
      "Contact the PrintoSync team for sales, support, and partnerships. Email hello@printosync.com or schedule a call with our print industry experts.",
    path: "/contact",
    keywords: ["contact printosync", "print software support", "print ERP sales"],
    breadcrumb: "Contact",
  },
  bookDemo: {
    title: "Book a Demo",
    h1: "Book a Personalized Demo",
    description:
      "Schedule a free 30-minute PrintoSync demo. See how our CRM, ERP, and MIS platform fits your printing press workflow.",
    path: "/book-demo",
    keywords: [
      "print software demo",
      "printosync demo",
      "print ERP trial",
    ],
    breadcrumb: "Book Demo",
  },
};

/** @deprecated Use pageSeo */
export const pageMetadata = Object.fromEntries(
  Object.entries(pageSeo).map(([key, val]) => [
    key,
    { title: val.title, description: val.description, path: val.path },
  ]),
);

export function getPageSeo(key: keyof typeof pageSeo): PageSeoConfig {
  return pageSeo[key];
}
