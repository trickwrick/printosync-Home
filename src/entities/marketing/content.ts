export interface MarketingEntry {
  slug: string;
  title: string;
  shortTitle?: string;
  description: string;
  eyebrow: string;
  features: readonly string[];
  benefits: readonly string[];
  keywords: readonly string[];
}

export const modules: readonly MarketingEntry[] = [
  {
    slug: "billing-software-for-printing-press",
    title: "Billing Software for Printing Press",
    shortTitle: "Billing Software",
    eyebrow: "GST billing & invoicing for print shops",
    description:
      "Automate print orders, GST billing, multi-rate tax calculations, payment tracking, and ledger reconciliation built specifically for commercial printing presses.",
    features: [
      "GST-compliant print invoices",
      "HSN/SAC code automation",
      "Client ledgers & payment tracking",
      "Direct WhatsApp & email invoices",
    ],
    benefits: [
      "Zero billing errors",
      "Faster payment collections",
      "Simplified tax and audit filing",
    ],
    keywords: [
      "billing software for printing press",
      "printing press billing software",
      "print shop gst invoicing software",
    ],
  },
  {
    slug: "invoice-software-for-printing-press",
    title: "Invoice Software for Printing Press",
    shortTitle: "Invoice Software",
    eyebrow: "Professional customized print invoices",
    description:
      "Generate customizable, itemized print invoices with paper specifications, finishing charges, custom terms, delivery details, and QR payment links.",
    features: [
      "Custom invoice templates",
      "Auto-fill from job cards & orders",
      "UPI & payment QR codes",
      "Multi-currency & discount handling",
    ],
    benefits: [
      "Professional brand presentation",
      "Instant invoice generation",
      "Seamless digital payments",
    ],
    keywords: [
      "invoice software for printing press",
      "printing press invoice generator",
      "commercial print invoicing software",
    ],
  },
  {
    slug: "job-card-software-for-printing-press",
    title: "Job Card Software for Printing Press",
    shortTitle: "Job Card Software",
    eyebrow: "Shop floor job ticket & production cards",
    description:
      "Create clear, comprehensive digital job cards containing paper specs, cut sizes, plate details, printing colors, finishing steps, and delivery timelines.",
    features: [
      "Digital shop-floor job tickets",
      "Machine & operator assignment",
      "Finishing & binding checklist",
      "Live barcode / QR job tracking",
    ],
    benefits: [
      "Eliminate shop floor communication gaps",
      "Drastically cut print re-work and waste",
      "Ensure 100% on-time order dispatch",
    ],
    keywords: [
      "job card software for printing press",
      "print job ticket software",
      "printing press job card management",
    ],
  },
  {
    slug: "estimating-software-for-printing-companies",
    title: "Estimating Software for Printing Companies",
    shortTitle: "Estimating Software",
    eyebrow: "Accurate cost & margin estimation",
    description:
      "Instant, foolproof cost estimation engine calculating paper weight, plate count, machine run-time, ink coverage, post-press labor, and healthy profit margins.",
    features: [
      "Dynamic paper & GSM calculators",
      "Multi-process machine rate estimation",
      "Prepress & post-press finishing pricing",
      "Instant PDF quotation generator",
    ],
    benefits: [
      "Quote clients in seconds, not hours",
      "Protect your profit margins accurately",
      "Win more competitive print bids",
    ],
    keywords: [
      "estimating software for printing companies",
      "print estimating software",
      "printing press quotation and cost estimation",
    ],
  },
  {
    slug: "challan-software-for-printing-press",
    title: "Challan Software for Printing Press",
    shortTitle: "Challan Software",
    eyebrow: "Delivery challan & dispatch management",
    description:
      "Create delivery challans, gate passes, partial shipment tracking, and proof-of-delivery receipts linked seamlessly to job cards and invoices.",
    features: [
      "Delivery challans with vehicle & driver details",
      "Partial and split shipment handling",
      "Gate pass & returnable challan tracking",
      "One-click conversion to final GST invoice",
    ],
    benefits: [
      "100% dispatch and delivery accountability",
      "Never miss billing for dispatched quantities",
      "Smooth proof-of-delivery verification",
    ],
    keywords: [
      "challan software for printing press",
      "delivery challan software printing",
      "print dispatch and gate pass management",
    ],
  },
  {
    slug: "stock-inventory-management-software-for-printing-press",
    title: "Stock & Inventory Management Software for Printing Press",
    shortTitle: "Stock Inventory",
    eyebrow: "Paper, ink & raw material tracking",
    description:
      "Complete inventory control software for paper reams, reels, plates, inks, varnishes, and packaging with real-time consumption and low-stock alerts.",
    features: [
      "Ream, sheet & reel tracking with GSM/size",
      "Auto stock deduction on job card issue",
      "Low-stock reorder alerts",
      "Wastage and scrap analytics",
    ],
    benefits: [
      "Prevent costly stock-outs and production stops",
      "Stop material leakage and paper wastage",
      "Accurate procurement and supplier reordering",
    ],
    keywords: [
      "stock inventory management software for printing press",
      "paper inventory software printing press",
      "raw material stock management print shop",
    ],
  },
] as const;

export const industries: readonly MarketingEntry[] = [
  ["offset-printing-press", "Offset Printing Press", "Plan plates, paper, machines, finishing, and costs for complex offset jobs."],
  ["digital-printing", "Digital Printing", "Handle fast-turnaround, short-run, and variable digital print orders efficiently."],
  ["packaging-printing", "Packaging Printing", "Control multi-stage packaging jobs, materials, quality, and delivery schedules."],
  ["label-printing", "Label Printing", "Manage repeat label orders, substrates, dies, finishing, and batch production."],
  ["commercial-printing", "Commercial Printing", "Unify quotations, job cards, production, billing, and customer service."],
  ["book-magazine-printing", "Book & Magazine Printing", "Coordinate signatures, paper, binding, quantities, and long production runs."],
  ["newspaper-printing", "Newspaper Printing", "Schedule time-sensitive editions, materials, machines, and dispatch routes."],
  ["screen-printing", "Screen Printing", "Track screens, inks, colors, processes, and repeat production requirements."],
  ["flex-signage-printing", "Flex & Signage Printing", "Manage dimensions, media, finishing, installation, and field delivery."],
  ["corrugated-box-manufacturing", "Corrugated Box Manufacturing", "Control board stock, conversion stages, costing, quality, and dispatch."],
].map(([slug, title, description]) => ({
  slug,
  title,
  eyebrow: "Industry solution",
  description,
  features: ["Industry-ready workflow", "Accurate job costing", "Live production tracking", "Connected inventory"],
  benefits: ["Faster turnaround", "Lower waste", "Better margins"],
  keywords: [`${title.toLowerCase()} software`, `${title.toLowerCase()} ERP`],
}));

export const resources: readonly MarketingEntry[] = [
  {
    slug: "help-center",
    title: "Help Center",
    eyebrow: "Product assistance",
    description: "Find clear guidance for setting up and using PrintoSync in daily operations.",
    features: ["Getting started", "Account setup", "Workflow guidance", "Troubleshooting"],
    benefits: ["Faster answers", "Confident teams", "Less downtime"],
    keywords: ["PrintoSync help", "printing ERP support"],
  },
  {
    slug: "knowledge-base",
    title: "Knowledge Base",
    eyebrow: "Practical documentation",
    description: "Explore practical guides for quotations, job cards, production, stock, billing, and reports.",
    features: ["Module guides", "Best practices", "Process checklists", "Admin guidance"],
    benefits: ["Self-service learning", "Consistent processes", "Faster onboarding"],
    keywords: ["PrintoSync documentation", "printing ERP guide"],
  },
  {
    slug: "video-tutorials",
    title: "Video Tutorials",
    eyebrow: "Learn visually",
    description: "Follow focused walkthroughs for common PrintoSync workflows and configuration tasks.",
    features: ["Quick starts", "Module walkthroughs", "Admin tutorials", "Workflow examples"],
    benefits: ["Easy learning", "Team enablement", "On-demand training"],
    keywords: ["PrintoSync tutorials", "printing software training"],
  },
  {
    slug: "faqs",
    title: "Frequently Asked Questions",
    eyebrow: "Common questions",
    description: "Get answers about setup, security, migration, pricing, support, and everyday usage.",
    features: ["Setup", "Migration", "Security", "Billing"],
    benefits: ["Clear expectations", "Faster evaluation", "Easy adoption"],
    keywords: ["PrintoSync FAQ", "printing ERP questions"],
  },
  {
    slug: "release-notes",
    title: "Release Notes",
    eyebrow: "Product updates",
    description: "Track improvements, new capabilities, and important changes across PrintoSync.",
    features: ["New features", "Improvements", "Fixes", "Product notices"],
    benefits: ["Stay informed", "Use new tools", "Plan updates"],
    keywords: ["PrintoSync updates", "PrintoSync release notes"],
  },
  {
    slug: "downloads",
    title: "Downloads",
    eyebrow: "Useful resources",
    description: "Access checklists, implementation guides, and print operations resources from PrintoSync.",
    features: ["ERP checklist", "Workflow guide", "Migration planner", "Product overview"],
    benefits: ["Plan confidently", "Align teams", "Evaluate faster"],
    keywords: ["printing ERP guide download", "print workflow checklist"],
  },
] as const;

export const companyPages: readonly MarketingEntry[] = [
  ["company", "Company", "Learn how PrintoSync helps printing businesses replace disconnected tools with one operational platform."],
  ["our-mission", "Our Mission", "Our mission is to make printing businesses more productive, visible, accurate, and ready to grow."],
  ["why-printosync", "Why Choose PrintoSync", "Discover why print businesses choose an industry-specific, connected, and easy-to-use ERP."],
  ["our-team", "Our Team", "Meet the product, implementation, and support mindset behind PrintoSync."],
  ["careers", "Careers", "Help us build practical technology for the global printing industry."],
  ["partners", "Partners", "Work with PrintoSync to deliver stronger technology and services to printing businesses."],
].map(([slug, title, description]) => ({
  slug,
  title,
  eyebrow: "About PrintoSync",
  description,
  features: ["Print-industry focus", "Practical innovation", "Customer partnership"],
  benefits: ["Clear purpose", "Long-term thinking", "Customer-led development"],
  keywords: [`PrintoSync ${title.toLowerCase()}`, "printing software company"],
}));

export const legalPages: readonly MarketingEntry[] = [
  ["privacy-policy", "Privacy Policy", "How PrintoSync collects, uses, protects, and manages personal information."],
  ["terms-conditions", "Terms & Conditions", "The terms that govern access to and use of PrintoSync services."],
  ["refund-policy", "Refund Policy", "General information about subscription cancellation and eligible refunds."],
  ["cookie-policy", "Cookie Policy", "How PrintoSync uses cookies and similar technologies on this website."],
  ["data-security", "Data Security", "The operational and technical practices used to protect customer information."],
].map(([slug, title, description]) => ({
  slug,
  title,
  eyebrow: "Trust & legal",
  description,
  features: ["Scope", "Your choices", "Our responsibilities"],
  benefits: ["Clear information", "Transparent practices", "Responsible service"],
  keywords: [`PrintoSync ${title.toLowerCase()}`],
}));

export const pricingPlans = [
  {
    slug: "starter",
    name: "Starter",
    description: "For small print shops moving away from spreadsheets.",
    cta: "Book Free Demo",
    features: ["Core CRM", "Quotation & job cards", "Basic stock", "GST invoicing", "Standard reports"],
  },
  {
    slug: "professional",
    name: "Professional",
    description: "For growing printers that need complete operational control.",
    cta: "Request a Quote",
    popular: true,
    features: ["Everything in Starter", "Production planning", "Purchase & vendors", "Advanced reports", "Role permissions"],
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    description: "For multi-team and multi-location printing businesses.",
    cta: "Contact Sales",
    features: ["Everything in Professional", "Advanced permissions", "Custom workflows", "Priority onboarding", "Business reviews"],
  },
  {
    slug: "custom",
    name: "Custom Solution",
    description: "For specialized workflows, integrations, and implementation needs.",
    cta: "Talk to Sales",
    features: ["Solution discovery", "Custom configuration", "Integration planning", "Migration support", "Dedicated guidance"],
  },
] as const;

export const homepageBenefits = [
  "Increase productivity",
  "Reduce manual errors",
  "Faster order processing",
  "Better inventory control",
  "Improve customer satisfaction",
  "Real-time business insights",
  "Secure cloud access",
  "Scalable for growing businesses",
] as const;

export const howItWorks = [
  "Create Customer & Quotation",
  "Convert to Production Job",
  "Track Production Progress",
  "Dispatch & Generate Invoice",
  "Analyze Reports & Business Growth",
] as const;

export function getEntry<T extends MarketingEntry>(
  entries: readonly T[],
  slug: string,
): T | undefined {
  return entries.find((entry) => entry.slug === slug);
}
