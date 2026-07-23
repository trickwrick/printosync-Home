import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BookOpen,
  Box,
  Briefcase,
  Building2,
  Calendar,
  Factory,
  FileText,
  Layers,
  Mail,
  Package,
} from "lucide-react";

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

export const productMegaMenu: MegaMenuSection[] = [
  {
    title: "Platform",
    items: [
      {
        title: "Printing CRM",
        href: "/printing-crm",
        description: "Manage clients, quotes & sales pipelines",
        icon: Briefcase,
      },
      {
        title: "Printing ERP",
        href: "/printing-erp",
        description: "Production, finance & operations unified",
        icon: Package,
      },
      {
        title: "MIS System",
        href: "/services#mis",
        description: "Management information for print shops",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Operations",
    items: [
      {
        title: "Inventory",
        href: "/services#inventory",
        description: "Stock, materials & supply chain",
        icon: Box,
      },
      {
        title: "Production",
        href: "/services#production",
        description: "Job scheduling & shop floor control",
        icon: Factory,
      },
      {
        title: "All Services",
        href: "/services",
        description: "Explore the full PrintoSync suite",
        icon: Layers,
      },
    ],
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
    ],
  },
  {
    title: "Company",
    items: [
      {
        title: "About",
        href: "/about",
        description: "Our mission & team",
        icon: Building2,
      },
      {
        title: "Contact",
        href: "/contact",
        description: "Talk to our sales team",
        icon: Mail,
      },
    ],
  },
];

export const headerNavigation = [
  { title: "Product", mega: productMegaMenu },
  { title: "Pricing", href: "/pricing" },
  { title: "Resources", mega: resourcesMegaMenu },
] as const;

export const ctaNavigation = {
  title: "Book Demo",
  href: "/book-demo",
  icon: Calendar,
} as const;

export const footerNavigation = {
  company: [
    { title: "About Us", href: "/about" },
    { title: "Careers", href: "/about#careers" },
    { title: "Press", href: "/about#press" },
    { title: "Contact", href: "/contact" },
    { title: "Partners", href: "/contact#partners" },
  ],
  solutions: [
    { title: "Printing CRM", href: "/printing-crm" },
    { title: "Printing ERP", href: "/printing-erp" },
    { title: "MIS", href: "/services#mis" },
    { title: "Inventory", href: "/services#inventory" },
    { title: "Production", href: "/services#production" },
    { title: "Pricing", href: "/pricing" },
  ],
  industries: [
    { title: "Commercial Print", href: "/case-studies#commercial" },
    { title: "Packaging", href: "/case-studies#packaging" },
    { title: "Labels & Flexo", href: "/case-studies#labels" },
    { title: "Wide Format", href: "/case-studies#wide-format" },
    { title: "Digital Print", href: "/case-studies#digital" },
  ],
  resources: [
    { title: "Blog", href: "/blog" },
    { title: "Case Studies", href: "/case-studies" },
    { title: "Documentation", href: "/services#docs" },
    { title: "Book Demo", href: "/book-demo" },
    { title: "Support", href: "/contact#support" },
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
  { value: 40, suffix: "%", label: "Efficiency Gain" },
] as const;

/** @deprecated Use headerNavigation */
export const mainNavigation: NavItem[] = [
  { title: "Pricing", href: "/pricing" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];
