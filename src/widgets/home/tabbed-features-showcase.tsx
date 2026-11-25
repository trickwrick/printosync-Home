"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileCheck2,
  Sparkles,
  CalendarCheck,
  Boxes,
  Calculator,
  Users2,
  BarChart3,
  ArrowRight,
  CircleDot,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import {
  SectionLabel,
  SectionReveal,
  SectionSubtitle,
  SectionTitle,
} from "./section-primitives";

interface FeatureDetail {
  id: string;
  number: string;
  title: string;
  tagline: string;
  icon: LucideIcon;
  description: string;
  benefits: string[];
  mockup: {
    badge: string;
    headline: string;
    metricLabel: string;
    metricValue: string;
    status: string;
    details: { label: string; value: string }[];
  };
}

const erpModules: FeatureDetail[] = [
  {
    id: "orders",
    number: "01",
    title: "Complete Order Management",
    tagline: "Inquiry to Delivery Tracking",
    icon: FileCheck2,
    description:
      "Manage customer orders from the initial inquiry to final delivery. Keep job details organized and ensure every order moves through the required production stages.",
    benefits: [
      "Create and manage customer orders seamlessly.",
      "Maintain exact job specifications and printing requirements.",
      "Track order status and completion timelines in real time.",
      "Manage customer deadlines and delivery schedules.",
      "Access previous order details for rapid repeat jobs.",
      "Reduce confusion and improve cross-department coordination.",
    ],
    mockup: {
      badge: "Active Job Ticket #ORD-8942",
      headline: "Apex Commercial Brochures (16-Page)",
      metricLabel: "Run Quantity",
      metricValue: "10,000 Copies",
      status: "In Production",
      details: [
        { label: "Paper Stock", value: "170 GSM Matte Art" },
        { label: "Color Profile", value: "4/4 CMYK Offset" },
        { label: "Finishing", value: "Thermal Gloss + Center Pin" },
        { label: "Dispatch Due", value: "Tomorrow, 4:00 PM" },
      ],
    },
  },
  {
    id: "prepress",
    number: "02",
    title: "Prepress Workflow Management",
    tagline: "Artwork & Plate Coordination",
    icon: Sparkles,
    description:
      "Prepress is an important stage of printing production that requires accuracy and proper coordination. Our prepress workflow software helps organize pre-production activities, making it easier to manage artwork, design approvals, file preparation, and other essential tasks before printing begins.",
    benefits: [
      "Organize incoming artwork and multi-page design files.",
      "Manage file preflight checking and client approval workflows.",
      "Coordinate prepress and CTP plate making activities.",
      "Track job readiness before assigning press machines.",
      "Reduce expensive errors caused by incorrect files or bleed.",
      "Improve communication between design and press-floor teams.",
    ],
    mockup: {
      badge: "Prepress Preflight & CTP #PRP-108",
      headline: "Art Card Packaging Carton Die-Line",
      metricLabel: "Plate Ready",
      metricValue: "4/4 Plates Output",
      status: "Client Approved",
      details: [
        { label: "Bleed / Trapping", value: "3mm Verified ✓" },
        { label: "Color Separation", value: "Cyan, Mag, Yel, Blk + Spot" },
        { label: "Client Proof", value: "E-Signed on WhatsApp" },
        { label: "CTP Queue", value: "Loaded onto Press #2" },
      ],
    },
  },
  {
    id: "scheduling",
    number: "03",
    title: "Production Planning and Scheduling",
    tagline: "Machine Workloads & Uptime",
    icon: CalendarCheck,
    description:
      "Efficient production planning helps printing businesses manage workloads, machine availability, and order deadlines. Organize production activities to ensure jobs move smoothly between different stages.",
    benefits: [
      "Plan and schedule printing jobs across offset & digital lines.",
      "Monitor ongoing production floor activities live.",
      "Manage machine availability, run speeds, and workloads.",
      "Track job progress across prepress, press, and post-press.",
      "Prioritize urgent customer orders without disrupting existing jobs.",
      "Identify production delays and shop-floor bottlenecks early.",
    ],
    mockup: {
      badge: "Shop Floor Scheduling Board",
      headline: "Press Floor Machine Uptime Monitor",
      metricLabel: "Avg Running Speed",
      metricValue: "14,800 SPH",
      status: "Running Optimally",
      details: [
        { label: "Press 1 (Heidelberg)", value: "Job #8942 (68% Done)" },
        { label: "Press 2 (Komori 4-Col)", value: "Washup / Setup Mode" },
        { label: "Digital (HP Indigo)", value: "Variable QR Tags (Queue: 3)" },
        { label: "Operator Shift", value: "Shift A (94.2% Efficiency)" },
      ],
    },
  },
  {
    id: "inventory",
    number: "04",
    title: "Inventory and Material Management",
    tagline: "Paper, Ink & Raw Material Control",
    icon: Boxes,
    description:
      "Maintaining the right quantity of printing materials is essential for uninterrupted production. Manage important resources and maintain better visibility into inventory requirements.",
    benefits: [
      "Track paper reams, reels, ink cans, plates, and chemicals.",
      "Monitor stock availability across central and shop-floor warehouses.",
      "Record exact material consumption per job card automatically.",
      "Identify low-stock items with automated reorder threshold alerts.",
      "Manage material purchasing requirements and supplier POs.",
      "Reduce unnecessary paper scrap and capital locked in dead stock.",
    ],
    mockup: {
      badge: "Warehouse Raw Material Stock",
      headline: "Live Stock & Low Threshold Monitor",
      metricLabel: "Paper In Stock",
      metricValue: "420 Reams",
      status: "Stock Healthy",
      details: [
        { label: "300 GSM Art Card", value: "142 Reams (Royal Size)" },
        { label: "130 GSM Gloss Art", value: "185 Reams (Demy Size)" },
        { label: "Offset Inks (CMYK)", value: "24 Cans Available" },
        { label: "Low Stock Alert", value: "None (Reorder trigger: 50)" },
      ],
    },
  },
  {
    id: "costing",
    number: "05",
    title: "Cost and Expense Management",
    tagline: "Protected Margins & Job Costing",
    icon: Calculator,
    description:
      "Understand the expenses involved in every printing project and maintain better control over operational costs. Monitor production expenses to make informed business decisions and protect profit margins.",
    benefits: [
      "Track exact material and production manufacturing costs.",
      "Monitor operator labour, electricity, and machine run hourly rates.",
      "Calculate job-wise production costs with zero guesswork.",
      "Manage additional operational expenses and subcontracting charges.",
      "Compare estimated quotes vs. actual job costs to find leakages.",
      "Improve cost visibility and safeguard healthy profit margins.",
    ],
    mockup: {
      badge: "Job Cost Variance Audit #JCV-49",
      headline: "Estimated vs. Actual Cost Analysis",
      metricLabel: "Net Margin Achieved",
      metricValue: "29.4% Profit",
      status: "Margin Protected",
      details: [
        { label: "Quoted Estimate", value: "₹48,500" },
        { label: "Actual Paper Cost", value: "₹24,200 (Saved ₹1,200)" },
        { label: "Press Run Cost", value: "₹8,400 (4.5 Machine Hours)" },
        { label: "Net Realized Profit", value: "₹14,260 Secured" },
      ],
    },
  },
  {
    id: "crm",
    number: "06",
    title: "Customer and Vendor Management",
    tagline: "Client History, Ledgers & Vendors",
    icon: Users2,
    description:
      "Maintain organized information about customers, suppliers, and business transactions. Simplify communication and make important records easier to access whenever required.",
    benefits: [
      "Maintain centralized customer and supplier business records.",
      "Access previous order specifications and transaction ledgers instantly.",
      "Organize customer inquiries, sample requests, and quotes.",
      "Manage supplier credit periods, rate cards, and purchasing terms.",
      "Improve communication between sales, billing, and dispatch teams.",
      "Build stronger, long-term commercial printing partnerships.",
    ],
    mockup: {
      badge: "Client Profile & Ledger #CLI-302",
      headline: "National Publishing House, New Delhi",
      metricLabel: "Total Orders Completed",
      metricValue: "148 Jobs",
      status: "Credit Approved",
      details: [
        { label: "Credit Period", value: "30 Days (Active)" },
        { label: "Outstanding Ledger", value: "₹1,24,000 (Current)" },
        { label: "Avg Monthly Volume", value: "₹3.8 Lakhs" },
        { label: "Communication", value: "Direct WhatsApp Invoicing" },
      ],
    },
  },
  {
    id: "insights",
    number: "07",
    title: "Reporting and Business Insights",
    tagline: "Executive BI & Uptime Analytics",
    icon: BarChart3,
    description:
      "Access useful business information to understand operational performance and identify areas that need improvement. Organized reports help management make better decisions about production, costs, orders, and resources.",
    benefits: [
      "Review daily, weekly, and monthly order and production reports.",
      "Monitor job-wise costs, revenue, and gross profit margins.",
      "Evaluate paper consumption and identify wastage reduction trends.",
      "Track pending, in-press, and dispatched order bottlenecks.",
      "Review machine OEE operational performance and shift throughput.",
      "Identify high-margin printing products to grow revenue faster.",
    ],
    mockup: {
      badge: "Executive Management Dashboard",
      headline: "Monthly Press Performance & Uptime",
      metricLabel: "Paper Wastage Cut",
      metricValue: "18.4% Saved",
      status: "OEE 89.2%",
      details: [
        { label: "Monthly Output", value: "2.4 Million Impressions" },
        { label: "On-Time Delivery", value: "99.4% Fulfill Rate" },
        { label: "Top Product Line", value: "Carton Packaging (42% Margin)" },
        { label: "Machine Downtime", value: "< 2.1% (Zero Plate Jam)" },
      ],
    },
  },
];

export function TabbedFeaturesShowcase() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const current = erpModules[activeTab];
  const Icon = current.icon;

  return (
    <SectionReveal id="erp-modules-showcase" className="border-t border-border bg-surface/50 py-16 lg:py-24">
      <div className="mx-auto max-w-350 px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>Enterprise ERP Architecture</SectionLabel>
          <SectionTitle className="mx-auto">
            Key Features of Our Printing Press ERP Software
          </SectionTitle>
          <SectionSubtitle className="mx-auto">
            Efficient production, better resource management, and simplified business operations—all through one connected solution. Our system is designed to help printing businesses manage daily activities while improving coordination between different departments.
          </SectionSubtitle>
        </div>

        {/* Tabbed Interface Grid */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Vertical Feature Selector Tabs */}
          <div className="space-y-2 lg:col-span-4">
            {erpModules.map((item, idx) => {
              const TabIcon = item.icon;
              const isActive = activeTab === idx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`group flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-all duration-300 ${
                    isActive
                      ? "border-brand bg-card shadow-premium scale-[1.02]"
                      : "border-border/60 bg-card/60 hover:border-brand/30 hover:bg-card"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                        isActive
                          ? "bg-brand text-brand-foreground shadow-glow"
                          : "bg-brand-muted text-brand group-hover:bg-brand/20"
                      }`}
                    >
                      <TabIcon className="size-5" />
                    </span>
                    <div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-brand">
                        Module {item.number}
                      </span>
                      <h4
                        className={`text-sm font-bold transition-colors ${
                          isActive ? "text-foreground" : "text-foreground/80 group-hover:text-foreground"
                        }`}
                      >
                        {item.title}
                      </h4>
                    </div>
                  </div>
                  <CircleDot
                    className={`size-4 transition-all ${
                      isActive ? "text-brand scale-110" : "text-muted-foreground/30 group-hover:text-muted-foreground/60"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Live Feature Showcase Panel */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-premium sm:p-8 lg:col-span-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/80 pb-6">
              <div className="flex items-center gap-3">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-brand text-brand-foreground shadow-glow">
                  <Icon className="size-6" />
                </span>
                <div>
                  <span className="font-mono text-xs font-bold text-brand uppercase tracking-wider">
                    Module {current.number} • {current.tagline}
                  </span>
                  <h3 className="font-display text-xl font-bold text-foreground sm:text-2xl">
                    {current.title}
                  </h3>
                </div>
              </div>
              <span className="self-start sm:self-auto rounded-full border border-brand/20 bg-brand-muted px-3 py-1 text-xs font-semibold text-brand">
                PrintoSync ERP 2.0
              </span>
            </div>

            {/* Description */}
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {current.description}
            </p>

            {/* Live Interactive Software Screen Simulation */}
            <div className="mt-6 rounded-2xl border border-brand/25 bg-linear-to-br from-surface/80 via-card to-brand-muted/20 p-5 shadow-sm">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-xs font-bold text-foreground">
                    {current.mockup.badge}
                  </span>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-600">
                  {current.mockup.status}
                </span>
              </div>

              <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Active System Object
                  </p>
                  <p className="font-display text-lg font-bold text-foreground">
                    {current.mockup.headline}
                  </p>
                </div>
                <div className="rounded-xl border border-brand/20 bg-card p-3 text-right">
                  <p className="text-[11px] text-muted-foreground">
                    {current.mockup.metricLabel}
                  </p>
                  <p className="font-mono text-base font-extrabold text-brand">
                    {current.mockup.metricValue}
                  </p>
                </div>
              </div>

              {/* Grid of details */}
              <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {current.mockup.details.map((det) => (
                  <div key={det.label} className="rounded-xl bg-background/80 p-2.5 border border-border/60">
                    <p className="text-[10px] text-muted-foreground uppercase">{det.label}</p>
                    <p className="font-semibold text-xs text-foreground mt-0.5 truncate">{det.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Benefits Checklist from Document */}
            <div className="mt-6 border-t border-border/80 pt-5">
              <p className="text-xs font-bold uppercase tracking-wider text-brand">
                Key Benefits & Capabilities:
              </p>
              <div className="mt-3.5 grid gap-2.5 sm:grid-cols-2">
                {current.benefits.map((b) => (
                  <div key={b} className="flex items-start gap-2.5 text-xs text-foreground/90 font-medium">
                    <CheckCircle2 className="size-4 shrink-0 text-brand mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Action */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border/80 pt-5">
              <p className="text-xs text-muted-foreground">
                Want to see this module with your press machines and paper rates?
              </p>
              <Link
                href="/book-demo"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:underline"
              >
                Schedule Walkthrough <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
