export const APP_NAME = "PrintoSync";

export const ROUTES = {
  home: "/",
  about: "/about",
  services: "/services",
  printingCrm: "/printing-crm",
  printingErp: "/printing-erp",
  pricing: "/pricing",
  blog: "/blog",
  caseStudies: "/case-studies",
  contact: "/contact",
  bookDemo: "/book-demo",
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const CONTAINER_SIZES = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1400px",
  full: "100%",
} as const;

export const SERVICES = [
  "CRM",
  "ERP",
  "MIS",
  "Inventory",
  "Production",
  "Website Development",
  "SEO Services",
] as const;

export type Service = (typeof SERVICES)[number];
