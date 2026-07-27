import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BookOpen,
  Building2,
  Calendar,
  CircleHelp,
  Download,
  Factory,
  FileText,
  Handshake,
  Home,
  Layers,
  Mail,
  Newspaper,
  ShieldCheck,
  Users,
  Video,
} from "lucide-react";
import { companyPages, industries, modules, resources } from "@/entities/marketing";

export interface NavItem {
  title: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
  children?: NavItem[];
}

export interface MegaMenuSection {
  title: string;
  items: NavItem[];
}

export const homeMegaMenu: MegaMenuSection[] = [
  {
    title: "Explore PrintoSync",
    items: [
      {
        title: "Overview",
        href: "/#overview",
        description: "What PrintoSync does",
        icon: Home,
      },
      {
        title: "Customer Success",
        href: "/#customer-success",
        description: "Results from modern print shops",
        icon: Users,
      },
      {
        title: "FAQs",
        href: "/#faq",
        description: "Common product questions",
        icon: CircleHelp,
      },
    ],
  },
];

export const whyChooseMegaMenu: MegaMenuSection[] = [
  {
    title: "Why PrintoSync",
    items: [
      {
        title: "About",
        href: "/about",
        description: "Our story and print-industry focus",
        icon: Building2,
      },
      {
        title: "Security",
        href: "/legal/data-security",
        description: "How we protect business information",
        icon: ShieldCheck,
      },
      {
        title: "Testimonials",
        href: "/#customer-success",
        description: "Hear from modern print shops",
        icon: Users,
      },
    ],
  },
];

export const productMegaMenu: MegaMenuSection[] = [
  {
    title: "Sales & Customers",
    items: modules.slice(0, 5).map((module) => ({
      title: module.shortTitle ?? module.title,
      href: `/modules/${module.slug}`,
      description: module.eyebrow,
      icon: Layers,
    })),
  },
  {
    title: "Production",
    items: modules.slice(5, 10).map((module) => ({
      title: module.shortTitle ?? module.title,
      href: `/modules/${module.slug}`,
      description: module.eyebrow,
      icon: Factory,
    })),
  },
  {
    title: "Finance & Supply",
    items: modules.slice(10, 15).map((module) => ({
      title: module.shortTitle ?? module.title,
      href: `/modules/${module.slug}`,
      description: module.eyebrow,
      icon: FileText,
    })),
  },
  {
    title: "People & Insights",
    items: [
      ...modules.slice(15).map((module) => ({
        title: module.shortTitle ?? module.title,
        href: `/modules/${module.slug}`,
        description: module.eyebrow,
        icon: BarChart3,
      })),
      {
        title: "View All Modules",
        href: "/services",
        description: "Explore the complete PrintoSync platform",
        icon: Layers,
      },
    ],
  },
];

export const industriesMegaMenu: MegaMenuSection[] = [
  {
    title: "Print Segments",
    items: industries.slice(0, 5).map((industry) => ({
      title: industry.title,
      href: `/industries/${industry.slug}`,
      description: industry.eyebrow,
      icon: Factory,
    })),
  },
  {
    title: "Specialized Printing",
    items: industries.slice(5).map((industry) => ({
      title: industry.title,
      href: `/industries/${industry.slug}`,
      description: industry.eyebrow,
      icon: Factory,
    })),
  },
];

export const resourcesMegaMenu: MegaMenuSection[] = [
  {
    title: "Learn",
    items: [
      {
        title: "Blog",
        href: "/blog",
        description: "Industry insights & product updates",
        icon: BookOpen,
      },
      {
        title: "Case Studies",
        href: "/case-studies",
        description: "Real results from print shops",
        icon: FileText,
      },
      ...resources.slice(0, 3).map((resource) => ({
        title: resource.title,
        href: `/resources/${resource.slug}`,
        description: resource.eyebrow,
        icon:
          resource.slug === "video-tutorials"
            ? Video
            : resource.slug === "help-center"
              ? CircleHelp
              : BookOpen,
      })),
    ],
  },
  {
    title: "Updates & Downloads",
    items: resources.slice(3).map((resource) => ({
      title: resource.title,
      href: `/resources/${resource.slug}`,
      description: resource.eyebrow,
      icon:
        resource.slug === "downloads"
          ? Download
          : resource.slug === "release-notes"
            ? Newspaper
            : CircleHelp,
    })),
  },
];

export const companyMegaMenu: MegaMenuSection[] = [
  {
    title: "About",
    items: [
      {
        title: "About PrintoSync",
        href: "/about",
        description: "Our story and values",
        icon: Building2,
      },
      ...companyPages.slice(0, 3).map((page) => ({
        title: page.title,
        href: `/company/${page.slug}`,
        description: page.eyebrow,
        icon: page.slug === "our-team" ? Users : Building2,
      })),
    ],
  },
  {
    title: "Connect",
    items: [
      ...companyPages.slice(3).map((page) => ({
        title: page.title,
        href: `/company/${page.slug}`,
        description: page.eyebrow,
        icon: page.slug === "partners" ? Handshake : Users,
      })),
      {
        title: "Contact Us",
        href: "/contact",
        description: "Sales, support, and partnerships",
        icon: Mail,
      },
      {
        title: "Data Security",
        href: "/legal/data-security",
        description: "How we protect your information",
        icon: ShieldCheck,
      },
    ],
  },
];

export const headerNavigation = [
  { title: "Who we help", mega: industriesMegaMenu },
  { title: "Why choose us", mega: whyChooseMegaMenu },
  { title: "Modules", mega: productMegaMenu },
  { title: "Pricing", href: "/pricing" },
] as const;

export const ctaNavigation = {
  title: "Book Free Demo",
  href: "/book-demo",
  icon: Calendar,
} as const;

export const footerNavigation = {
  company: [
    { title: "About Us", href: "/about" },
    { title: "Our Mission", href: "/company/our-mission" },
    { title: "Why PrintoSync", href: "/company/why-printosync" },
    { title: "Careers", href: "/company/careers" },
    { title: "Partners", href: "/company/partners" },
    { title: "Contact", href: "/contact" },
  ],
  solutions: [
    { title: "CRM", href: "/modules/crm" },
    { title: "Job Cards", href: "/modules/job-card-management" },
    { title: "Production", href: "/modules/production-management" },
    { title: "Inventory", href: "/modules/inventory-management" },
    { title: "GST Billing", href: "/modules/gst-billing-invoicing" },
    { title: "All Modules", href: "/services" },
    { title: "Pricing", href: "/pricing" },
  ],
  industries: [
    { title: "Offset Printing", href: "/industries/offset-printing-press" },
    { title: "Digital Printing", href: "/industries/digital-printing" },
    { title: "Packaging", href: "/industries/packaging-printing" },
    { title: "Label Printing", href: "/industries/label-printing" },
    { title: "Commercial Print", href: "/industries/commercial-printing" },
    { title: "All Industries", href: "/#industries" },
  ],
  resources: [
    { title: "Blog", href: "/blog" },
    { title: "Case Studies", href: "/case-studies" },
    { title: "Help Center", href: "/resources/help-center" },
    { title: "Knowledge Base", href: "/resources/knowledge-base" },
    { title: "FAQs", href: "/resources/faqs" },
    { title: "Book Demo", href: "/book-demo" },
    { title: "Support", href: "/support" },
  ],
} as const;

export const clientLogos = [
  "Apex Print Co.",
  "ColorCraft",
  "MetroPress",
  "PackPro",
  "SwiftLabel",
  "Vertex Graphics",
] as const;

export const heroStats = [
  { value: 500, suffix: "+", label: "Print Shops" },
  { value: 2, suffix: "M+", label: "Jobs Processed" },
  { value: 99.9, suffix: "%", label: "Uptime SLA" },
  { value: 100, suffix: "%", label: "Accuracy" },
] as const;

/** @deprecated Use headerNavigation */
export const mainNavigation: NavItem[] = [
  { title: "Pricing", href: "/pricing" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];
