export const problems = [
  {
    id: "disconnected-systems",
    title: "Disconnected systems",
    description:
      "Quotes live in email, jobs in spreadsheets, inventory in another tool — nothing talks to each other.",
    stat: "68%",
    statLabel: "of shops use 4+ tools",
    icon: "Unplug",
  },
  {
    id: "manual-tracking",
    title: "Manual job tracking",
    description:
      "Production managers chase updates across the shop floor instead of managing throughput.",
    stat: "12hrs",
    statLabel: "lost per week",
    icon: "Clock",
  },
  {
    id: "inventory-blindspots",
    title: "Inventory blind spots",
    description:
      "Stock-outs halt presses mid-run. Overstock ties up capital you can't afford to waste.",
    stat: "$47K",
    statLabel: "avg. annual waste",
    icon: "PackageX",
  },
  {
    id: "client-communication",
    title: "Scattered client comms",
    description:
      "Proof approvals, change requests, and billing disputes slip through the cracks daily.",
    stat: "34%",
    statLabel: "rework from miscommunication",
    icon: "MessageSquareWarning",
  },
] as const;

export const solutions = [
  {
    id: "crm",
    title: "Unified CRM",
    headline: "Every client interaction, one place",
    description:
      "Track leads, quotes, proofs, and approvals in a pipeline built for print sales cycles — not generic SaaS.",
    href: "/printing-crm",
    features: ["Quote-to-order pipeline", "Automated follow-ups", "Client portal"],
  },
  {
    id: "erp",
    title: "Production ERP",
    headline: "Shop floor to shipping, connected",
    description:
      "Schedule jobs across presses, assign operators, and track every stage from prepress to delivery.",
    href: "/printing-erp",
    features: ["Real-time job boards", "Capacity planning", "Cost tracking"],
  },
  {
    id: "mis",
    title: "MIS Intelligence",
    headline: "Data that drives decisions",
    description:
      "Dashboards, reports, and KPIs tailored to printing — margins, utilization, and turnaround times.",
    href: "/services#mis",
    features: ["Profitability reports", "Press utilization", "Custom KPIs"],
  },
] as const;

export const features = [
  {
    title: "Smart Quoting",
    description: "AI-assisted estimates based on historical job data and material costs.",
    size: "large" as const,
    gradient: "from-indigo-600/30 to-violet-600/10",
  },
  {
    title: "Job Scheduling",
    description: "Drag-and-drop production calendar across all presses.",
    size: "small" as const,
    gradient: "from-emerald-600/20 to-teal-600/5",
  },
  {
    title: "Inventory Sync",
    description: "Real-time stock levels with auto-reorder triggers.",
    size: "small" as const,
    gradient: "from-amber-600/20 to-orange-600/5",
  },
  {
    title: "Client Portal",
    description: "Self-service proof approval, order tracking, and invoice access for your customers.",
    size: "medium" as const,
    gradient: "from-blue-600/20 to-cyan-600/5",
  },
  {
    title: "Analytics Hub",
    description: "Deep insights into margins, throughput, and bottlenecks.",
    size: "medium" as const,
    gradient: "from-purple-600/20 to-pink-600/5",
  },
  {
    title: "Integrations",
    description: "Connect accounting, shipping, and prepress tools seamlessly.",
    size: "small" as const,
    gradient: "from-rose-600/20 to-red-600/5",
  },
] as const;

export const workflowSteps = [
  {
    step: "01",
    title: "Dashboard",
    description:
      "See jobs, revenue, pending payments, stock alerts, and production activity from one live command center.",
    duration: "Live overview",
  },
  {
    step: "02",
    title: "Job Card",
    description:
      "Create detailed job cards, assign operators, define specifications, and track every production stage.",
    duration: "Real-time",
  },
  {
    step: "03",
    title: "Challan",
    description:
      "Generate accurate delivery challans, manage dispatch details, and keep every shipment documented.",
    duration: "Instant",
  },
  {
    step: "04",
    title: "Payments",
    description:
      "Record incoming and outgoing payments, monitor balances, and follow up on overdue invoices.",
    duration: "Always synced",
  },
  {
    step: "05",
    title: "Stock",
    description:
      "Track paper, ink, plates, and other materials with live quantities, usage history, and low-stock alerts.",
    duration: "Live inventory",
  },
  {
    step: "06",
    title: "Statements",
    description:
      "View complete customer and vendor ledgers with transaction history, balances, and downloadable statements.",
    duration: "One click",
  },
  {
    step: "07",
    title: "Estimate & Quotation",
    description:
      "Build professional estimates using material, process, labor, and margin calculations tailored to print jobs.",
    duration: "Fast & accurate",
  },
  {
    step: "08",
    title: "Report",
    description:
      "Turn operational data into clear sales, production, stock, payment, and profitability reports.",
    duration: "Actionable data",
  },
] as const;

export const platformCategories = [
  {
    id: "crm",
    label: "CRM & Sales",
    features: [
      {
        title: "Smart Quoting",
        description:
          "Generate accurate estimates in minutes with material and labor calculators tied to your history.",
        href: "/printing-crm",
      },
      {
        title: "Client Portal",
        description:
          "Self-service proof approval, order tracking, and invoice access for your customers.",
        href: "/printing-crm",
      },
      {
        title: "Sales Pipeline",
        description:
          "Track leads, quotes, and approvals in a pipeline built for print sales cycles.",
        href: "/printing-crm",
      },
    ],
  },
  {
    id: "production",
    label: "Production",
    features: [
      {
        title: "Job Scheduling",
        description:
          "Drag-and-drop production calendar across all presses with real-time capacity.",
        href: "/printing-erp",
      },
      {
        title: "Shop Floor Tracking",
        description:
          "Monitor live job status, operator assignments, and quality checkpoints.",
        href: "/printing-erp",
      },
      {
        title: "Workflow Automation",
        description:
          "From quote to invoice in six steps — mapped to how print shops actually work.",
        href: "/services",
      },
    ],
  },
  {
    id: "operations",
    label: "Operations",
    features: [
      {
        title: "Inventory Sync",
        description:
          "Real-time stock levels with auto-reorder triggers and batch tracking.",
        href: "/services#inventory",
      },
      {
        title: "Analytics Hub",
        description:
          "Margins, throughput, and bottleneck insights tailored to printing.",
        href: "/services#mis",
      },
      {
        title: "Integrations",
        description:
          "Connect accounting, shipping, and prepress tools seamlessly.",
        href: "/services",
      },
    ],
  },
] as const;

export const whoWeHelp = [
  {
    title: "Startup print shops",
    description:
      "Everything you need to digitize quoting, job tracking, and client management from day one.",
    href: "/printing-crm",
  },
  {
    title: "Growing print businesses",
    description:
      "Streamline production, increase throughput, and deliver faster turnaround as you scale.",
    href: "/printing-erp",
  },
  {
    title: "Multi-location groups",
    description:
      "Centralize operations across facilities with real-time visibility and consistent workflows.",
    href: "/case-studies",
  },
] as const;

export const industries = [
  {
    name: "Commercial Print",
    description: "Brochures, business cards, marketing collateral at scale.",
    jobs: "Offset & digital",
    color: "indigo",
  },
  {
    name: "Packaging",
    description: "Folding cartons, corrugated, and flexible packaging workflows.",
    jobs: "High-volume runs",
    color: "emerald",
  },
  {
    name: "Labels & Flexo",
    description: "Label production with die-cutting and finishing integration.",
    jobs: "Precision runs",
    color: "amber",
  },
  {
    name: "Wide Format",
    description: "Banners, signage, and large-format display production.",
    jobs: "Custom sizes",
    color: "violet",
  },
  {
    name: "Digital Print",
    description: "On-demand, variable data, and short-run digital workflows.",
    jobs: "Fast turnaround",
    color: "cyan",
  },
] as const;

export const services = [
  {
    title: "CRM",
    description: "Client management, quoting, and sales pipeline automation.",
    href: "/printing-crm",
    icon: "Users",
  },
  {
    title: "ERP",
    description: "Production planning, costing, and financial operations.",
    href: "/printing-erp",
    icon: "Settings",
  },
  {
    title: "MIS",
    description: "Management information systems and business intelligence.",
    href: "/services#mis",
    icon: "BarChart3",
  },
  {
    title: "Inventory",
    description: "Material tracking, purchasing, and warehouse management.",
    href: "/services#inventory",
    icon: "Warehouse",
  },
  {
    title: "Web Development",
    description: "Custom websites and portals for your print business.",
    href: "/services#website-development",
    icon: "Globe",
  },
  {
    title: "SEO Services",
    description: "Get found online and drive more qualified print leads.",
    href: "/services#seo-services",
    icon: "Search",
  },
] as const;

export const whyChoose = [
  {
    title: "Built for print, not adapted",
    description: "Every workflow, field, and report designed specifically for printing presses.",
    icon: "Printer",
  },
  {
    title: "Deploy in days, not months",
    description: "Pre-configured templates for common print shop operations. Go live fast.",
    icon: "Zap",
  },
  {
    title: "Enterprise-grade security",
    description: "SOC 2 compliant infrastructure with role-based access and audit logs.",
    icon: "Shield",
  },
  {
    title: "Dedicated support team",
    description: "Print industry experts available 24/7 — not generic ticket queues.",
    icon: "Headphones",
  },
] as const;

export const testimonials = [
  {
    quote:
      "PrintoSync replaced five different tools. Our quote-to-delivery time dropped by 40% in the first quarter.",
    author: "Sarah Chen",
    role: "Operations Director",
    company: "Apex Print Co.",
    avatar: "SC",
  },
  {
    quote:
      "The production dashboard alone saved us 15 hours a week. We finally have visibility across every press.",
    author: "Marcus Webb",
    role: "Plant Manager",
    company: "MetroPress",
    avatar: "MW",
  },
  {
    quote:
      "Client portal changed everything. Proof approvals that took days now happen in hours. Our clients love it.",
    author: "Elena Rodriguez",
    role: "CEO",
    company: "ColorCraft",
    avatar: "ER",
  },
  {
    quote:
      "We scaled from 20 to 80 employees without adding admin staff. PrintoSync grows with you.",
    author: "James Okonkwo",
    role: "Founder",
    company: "PackPro",
    avatar: "JO",
  },
] as const;

export const caseStudies = [
  {
    slug: "apex-print-co",
    title: "How Apex Print Co. cut job turnaround by 40%",
    client: "Apex Print Co.",
    metric: "40%",
    metricLabel: "faster turnaround",
    industry: "Commercial Print",
    excerpt: "Unified CRM and production scheduling across 6 presses and 45 employees.",
  },
  {
    slug: "metropress",
    title: "MetroPress scales to 3 locations with one platform",
    client: "MetroPress",
    metric: "3×",
    metricLabel: "location growth",
    industry: "Wide Format",
    excerpt: "Centralized operations and real-time reporting across all facilities.",
  },
  {
    slug: "colorcraft",
    title: "ColorCraft eliminates rework with client portal",
    client: "ColorCraft",
    metric: "62%",
    metricLabel: "less rework",
    industry: "Digital Print",
    excerpt: "Digital proof approval workflow reduced miscommunication errors dramatically.",
  },
] as const;

export const pricingTiers = [
  {
    name: "Starter",
    price: 299,
    description: "For small print shops getting started with digital operations.",
    features: [
      "Up to 5 users",
      "CRM & quoting",
      "Basic job tracking",
      "Email support",
      "50GB storage",
    ],
    cta: "Start free trial",
    highlighted: false,
  },
  {
    name: "Professional",
    price: 699,
    description: "Full platform for growing print businesses with multiple presses.",
    features: [
      "Up to 25 users",
      "CRM + ERP + MIS",
      "Production scheduling",
      "Inventory management",
      "Client portal",
      "Priority support",
      "150GB storage",
    ],
    cta: "Book demo",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: null,
    description: "Custom deployment for large operations and multi-location groups.",
    features: [
      "Unlimited users",
      "Full platform + API",
      "Multi-location support",
      "Custom integrations",
      "Dedicated success manager",
      "SLA guarantee",
      "Unlimited storage",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
] as const;

export const faqs = [
  {
    question: "How long does implementation take?",
    answer:
      "Most shops go live within 2–4 weeks. Our team handles data migration, configuration, and training. Enterprise deployments with custom integrations typically take 6–8 weeks.",
  },
  {
    question: "Can PrintoSync integrate with our accounting software?",
    answer:
      "Yes. We integrate with QuickBooks, Xero, Sage, and other major accounting platforms. API access is available on Professional and Enterprise plans.",
  },
  {
    question: "Is my data secure?",
    answer:
      "PrintoSync runs on SOC 2 compliant infrastructure with encryption at rest and in transit, role-based access controls, and regular security audits.",
  },
  {
    question: "Do you offer training for our team?",
    answer:
      "Every plan includes onboarding training. Professional and Enterprise plans include ongoing training sessions and a dedicated success manager.",
  },
  {
    question: "Can we migrate from our current system?",
    answer:
      "Our migration team handles imports from spreadsheets, legacy MIS systems, and other print software. We map your existing data to PrintoSync automatically.",
  },
  {
    question: "What kind of support do you provide?",
    answer:
      "Starter includes email support with 24-hour response. Professional gets priority chat and phone support. Enterprise includes 24/7 dedicated support with SLA.",
  },
] as const;

export const dashboardFeatures = [
  { label: "Live job tracking", position: "top-[18%] left-[8%]" },
  { label: "Revenue analytics", position: "top-[12%] right-[6%]" },
  { label: "Client pipeline", position: "bottom-[28%] left-[4%]" },
  { label: "Press utilization", position: "bottom-[20%] right-[8%]" },
] as const;
