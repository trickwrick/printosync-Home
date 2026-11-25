"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Layers,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  PhoneCall,
  Laptop,
  Printer,
  FileCheck2,
  CalendarCheck,
  PackageCheck,
  Boxes,
  Calculator,
  Users2,
  BarChart3,
  Building2,
  BookOpen,
  Maximize2,
  Clock,
  Star,
  Quote,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { Container } from "@/shared/ui/container";

export function PrintingManagementContent() {
  // Active workflow step state (1 to 5)
  const [activeStep, setActiveStep] = useState<number>(1);

  // FAQ accordion open/close state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // 5-Stage Press Workflow Data
  const workflowSteps = [
    {
      step: 1,
      title: "Order Booking",
      icon: FileCheck2,
      subtitle: "Job Specifications & Client Intake",
      description:
        "Record customer details, job specifications, print dimensions, paper stock types, order quantities, finishing instructions, and delivery deadlines in a single digital ticket.",
      badge: "Stage 01",
    },
    {
      step: 2,
      title: "Prepress Preparation",
      icon: Sparkles,
      subtitle: "Artwork, Approvals & Plates",
      description:
        "Prepare and inspect artwork files, coordinate client approvals, verify bleed & color separations, and manage plate preparation to ensure error-free press runs.",
      badge: "Stage 02",
    },
    {
      step: 3,
      title: "Printing & Production",
      icon: Printer,
      subtitle: "Machine Scheduling & Live Tracking",
      description:
        "Organize machine assignments, balance production schedules across offset and digital presses, monitor real-time impressions, and track job progress floor-wide.",
      badge: "Stage 03",
    },
    {
      step: 4,
      title: "Finishing & Quality Checks",
      icon: Layers,
      subtitle: "Cutting, Binding & Inspection",
      description:
        "Manage post-press finishing including cutting, folding, lamination, die-punching, UV coating, binding, and thorough quality inspection before packing.",
      badge: "Stage 04",
    },
    {
      step: 5,
      title: "Packaging & Dispatch",
      icon: PackageCheck,
      subtitle: "Delivery Challans & Invoicing",
      description:
        "Organize bundle packaging, generate barcode-tracked delivery challans, schedule dispatches, coordinate handovers, and convert to GST invoices automatically.",
      badge: "Stage 05",
    },
  ];

  // 7 Core Modules
  const coreFeatures = [
    {
      number: "01",
      title: "Complete Order Management",
      icon: FileCheck2,
      color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
      description:
        "Manage customer orders from initial inquiry to final delivery. Keep job details organized and ensure every order moves through required production stages.",
      benefits: [
        "Create and manage customer orders seamlessly",
        "Maintain job specifications and printing requirements",
        "Track live order status and completion timelines",
        "Manage customer deadlines and delivery schedules",
        "Access previous order details for 1-click repeat jobs",
        "Reduce confusion and improve order coordination",
      ],
    },
    {
      number: "02",
      title: "Prepress Workflow Management",
      icon: Sparkles,
      color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
      description:
        "Prepress is a critical stage requiring accuracy. Organize pre-production activities, manage artwork, proofs, approvals, and plates before printing begins.",
      benefits: [
        "Organize incoming artwork and digital design files",
        "Manage file checking and client approval workflows",
        "Coordinate prepress and plate-making activities",
        "Track job readiness before mounting on press",
        "Eliminate reprint errors from wrong files or specs",
        "Improve communication between design & press teams",
      ],
    },
    {
      number: "03",
      title: "Production Planning and Scheduling",
      icon: CalendarCheck,
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
      description:
        "Manage workloads, machine availability, and order deadlines effortlessly. Organize production so jobs move smoothly between prepress, press, and post-press.",
      benefits: [
        "Plan and schedule digital and offset printing jobs",
        "Monitor ongoing production floor activities live",
        "Manage machine availability, speeds, and workloads",
        "Track job progress across all production stages",
        "Prioritize urgent customer orders without chaos",
        "Identify and eliminate production bottlenecks",
      ],
    },
    {
      number: "04",
      title: "Inventory and Material Management",
      icon: Boxes,
      color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
      description:
        "Maintain optimal quantities of paper stock, inks, plates, and chemicals. Gain real-time visibility into stock consumption and purchasing needs.",
      benefits: [
        "Track paper ream stock, inks, plates, and chemicals",
        "Monitor real-time warehouse and shop floor stock",
        "Record exact material consumption per job card",
        "Automatic low-stock threshold alerts",
        "Streamline material purchasing and vendor POs",
        "Drastically cut paper wastage and inventory dead capital",
      ],
    },
    {
      number: "05",
      title: "Cost and Expense Management",
      icon: Calculator,
      color: "text-rose-500 bg-rose-500/10 border-rose-500/20",
      description:
        "Understand expenses involved in every print project and maintain strict control over operational margins. Make informed pricing decisions that protect profits.",
      benefits: [
        "Track accurate paper and ink raw material costs",
        "Monitor operator labour and machine hourly run charges",
        "Calculate job-wise exact production costing",
        "Track additional operational expenses & consumables",
        "Compare estimated quotes vs. actual job costs",
        "Improve cost visibility and healthy profit margins",
      ],
    },
    {
      number: "06",
      title: "Customer and Vendor Management",
      icon: Users2,
      color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
      description:
        "Maintain organized records of clients, paper dealers, ink vendors, and subcontractors. Simplify communication and access transaction histories instantly.",
      benefits: [
        "Centralized customer and supplier database records",
        "Access past orders, payments, and ledger balances",
        "Organize client inquiries, quotes, and sample requests",
        "Manage vendor rates, purchase history, and terms",
        "Seamless communication across sales and operations",
        "Build stronger, loyal commercial relationships",
      ],
    },
    {
      number: "07",
      title: "Reporting and Business Insights",
      icon: BarChart3,
      color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
      description:
        "Actionable business intelligence to evaluate operational performance. Make data-driven decisions regarding machine utilization, margins, and orders.",
      benefits: [
        "Review daily order intake, delivery, and output reports",
        "Monitor job-wise profitability and expense ratios",
        "Evaluate paper consumption and scrap waste trends",
        "Track pending, in-press, and dispatched job batches",
        "Measure press machine efficiency and operator uptime",
        "Identify high-margin products and growth opportunities",
      ],
    },
  ];

  // Printing Operations Suitability
  const operationsSuitability = [
    {
      title: "Offset Printing",
      icon: Printer,
      description:
        "Manage high-volume commercial jobs, paper plate planning, ink formulations, press run schedules, and multi-color press operations.",
      badge: "Commercial Offset",
    },
    {
      title: "Digital Printing",
      icon: Laptop,
      description:
        "Organize short-run orders, customized variable data jobs, fast turnarounds, and instant digital pricing without administrative delays.",
      badge: "Quick Turnaround",
    },
    {
      title: "Commercial Printing",
      icon: Building2,
      description:
        "Coordinate multi-department operations, bulk orders, complex bindings, finishing requirements, and corporate client accounts.",
      badge: "Full Scale",
    },
    {
      title: "Packaging Printing",
      icon: PackageCheck,
      description:
        "Manage folding cartons, corrugated boxes, die-cutting, embossing, foil stamping, laminations, and tight delivery schedules.",
      badge: "Cartons & Boxes",
    },
    {
      title: "Book & Catalogue Printing",
      icon: BookOpen,
      description:
        "Coordinate multi-page book signatures, section sewing, perfect binding, hard case covers, spine calculations, and bulk paper reams.",
      badge: "Publications",
    },
    {
      title: "Large-Format Printing",
      icon: Maximize2,
      description:
        "Manage wide-format banners, vinyl stickers, posters, exhibition signage, roll media stock, and installation logistics.",
      badge: "Signage & Banners",
    },
  ];

  // Why Choose Us Pillars
  const whyChoosePillars = [
    {
      title: "Centralized Operations",
      description: "Manage orders, job cards, inventory, costing, and billing in one unified, cloud-accessible platform.",
      icon: Layers,
    },
    {
      title: "Improved Productivity",
      description: "Automate repetitive manual calculations, job ticket preparation, and daily shop-floor status tracking.",
      icon: TrendingUp,
    },
    {
      title: "Better Coordination",
      description: "Keep sales, prepress designers, press operators, and dispatch teams aligned with real-time digital job cards.",
      icon: Users2,
    },
    {
      title: "Reduced Errors",
      description: "Eliminate costly misprints and reprints with locked job specs, paper calculations, and verified approvals.",
      icon: AlertCircle,
    },
    {
      title: "Cost & Waste Control",
      description: "Monitor exact paper GSM, reel consumption, ink mileage, and machine run hours to safeguard profitability.",
      icon: Calculator,
    },
    {
      title: "Reliable Time Management",
      description: "Accurately schedule machine queues, track milestones, and fulfill customer delivery commitments on time.",
      icon: Clock,
    },
    {
      title: "Complete Business Visibility",
      description: "Live management dashboards showing daily sales, press floor efficiency, outstanding ledgers, and profits.",
      icon: BarChart3,
    },
  ];

  // FAQs
  const defaultFaqs = [
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
  ];

  // Customer Reviews
  const defaultReviews = [
    {
      name: "Rajesh Sharma",
      role: "Printing Press Owner",
      company: "Commercial Offset Press, Jaipur",
      review:
        "Managing our daily printing operations has become much easier. From handling customer orders to monitoring production activities, the software helps us keep everything organized. It has reduced manual work and improved our overall workflow.",
    },
    {
      name: "Amit Verma",
      role: "Commercial Printing Business Owner",
      company: "Verma Print Graphics, Ahmedabad",
      review:
        "We were looking for a solution to manage different printing processes in one place. This software has helped us improve coordination between departments, track job progress, and manage daily production requirements more efficiently.",
    },
    {
      name: "Neha Gupta",
      role: "Production Manager",
      company: "PackTech Print Solutions, New Delhi",
      review:
        "The production management features are particularly useful for our team. We can organize job schedules, monitor ongoing orders, and keep track of different production stages. It has made our daily operations more structured.",
    },
    {
      name: "Vikram Mehta",
      role: "Offset Printing Business Owner",
      company: "Mehta Offset Printers, Surat",
      review:
        "Managing printing jobs, material requirements, and production schedules can be challenging. This solution has helped us bring important activities together and maintain better control over our printing operations.",
    },
    {
      name: "Sandeep Malhotra",
      role: "Printing Operations Manager",
      company: "Malhotra Commercial Printers, Mumbai",
      review:
        "A useful solution for businesses looking to simplify printing press management. It helps us organize customer orders, monitor job progress, and manage operational activities with less manual effort. Overall, it has improved our team's efficiency.",
    },
  ];

  const [faqs, setFaqs] = useState(defaultFaqs);
  const [reviews, setReviews] = useState(defaultReviews);

  useEffect(() => {
    // Fetch live FAQs from admin
    fetch("/api/admin/faqs")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.faqs) && data.faqs.length > 0) {
          const activeOnly = data.faqs.filter(
            (f: { isActive?: boolean; question?: string; answer?: string }) =>
              f.isActive !== false && f.question
          );
          if (activeOnly.length > 0) {
            setFaqs(activeOnly);
          }
        }
      })
      .catch(() => {});

    // Fetch live Testimonials from admin
    fetch("/api/admin/testimonials")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.testimonials) && data.testimonials.length > 0) {
          const activeOnly = data.testimonials.filter(
            (t: { isActive?: boolean; name?: string; quote?: string; review?: string }) =>
              t.isActive !== false && t.name
          );
          if (activeOnly.length > 0) {
            setReviews(
              activeOnly.map((t: { name: string; role?: string; company?: string; location?: string; quote?: string; review?: string; content?: string }) => ({
                name: t.name,
                role: t.role || "Printing Press Client",
                company: t.company || t.location || "Verified Print Customer",
                review: t.quote || t.review || t.content || "",
              }))
            );
          }
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="relative overflow-hidden bg-background">
      {/* ============================================================ */}
      {/* 1. HERO SECTION (PrintPLANR Enterprise Style with Live Mockup) */}
      {/* ============================================================ */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden border-b border-border bg-gradient-to-b from-brand/5 via-surface/40 to-background">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Headlines & Value Prop */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3.5 py-1.5 text-xs font-semibold text-brand">
                <Sparkles className="size-3.5" />
                <span>Smart Printing Press Management ERP</span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground leading-[1.15] tracking-tight">
                Complete Printing Press Management Software for Modern Print Units
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Managing a printing press involves multiple interconnected steps—from customer inquiry
                and estimation to prepress, production, raw material inventory, and final dispatch.
                PrintoSync unifies your entire press floor under one intelligent, cloud-accessible platform.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-muted-foreground pt-2">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-brand" /> Offset &amp; Digital Ready
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-brand" /> Live Floor Job Cards
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-brand" /> Paper &amp; Ink Tracking
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-brand" /> GST Invoicing &amp; E-way Bills
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-4">
                <Link
                  href="/book-demo"
                  className="flex items-center justify-center gap-2 rounded-xl bg-brand px-7 py-3.5 text-sm font-bold text-brand-foreground shadow-md hover:opacity-90 active:scale-[0.99] transition"
                >
                  <Laptop className="size-4" />
                  <span>Book Free Live Demo</span>
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href="#workflow"
                  className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground hover:bg-muted/50 transition"
                >
                  <span>Explore 5-Stage Workflow</span>
                  <ChevronDown className="size-4" />
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Press Dashboard Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-border bg-card p-6 shadow-xl space-y-5">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                      PrintoSync Press Floor Monitor
                    </span>
                  </div>
                  <span className="rounded-md bg-brand/10 px-2 py-0.5 text-[10px] font-bold text-brand">
                    Live Status
                  </span>
                </div>

                {/* Real-time KPI Tiles */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl bg-surface p-3.5 border border-border/60">
                    <span className="text-[11px] text-muted-foreground block">Active Press Orders</span>
                    <span className="text-xl font-extrabold text-foreground font-display mt-0.5 block">48 Jobs</span>
                    <span className="text-[10px] text-emerald-600 font-medium">94% On Schedule</span>
                  </div>
                  <div className="rounded-xl bg-surface p-3.5 border border-border/60">
                    <span className="text-[11px] text-muted-foreground block">Paper Stock Status</span>
                    <span className="text-xl font-extrabold text-foreground font-display mt-0.5 block">320 Reams</span>
                    <span className="text-[10px] text-brand font-medium">Optimal Inventory</span>
                  </div>
                </div>

                {/* Job Card Live Queue Simulation */}
                <div className="space-y-2.5 pt-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                    Current Press Queue
                  </span>
                  <div className="rounded-xl bg-background p-3 border border-border flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-foreground">JC-849: 4-Color Pharma Carton</p>
                      <p className="text-[11px] text-muted-foreground">Heidelberg SM 74 · 25,000 Sheets</p>
                    </div>
                    <span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-[10px] font-bold text-blue-600">
                      Running (82%)
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-3 border border-border flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-foreground">JC-850: 16-Page Annual Report</p>
                      <p className="text-[11px] text-muted-foreground">Komori Lithrone 28 · Prepress Approved</p>
                    </div>
                    <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] font-bold text-amber-600">
                      Plates Ready
                    </span>
                  </div>
                </div>

                <div className="rounded-xl bg-linear-to-r from-brand/10 to-brand/5 p-3 text-xs text-foreground font-medium flex items-center justify-between">
                  <span>Want to see this configured for your press machines?</span>
                  <Link href="/book-demo" className="text-brand font-bold hover:underline">
                    View Demo →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* 2. 5-STAGE INTERACTIVE WORKFLOW PIPELINE (PrintPLANR Style) */}
      {/* ============================================================ */}
      <section id="workflow" className="py-16 lg:py-24 border-b border-border bg-surface/30">
        <Container>
          <div className="mx-auto max-w-3xl text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
              Connected Operations
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              Simplify Every Stage of Your Printing Press Workflow
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              A well-organized printing press workflow ensures every order moves through the right stages
              without bottlenecks, communication gaps, or costly floor re-work.
            </p>
          </div>

          {/* Stepper Tabs */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {workflowSteps.map((s) => {
              const Icon = s.icon;
              const isActive = activeStep === s.step;
              return (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => setActiveStep(s.step)}
                  className={`group relative rounded-2xl border p-4 text-left transition-all duration-200 ${
                    isActive
                      ? "border-brand bg-card shadow-md scale-[1.02]"
                      : "border-border bg-background hover:bg-card hover:border-brand/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-wider rounded-full px-2 py-0.5 ${
                        isActive
                          ? "bg-brand text-brand-foreground"
                          : "bg-muted text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {s.badge}
                    </span>
                    <Icon className={`size-4 ${isActive ? "text-brand" : "text-muted-foreground"}`} />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-foreground leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                    {s.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Stage Detailed Spotlight Box */}
          <div className="mt-6 rounded-3xl border border-brand/30 bg-card p-6 sm:p-10 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <Printer className="size-48" />
            </div>

            <div className="relative max-w-3xl space-y-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand uppercase tracking-wider">
                <CheckCircle2 className="size-4 text-brand" /> Detailed Step Guide
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
                {workflowSteps[activeStep - 1].step}. {workflowSteps[activeStep - 1].title} –{" "}
                <span className="text-brand font-bold">{workflowSteps[activeStep - 1].subtitle}</span>
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {workflowSteps[activeStep - 1].description}
              </p>

              <div className="pt-4 flex flex-wrap gap-4 text-xs font-semibold">
                <div className="flex items-center gap-2 rounded-xl bg-surface px-4 py-2 border border-border">
                  <CheckCircle2 className="size-3.5 text-brand" /> Zero Communication Gaps
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-surface px-4 py-2 border border-border">
                  <CheckCircle2 className="size-3.5 text-brand" /> Real-time Shop Floor Status
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-surface px-4 py-2 border border-border">
                  <CheckCircle2 className="size-3.5 text-brand" /> Direct Delivery Coordination
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* 3. 7 CORE MODULES & FEATURES (Grid with Full Benefit Checklist) */}
      {/* ============================================================ */}
      <section className="py-16 lg:py-24 border-b border-border bg-background">
        <Container>
          <div className="mx-auto max-w-3xl text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
              Integrated ERP Suite
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              Key Features of Our Printing Press ERP Software
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Efficient production, smarter material consumption, and simplified business accounting—all
              through one connected solution designed for commercial printing units.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.number}
                  className="group rounded-2xl border border-border bg-card p-6 shadow-xs hover:border-brand/40 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`flex size-11 items-center justify-center rounded-xl border ${feat.color}`}>
                        <Icon className="size-5" />
                      </span>
                      <span className="text-xs font-mono font-bold text-muted-foreground">
                        {feat.number}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground group-hover:text-brand transition-colors">
                        {feat.title}
                      </h3>
                      <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                        {feat.description}
                      </p>
                    </div>

                    <div className="border-t border-border/60 pt-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                        Key Capabilities:
                      </span>
                      <ul className="space-y-1.5 text-xs text-foreground/90">
                        {feat.benefits.map((b, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="size-3.5 text-brand shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Custom 8th Tile: Ready to see all modules? */}
            <div className="rounded-2xl border-2 border-dashed border-brand/40 bg-brand/5 p-6 flex flex-col justify-between text-center items-center">
              <div className="space-y-3 my-auto">
                <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-brand text-brand-foreground shadow-sm">
                  <Laptop className="size-6" />
                </span>
                <h3 className="font-display text-lg font-bold text-foreground">
                  Need a Custom Walkthrough?
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
                  We customize the workflow to your specific offset machines, digital presses, and post-press units.
                </p>
              </div>

              <Link
                href="/book-demo"
                className="w-full mt-4 flex items-center justify-center gap-2 rounded-xl bg-brand py-3 text-xs font-bold text-brand-foreground shadow-xs hover:opacity-90 transition"
              >
                <span>Schedule a 30-Min Demo</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* 4. PRINTING OPERATIONS SUITABILITY MATRIX                    */}
      {/* ============================================================ */}
      <section className="py-16 lg:py-24 border-b border-border bg-surface/30">
        <Container>
          <div className="mx-auto max-w-3xl text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
              Tailored for Your Press Type
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Designed for Different Printing Business Requirements
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Every printing press facility has unique production processes and machinery.
              PrintoSync adapts to your specialized printing sector.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {operationsSuitability.map((op) => {
              const Icon = op.icon;
              return (
                <div
                  key={op.title}
                  className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-3 hover:border-brand/30 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                      <Icon className="size-5" />
                    </span>
                    <span className="rounded-full bg-muted/60 px-2.5 py-0.5 text-[10px] font-bold text-muted-foreground">
                      {op.badge}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-bold text-foreground">
                    {op.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {op.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* 5. WHY CHOOSE OUR PRINTING PRESS MANAGEMENT SOLUTION?        */}
      {/* ============================================================ */}
      <section className="py-16 lg:py-24 border-b border-border bg-background">
        <Container>
          <div className="mx-auto max-w-3xl text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
              Proven Business Value
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Why Choose Our Printing Press Management Solution?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Choosing the right software used in printing press operations cuts administrative work,
              protects cash flow, and eliminates production panic.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {whyChoosePillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="rounded-2xl border border-border bg-card p-5 shadow-xs space-y-2.5"
                >
                  <span className="flex size-9 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <Icon className="size-4" />
                  </span>
                  <h3 className="text-sm font-bold text-foreground">
                    {p.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {p.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* 6. VERIFIED CUSTOMER REVIEWS & TESTIMONIALS                 */}
      {/* ============================================================ */}
      <section className="py-16 lg:py-24 border-b border-border bg-surface/30">
        <Container>
          <div className="mx-auto max-w-3xl text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
              Industry Trust
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              What Printing Press Owners Say About PrintoSync
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Real feedback from commercial press owners, production managers, and offset operators.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((r, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="size-3.5 fill-current" />
                      ))}
                    </div>
                    <Quote className="size-5 text-muted-foreground/30" />
                  </div>
                  <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed italic">
                    &ldquo;{r.review}&rdquo;
                  </p>
                </div>

                <div className="border-t border-border/60 pt-3 flex items-center gap-3">
                  <div className="size-9 rounded-full bg-brand/20 text-brand font-bold flex items-center justify-center text-xs">
                    {r.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground">{r.name}</h4>
                    <p className="text-[11px] text-brand font-medium">{r.role}</p>
                    <p className="text-[10px] text-muted-foreground">{r.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* 7. FREQUENTLY ASKED QUESTIONS (Accordion with Rich FAQ Schema)*/}
      {/* ============================================================ */}
      <section className="py-16 lg:py-24 border-b border-border bg-background">
        <Container className="max-w-4xl">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
              Got Questions?
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-muted-foreground">
              Everything you need to know about implementing printing press management software.
            </p>
          </div>

          <div className="divide-y divide-border rounded-2xl border border-border bg-card shadow-xs overflow-hidden">
            {faqs.map((faq, fIdx) => {
              const isOpen = openFaqIndex === fIdx;
              return (
                <div key={fIdx} className="transition-colors">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                    className="flex w-full items-center justify-between p-5 sm:p-6 text-left text-sm sm:text-base font-bold text-foreground hover:bg-muted/30 transition"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`size-4 text-muted-foreground transition-transform duration-200 shrink-0 ml-4 ${
                        isOpen ? "rotate-180 text-brand" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40 bg-muted/10">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* 8. HIGH-CONVERTING BOTTOM DEMO CTA BANNER                   */}
      {/* ============================================================ */}
      <section className="py-16 lg:py-20 bg-surface/50">
        <Container>
          <div className="rounded-3xl bg-linear-to-r from-brand via-brand/90 to-brand/75 p-8 sm:p-14 text-brand-foreground shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl space-y-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-xs px-3.5 py-1 text-xs font-bold text-white">
                <Sparkles className="size-3.5" />
                Live 1-on-1 Walkthrough
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                Ready to Upgrade Your Printing Press Operations?
              </h2>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                See how PrintoSync helps Indian offset, digital, and packaging units eliminate production
                confusion, track paper reels, and send GST bills in seconds.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
              <Link
                href="/book-demo"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-xs sm:text-sm font-bold text-brand shadow-lg hover:bg-white/95 active:scale-[0.99] transition"
              >
                <Laptop className="size-4" />
                <span>Book Free Demo</span>
                <ArrowRight className="size-4" />
              </Link>
              <a
                href="https://wa.me/919521308521?text=Hello%20PrintoSync%20team,%20I%20want%20to%20learn%20more%20about%20Printing%20Press%20Management%20Software."
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-4 text-xs sm:text-sm font-bold text-white hover:bg-white/20 transition backdrop-blur-xs"
              >
                <PhoneCall className="size-4" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
