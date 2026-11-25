"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calculator,
  FileText,
  TrendingUp,
  Sliders,
  Sparkles,
  PhoneCall,
  Laptop,
  ArrowRight,
  CheckCircle2,
  CheckCircle,
  FileCheck2,
  Clock,
  Star,
  Quote,
  ChevronDown,
  Check,
  Send,
  Layers,
  Building2,
  Maximize2,
  BookOpen,
  ChevronRight,
  ShieldCheck,
  Percent,
  RefreshCw,
  Eye,
  FileSpreadsheet,
} from "lucide-react";
import { Container } from "@/shared/ui/container";

interface EstimatePreset {
  id: string;
  name: string;
  category: string;
  defaultQty: number;
  basePaperRate: number;
  gsm: string;
  sheetSize: string;
  machineType: string;
}

const ESTIMATE_PRESETS: EstimatePreset[] = [
  {
    id: "brochure",
    name: "A4 Multi-Page Brochure (4 Pages)",
    category: "Commercial Offset",
    defaultQty: 2500,
    basePaperRate: 4.5,
    gsm: "170 GSM Gloss Art",
    sheetSize: "23 x 36 in (Full Demy)",
    machineType: "4-Color Heidelberg Speedmaster",
  },
  {
    id: "booklet",
    name: "Corporate Catalogue & Booklet (32 Pages)",
    category: "Publications & Catalogues",
    defaultQty: 1000,
    basePaperRate: 18.5,
    gsm: "130 GSM Inside + 300 GSM Cover",
    sheetSize: "20 x 30 in (Crown)",
    machineType: "5-Color Komori Lithrone",
  },
  {
    id: "packaging",
    name: "Cosmetic Monocarton Box",
    category: "Packaging Printing",
    defaultQty: 5000,
    basePaperRate: 5.8,
    gsm: "350 GSM Cyber Premium FBB",
    sheetSize: "28 x 40 in (Full Imperial)",
    machineType: "Offset Press + Die Cutter",
  },
  {
    id: "cards",
    name: "Luxury Velvet Business Cards",
    category: "Digital Print Shop",
    defaultQty: 1000,
    basePaperRate: 1.8,
    gsm: "350 GSM Art Board + Velvet Touch",
    sheetSize: "12 x 18 in (Digital SRA3)",
    machineType: "Konica Minolta AccurioPress",
  },
];

export function PrintingEstimatingContent() {
  // Interactive Simulator State
  const [selectedPreset, setSelectedPreset] = useState<EstimatePreset>(ESTIMATE_PRESETS[0]);
  const [quantity, setQuantity] = useState<number>(2500);
  const [paperCostPerUnit, setPaperCostPerUnit] = useState<number>(ESTIMATE_PRESETS[0].basePaperRate);
  const [laminationEnabled, setLaminationEnabled] = useState<boolean>(true);
  const [spotUvEnabled, setSpotUvEnabled] = useState<boolean>(false);
  const [bindingEnabled, setBindingEnabled] = useState<boolean>(true);
  const [profitMargin, setProfitMargin] = useState<number>(25);

  const handlePresetSelect = (preset: EstimatePreset) => {
    setSelectedPreset(preset);
    setQuantity(preset.defaultQty);
    setPaperCostPerUnit(preset.basePaperRate);
    if (preset.id === "booklet") {
      setLaminationEnabled(true);
      setBindingEnabled(true);
      setSpotUvEnabled(true);
    } else if (preset.id === "packaging") {
      setLaminationEnabled(true);
      setBindingEnabled(false);
      setSpotUvEnabled(true);
    } else {
      setLaminationEnabled(true);
      setBindingEnabled(false);
      setSpotUvEnabled(false);
    }
  };

  // Cost Calculations
  const paperAndPlateCost = Math.round(quantity * paperCostPerUnit);
  const printingLaborCost = Math.round(quantity * 0.85 + 800);
  const laminationCost = laminationEnabled ? Math.round(quantity * 0.9 + 400) : 0;
  const spotUvCost = spotUvEnabled ? Math.round(quantity * 0.75 + 600) : 0;
  const bindingCost = bindingEnabled ? Math.round(quantity * 1.1 + 500) : 0;
  const totalProductionCost =
    paperAndPlateCost + printingLaborCost + laminationCost + spotUvCost + bindingCost;
  const marginAmount = Math.round((totalProductionCost * profitMargin) / 100);
  const quotationSubtotal = totalProductionCost + marginAmount;
  const gstAmount = Math.round((quotationSubtotal * 18) / 100);
  const finalQuotePrice = quotationSubtotal + gstAmount;
  const unitPrice = (finalQuotePrice / quantity).toFixed(2);

  // FAQ Accordion
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // 6 Core Features from doc
  const coreFeatures = [
    {
      number: "01",
      title: "Faster Quote Generation",
      description:
        "Prepare customer quotations quickly without spending hours on manual calculations and repetitive data entry. Our print quoting software simplifies your workflow and helps you respond to customer inquiries faster.",
      benefits: [
        "Generate quotations in less time.",
        "Use predefined pricing structures and saved job specifications.",
        "Reduce repetitive data entry.",
        "Handle multiple customer inquiries efficiently.",
        "Modify estimates quickly when requirements change.",
        "Improve response time and customer satisfaction.",
      ],
    },
    {
      number: "02",
      title: "Accurate Cost Calculations",
      description:
        "Our print estimating software helps calculate the actual cost of every printing job by considering essential production expenses. Maintain better control over material consumption, operational costs, and overall job profitability.",
      benefits: [
        "Calculate paper and raw material expenses.",
        "Include ink, printing, and machine operating costs.",
        "Account for labour and production charges.",
        "Consider binding and finishing expenses.",
        "Include wastage and additional production costs.",
        "Improve pricing accuracy and cost visibility.",
      ],
    },
    {
      number: "03",
      title: "Flexible Pricing and Profit Margins",
      description:
        "Our print cost estimation software helps you evaluate different cost components, monitor material usage, and understand the expenses involved in every printing project.",
      benefits: [
        "Set customized pricing for different print products.",
        "Adjust rates according to order quantities.",
        "Configure markups and profit margins.",
        "Update material and production costs.",
        "Prepare competitive customer quotations.",
        "Maintain better control over business profitability.",
      ],
    },
    {
      number: "04",
      title: "Customized Printing Quotations",
      description:
        "Create professional quotations based on individual customer and project requirements. Manage different printing specifications while keeping pricing and job details organized.",
      benefits: [
        "Customize quotations for different print products.",
        "Select paper types, sizes, and GSM specifications.",
        "Include printing methods and colour options.",
        "Add binding, lamination, and finishing requirements.",
        "Modify quantities and job specifications.",
        "Prepare clear and organized customer estimates.",
      ],
    },
    {
      number: "05",
      title: "Simplified Quote Management",
      description:
        "Our commercial printing estimating software helps businesses manage different job specifications, production requirements, and cost components while preparing accurate customer quotations.",
      benefits: [
        "Maintain organized quotation records.",
        "Access previous estimates when required.",
        "Update quotations with revised pricing.",
        "Manage customer inquiries and follow-ups.",
        "Simplify repeat order processing.",
        "Improve coordination between sales and production teams.",
      ],
    },
    {
      number: "06",
      title: "Reduced Manual Errors",
      description:
        "Minimize calculation mistakes and repetitive administrative work with a more structured estimation process. Maintain consistent pricing and reduce the chances of overlooking important job expenses.",
      benefits: [
        "Reduce manual calculation errors.",
        "Minimize repetitive spreadsheet work.",
        "Maintain consistent pricing structures.",
        "Avoid overlooking production expenses.",
        "Simplify quotation revisions.",
        "Improve the reliability of customer estimates.",
      ],
    },
  ];

  // 4 Print Products from doc table
  const printProducts = [
    {
      title: "Brochures & Flyers",
      description: "Manage multiple sizes, paper options, printing requirements, and order quantities.",
      icon: Layers,
      badge: "Commercial Offset",
    },
    {
      title: "Catalogues & Booklets",
      description: "Estimate multi-page jobs with binding, paper consumption, and production costs.",
      icon: BookOpen,
      badge: "Multi-Page",
    },
    {
      title: "Business Cards",
      description: "Estimate costs based on paper quality, size, quantity, colour, and finishing.",
      icon: Building2,
      badge: "Short-Run & Digital",
    },
    {
      title: "Large-Format Printing",
      description: "Calculate costs for banners, posters, signage, and other oversized print products.",
      icon: Maximize2,
      badge: "Wide Format",
    },
  ];

  // 4-Step Quotation Workflow from doc
  const quotationSteps = [
    {
      step: "Step 1",
      title: "Enter Job Specifications",
      description: "Add product dimensions, quantity, paper type, printing method, and finishing requirements.",
      icon: Sliders,
    },
    {
      step: "Step 2",
      title: "Calculate Production Costs",
      description: "Evaluate the materials, machine operations, labour, wastage, and other expenses involved.",
      icon: Calculator,
    },
    {
      step: "Step 3",
      title: "Prepare the Quotation",
      description: "Generate a structured quotation with the required specifications, pricing, and applicable charges.",
      icon: FileSpreadsheet,
    },
    {
      step: "Step 4",
      title: "Review and Send",
      description: "Finalize the estimate, share it with your customer, and manage follow-ups efficiently.",
      icon: Send,
    },
  ];

  // 7 Why Choose Pillars from doc
  const whyChoosePillars = [
    {
      title: "Save time",
      description: "Reduce the time spent preparing estimates and calculating job costs manually.",
      icon: Clock,
    },
    {
      title: "Improve pricing accuracy",
      description: "Make pricing decisions using consistent cost calculations and predefined parameters.",
      icon: CheckCircle2,
    },
    {
      title: "Protect profit margins",
      description: "Understand job expenses before finalizing customer prices.",
      icon: Percent,
    },
    {
      title: "Handle more inquiries",
      description: "Respond to customer quotation requests without creating bottlenecks.",
      icon: TrendingUp,
    },
    {
      title: "Manage repeat orders",
      description: "Reuse previous job details and modify specifications for faster processing.",
      icon: RefreshCw,
    },
    {
      title: "Improve customer experience",
      description: "Deliver organized, professional, and timely quotations.",
      icon: Eye,
    },
    {
      title: "Scale operations",
      description: "Manage growing order volumes without unnecessarily increasing administrative work.",
      icon: ShieldCheck,
    },
  ];

  // Default FAQs from doc
  const defaultFaqs = [
    {
      question: "What is print estimation software?",
      answer:
        "It is a digital tool that helps printing businesses calculate job costs, manage product specifications, estimate production expenses, and prepare customer quotations. It reduces manual work and improves pricing consistency.",
    },
    {
      question: "How does estimating software help a printing business?",
      answer:
        "It automates repetitive calculations, organizes job specifications, speeds up quote preparation, minimizes pricing errors, and helps businesses understand production costs and profitability.",
    },
    {
      question: "Can I calculate costs for different printing products?",
      answer:
        "Yes, estimation systems can be configured for different print products, including business cards, brochures, flyers, books, catalogues, packaging, banners, and customized printing projects.",
    },
    {
      question: "Can I customize prices and profit margins?",
      answer:
        "Depending on the software's capabilities, you can configure material rates, production charges, labour, finishing costs, overheads, markups, and customer-specific pricing to suit your business requirements.",
    },
    {
      question: "Is printing estimation software suitable for small print shops?",
      answer:
        "Yes. Small print shops can use it to simplify daily calculations, generate professional quotations, reduce administrative work, and manage growing order volumes more efficiently.",
    },
  ];

  // Default Reviews from doc
  const defaultReviews = [
    {
      name: "Rajesh Sharma",
      role: "Printing Business Owner",
      company: "Commercial Offset Press, Jaipur",
      review:
        "Managing quotations used to take a lot of time, especially when handling multiple printing orders. This software has made our estimation process much faster and more organized. We can calculate costs easily and prepare quotes without unnecessary delays.",
    },
    {
      name: "Amit Verma",
      role: "Commercial Printer",
      company: "Verma Print Graphics, Ahmedabad",
      review:
        "One of the biggest advantages is being able to calculate printing costs more efficiently. It helps us consider different job requirements and maintain better control over pricing. A very useful solution for our daily printing operations.",
    },
    {
      name: "Neha Gupta",
      role: "Print Shop Manager",
      company: "PrintTech Solutions, New Delhi",
      review:
        "We wanted a simpler way to manage customer quotations, and this has made a noticeable difference. The process is much smoother, calculations are easier, and our team can focus more on customer service instead of repetitive paperwork.",
    },
    {
      name: "Vikram Mehta",
      role: "Printing Company Director",
      company: "Mehta Color Press, Surat",
      review:
        "Preparing quotations for different printing requirements is much more convenient now. We can manage job details more systematically, revise estimates when needed, and respond to customers faster. It has helped us improve our overall workflow.",
    },
    {
      name: "Sandeep Malhotra",
      role: "Print Production Manager",
      company: "Malhotra Print Works, Mumbai",
      review:
        "As our order volume increased, handling estimates manually became difficult. This solution has helped us streamline our pricing process, reduce manual effort, and manage print jobs more efficiently. It is a practical tool for any growing printing business.",
    },
  ];

  const [faqs, setFaqs] = useState(defaultFaqs);
  const [reviews, setReviews] = useState(defaultReviews);

  // Sync with Admin APIs if available
  useEffect(() => {
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

    fetch("/api/admin/testimonials")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.testimonials) && data.testimonials.length > 0) {
          const activeOnly = data.testimonials.filter(
            (t: { isActive?: boolean; name?: string }) => t.isActive !== false && t.name
          );
          if (activeOnly.length > 0) {
            setReviews(
              activeOnly.map(
                (t: {
                  name: string;
                  role?: string;
                  company?: string;
                  location?: string;
                  quote?: string;
                  review?: string;
                  content?: string;
                }) => ({
                  name: t.name,
                  role: t.role || "Printing Press Client",
                  company: t.company || t.location || "Verified Print Customer",
                  review: t.quote || t.review || t.content || "",
                })
              )
            );
          }
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="relative overflow-hidden bg-background text-foreground">
      {/* ============================================================ */}
      {/* BREADCRUMB (PrintPLANR Style)                                */}
      {/* ============================================================ */}
      <div className="border-b border-border bg-surface/40">
        <Container>
          <div className="py-3 flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition">
              Home
            </Link>
            <ChevronRight className="size-3" />
            <Link href="/services" className="hover:text-foreground transition">
              Modules
            </Link>
            <ChevronRight className="size-3" />
            <span className="font-semibold text-foreground truncate">
              Print Estimating Software
            </span>
          </div>
        </Container>
      </div>

      {/* ============================================================ */}
      {/* 1. HERO SECTION (PrintPLANR Split Layout)                    */}
      {/* ============================================================ */}
      <section className="relative pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-border bg-linear-to-b from-brand/5 via-background to-background">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand/10 via-transparent to-transparent pointer-events-none" />

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1 text-xs font-semibold text-brand shadow-xs">
                <Sparkles className="size-3.5" />
                <span>Smart Quotation Engine & Accurate Costing</span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                Print Estimating Software
              </h1>

              <div className="space-y-3.5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                <p>
                  Managing print orders, calculating costs, preparing quotations, and maintaining
                  profit margins can be challenging when everything is handled manually. A smarter
                  digital solution helps printing businesses simplify these tasks, improve pricing
                  accuracy, and respond to customer inquiries faster.
                </p>
                <p className="text-foreground/85 font-medium">
                  Our advanced printing estimation solution helps print shops, commercial printers,
                  and printing businesses streamline their quotation process, reduce repetitive
                  calculations, and maintain better control over job costs. Whether you handle
                  business cards, brochures, flyers, catalogues, packaging, or large-format printing,
                  you can create professional estimates with greater speed and confidence.
                </p>
                <p className="text-xs sm:text-sm italic">
                  With centralized pricing, flexible job specifications, and simplified workflows, you
                  can spend less time calculating prices and more time growing your printing business.
                </p>
              </div>

              {/* PrintPLANR High Value Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground">
                  <CheckCircle className="size-4 text-emerald-500 shrink-0" />
                  <span>Real-Time Pricing & Instant BOM</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground">
                  <CheckCircle className="size-4 text-emerald-500 shrink-0" />
                  <span>Lock & Safeguard Profit Margins</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground">
                  <CheckCircle className="size-4 text-emerald-500 shrink-0" />
                  <span>Predefined Paper & Machine Presets</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground">
                  <CheckCircle className="size-4 text-emerald-500 shrink-0" />
                  <span>1-Click PDF Quotation & WhatsApp Share</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/book-demo"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-xs sm:text-sm font-bold text-brand-foreground shadow-md hover:bg-brand/90 transition active:scale-[0.99]"
                >
                  <Laptop className="size-4" />
                  <span>Book Free Demo</span>
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href="#estimator-simulator"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-3.5 text-xs sm:text-sm font-semibold text-foreground hover:bg-muted transition"
                >
                  <Sliders className="size-4 text-brand" />
                  <span>Try Estimating Simulator</span>
                </a>
                <a
                  href="https://wa.me/919521308521?text=Hello%20PrintoSync%20team,%20I%20want%20to%20learn%20more%20about%20Print%20Estimating%20Software."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-background/80 px-4 py-3.5 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition"
                >
                  <PhoneCall className="size-4 text-emerald-500" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>

            {/* Right Screen Mockup (PrintPLANR Style) */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden relative">
                {/* macOS Style Bar */}
                <div className="bg-muted/70 px-4 py-3 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="size-2.5 rounded-full bg-red-400" />
                    <div className="size-2.5 rounded-full bg-amber-400" />
                    <div className="size-2.5 rounded-full bg-emerald-400" />
                    <span className="ml-2 text-[11px] font-semibold text-muted-foreground">
                      PrintoSync • Estimating Engine v2.4
                    </span>
                  </div>
                  <span className="text-[10px] font-mono rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 font-bold">
                    LIVE CALCULATION
                  </span>
                </div>

                <div className="p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border/60">
                    <div>
                      <div className="text-xs text-muted-foreground">Draft Quote #</div>
                      <div className="text-sm font-bold text-brand font-mono">EST-2026-1049</div>
                      <div className="text-[11px] text-muted-foreground">Multi-Page Brochure (A4)</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">Quantity</div>
                      <div className="text-sm font-bold text-foreground font-mono">2,500 Copies</div>
                      <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                        Ready to Send
                      </div>
                    </div>
                  </div>

                  {/* Production Breakdown */}
                  <div className="rounded-xl border border-border/80 bg-surface/50 p-3 space-y-2 text-xs">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Paper (170 GSM Gloss Art • 23x36 in):</span>
                      <span className="font-mono text-foreground font-medium">₹11,250</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>CTP Plates (4 Color Process):</span>
                      <span className="font-mono text-foreground font-medium">₹2,800</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Heidelberg Press Impressions:</span>
                      <span className="font-mono text-foreground font-medium">₹4,200</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Thermal Matte Lamination:</span>
                      <span className="font-mono text-foreground font-medium">₹2,650</span>
                    </div>
                    <div className="flex justify-between pt-1.5 border-t border-border/40 font-semibold text-foreground">
                      <span>Total Production Cost:</span>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400">₹20,900</span>
                    </div>
                  </div>

                  {/* Profit Margin & Customer Price */}
                  <div className="rounded-xl bg-brand/5 border border-brand/20 p-3.5 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground font-semibold">Configured Margin:</span>
                      <span className="text-xs font-bold text-brand font-mono">+25% Profit (₹5,225)</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-1 border-t border-brand/20">
                      <div>
                        <div className="text-xs text-muted-foreground font-semibold">Quoted Price (+18% GST):</div>
                        <div className="text-[11px] text-muted-foreground">Unit: ₹12.33 / Copy</div>
                      </div>
                      <div className="text-xl font-extrabold text-brand font-mono">₹30,828</div>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-xs">
                      <Send className="size-3.5" />
                      <span>Share Quote via WhatsApp</span>
                    </div>
                    <div className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-border text-foreground font-semibold text-xs bg-card">
                      <FileText className="size-3.5" />
                      <span>Download PDF</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* 2. STATS RIBBON (PrintPLANR Real Numbers Style)              */}
      {/* ============================================================ */}
      <section className="py-12 border-b border-border bg-surface/40">
        <Container>
          <div className="text-center space-y-1.5 mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
              Industry Trust
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">
              Trusted by the Industry – Backed by Real Numbers
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand font-display">
                800,000+
              </div>
              <p className="text-xs text-muted-foreground leading-snug">
                Quotes generated with faster turnaround times
              </p>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand font-display">
                92%
              </div>
              <p className="text-xs text-muted-foreground leading-snug">
                Users report fewer pricing errors and improved accuracy
              </p>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand font-display">
                400+
              </div>
              <p className="text-xs text-muted-foreground leading-snug">
                Businesses rely on PrintoSync daily for estimating workflows
              </p>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand font-display">
                200,000+
              </div>
              <p className="text-xs text-muted-foreground leading-snug">
                Job records securely stored for quick repeat quoting
              </p>
            </div>
            <div className="space-y-1 col-span-2 sm:col-span-1">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand font-display">
                99.9%
              </div>
              <p className="text-xs text-muted-foreground leading-snug">
                Reliable system uptime — quote anytime, anywhere
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* 3. KEY FEATURES (PrintPLANR Alternating Zig-Zag Rows)        */}
      {/* ============================================================ */}
      <section id="features" className="py-16 lg:py-24 border-b border-border bg-background">
        <Container>
          <div className="mx-auto max-w-3xl text-center space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
              Core Capabilities
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              Key Features Designed for Modern Printing Businesses
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Efficient workflows, reliable calculations, and better quotation management—all in one
              place.
            </p>
          </div>

          <div className="space-y-20 lg:space-y-28">
            {/* FEATURE 01: Faster Quote Generation */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full">
                  Feature 01
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                  1. Faster Quote Generation
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Prepare customer quotations quickly without spending hours on manual calculations and
                  repetitive data entry. Our print quoting software simplifies your workflow and helps
                  you respond to customer inquiries faster.
                </p>

                <div className="pt-2 space-y-2.5">
                  <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                    Key Benefits:
                  </span>
                  <ul className="space-y-2">
                    {coreFeatures[0].benefits.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                        <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* UI Mockup 1 */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border/70">
                    <div className="flex items-center gap-2">
                      <Clock className="size-4 text-blue-500" />
                      <span className="text-xs font-bold text-foreground">
                        Rapid Quotation Wizard
                      </span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      ⚡ 30-Second Turnaround
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between p-2 rounded-lg bg-surface">
                      <span className="text-muted-foreground">Template:</span>
                      <span className="font-semibold text-foreground">A4 8-Page Folded Brochure</span>
                    </div>
                    <div className="flex justify-between p-2 rounded-lg bg-surface">
                      <span className="text-muted-foreground">Paper Selection:</span>
                      <span className="text-foreground">170 GSM Art Paper (Autofill Rate)</span>
                    </div>
                    <div className="flex justify-between p-2 rounded-lg bg-surface">
                      <span className="text-muted-foreground">Plate Calculation:</span>
                      <span className="text-foreground">4 Plates (Cyan, Magenta, Yellow, Black)</span>
                    </div>
                    <div className="flex justify-between p-2 rounded-lg bg-surface">
                      <span className="text-muted-foreground">Output:</span>
                      <span className="font-bold text-brand">Auto-Prepared in 15 seconds</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-600 dark:text-blue-400 font-medium">
                    Predefined job specifications reduce customer wait times by up to 80%.
                  </div>
                </div>
              </div>
            </div>

            {/* FEATURE 02: Accurate Cost Calculations (Reversed) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* UI Mockup 2 on Left */}
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-xl space-y-3.5">
                  <div className="flex items-center justify-between pb-3 border-b border-border/70">
                    <div className="flex items-center gap-2">
                      <Calculator className="size-4 text-purple-500" />
                      <span className="text-xs font-bold text-foreground">
                        Comprehensive Job Costing Breakdown
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 font-bold">
                      Zero Hidden Costs
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-border/40">
                      <span className="text-muted-foreground">Raw Material (Paper Reams + Ink):</span>
                      <span className="font-mono font-medium text-foreground">₹14,500</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-border/40">
                      <span className="text-muted-foreground">Machine Runtime (Press Impressions):</span>
                      <span className="font-mono font-medium text-foreground">₹3,800</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-border/40">
                      <span className="text-muted-foreground">Post-Press Labour & Binding:</span>
                      <span className="font-mono font-medium text-foreground">₹2,400</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-border/40">
                      <span className="text-muted-foreground">Finishing (Thermal Lamination & Spot UV):</span>
                      <span className="font-mono font-medium text-foreground">₹3,900</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-border/40">
                      <span className="text-muted-foreground">Wastage Allowance (5% Standard):</span>
                      <span className="font-mono font-medium text-foreground">₹850</span>
                    </div>
                  </div>

                  <div className="pt-1 flex justify-between items-center text-xs">
                    <span className="font-bold text-foreground">True Production Cost:</span>
                    <span className="text-sm font-bold text-purple-600 dark:text-purple-400 font-mono">
                      ₹25,450
                    </span>
                  </div>
                </div>
              </div>

              {/* Text on Right */}
              <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-500 bg-purple-500/10 px-3 py-1 rounded-full">
                  Feature 02
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                  2. Accurate Cost Calculations
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Our print estimating software helps calculate the actual cost of every printing job by
                  considering essential production expenses. Maintain better control over material
                  consumption, operational costs, and overall job profitability.
                </p>

                <div className="pt-2 space-y-2.5">
                  <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                    Key Benefits:
                  </span>
                  <ul className="space-y-2">
                    {coreFeatures[1].benefits.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                        <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* FEATURE 03: Flexible Pricing and Profit Margins */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full">
                  Feature 03
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                  3. Flexible Pricing and Profit Margins
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Our print cost estimation software helps you evaluate different cost components,
                  monitor material usage, and understand the expenses involved in every printing
                  project.
                </p>

                <div className="pt-2 space-y-2.5">
                  <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                    Key Benefits:
                  </span>
                  <ul className="space-y-2">
                    {coreFeatures[2].benefits.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                        <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* UI Mockup 3 */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border/70">
                    <div className="flex items-center gap-2">
                      <Percent className="size-4 text-emerald-500" />
                      <span className="text-xs font-bold text-foreground">
                        Profit Margin & Sizing Slider
                      </span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      Configurable
                    </span>
                  </div>

                  <div className="p-4 rounded-xl border border-border bg-surface space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-medium text-muted-foreground">Commercial Margin:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono text-sm">
                        30% Target
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: "65%" }} />
                    </div>
                    <div className="flex justify-between text-[11px] text-muted-foreground">
                      <span>Low (10%)</span>
                      <span>Target (30%)</span>
                      <span>Premium (50%)</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Production Base Cost:</span>
                      <span className="font-mono text-foreground">₹20,000</span>
                    </div>
                    <div className="flex justify-between font-semibold text-emerald-600 dark:text-emerald-400">
                      <span>Profit Contribution:</span>
                      <span className="font-mono">+₹6,000</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-border font-bold">
                      <span className="text-foreground">Net Selling Price:</span>
                      <span className="font-mono text-foreground text-sm">₹26,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FEATURE 04: Customized Printing Quotations (Reversed) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* UI Mockup 4 on Left */}
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border/70">
                    <div className="flex items-center gap-2">
                      <Sliders className="size-4 text-amber-500" />
                      <span className="text-xs font-bold text-foreground">
                        Job Specs & Finishing Configurator
                      </span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      Full Flexibility
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg border border-border bg-surface">
                      <div className="text-[10px] text-muted-foreground">Paper GSM</div>
                      <div className="font-bold text-foreground mt-0.5">350 GSM Board</div>
                    </div>
                    <div className="p-2.5 rounded-lg border border-border bg-surface">
                      <div className="text-[10px] text-muted-foreground">Sheet Size</div>
                      <div className="font-bold text-foreground mt-0.5">23 x 36 Full Demy</div>
                    </div>
                    <div className="p-2.5 rounded-lg border border-border bg-surface">
                      <div className="text-[10px] text-muted-foreground">Printing Colors</div>
                      <div className="font-bold text-foreground mt-0.5">4+4 Front & Back</div>
                    </div>
                    <div className="p-2.5 rounded-lg border border-border bg-surface">
                      <div className="text-[10px] text-muted-foreground">Finishing Add-ons</div>
                      <div className="font-bold text-foreground mt-0.5">Thermal Matte + Foil</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-600 dark:text-amber-400">
                    Every job specification is formatted into a polished, professional client proposal.
                  </div>
                </div>
              </div>

              {/* Text on Right */}
              <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">
                  Feature 04
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                  4. Customized Printing Quotations
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Create professional quotations based on individual customer and project requirements.
                  Manage different printing specifications while keeping pricing and job details
                  organized.
                </p>

                <div className="pt-2 space-y-2.5">
                  <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                    Key Benefits:
                  </span>
                  <ul className="space-y-2">
                    {coreFeatures[3].benefits.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                        <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* FEATURE 05: Simplified Quote Management */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-500 bg-cyan-500/10 px-3 py-1 rounded-full">
                  Feature 05
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                  5. Simplified Quote Management
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Our commercial printing estimating software helps businesses manage different job
                  specifications, production requirements, and cost components while preparing
                  accurate customer quotations.
                </p>

                <div className="pt-2 space-y-2.5">
                  <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                    Key Benefits:
                  </span>
                  <ul className="space-y-2">
                    {coreFeatures[4].benefits.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                        <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* UI Mockup 5 */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-xl space-y-3.5">
                  <div className="flex items-center justify-between pb-3 border-b border-border/70">
                    <div className="flex items-center gap-2">
                      <FileCheck2 className="size-4 text-cyan-500" />
                      <span className="text-xs font-bold text-foreground">Quote Archive & Revision Log</span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-bold">
                      History Preserved
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-3 rounded-xl border border-border bg-surface flex justify-between items-center">
                      <div>
                        <div className="font-bold text-foreground">Estimate #EST-1049 (Rev 2)</div>
                        <div className="text-[11px] text-muted-foreground">Qty revised: 5,000 $\rightarrow$ 10,000</div>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                        Active Quote
                      </span>
                    </div>

                    <div className="p-3 rounded-xl border border-border bg-surface flex justify-between items-center">
                      <div>
                        <div className="font-bold text-foreground">Estimate #EST-1049 (Rev 1)</div>
                        <div className="text-[11px] text-muted-foreground">Initial inquiry: 5,000 copies</div>
                      </div>
                      <span className="text-[11px] font-medium text-muted-foreground">Archived</span>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-between items-center text-xs text-muted-foreground">
                    <span>1-Click Reorder / Repeat Jobs Enabled</span>
                    <span className="font-bold text-brand">Zero Data Entry</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FEATURE 06: Reduced Manual Errors (Reversed) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* UI Mockup 6 on Left */}
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border/70">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="size-4 text-rose-500" />
                      <span className="text-xs font-bold text-foreground">
                        Automated Validation & Formula Guard
                      </span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400">
                      Zero Error
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-surface text-foreground">
                      <CheckCircle className="size-4 text-emerald-500 shrink-0" />
                      <span>Automatic cutting sheet grain & wastage verification</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-surface text-foreground">
                      <CheckCircle className="size-4 text-emerald-500 shrink-0" />
                      <span>Locked minimum margin protection alert before dispatch</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-surface text-foreground">
                      <CheckCircle className="size-4 text-emerald-500 shrink-0" />
                      <span>Consistent machine run-hour rates across sales team</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-600 dark:text-rose-400 font-medium">
                    Eliminates costly spreadsheet copy-paste errors and underpriced print jobs.
                  </div>
                </div>
              </div>

              {/* Text on Right */}
              <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-500 bg-rose-500/10 px-3 py-1 rounded-full">
                  Feature 06
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                  6. Reduced Manual Errors
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Minimize calculation mistakes and repetitive administrative work with a more
                  structured estimation process. Maintain consistent pricing and reduce the chances of
                  overlooking important job expenses.
                </p>

                <div className="pt-2 space-y-2.5">
                  <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                    Key Benefits:
                  </span>
                  <ul className="space-y-2">
                    {coreFeatures[5].benefits.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                        <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* 4. A COMPLETE SOLUTION FOR DIFFERENT PRINTING REQUIREMENTS   */}
      {/* ============================================================ */}
      <section className="py-16 lg:py-24 border-b border-border bg-surface/30">
        <Container>
          <div className="mx-auto max-w-3xl text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
              Versatile Print Estimation
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              A Complete Solution for Different Printing Requirements
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Manage diverse printing jobs with flexibility and greater cost visibility.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {printProducts.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-border bg-card p-6 shadow-xs hover:border-brand/40 hover:shadow-md transition flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="size-11 rounded-xl bg-brand/10 text-brand flex items-center justify-center">
                        <Icon className="size-5" />
                      </div>
                      <span className="text-[10px] font-bold rounded-full bg-muted px-2.5 py-0.5 text-muted-foreground">
                        {p.badge}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-foreground">{p.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Concluding Paragraph Callout from Document */}
          <div className="mt-10 rounded-2xl border border-border bg-card p-6 text-center max-w-3xl mx-auto shadow-xs">
            <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-medium">
              From short-run digital jobs to bulk offset printing, the system gives your business
              flexibility to manage different product specifications and pricing requirements without
              relying on disconnected tools.
            </p>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* 5. 4-STEP QUOTATION WORKFLOW (PrintPLANR Timeline Style)     */}
      {/* ============================================================ */}
      <section className="py-16 lg:py-24 border-b border-border bg-background">
        <Container>
          <div className="mx-auto max-w-3xl text-center space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
              End-To-End Process
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              Improve Your Quotation Workflow from Start to Finish
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              An efficient quotation process helps your business respond faster, manage customer
              expectations, and convert inquiries into confirmed orders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quotationSteps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-border bg-card p-6 shadow-xs hover:border-brand/40 transition space-y-3 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <div className="size-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center font-bold">
                      <Icon className="size-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-brand">{s.step}</span>
                  </div>
                  <h3 className="text-base font-bold text-foreground">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {s.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* 6. INTERACTIVE LIVE ESTIMATING SIMULATOR                     */}
      {/* ============================================================ */}
      <section id="estimator-simulator" className="py-16 lg:py-24 border-b border-border bg-surface/30">
        <Container>
          <div className="mx-auto max-w-3xl text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
              Interactive Tool
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              Live Printing Estimating & Costing Simulator
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Test how PrintoSync calculates raw material, press runtime, finishing add-ons, and
              margins in real time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Controls */}
            <div className="lg:col-span-7 space-y-6 rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between border-b border-border/80 pb-4">
                <div className="flex items-center gap-2">
                  <Sliders className="size-5 text-brand" />
                  <h3 className="text-base font-bold text-foreground">Job Estimation Specs</h3>
                </div>
                <span className="text-xs text-muted-foreground">Dynamic Pricing</span>
              </div>

              {/* Preset Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">Choose Print Product</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ESTIMATE_PRESETS.map((p) => {
                    const isSelected = selectedPreset.id === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handlePresetSelect(p)}
                        className={`text-left p-3 rounded-xl border text-xs font-medium transition ${
                          isSelected
                            ? "border-brand bg-brand/10 text-brand shadow-xs"
                            : "border-border hover:bg-muted text-foreground"
                        }`}
                      >
                        <div className="font-bold truncate">{p.name}</div>
                        <div className="text-[11px] text-muted-foreground mt-0.5">{p.category}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-2 pt-1">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-muted-foreground">Print Quantity</span>
                  <span className="text-sm font-bold text-brand">
                    {quantity.toLocaleString("en-IN")} copies
                  </span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={25000}
                  step={500}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full accent-brand cursor-pointer"
                />
              </div>

              {/* Paper Cost / Unit */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-muted-foreground">Paper & Raw Material Rate / Unit</span>
                  <span className="text-sm font-bold text-foreground">₹{paperCostPerUnit.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min={1.0}
                  max={25.0}
                  step={0.5}
                  value={paperCostPerUnit}
                  onChange={(e) => setPaperCostPerUnit(Number(e.target.value))}
                  className="w-full accent-brand cursor-pointer"
                />
              </div>

              {/* Finishing Addons */}
              <div className="space-y-2.5 pt-1">
                <label className="text-xs font-semibold text-muted-foreground">Post-Press Finishing</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setLaminationEnabled(!laminationEnabled)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs font-medium transition ${
                      laminationEnabled
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "border-border text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <span>Thermal Lamination</span>
                    <Check className={`size-3.5 ${laminationEnabled ? "opacity-100" : "opacity-0"}`} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setSpotUvEnabled(!spotUvEnabled)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs font-medium transition ${
                      spotUvEnabled
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "border-border text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <span>Spot UV Finish</span>
                    <Check className={`size-3.5 ${spotUvEnabled ? "opacity-100" : "opacity-0"}`} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setBindingEnabled(!bindingEnabled)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs font-medium transition ${
                      bindingEnabled
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "border-border text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <span>Binding / Die-Cut</span>
                    <Check className={`size-3.5 ${bindingEnabled ? "opacity-100" : "opacity-0"}`} />
                  </button>
                </div>
              </div>

              {/* Margin Slider */}
              <div className="space-y-2 pt-1">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-muted-foreground">Target Profit Margin</span>
                  <span className="text-sm font-bold text-brand">{profitMargin}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={50}
                  step={5}
                  value={profitMargin}
                  onChange={(e) => setProfitMargin(Number(e.target.value))}
                  className="w-full accent-brand cursor-pointer"
                />
              </div>
            </div>

            {/* Right Output: 5 cols */}
            <div className="lg:col-span-5 rounded-2xl border border-brand/30 bg-card p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-brand text-brand-foreground text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                Real-Time Estimate
              </div>

              <div className="space-y-4">
                <div className="border-b border-border/80 pb-3">
                  <div className="flex items-center gap-2">
                    <FileText className="size-5 text-brand" />
                    <div>
                      <h4 className="text-sm font-bold text-foreground">Estimate Summary</h4>
                      <p className="text-[11px] text-muted-foreground font-mono">Job: {selectedPreset.name}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-muted/40 p-3 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Stock & GSM:</span>
                    <span className="font-semibold text-foreground">{selectedPreset.gsm}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sheet Size:</span>
                    <span className="text-foreground">{selectedPreset.sheetSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Machine Allocated:</span>
                    <span className="text-foreground">{selectedPreset.machineType}</span>
                  </div>
                </div>

                {/* Costs */}
                <div className="space-y-1.5 text-xs border-b border-border/80 pb-3">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Paper & Plates:</span>
                    <span className="font-mono text-foreground font-medium">
                      ₹{paperAndPlateCost.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Press Runtime & Labor:</span>
                    <span className="font-mono text-foreground font-medium">
                      ₹{printingLaborCost.toLocaleString("en-IN")}
                    </span>
                  </div>
                  {laminationEnabled && (
                    <div className="flex justify-between text-muted-foreground">
                      <span>Lamination:</span>
                      <span className="font-mono text-foreground">+₹{laminationCost.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  {spotUvEnabled && (
                    <div className="flex justify-between text-muted-foreground">
                      <span>Spot UV:</span>
                      <span className="font-mono text-foreground">+₹{spotUvCost.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  {bindingEnabled && (
                    <div className="flex justify-between text-muted-foreground">
                      <span>Binding / Punching:</span>
                      <span className="font-mono text-foreground">+₹{bindingCost.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-1 border-t border-border/40 font-semibold text-foreground">
                    <span>Production Base Cost:</span>
                    <span className="font-mono">₹{totalProductionCost.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>Profit Margin ({profitMargin}%):</span>
                    <span className="font-mono">+₹{marginAmount.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Final Price */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <span className="text-sm font-bold text-foreground">Total Quoted Amount:</span>
                      <div className="text-[11px] text-muted-foreground">(Incl. 18% GST ₹{gstAmount.toLocaleString("en-IN")})</div>
                    </div>
                    <span className="font-mono text-xl font-extrabold text-brand">
                      ₹{finalQuotePrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground flex justify-between pt-1 border-t border-border/50">
                    <span>Per Copy Cost:</span>
                    <span className="font-mono font-bold text-foreground">₹{unitPrice} / pc</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://wa.me/919521308521?text=Hello%20PrintoSync,%20I%20used%20your%20Print%20Estimating%20Simulator%20and%20want%20a%20full%20walkthrough."
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 transition shadow-xs w-full"
                  >
                    <Send className="size-3.5" />
                    <span>Send Estimate on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* 7. WHY CHOOSE OUR PRINTING ESTIMATION SOLUTION?             */}
      {/* ============================================================ */}
      <section className="py-16 lg:py-24 border-b border-border bg-background">
        <Container>
          <div className="mx-auto max-w-3xl text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
              Strategic Advantages
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              Why Choose Our Printing Estimation Solution?
            </h2>
            <div className="text-sm sm:text-base text-muted-foreground space-y-2">
              <p>
                The right software can make a significant difference in how your print business manages
                customer inquiries, pricing, and daily operations.
              </p>
              <p className="text-foreground/80 font-medium">
                Choosing the right estimating software for printing companies can help transform the way
                you manage quotations, pricing, and print production expenses.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoosePillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-border bg-card p-6 shadow-xs hover:border-brand/40 transition space-y-3"
                >
                  <div className="size-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {p.description}
                  </p>
                </div>
              );
            })}

            {/* Final Highlight Card */}
            <div className="rounded-2xl border border-brand/30 bg-linear-to-br from-brand/10 via-card to-card p-6 shadow-xs flex flex-col justify-center space-y-2">
              <span className="text-xs font-bold text-brand uppercase tracking-wider">
                Revenue Growth
              </span>
              <h3 className="text-base font-bold text-foreground">Win More Competitive Bids</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Instant quotes allow you to close deals before competitors can even open their spreadsheets.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* 8. VERIFIED CUSTOMER REVIEWS (Admin Synced)                  */}
      {/* ============================================================ */}
      <section className="py-16 lg:py-24 border-b border-border bg-surface/30">
        <Container>
          <div className="mx-auto max-w-3xl text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
              Industry Trust
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              What Printing Press Owners Say About PrintoSync Estimating
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Real feedback from commercial press owners, offset printers, and production managers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    {r.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
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
      {/* 9. FREQUENTLY ASKED QUESTIONS (Accordion & Admin Sync)       */}
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
              Everything you need to know about implementing print estimating software.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card shadow-xs overflow-hidden">
            {faqs.map((faq, fIdx) => {
              const isOpen = openFaqIndex === fIdx;
              return (
                <div key={fIdx} className="border-b border-border last:border-b-0 transition-colors">
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
      {/* 10. HIGH-CONVERTING BOTTOM DEMO CTA BANNER                   */}
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
                Ready to Upgrade Your Print Quotation Process?
              </h2>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                Join hundreds of offset, digital, and commercial printing businesses across India who
                calculate costs in seconds, safeguard profit margins, and deliver professional
                quotations with PrintoSync.
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
                href="https://wa.me/919521308521?text=Hello%20PrintoSync%20team,%20I%20want%20to%20learn%20more%20about%20Print%20Estimating%20Software."
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
