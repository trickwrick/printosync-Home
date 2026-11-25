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
    title: "Order Booking",
    description:
      "Record customer details, print dimensions, paper stock types, quantities, finishing instructions, and deadlines in a digital ticket.",
    duration: "Stage 01",
  },
  {
    step: "02",
    title: "Prepress & Plates",
    description:
      "Prepare and inspect artwork files, coordinate client proof approvals, verify color separations, and manage plate preparation error-free.",
    duration: "Stage 02",
  },
  {
    step: "03",
    title: "Machine Scheduling",
    description:
      "Organize machine assignments, balance production schedules across offset and digital presses, and monitor floor-wide queues live.",
    duration: "Stage 03",
  },
  {
    step: "04",
    title: "Printing & Press Run",
    description:
      "Track real-time impressions, operator shifts, paper feeding, ink consumption, and active press run status across all machines.",
    duration: "Stage 04",
  },
  {
    step: "05",
    title: "Finishing & QC",
    description:
      "Manage cutting, folding, lamination, die-punching, UV coating, binding, and thorough quality inspection before packing.",
    duration: "Stage 05",
  },
  {
    step: "06",
    title: "Packaging & Dispatch",
    description:
      "Bundle finished goods securely, generate accurate delivery challans, attach barcode labels, and coordinate courier dispatches.",
    duration: "Stage 06",
  },
  {
    step: "07",
    title: "GST Invoicing",
    description:
      "Generate 100% GST-compliant invoices instantly, apply correct HSN/SAC rates, and manage customer payment collection ledgers.",
    duration: "Stage 07",
  },
  {
    step: "08",
    title: "Raw Material Stock",
    description:
      "Track paper reams, reels, inks, chemicals, and plates with real-time stock levels, low-stock threshold alerts, and auto-deduction.",
    duration: "Stage 08",
  },
  {
    step: "09",
    title: "Reports & Insights",
    description:
      "Monitor job-wise profitability, machine OEE uptime, paper wastage trends, operator efficiency, and actionable sales reports.",
    duration: "Stage 09",
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
      "Managing our daily printing operations has become much easier. From handling customer orders to monitoring production activities, the software helps us keep everything organized. It has reduced manual work and improved our overall workflow.",
    author: "Rajesh Sharma",
    role: "Printing Press Owner",
    company: "Commercial Offset Press, Jaipur",
    avatar: "RS",
  },
  {
    quote:
      "We were looking for a solution to manage different printing processes in one place. This software has helped us improve coordination between departments, track job progress, and manage daily production requirements more efficiently.",
    author: "Amit Verma",
    role: "Commercial Printing Business Owner",
    company: "Verma Print Graphics, Ahmedabad",
    avatar: "AV",
  },
  {
    quote:
      "The production management features are particularly useful for our team. We can organize job schedules, monitor ongoing orders, and keep track of different production stages. It has made our daily operations more structured.",
    author: "Neha Gupta",
    role: "Production Manager",
    company: "PackTech Print Solutions, New Delhi",
    avatar: "NG",
  },
  {
    quote:
      "Managing printing jobs, material requirements, and production schedules can be challenging. This solution has helped us bring important activities together and maintain better control over our printing operations.",
    author: "Vikram Mehta",
    role: "Offset Printing Business Owner",
    company: "Mehta Offset Printers, Surat",
    avatar: "VM",
  },
  {
    quote:
      "A useful solution for businesses looking to simplify printing press management. It helps us organize customer orders, monitor job progress, and manage operational activities with less manual effort. Overall, it has improved our team's efficiency.",
    author: "Sandeep Malhotra",
    role: "Printing Operations Manager",
    company: "Malhotra Commercial Printers, Mumbai",
    avatar: "SM",
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
] as const;

export const dashboardFeatures = [
  { label: "Live job tracking", position: "top-[18%] left-[8%]" },
  { label: "Revenue analytics", position: "top-[12%] right-[6%]" },
  { label: "Client pipeline", position: "bottom-[28%] left-[4%]" },
  { label: "Press utilization", position: "bottom-[20%] right-[8%]" },
] as const;
