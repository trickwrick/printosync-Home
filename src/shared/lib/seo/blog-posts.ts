export interface BlogPost {
  slug: string;
  path: string;
  title: string;
  description: string;
  excerpt: string;
  datePublished: string;
  dateModified: string;
  author: string;
  readTime: string;
  keywords: string[];
  imageAlt: string;
  sections: { heading: string; paragraphs: string[] }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "print-shop-crm-guide",
    path: "/blog/print-shop-crm-guide",
    title: "The Complete Print Shop CRM Guide for 2026",
    description:
      "Learn how printing CRM software helps you manage quotes, proofs, client pipelines, and repeat business — with a practical checklist for print shop owners.",
    excerpt:
      "A step-by-step guide to choosing and implementing CRM software built for printing presses.",
    datePublished: "2026-01-15",
    dateModified: "2026-07-01",
    author: "PrintoSync Team",
    readTime: "8 min read",
    keywords: [
      "print shop CRM",
      "printing CRM guide",
      "print sales pipeline",
      "print quoting software",
    ],
    imageAlt: "Print shop CRM dashboard showing client pipeline and quote stages",
    sections: [
      {
        heading: "Why generic CRMs fail print shops",
        paragraphs: [
          "Most CRM platforms are built for SaaS sales teams, not job-based manufacturing. Print shops need quote versioning, proof approvals, substrate tracking, and production handoffs — not just deal stages.",
          "A printing CRM connects sales activity directly to production capacity, so estimators stop over-promising turnaround times.",
        ],
      },
      {
        heading: "Core CRM features for printers",
        paragraphs: [
          "Look for client history tied to job specs, automated follow-ups on open quotes, and visibility into repeat order patterns.",
          "Integrations with MIS/ERP eliminate double entry when a quote converts to a production job.",
        ],
      },
      {
        heading: "Implementation checklist",
        paragraphs: [
          "Map your quote-to-cash workflow, migrate active accounts first, and train reps on proof approval tracking within the first week.",
          "Measure win rate, quote response time, and repeat revenue within 90 days of rollout.",
        ],
      },
    ],
  },
  {
    slug: "erp-for-printing-presses",
    path: "/blog/erp-for-printing-presses",
    title: "ERP for Printing Presses: What to Look For",
    description:
      "Compare ERP capabilities for print manufacturing — inventory, scheduling, costing, GST billing, and multi-location operations.",
    excerpt:
      "How to evaluate ERP systems that unify production, finance, and inventory for modern print shops.",
    datePublished: "2026-02-20",
    dateModified: "2026-06-15",
    author: "PrintoSync Team",
    readTime: "10 min read",
    keywords: [
      "printing ERP",
      "print manufacturing software",
      "print production scheduling",
      "print shop inventory",
    ],
    imageAlt: "Printing ERP production schedule and inventory overview",
    sections: [
      {
        heading: "ERP vs MIS: where they overlap",
        paragraphs: [
          "MIS focuses on job estimating and production routing. ERP adds financials, purchasing, HR, and multi-entity reporting.",
          "Best-in-class print platforms unify both so job costing feeds live P&L data.",
        ],
      },
      {
        heading: "Production scheduling that matches reality",
        paragraphs: [
          "Effective scheduling accounts for press changeovers, gang-run opportunities, and rush job buffers.",
          "Real-time shop floor updates prevent planners from building schedules on stale status data.",
        ],
      },
      {
        heading: "Inventory and waste control",
        paragraphs: [
          "Track rolls, sheets, and consumables by batch with automatic deduction on job completion.",
          "Variance reports highlight substrate waste by press operator and job type.",
        ],
      },
    ],
  },
  {
    slug: "reduce-print-shop-waste",
    path: "/blog/reduce-print-shop-waste",
    title: "5 Ways to Reduce Waste in Your Print Shop",
    description:
      "Practical strategies to cut rework, substrate waste, and missed deadlines using production data and standardized workflows.",
    excerpt:
      "Operational tactics that helped print shops cut rework by up to 62% with better visibility and QA checkpoints.",
    datePublished: "2026-03-10",
    dateModified: "2026-05-28",
    author: "PrintoSync Team",
    readTime: "6 min read",
    keywords: [
      "reduce print waste",
      "print shop efficiency",
      "print production optimization",
      "print QA workflow",
    ],
    imageAlt: "Print production dashboard highlighting waste reduction metrics",
    sections: [
      {
        heading: "Standardize preflight and proofing",
        paragraphs: [
          "Most rework starts before ink hits the substrate. Enforce preflight rules and client proof sign-off in one system of record.",
        ],
      },
      {
        heading: "Gang runs and nesting optimization",
        paragraphs: [
          "Batch compatible jobs to maximize sheet yield. Software-assisted nesting can recover 8–15% substrate utilization on wide-format runs.",
        ],
      },
      {
        heading: "Measure, then iterate",
        paragraphs: [
          "Track spoilage by press, operator, and job type weekly. Shops that review variance data cut waste faster than those relying on end-of-month reports alone.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}
