"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  CircleCheck,
  Layers3,
  ShieldCheck,
  Sparkles,
  Printer,
  Laptop,
  Building2,
  Boxes,
  BookOpen,
  Maximize2,
  FileCheck2,
  CalendarCheck,
  Calculator,
  Users2,
  BarChart3,
  Clock,
  TrendingUp,
  AlertCircle,
  Factory,
} from "lucide-react";
import { MagneticButton } from "@/shared/ui/magnetic-button";
import {
  SectionLabel,
  SectionReveal,
  SectionSubtitle,
  SectionTitle,
  StaggerItem,
  StaggerReveal,
} from "./section-primitives";

// ============================================================================
// 1. ABOUT OVERVIEW SECTION (Introduction from Document)
// ============================================================================
export function AboutOverviewSection() {
  return (
    <SectionReveal id="overview" className="border-t border-border bg-surface py-16 lg:py-20">
      <div className="mx-auto grid max-w-350 gap-10 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-8">
        <div>
          <SectionLabel>About PrintoSync</SectionLabel>
          <SectionTitle>Built specifically for printing press businesses</SectionTitle>
          <SectionSubtitle>
            All-in-one software for offset presses, digital printing units, packaging companies, and commercial print shops.
          </SectionSubtitle>
          <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
            Managing a printing press involves several interconnected activities, from receiving customer orders and preparing estimates to handling prepress operations, production, inventory, and final delivery. When these activities are managed manually or through separate systems, businesses may face delays, communication gaps, production errors, and difficulty tracking daily operations.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
            Our printing press management software helps printing businesses bring essential operations together through a more organized and efficient workflow. It simplifies job management, improves coordination between departments, and provides better visibility into different stages of printing production.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
            >
              Discover our story
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-premium sm:p-8">
          <div className="grid grid-cols-2 gap-4">
            {[
              ["Complete", "Order Management"],
              ["Prepress", "Workflow & Plates"],
              ["Scheduling", "Press Floor Tracking"],
              ["Inventory", "Paper & Ink Control"],
              ["Costing", "Job-Wise Margins"],
              ["GST Ready", "Billing & Challans"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl bg-brand-muted p-5">
                <p className="font-display text-xl font-bold text-brand">{value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

// ============================================================================
// 2. SUITABLE FOR DIFFERENT PRINTING OPERATIONS (Operations Matrix from Document)
// ============================================================================
export const suitableOperations = [
  {
    title: "Offset Printing",
    icon: Printer,
    description: "Manage bulk printing jobs, production schedules, materials, and machine operations.",
    badge: "Commercial Offset",
  },
  {
    title: "Digital Printing",
    icon: Laptop,
    description: "Organize short-run orders, customized jobs, and quick production requirements.",
    badge: "Quick Turnaround",
  },
  {
    title: "Commercial Printing",
    icon: Building2,
    description: "Coordinate multiple departments, large orders, and complex production activities.",
    badge: "High Volume",
  },
  {
    title: "Packaging Printing",
    icon: Boxes,
    description: "Manage packaging jobs, material requirements, finishing, and production schedules.",
    badge: "Cartons & Corrugated",
  },
  {
    title: "Book and Catalogue Printing",
    icon: BookOpen,
    description: "Organize multi-page jobs, binding requirements, and finishing operations.",
    badge: "Multi-Page",
  },
  {
    title: "Large-Format Printing",
    icon: Maximize2,
    description: "Manage banners, posters, signage, and customized print orders.",
    badge: "Signage & Display",
  },
] as const;

export function IndustriesOverviewSection() {
  return (
    <SectionReveal id="operations" className="py-16 lg:py-20">
      <div className="mx-auto max-w-350 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>Designed for Different Printing Requirements</SectionLabel>
          <SectionTitle className="mx-auto">
            Suitable for Different Printing Operations
          </SectionTitle>
          <SectionSubtitle className="mx-auto">
            Every printing facility has different production processes, equipment, and operational requirements. Our printing business software supports organized business operations across different types of printing environments.
          </SectionSubtitle>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {suitableOperations.map((op) => {
            const Icon = op.icon;
            return (
              <div
                key={op.title}
                className="group relative rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-premium"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-brand-muted text-brand group-hover:bg-brand group-hover:text-brand-foreground transition-colors">
                    <Icon className="size-5" />
                  </span>
                  <span className="rounded-full border border-brand/20 bg-brand-muted px-2.5 py-0.5 text-[11px] font-semibold text-brand">
                    {op.badge}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                  {op.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {op.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </SectionReveal>
  );
}

// ============================================================================
// 3. KEY FEATURES OF PRINTING PRESS ERP SOFTWARE (7 Core Modules from Document)
// ============================================================================
export const erpFeatures = [
  {
    number: "01",
    title: "Complete Order Management",
    icon: FileCheck2,
    description:
      "Manage customer orders from the initial inquiry to final delivery. Keep job details organized and ensure every order moves through the required production stages.",
    benefits: [
      "Create and manage customer orders.",
      "Maintain job specifications and printing requirements.",
      "Track order status and completion timelines.",
      "Manage customer deadlines and delivery schedules.",
      "Access previous order details for repeat jobs.",
      "Reduce confusion and improve order coordination.",
    ],
  },
  {
    number: "02",
    title: "Prepress Workflow Management",
    icon: Sparkles,
    description:
      "Prepress is an important stage of printing production that requires accuracy and proper coordination. Our prepress workflow software helps organize pre-production activities, making it easier to manage artwork, design approvals, file preparation, and other essential tasks before printing begins.",
    benefits: [
      "Organize incoming artwork and design files.",
      "Manage file checking and approval processes.",
      "Coordinate prepress activities.",
      "Track job readiness before production.",
      "Reduce errors caused by incorrect files or specifications.",
      "Improve communication between design and production teams.",
    ],
  },
  {
    number: "03",
    title: "Production Planning and Scheduling",
    icon: CalendarCheck,
    description:
      "Efficient production planning helps printing businesses manage workloads, machine availability, and order deadlines. Organize production activities to ensure jobs move smoothly between different stages.",
    benefits: [
      "Plan and schedule printing jobs.",
      "Monitor ongoing production activities.",
      "Manage machine availability and workloads.",
      "Track job progress across production stages.",
      "Prioritize urgent customer orders.",
      "Identify production delays and bottlenecks.",
    ],
  },
  {
    number: "04",
    title: "Inventory and Material Management",
    icon: Boxes,
    description:
      "Maintaining the right quantity of printing materials is essential for uninterrupted production. Manage important resources and maintain better visibility into inventory requirements.",
    benefits: [
      "Track paper, ink, plates, and other materials.",
      "Monitor stock availability.",
      "Record material consumption.",
      "Identify low-stock items.",
      "Manage material purchasing requirements.",
      "Reduce unnecessary material wastage.",
    ],
  },
  {
    number: "05",
    title: "Cost and Expense Management",
    icon: Calculator,
    description:
      "Understand the expenses involved in every printing project and maintain better control over operational costs. Monitor production expenses to make informed business decisions and protect profit margins.",
    benefits: [
      "Track material and production costs.",
      "Monitor labour and machine expenses.",
      "Calculate job-wise production costs.",
      "Manage additional operational expenses.",
      "Compare estimated and actual job costs.",
      "Improve cost visibility and profitability.",
    ],
  },
  {
    number: "06",
    title: "Customer and Vendor Management",
    icon: Users2,
    description:
      "Maintain organized information about customers, suppliers, and business transactions. Simplify communication and make important records easier to access whenever required.",
    benefits: [
      "Maintain customer and supplier records.",
      "Access previous order and transaction details.",
      "Organize customer inquiries and requirements.",
      "Manage supplier and purchasing information.",
      "Improve communication between teams.",
      "Build stronger business relationships.",
    ],
  },
  {
    number: "07",
    title: "Reporting and Business Insights",
    icon: BarChart3,
    description:
      "Access useful business information to understand operational performance and identify areas that need improvement. Organized reports help management make better decisions about production, costs, orders, and resources.",
    benefits: [
      "Review order and production reports.",
      "Monitor job-wise costs and expenses.",
      "Evaluate material consumption.",
      "Track pending and completed orders.",
      "Review operational performance.",
      "Identify opportunities to improve efficiency.",
    ],
  },
] as const;

export function KeyFeaturesErpSection() {
  return (
    <SectionReveal id="features" className="border-t border-border bg-surface py-16 lg:py-20">
      <div className="mx-auto max-w-350 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>Comprehensive Capabilities</SectionLabel>
          <SectionTitle className="mx-auto">
            Key Features of Our Printing Press ERP Software
          </SectionTitle>
          <SectionSubtitle className="mx-auto">
            Efficient production, better resource management, and simplified business operations—all through one connected solution. Our system is designed to help printing businesses manage daily activities while improving coordination between different departments.
          </SectionSubtitle>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {erpFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.number}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-brand/30 hover:shadow-premium"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-brand-muted text-brand">
                    <Icon className="size-5" />
                  </span>
                  <span className="font-mono text-xs font-bold text-brand">
                    {feat.number}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                  {feat.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {feat.description}
                </p>

                <div className="mt-5 border-t border-border/60 pt-4 flex-1">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-brand">
                    Key Benefits:
                  </p>
                  <ul className="mt-3 space-y-2">
                    {feat.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-xs text-foreground/90">
                        <Check className="size-3.5 shrink-0 text-brand mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionReveal>
  );
}

// ============================================================================
// 4. WHY CHOOSE OUR PRINTING PRESS MANAGEMENT SOLUTION (from Document)
// ============================================================================
export const keyAdvantages = [
  {
    title: "Centralized Operations",
    description: "Manage important business activities through one organized platform.",
    icon: Layers3,
  },
  {
    title: "Improved Productivity",
    description: "Reduce repetitive tasks and simplify daily workflows.",
    icon: TrendingUp,
  },
  {
    title: "Better Coordination",
    description: "Improve communication between sales, prepress, production, and dispatch teams.",
    icon: Users2,
  },
  {
    title: "Reduced Errors",
    description: "Maintain organized job specifications and minimize manual mistakes.",
    icon: AlertCircle,
  },
  {
    title: "Cost Control",
    description: "Monitor production expenses and material consumption.",
    icon: Calculator,
  },
  {
    title: "Time Management",
    description: "Organize production schedules and customer deadlines.",
    icon: Clock,
  },
  {
    title: "Business Visibility",
    description: "Access important operational information for better decision-making.",
    icon: BarChart3,
  },
] as const;

export function WhyChooseSection() {
  return (
    <SectionReveal id="why-choose" className="border-t border-border py-16 lg:py-20">
      <div className="mx-auto max-w-350 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>Why Choose PrintoSync</SectionLabel>
          <SectionTitle className="mx-auto">
            Why Choose Our Printing Press Management Solution?
          </SectionTitle>
          <SectionSubtitle className="mx-auto">
            Choosing the right software used in printing press operations can make everyday business activities easier to manage. A centralized solution helps reduce administrative work, improve communication, and provide better control over production processes.
          </SectionSubtitle>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {keyAdvantages.map((adv) => {
            const Icon = adv.icon;
            return (
              <div
                key={adv.title}
                className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-brand/30 hover:shadow-sm"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-brand-muted text-brand">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-3 font-display text-base font-bold text-foreground">
                  {adv.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {adv.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Closing Note from Document */}
        <div className="mt-10 rounded-2xl border border-brand/20 bg-brand-muted/40 p-6 sm:p-8">
          <p className="text-sm leading-relaxed text-foreground sm:text-base">
            <strong className="text-brand">Built for Real Press Operations:</strong> Our software for offset printing press operations helps businesses organize job details, manage production activities, monitor material requirements, and maintain better visibility across different stages of printing. Modern printing businesses need more than basic order tracking. They require connected processes that support production planning, cost management, inventory control, and customer coordination.
          </p>
        </div>
      </div>
    </SectionReveal>
  );
}

// ============================================================================
// 5. DIGITIZE CTA SECTION
// ============================================================================
export function DigitizeCtaSection() {
  return (
    <SectionReveal className="py-16 lg:py-20">
      <div className="mx-auto max-w-350 px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-foreground px-6 py-12 text-center text-background shadow-premium sm:px-10 lg:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(41,184,186,0.35),transparent_45%)]" />
          <div className="relative mx-auto max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-white/80">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Ready to digitize your printing press?
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold text-white sm:text-4xl">
              Transform daily operations with PrintoSync
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
              Book a free demo and discover how Printing Press Management
              Software can simplify operations, increase efficiency, and drive
              business growth.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <MagneticButton href="/book-demo">Schedule a Demo</MagneticButton>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Contact Sales <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-5 text-xs text-white/60">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-brand" /> Secure cloud access
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Layers3 className="size-4 text-brand" /> Scales with your business
              </span>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

// Retain legacy exports if imported elsewhere
export const BenefitsAndProcessSection = WhyChooseSection;
export const WhyPrintoSyncSection = WhyChooseSection;
