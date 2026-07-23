export const siteConfig = {
  name: "PrintoSync",
  tagline: "Printing Press Management Software",
  description:
    "Enterprise-grade CRM, ERP, MIS, inventory, and production management software built exclusively for printing presses.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://printosync.com",
  logo: "/logo.png",
  ogImage: "/opengraph-image",
  links: {
    twitter: "https://twitter.com/printosync",
    linkedin: "https://linkedin.com/company/printosync",
    github: "https://github.com/printosync",
  },
  contact: {
    email: "hello@printosync.com",
    phone: "+1 (555) 000-0000",
  },
} as const;

export type SiteConfig = typeof siteConfig;
