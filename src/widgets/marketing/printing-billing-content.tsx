"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Receipt,
  Calculator,
  Users,
  CreditCard,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Laptop,
  Building2,
  Printer,
  PackageCheck,
  ShieldCheck,
  Layers,
  Clock,
  Star,
  Quote,
  ChevronDown,
  Check,
  Send,
  Sliders,
  Briefcase,
  FileSpreadsheet,
} from "lucide-react";
import { Container } from "@/shared/ui/container";

interface JobPreset {
  id: string;
  name: string;
  category: string;
  baseSheets: number;
  baseRatePerSheet: number;
  hsnCode: string;
  defaultGsm: string;
}

const JOB_PRESETS: JobPreset[] = [
  {
    id: "brochure",
    name: "Multi-Page Brochure (A4 4-Page)",
    category: "Commercial Offset",
    baseSheets: 2500,
    baseRatePerSheet: 4.8,
    hsnCode: "4911.10.10",
    defaultGsm: "170 GSM Gloss Art Paper",
  },
  {
    id: "packaging",
    name: "Folding Mono-Carton (Cosmetics)",
    category: "Packaging Press",
    baseSheets: 5000,
    baseRatePerSheet: 6.2,
    hsnCode: "4819.20.20",
    defaultGsm: "350 GSM Cyber FBB Board",
  },
  {
    id: "cards",
    name: "Corporate Visiting Cards (Velvet)",
    category: "Digital Print Shop",
    baseSheets: 1000,
    baseRatePerSheet: 1.75,
    hsnCode: "4911.99.90",
    defaultGsm: "350 GSM Royal Velvet Matte",
  },
  {
    id: "flyer",
    name: "Promotional Product Leaflet",
    category: "Short-Run Commercial",
    baseSheets: 5000,
    baseRatePerSheet: 2.1,
    hsnCode: "4911.10.20",
    defaultGsm: "130 GSM Art Paper",
  },
];

export function PrintingBillingContent() {
  // Simulator State
  const [selectedPreset, setSelectedPreset] = useState<JobPreset>(JOB_PRESETS[0]);
  const [sheetQuantity, setSheetQuantity] = useState<number>(2500);
  const [paperRatePerSheet, setPaperRatePerSheet] = useState<number>(JOB_PRESETS[0].baseRatePerSheet);
  const [laminationEnabled, setLaminationEnabled] = useState<boolean>(true);
  const [spotUvEnabled, setSpotUvEnabled] = useState<boolean>(false);
  const [diePunchingEnabled, setDiePunchingEnabled] = useState<boolean>(true);
  const [gstRate, setGstRate] = useState<number>(18);
  const [advancePaidPercent, setAdvancePaidPercent] = useState<number>(40);

  // When preset changes, update defaults
  const handlePresetChange = (preset: JobPreset) => {
    setSelectedPreset(preset);
    setSheetQuantity(preset.baseSheets);
    setPaperRatePerSheet(preset.baseRatePerSheet);
    if (preset.id === "packaging") {
      setLaminationEnabled(true);
      setDiePunchingEnabled(true);
      setSpotUvEnabled(true);
    } else if (preset.id === "cards") {
      setLaminationEnabled(true);
      setDiePunchingEnabled(false);
      setSpotUvEnabled(false);
    } else {
      setLaminationEnabled(true);
      setDiePunchingEnabled(false);
      setSpotUvEnabled(false);
    }
  };

  // Calculations
  const printPrintingCharge = Math.round(sheetQuantity * paperRatePerSheet);
  const laminationCost = laminationEnabled ? Math.round(sheetQuantity * 0.95) : 0;
  const spotUvCost = spotUvEnabled ? Math.round(sheetQuantity * 0.85 + 600) : 0;
  const diePunchingCost = diePunchingEnabled ? Math.round(sheetQuantity * 0.65 + 750) : 0;
  const taxableSubtotal = printPrintingCharge + laminationCost + spotUvCost + diePunchingCost;
  const gstAmount = Math.round((taxableSubtotal * gstRate) / 100);
  const cgstAmount = Math.round(gstAmount / 2);
  const sgstAmount = gstAmount - cgstAmount;
  const netTotal = taxableSubtotal + gstAmount;
  const advanceAmount = Math.round((netTotal * advancePaidPercent) / 100);
  const balanceDue = netTotal - advanceAmount;

  // Active FAQ accordion
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // 8 Billing Activities from doc
  const billingActivities = [
    {
      id: "invoice-gen",
      title: "Invoice Generation",
      description: "Create professional invoices for printing orders with itemized print specs.",
      icon: Receipt,
      accent: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    },
    {
      id: "quote-mgmt",
      title: "Quotation Management",
      description: "Prepare estimates and convert approved quotations into invoices with 1-click.",
      icon: Calculator,
      accent: "text-purple-500 bg-purple-500/10 border-purple-500/20",
    },
    {
      id: "cust-mgmt",
      title: "Customer Management",
      description: "Maintain customer details, GST numbers, contact persons, and billing history.",
      icon: Users,
      accent: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      id: "pay-track",
      title: "Payment Tracking",
      description: "Monitor received payments, part-payments, and outstanding ledger balances.",
      icon: CreditCard,
      accent: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    },
    {
      id: "tax-mgmt",
      title: "Tax Management",
      description: "Apply GST (CGST/SGST/IGST), SAC/HSN codes, and manage tax-related billing details.",
      icon: ShieldCheck,
      accent: "text-rose-500 bg-rose-500/10 border-rose-500/20",
    },
    {
      id: "exp-track",
      title: "Expense Tracking",
      description: "Record business expenses, plate costs, ink batches, and operational press costs.",
      icon: TrendingUp,
      accent: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
    },
    {
      id: "sales-rec",
      title: "Sales Records",
      description: "Maintain organized sales registers, customer ledgers, and transaction information.",
      icon: FileSpreadsheet,
      accent: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
    },
    {
      id: "fin-rep",
      title: "Financial Reporting",
      description: "Review sales summaries, daily collections, invoices, and pending payment records.",
      icon: BarChart3,
      accent: "text-orange-500 bg-orange-500/10 border-orange-500/20",
    },
  ];

  // 7 Core Features from doc
  const coreFeatures = [
    {
      number: "01",
      title: "Easy Invoice Generation",
      description:
        "Create professional invoices for different printing jobs with minimal manual effort.",
      icon: FileText,
      accent: "text-blue-500 bg-blue-500/10 border-blue-500/20",
      benefits: [
        "Generate invoices for printing orders seamlessly",
        "Add product details, quantities, and custom prices",
        "Include additional charges, plate making, and discounts",
        "Calculate invoice totals automatically with zero error",
        "Reduce manual paperwork and repetitive billing mistakes",
      ],
    },
    {
      number: "02",
      title: "Faster Quotation-to-Billing Process",
      description:
        "Simplify the process of converting customer quotations into final invoices without re-typing.",
      icon: Briefcase,
      accent: "text-purple-500 bg-purple-500/10 border-purple-500/20",
      benefits: [
        "Prepare and manage customer quotations with speed",
        "Maintain previous estimate records and revisions",
        "Convert approved quotations into invoices with 1-click",
        "Update prices instantly when order quantities or specs change",
        "Eliminate duplicate data entry across departments",
      ],
    },
    {
      number: "03",
      title: "Accurate Printing Cost Calculations",
      description:
        "Organize material, production, labour, and finishing costs for more accurate and profitable billing.",
      icon: Calculator,
      accent: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
      benefits: [
        "Calculate accurate costs based on order quantities and sheet size",
        "Include paper stock, ink, plate making, and machine charges",
        "Add binding, lamination, die-punching, and finishing expenses",
        "Apply volume discounts and transparent additional charges",
        "Calculate multi-slab taxes and final invoice totals automatically",
      ],
    },
    {
      number: "04",
      title: "Customer and Payment Management",
      description:
        "Keep customer details, invoices, and payment records organized in one centralized ledger.",
      icon: Users,
      accent: "text-amber-500 bg-amber-500/10 border-amber-500/20",
      benefits: [
        "Maintain comprehensive customer and billing profile details",
        "Access previous invoices, job tickets, and transaction history",
        "Track paid, partially paid, and overdue invoices in real-time",
        "Record partial advances and post-delivery full payments",
        "Monitor outstanding client balances with aging reminders",
      ],
    },
    {
      number: "05",
      title: "GST Billing and Tax Management",
      description:
        "Prepare tax-compliant invoices with organized GST details, HSN codes, and auto-computed taxes.",
      icon: ShieldCheck,
      accent: "text-rose-500 bg-rose-500/10 border-rose-500/20",
      benefits: [
        "Apply applicable GST rates (5%, 12%, 18%, 28%) with HSN auto-fill",
        "Calculate intra-state CGST + SGST or inter-state IGST automatically",
        "Display itemized tax breakdowns clearly on printed & PDF bills",
        "Maintain organized tax records ready for GSTR-1 and GSTR-3B audit filing",
        "Include customizable cash discounts, round-offs, and shipping charges",
      ],
    },
    {
      number: "06",
      title: "Sales and Expense Tracking",
      description:
        "Monitor business income, daily shop-floor billing, and operational expenses with organized records.",
      icon: TrendingUp,
      accent: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
      benefits: [
        "Maintain daily sales registers and cash vs credit collections",
        "Record printing press expenses (paper reels, plates, machine maintenance)",
        "Track customer payment receipts against specific invoice numbers",
        "Review chronological invoice and transaction histories anytime",
        "Monitor gross income and operational running costs to protect margins",
      ],
    },
    {
      number: "07",
      title: "Billing Reports and Business Insights",
      description:
        "Review financial activity through organized visual reports that support smarter business decisions.",
      icon: BarChart3,
      accent: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
      benefits: [
        "Generate daily, weekly, and monthly sales performance reports",
        "Review invoice registers, credit notes, and collection records",
        "Monitor overdue and outstanding customer payments by aging bracket",
        "Analyze job-wise transaction history and profit contributions",
        "View customer-wise and product-wise revenue share analytics",
      ],
    },
  ];

  // 4 Business Types from doc
  const businessTypes = [
    {
      title: "Offset Printing Businesses",
      description:
        "Manage invoices for bulk printing orders, brochures, books, magazines, catalogues, and commercial projects.",
      badge: "Commercial Offset",
      icon: Printer,
      highlights: [
        "Multi-plate costing & press running charges",
        "Bulk paper ream & sheet consumption billing",
        "Binding, folding, and post-press addon breakdown",
      ],
    },
    {
      title: "Digital Printing Shops",
      description:
        "Prepare bills for customized printing, short-run orders, documents, photographs, and promotional materials.",
      badge: "Quick Turnaround",
      icon: Laptop,
      highlights: [
        "Click-rate & impression-based rapid invoicing",
        "Instant counter receipt & UPI QR payment codes",
        "Variable-data print job itemization",
      ],
    },
    {
      title: "Packaging Printing Businesses",
      description:
        "Organize billing for printed boxes, labels, packaging materials, and customized packaging projects.",
      badge: "Boxes & Cartons",
      icon: PackageCheck,
      highlights: [
        "Die development & embossing charges itemization",
        "Multi-stage lamination and window pasting billing",
        "Delivery challan to batch GST invoice reconciliation",
      ],
    },
    {
      title: "Commercial Print Shops",
      description:
        "Manage customer invoices for banners, posters, signage, flyers, business cards, and other print products.",
      badge: "Retail & Commercial",
      icon: Building2,
      highlights: [
        "Square-inch & square-feet large format pricing",
        "Mounting, framing, and installation billing",
        "Corporate monthly ledger billing & statements",
      ],
    },
  ];

  // 7 Why Choose Advantages from doc
  const whyChooseAdvantages = [
    {
      title: "Time-Saving Invoicing",
      description: "Generate customer bills faster with organized billing workflows and 1-click presets.",
      icon: Clock,
    },
    {
      title: "Improved Accuracy",
      description: "Reduce manual calculations and minimize costly billing and tax rate errors.",
      icon: CheckCircle2,
    },
    {
      title: "Better Payment Tracking",
      description: "Maintain real-time visibility into received payments, advances, and outstanding balances.",
      icon: CreditCard,
    },
    {
      title: "Organized Records",
      description: "Keep all customer invoices, delivery challans, and transaction details digitally accessible.",
      icon: Layers,
    },
    {
      title: "Simplified Tax Calculations",
      description: "Manage applicable GST, CGST, SGST, IGST, and HSN codes automatically without stress.",
      icon: ShieldCheck,
    },
    {
      title: "Financial Visibility",
      description: "Review comprehensive sales, expenses, and payment collection information on live dashboards.",
      icon: BarChart3,
    },
    {
      title: "Business Efficiency",
      description: "Spend less time on paperwork and more time managing and growing your printing operations.",
      icon: TrendingUp,
    },
  ];

  // Default FAQs from doc
  const defaultFaqs = [
    {
      question: "What is printing press billing software?",
      answer:
        "It is a digital solution that helps printing businesses generate invoices, manage customer payments, calculate printing charges, maintain transaction records, and organize daily billing activities in one structured system.",
    },
    {
      question: "Can I generate GST invoices for printing orders?",
      answer:
        "Yes, depending on the software's capabilities, you can generate invoices with applicable GST rates, tax calculations, customer billing details, HSN codes (e.g. 4911, 4819), and auto-split CGST and SGST.",
    },
    {
      question: "Can I track pending customer payments?",
      answer:
        "Yes. Payment management features help you record received advances, monitor outstanding balances, view aging summaries, and identify invoices that require follow-up.",
    },
    {
      question: "Is billing software suitable for small printing shops?",
      answer:
        "Yes. Small printing businesses can use billing solutions to simplify invoice generation, manage customer transactions, track payments, and reduce manual paperwork.",
    },
    {
      question: "Can I manage different printing products through one billing system?",
      answer:
        "Yes. You can organize billing for different products and services, including business cards, brochures, flyers, banners, books, packaging cartons, and customized printing orders.",
    },
    {
      question: "How does billing software help improve printing business operations?",
      answer:
        "It simplifies invoicing, reduces repetitive calculations, organizes financial records, improves payment tracking, and provides better visibility into daily business transactions.",
    },
  ];

  // Default Reviews from doc
  const defaultReviews = [
    {
      name: "Rahul Sharma",
      role: "Printing Business Owner",
      company: "Commercial Print Solutions, Jaipur",
      review:
        "Managing invoices and customer payments has become much easier. The software saves time, reduces manual calculations, and keeps our billing records organized.",
    },
    {
      name: "Amit Verma",
      role: "Commercial Printer",
      company: "Verma Graphics & Offset, Ahmedabad",
      review:
        "The quotation and invoicing features make daily billing simpler. We can quickly prepare estimates, generate invoices, and track pending payments.",
    },
    {
      name: "Neha Gupta",
      role: "Printing Shop Manager",
      company: "PrintTech Digital Media, New Delhi",
      review:
        "The software helps us manage customer details, GST invoices, and payment records in one place. It has made our billing process more organized.",
    },
    {
      name: "Sandeep Mehta",
      role: "Offset Printing Business Owner",
      company: "Mehta Color Press, Surat",
      review:
        "Tracking printing costs and preparing accurate bills used to take considerable time. This software has helped simplify these everyday tasks.",
    },
    {
      name: "Priya Jain",
      role: "Digital Printing Business Owner",
      company: "Creative Print Station, Bengaluru",
      review:
        "The reports and expense-tracking features give us a clearer view of our business transactions. It is convenient and easy to use.",
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
                  role: t.role || "Print Business Owner",
                  company: t.company || t.location || "Verified Print Client",
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
      {/* 1. HERO SECTION                                              */}
      {/* ============================================================ */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-border bg-linear-to-b from-brand/5 via-background to-background">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand/10 via-transparent to-transparent pointer-events-none" />

        <Container>
          <div className="mx-auto max-w-4xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-semibold text-brand shadow-xs">
              <Sparkles className="size-3.5" />
              <span>GST-Ready Billing & Print Costing Software</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12]">
              Printing Press Billing Software
            </h1>

            <div className="space-y-4 text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              <p>
                Managing billing in a printing business involves more than generating invoices. From
                preparing customer quotations and calculating printing charges to managing
                payments, tracking outstanding balances, and maintaining transaction records, every
                financial activity needs to be handled accurately.
              </p>
              <p className="text-sm sm:text-base text-foreground/80 font-medium">
                Our printing press billing software helps printing businesses simplify their
                billing operations, generate professional invoices, manage customer transactions,
                and maintain better control over daily financial activities. Instead of relying on
                manual calculations and scattered records, you can organize your billing process
                through a more structured and efficient system.
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground italic">
                Whether you operate a small print shop, a commercial printing company, or a large
                printing facility, the right billing solution can help reduce administrative work,
                minimize errors, and improve your overall business operations.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/book-demo"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-xs sm:text-sm font-bold text-brand-foreground shadow-md hover:bg-brand/90 transition"
              >
                <Laptop className="size-4" />
                <span>Book Free Demo</span>
                <ArrowRight className="size-4" />
              </Link>
              <a
                href="#interactive-simulator"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-3.5 text-xs sm:text-sm font-semibold text-foreground hover:bg-muted transition"
              >
                <Sliders className="size-4 text-brand" />
                <span>Try Live Billing Simulator</span>
              </a>
              <a
                href="https://wa.me/919521308521?text=Hello%20PrintoSync%20team,%20I%20want%20to%20learn%20more%20about%20Printing%20Press%20Billing%20Software."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-background/80 px-4 py-3.5 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition"
              >
                <PhoneCall className="size-4 text-emerald-500" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Quick Micro-stats Ribbon */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="rounded-xl border border-border bg-card/60 p-3 sm:p-4 backdrop-blur-xs">
                <div className="text-xs font-medium text-muted-foreground">GST Compliance</div>
                <div className="text-sm sm:text-base font-bold text-foreground">100% Tax Audit Safe</div>
                <div className="text-[11px] text-brand">Auto CGST / SGST / IGST</div>
              </div>
              <div className="rounded-xl border border-border bg-card/60 p-3 sm:p-4 backdrop-blur-xs">
                <div className="text-xs font-medium text-muted-foreground">Quotation to Bill</div>
                <div className="text-sm sm:text-base font-bold text-foreground">1-Click Conversion</div>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400">Zero Retyping</div>
              </div>
              <div className="rounded-xl border border-border bg-card/60 p-3 sm:p-4 backdrop-blur-xs">
                <div className="text-xs font-medium text-muted-foreground">Payment Tracking</div>
                <div className="text-sm sm:text-base font-bold text-foreground">Part & Full Payments</div>
                <div className="text-[11px] text-purple-600 dark:text-purple-400">Customer Ledgers</div>
              </div>
              <div className="rounded-xl border border-border bg-card/60 p-3 sm:p-4 backdrop-blur-xs">
                <div className="text-xs font-medium text-muted-foreground">Invoice Sharing</div>
                <div className="text-sm sm:text-base font-bold text-foreground">WhatsApp & Email PDF</div>
                <div className="text-[11px] text-amber-600 dark:text-amber-400">Instant Dispatch</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* 2. INTERACTIVE LIVE GST BILLING & INVOICE SIMULATOR          */}
      {/* ============================================================ */}
      <section id="interactive-simulator" className="py-16 lg:py-24 border-b border-border bg-surface/30">
        <Container>
          <div className="mx-auto max-w-3xl text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
              Interactive Tool
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              Live Printing Bill & GST Calculator Simulator
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Experience how PrintoSync calculates printing charges, finishes, GST, and advance
              payments in real time without spreadsheets.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Controls: 7 cols */}
            <div className="lg:col-span-7 space-y-6 rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between border-b border-border/80 pb-4">
                <div className="flex items-center gap-2">
                  <Sliders className="size-5 text-brand" />
                  <h3 className="text-base font-bold text-foreground">Job Billing Parameters</h3>
                </div>
                <span className="text-xs text-muted-foreground">Auto-Calculating</span>
              </div>

              {/* Preset Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">Select Job Preset</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {JOB_PRESETS.map((preset) => {
                    const isSelected = selectedPreset.id === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handlePresetChange(preset)}
                        className={`text-left p-3 rounded-xl border text-xs font-medium transition ${
                          isSelected
                            ? "border-brand bg-brand/10 text-brand shadow-xs"
                            : "border-border hover:bg-muted text-foreground"
                        }`}
                      >
                        <div className="font-bold truncate">{preset.name}</div>
                        <div className="text-[11px] text-muted-foreground mt-0.5">{preset.category}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Slider */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-muted-foreground">Print Quantity (Copies / Sheets)</span>
                  <span className="text-sm font-bold text-brand">
                    {sheetQuantity.toLocaleString("en-IN")} pcs
                  </span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={25000}
                  step={500}
                  value={sheetQuantity}
                  onChange={(e) => setSheetQuantity(Number(e.target.value))}
                  className="w-full accent-brand cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-muted-foreground">
                  <span>500</span>
                  <span>10,000</span>
                  <span>25,000</span>
                </div>
              </div>

              {/* Paper Rate per Sheet */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-muted-foreground">Printing & Paper Rate (Per Copy)</span>
                  <span className="text-sm font-bold text-foreground">₹{paperRatePerSheet.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={15.0}
                  step={0.1}
                  value={paperRatePerSheet}
                  onChange={(e) => setPaperRatePerSheet(Number(e.target.value))}
                  className="w-full accent-brand cursor-pointer"
                />
              </div>

              {/* Finishing Addons */}
              <div className="space-y-2.5 pt-2">
                <label className="text-xs font-semibold text-muted-foreground">
                  Finishing & Post-Press Addons
                </label>
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
                    <Check
                      className={`size-3.5 ${
                        laminationEnabled ? "opacity-100" : "opacity-0"
                      }`}
                    />
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
                    <span>Spot UV / Foil</span>
                    <Check
                      className={`size-3.5 ${
                        spotUvEnabled ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => setDiePunchingEnabled(!diePunchingEnabled)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs font-medium transition ${
                      diePunchingEnabled
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "border-border text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <span>Die Punch & Fold</span>
                    <Check
                      className={`size-3.5 ${
                        diePunchingEnabled ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* GST & Advance Payment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">GST Rate</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[5, 12, 18].map((rate) => (
                      <button
                        key={rate}
                        type="button"
                        onClick={() => setGstRate(rate)}
                        className={`py-2 rounded-lg border text-xs font-bold transition ${
                          gstRate === rate
                            ? "border-brand bg-brand text-brand-foreground"
                            : "border-border text-foreground hover:bg-muted"
                        }`}
                      >
                        {rate}%
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-muted-foreground">Client Advance Booking</span>
                    <span className="text-xs font-bold text-brand">{advancePaidPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={10}
                    value={advancePaidPercent}
                    onChange={(e) => setAdvancePaidPercent(Number(e.target.value))}
                    className="w-full accent-brand cursor-pointer mt-2"
                  />
                </div>
              </div>
            </div>

            {/* Right Live Tax Invoice Card: 5 cols */}
            <div className="lg:col-span-5 rounded-2xl border border-brand/30 bg-card p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-brand text-brand-foreground text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                Live Tax Invoice Preview
              </div>

              <div className="space-y-5">
                {/* Header */}
                <div className="border-b border-border/80 pb-4">
                  <div className="flex items-center gap-2">
                    <Receipt className="size-5 text-brand" />
                    <div>
                      <h4 className="text-sm font-bold text-foreground">PrintoSync Press ERP</h4>
                      <p className="text-[11px] text-muted-foreground">Tax Invoice #INV-2026-0849</p>
                    </div>
                  </div>
                </div>

                {/* Job Specs */}
                <div className="rounded-xl bg-muted/40 p-3 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Job Title:</span>
                    <span className="font-semibold text-foreground text-right truncate max-w-[180px]">
                      {selectedPreset.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">HSN/SAC Code:</span>
                    <span className="font-mono text-foreground">{selectedPreset.hsnCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Material / GSM:</span>
                    <span className="text-foreground">{selectedPreset.defaultGsm}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quantity:</span>
                    <span className="font-bold text-brand">{sheetQuantity.toLocaleString("en-IN")} pcs</span>
                  </div>
                </div>

                {/* Line Items */}
                <div className="space-y-2 text-xs border-b border-border/80 pb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Print Run & Paper Charge:</span>
                    <span className="font-mono font-medium text-foreground">
                      ₹{printPrintingCharge.toLocaleString("en-IN")}
                    </span>
                  </div>
                  {laminationEnabled && (
                    <div className="flex justify-between text-muted-foreground">
                      <span>Thermal Lamination:</span>
                      <span className="font-mono text-foreground">
                        +₹{laminationCost.toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}
                  {spotUvEnabled && (
                    <div className="flex justify-between text-muted-foreground">
                      <span>Spot UV & Special Effects:</span>
                      <span className="font-mono text-foreground">
                        +₹{spotUvCost.toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}
                  {diePunchingEnabled && (
                    <div className="flex justify-between text-muted-foreground">
                      <span>Die Punching & Folding:</span>
                      <span className="font-mono text-foreground">
                        +₹{diePunchingCost.toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between pt-1 border-t border-border/40 font-semibold text-foreground">
                    <span>Taxable Value:</span>
                    <span className="font-mono">₹{taxableSubtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>CGST ({gstRate / 2}%):</span>
                    <span className="font-mono">₹{cgstAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>SGST ({gstRate / 2}%):</span>
                    <span className="font-mono">₹{sgstAmount.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Net Total & Balances */}
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-bold text-foreground">Net Invoice Total:</span>
                    <span className="font-mono text-xl font-extrabold text-brand">
                      ₹{netTotal.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="rounded-xl border border-border bg-surface p-3 space-y-1.5 text-xs">
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                      <span>Advance Received ({advancePaidPercent}%):</span>
                      <span className="font-mono">₹{advanceAmount.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-rose-600 dark:text-rose-400 font-bold">
                      <span>Balance Due on Delivery:</span>
                      <span className="font-mono">₹{balanceDue.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Action */}
                <div className="pt-2 flex flex-col gap-2">
                  <a
                    href="https://wa.me/919521308521?text=Hello%20PrintoSync,%20I%20tested%20your%20Printing%20Billing%20Simulator%20and%20want%20a%20full%20demo."
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 transition shadow-xs"
                  >
                    <Send className="size-3.5" />
                    <span>Send PDF Bill on WhatsApp</span>
                  </a>
                  <p className="text-[10px] text-center text-muted-foreground">
                    Instant delivery challan & UPI QR codes embedded automatically
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* 3. SIMPLIFY YOUR BILLING OPERATIONS                          */}
      {/* ============================================================ */}
      <section className="py-16 lg:py-24 border-b border-border bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
                Operational Efficiency
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-foreground leading-tight">
                Simplify Your Printing Business Billing Operations
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                <p>
                  Managing printing orders involves different products, quantities, materials, and
                  finishing requirements. Handling invoices and payments manually can become
                  time-consuming, especially when managing multiple customers.
                </p>
                <p>
                  Our billing solution simplifies daily financial tasks, helps generate accurate
                  invoices, and keeps customer and transaction records organized. With dedicated
                  printing shop billing software, you can manage billing more efficiently and reduce
                  repetitive paperwork.
                </p>
              </div>

              <div className="pt-2 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-brand/10 p-1 text-brand">
                    <CheckCircle2 className="size-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Zero Manual Calculation Errors</h3>
                    <p className="text-xs text-muted-foreground">
                      Automatic formula calculations for paper GSM, cutting waste, ink, plates, and GST.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-brand/10 p-1 text-brand">
                    <CheckCircle2 className="size-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Quotation-to-Invoice in 1-Click</h3>
                    <p className="text-xs text-muted-foreground">
                      Convert customer-approved estimates into final tax bills without re-typing.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-brand/10 p-1 text-brand">
                    <CheckCircle2 className="size-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Centralized Client Ledgers</h3>
                    <p className="text-xs text-muted-foreground">
                      Track advances, delivery balances, and overdue invoices across all jobs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-border bg-card p-5 space-y-3 shadow-xs">
                <div className="size-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
                  <Receipt className="size-5" />
                </div>
                <h3 className="text-sm font-bold text-foreground">Multi-Item GST Invoices</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Generate professional tax invoices detailing paper specs, finishing, quantity,
                  HSN codes, and auto-split CGST + SGST.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 space-y-3 shadow-xs">
                <div className="size-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold">
                  <CreditCard className="size-5" />
                </div>
                <h3 className="text-sm font-bold text-foreground">Payment Reconciliation</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Record advance bank transfers, cash receipts, and balance payments on delivery
                  with automatic customer ledger updates.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 space-y-3 shadow-xs">
                <div className="size-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
                  <PackageCheck className="size-5" />
                </div>
                <h3 className="text-sm font-bold text-foreground">Delivery Challan Sync</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Dispatch partial lots with delivery challans and convert completed dispatches
                  into a final consolidated tax invoice.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 space-y-3 shadow-xs">
                <div className="size-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                  <BarChart3 className="size-5" />
                </div>
                <h3 className="text-sm font-bold text-foreground">Daily Sales Register</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Get daily, weekly, and monthly financial summaries of billed amounts, collected
                  cash, and pending market receivables.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* 4. MANAGE YOUR BILLING ACTIVITIES IN ONE PLACE (8 Cards)     */}
      {/* ============================================================ */}
      <section className="py-16 lg:py-24 border-b border-border bg-surface/30">
        <Container>
          <div className="mx-auto max-w-3xl text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
              All-In-One Financial Engine
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              Manage Your Billing Activities in One Place
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Bring quotations, job cards, multi-tier GST invoices, customer ledgers, and operational
              expenses together into a unified workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {billingActivities.map((act) => {
              const Icon = act.icon;
              return (
                <div
                  key={act.id}
                  className="rounded-2xl border border-border bg-card p-6 shadow-xs hover:border-brand/40 hover:shadow-md transition group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div
                      className={`size-11 rounded-xl flex items-center justify-center border ${act.accent}`}
                    >
                      <Icon className="size-5" />
                    </div>
                    <h3 className="text-base font-bold text-foreground group-hover:text-brand transition">
                      {act.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed">
                      {act.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* 5. KEY FEATURES OF OUR PRINTING PRESS BILLING SOFTWARE       */}
      {/* ============================================================ */}
      <section id="features" className="py-16 lg:py-24 border-b border-border bg-background">
        <Container>
          <div className="mx-auto max-w-3xl text-center space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
              Core Capabilities
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              Key Features of Our Printing Press Billing Software
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Manage invoices, calculate printing costs, track payments, and organize daily financial
              operations with ease.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {coreFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.number}
                  className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs hover:shadow-md transition space-y-5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`size-12 rounded-xl flex items-center justify-center border ${feat.accent}`}
                      >
                        <Icon className="size-6" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                          Feature {feat.number}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-foreground">
                          {feat.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {feat.description}
                  </p>

                  <div className="space-y-2 border-t border-border/60 pt-4">
                    <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                      Key Benefits:
                    </span>
                    <ul className="space-y-2 pt-1">
                      {feat.benefits.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                          <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* 6. DESIGNED FOR DIFFERENT PRINTING BUSINESS REQUIREMENTS     */}
      {/* ============================================================ */}
      <section className="py-16 lg:py-24 border-b border-border bg-surface/30">
        <Container>
          <div className="mx-auto max-w-3xl text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
              Tailored For Every Press Type
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              Designed for Different Printing Business Requirements
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Every printing business handles different products, order quantities, and billing
              requirements. Our billing solution helps organize transactions across various
              printing operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessTypes.map((biz, idx) => {
              const Icon = biz.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-border bg-card p-6 shadow-xs hover:border-brand/30 hover:shadow-md transition flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="size-11 rounded-xl bg-brand/10 text-brand flex items-center justify-center">
                        <Icon className="size-5" />
                      </div>
                      <span className="text-[10px] font-bold rounded-full bg-muted px-2.5 py-0.5 text-muted-foreground">
                        {biz.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-foreground">{biz.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {biz.description}
                    </p>
                  </div>

                  <div className="border-t border-border/60 pt-3 space-y-1.5">
                    {biz.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                        <div className="size-1 rounded-full bg-brand shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* 7. WHY CHOOSE OUR PRINTING BILLING SOLUTION?                 */}
      {/* ============================================================ */}
      <section className="py-16 lg:py-24 border-b border-border bg-background">
        <Container>
          <div className="mx-auto max-w-3xl text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
              Strategic Advantages
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              Why Choose Our Printing Billing Solution?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Choosing the right billing system can make everyday financial management easier while
              reducing unnecessary administrative work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseAdvantages.map((adv, idx) => {
              const Icon = adv.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-border bg-card p-6 shadow-xs hover:border-brand/40 transition space-y-3"
                >
                  <div className="size-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">{adv.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {adv.description}
                  </p>
                </div>
              );
            })}

            {/* Final Highlight Card */}
            <div className="rounded-2xl border border-brand/30 bg-linear-to-br from-brand/10 via-card to-card p-6 shadow-xs flex flex-col justify-center space-y-2">
              <span className="text-xs font-bold text-brand uppercase tracking-wider">
                Full Press Growth
              </span>
              <h3 className="text-base font-bold text-foreground">Scalable & Audit-Proof</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Seamlessly connects with job cards, dispatch challans, inventory, and accounting to
                give total peace of mind for GST filings and audits.
              </p>
            </div>
          </div>

          {/* Concluding Paragraph Callout from Document */}
          <div className="mt-12 rounded-2xl border border-border bg-muted/20 p-6 sm:p-8 text-center max-w-3xl mx-auto space-y-3">
            <p className="text-sm sm:text-base text-foreground font-medium leading-relaxed">
              &ldquo;Our solution brings essential billing activities together, helping you organize
              customer transactions, simplify invoice preparation, and maintain better control over
              your daily business operations.&rdquo;
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Whether you manage a small printing shop or a growing commercial printing facility, the
              right billing solution can support smoother operations and long-term business growth.
            </p>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* 8. VERIFIED CUSTOMER REVIEWS & TESTIMONIALS                 */}
      {/* ============================================================ */}
      <section className="py-16 lg:py-24 border-b border-border bg-surface/30">
        <Container>
          <div className="mx-auto max-w-3xl text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
              Industry Trust
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              What Printing Press Owners Say About PrintoSync Billing
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Real feedback from commercial press owners, offset printers, and digital print shop
              managers.
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
              Everything you need to know about implementing billing software for your printing press.
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
                Ready to Simplify Your Printing Press Billing?
              </h2>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                Join hundreds of offset, digital, and packaging printers across India who generate
                GST invoices in seconds, reconcile customer balances, and eliminate calculation
                errors with PrintoSync.
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
                href="https://wa.me/919521308521?text=Hello%20PrintoSync%20team,%20I%20want%20to%20learn%20more%20about%20Printing%20Press%20Billing%20Software."
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
