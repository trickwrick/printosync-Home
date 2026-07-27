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
    slug: "dashboard",
    title: "Printing Business Dashboard",
    shortTitle: "Dashboard",
    eyebrow: "Live business overview",
    description:
      "Monitor jobs, revenue, payments, stock alerts, and production activity from one real-time printing business dashboard.",
    features: ["Live KPIs", "Pending job alerts", "Revenue overview", "Role-based widgets"],
    benefits: ["Faster decisions", "Complete visibility", "Less manual reporting"],
    keywords: ["printing dashboard", "print shop dashboard", "printing business analytics"],
  },
  {
    slug: "crm",
    title: "Printing CRM Software",
    shortTitle: "CRM",
    eyebrow: "Customer relationships",
    description:
      "Organize leads, customer conversations, follow-ups, quotations, repeat orders, and payment history in a CRM built for printers.",
    features: ["Lead pipeline", "Follow-up reminders", "Customer history", "Repeat order tracking"],
    benefits: ["More conversions", "Stronger relationships", "Fewer missed follow-ups"],
    keywords: ["printing CRM", "print shop CRM software", "customer management printing"],
  },
  {
    slug: "customer-management",
    title: "Customer Management",
    eyebrow: "One customer record",
    description:
      "Keep contacts, addresses, tax details, order history, credit limits, and communication records organized in one place.",
    features: ["Customer profiles", "GST details", "Order history", "Credit controls"],
    benefits: ["Accurate records", "Quicker service", "Better customer experience"],
    keywords: ["print customer management", "printing customer database"],
  },
  {
    slug: "quotation-management",
    title: "Quotation Management",
    eyebrow: "Accurate print estimates",
    description:
      "Create professional quotations using paper, process, machine, finishing, labor, and margin calculations.",
    features: ["Cost calculators", "Reusable templates", "Margin controls", "PDF quotations"],
    benefits: ["Faster quoting", "Consistent pricing", "Protected margins"],
    keywords: ["printing quotation software", "print estimating software"],
  },
  {
    slug: "sales-order-management",
    title: "Sales Order Management",
    eyebrow: "Quote-to-order control",
    description:
      "Convert approved quotations into sales orders and carry specifications forward without entering data twice.",
    features: ["Quote conversion", "Order approvals", "Status tracking", "Customer commitments"],
    benefits: ["Fewer errors", "Faster processing", "Clear order ownership"],
    keywords: ["print sales order software", "printing order management"],
  },
  {
    slug: "job-card-management",
    title: "Job Card Management",
    eyebrow: "Production-ready jobs",
    description:
      "Create detailed job cards with artwork, material, machine, process, finishing, quantity, and delivery instructions.",
    features: ["Digital job cards", "Operator assignment", "Process checklist", "Job status"],
    benefits: ["Clear instructions", "Less rework", "On-time production"],
    keywords: ["printing job card software", "print job management"],
  },
  {
    slug: "production-management",
    title: "Production Management",
    eyebrow: "Shop-floor visibility",
    description:
      "Plan, schedule, and track every production stage from prepress through printing, finishing, packing, and dispatch.",
    features: ["Production board", "Stage tracking", "Priority planning", "Quality checkpoints"],
    benefits: ["Higher throughput", "Fewer delays", "Real-time accountability"],
    keywords: ["print production management software", "printing workflow software"],
  },
  {
    slug: "machine-management",
    title: "Machine Management",
    eyebrow: "Use every machine better",
    description:
      "Track machine allocation, availability, utilization, downtime, and maintenance for smarter production planning.",
    features: ["Machine schedule", "Utilization tracking", "Downtime logs", "Maintenance records"],
    benefits: ["Better utilization", "Reduced downtime", "Reliable planning"],
    keywords: ["printing machine management", "press utilization software"],
  },
  {
    slug: "inventory-management",
    title: "Inventory Management",
    eyebrow: "Materials under control",
    description:
      "Manage paper, ink, plates, chemicals, packaging, and other raw materials with automatic stock movement.",
    features: ["Live stock", "Material consumption", "Low-stock alerts", "Batch records"],
    benefits: ["Fewer stock-outs", "Lower waste", "Better purchasing"],
    keywords: ["printing inventory software", "paper stock management"],
  },
  {
    slug: "purchase-management",
    title: "Purchase Management",
    eyebrow: "Smarter procurement",
    description:
      "Create purchase orders, receive materials, compare suppliers, and connect purchases with inventory and accounts.",
    features: ["Purchase orders", "Material receipts", "Rate comparison", "Purchase history"],
    benefits: ["Controlled spending", "Timely procurement", "Accurate stock"],
    keywords: ["printing purchase management", "print shop procurement"],
  },
  {
    slug: "vendor-management",
    title: "Vendor Management",
    eyebrow: "Reliable supplier records",
    description:
      "Maintain supplier profiles, rates, purchase history, balances, and performance in a centralized vendor system.",
    features: ["Vendor profiles", "Rate history", "Outstanding balances", "Supplier performance"],
    benefits: ["Better negotiations", "Faster purchasing", "Clear payables"],
    keywords: ["printing vendor management", "supplier management software"],
  },
  {
    slug: "dispatch-management",
    title: "Dispatch Management",
    eyebrow: "Deliver every job on time",
    description:
      "Prepare challans, packing details, shipment records, and delivery updates directly from completed jobs.",
    features: ["Delivery challans", "Packing records", "Dispatch status", "Delivery history"],
    benefits: ["Accurate dispatch", "Fewer delivery errors", "Complete traceability"],
    keywords: ["printing dispatch software", "delivery challan printing"],
  },
  {
    slug: "gst-billing-invoicing",
    title: "GST Billing & Invoicing",
    eyebrow: "Professional compliant billing",
    description:
      "Generate GST-ready invoices, taxes, credit notes, and payment records connected to orders and dispatch.",
    features: ["GST invoices", "Tax calculation", "Credit notes", "Payment status"],
    benefits: ["Faster billing", "Accurate taxes", "Cleaner records"],
    keywords: ["GST billing printing press", "printing invoice software"],
  },
  {
    slug: "expense-management",
    title: "Expense Management",
    eyebrow: "Know where money goes",
    description:
      "Record operational expenses by category, job, department, or branch and understand their impact on profit.",
    features: ["Expense categories", "Job allocation", "Approval flow", "Expense reports"],
    benefits: ["Cost control", "Accurate profitability", "Less paperwork"],
    keywords: ["printing expense management", "print shop cost tracking"],
  },
  {
    slug: "accounts-payments",
    title: "Accounts & Payments",
    eyebrow: "Clear receivables and payables",
    description:
      "Track collections, vendor payments, customer balances, due dates, and complete account statements.",
    features: ["Receivables", "Payables", "Payment reminders", "Account statements"],
    benefits: ["Improved cash flow", "Fewer overdue payments", "Clear balances"],
    keywords: ["printing accounts software", "print shop payment management"],
  },
  {
    slug: "reports-analytics",
    title: "Reports & Analytics",
    eyebrow: "Insights that drive growth",
    description:
      "Analyze sales, production, stock, purchases, expenses, profit, pending jobs, and team performance.",
    features: ["Sales reports", "Production reports", "Profit analysis", "Exportable dashboards"],
    benefits: ["Data-led decisions", "Visible bottlenecks", "Measurable growth"],
    keywords: ["printing business reports", "print shop analytics"],
  },
  {
    slug: "employee-management",
    title: "Employee Management",
    eyebrow: "Organized teams",
    description:
      "Maintain employee records, assignments, responsibilities, activity, and performance across departments.",
    features: ["Employee profiles", "Task assignment", "Activity history", "Team performance"],
    benefits: ["Clear ownership", "Better coordination", "Improved productivity"],
    keywords: ["printing employee management", "print shop workforce software"],
  },
  {
    slug: "roles-permissions",
    title: "User Roles & Permissions",
    eyebrow: "Access with control",
    description:
      "Give every user access to the tools and information they need while protecting sensitive business data.",
    features: ["Custom roles", "Module permissions", "Data restrictions", "Audit activity"],
    benefits: ["Safer access", "Clear accountability", "Simpler administration"],
    keywords: ["ERP user roles", "printing software permissions"],
  },
  {
    slug: "notifications",
    title: "Notifications",
    eyebrow: "Never miss an update",
    description:
      "Keep teams informed about approvals, due dates, stock alerts, production delays, payments, and dispatches.",
    features: ["Smart alerts", "Due-date reminders", "Stock notifications", "Activity updates"],
    benefits: ["Faster response", "Fewer missed tasks", "Connected teams"],
    keywords: ["printing workflow notifications", "print job alerts"],
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
