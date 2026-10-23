export const siteConfig = {
  name: "PrintoSync",
  tagline: "Printing Press Management Software",
  description:
    "Smart printing press management software for job cards, production, inventory, GST billing, payments, and business reports.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://printosync.com",
  logo: "/logo.png",
  ogImage: "/opengraph-image",
  links: {
    facebook: "https://www.facebook.com/printosync",
    instagram: "https://www.instagram.com/printosync",
    youtube: "https://www.youtube.com/@printosync",
    linkedin: "https://linkedin.com/company/printosync",
  },
  contact: {
    email: "hello@printosync.com",
    phone: "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
