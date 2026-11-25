"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calculator,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Percent,
  CheckCircle2,
  FileCheck2,
  Layers,
  ShieldCheck,
} from "lucide-react";
import {
  SectionLabel,
  SectionReveal,
  SectionSubtitle,
  SectionTitle,
} from "./section-primitives";

interface PaperOption {
  id: string;
  name: string;
  gsm: number;
  ratePerSheet: number;
}

const paperOptions: PaperOption[] = [
  { id: "130_gloss", name: "130 GSM Gloss Art Paper", gsm: 130, ratePerSheet: 1.85 },
  { id: "170_matte", name: "170 GSM Matte Art Paper", gsm: 170, ratePerSheet: 2.65 },
  { id: "300_card", name: "300 GSM Art Card (Coated)", gsm: 300, ratePerSheet: 4.8 },
  { id: "350_duplex", name: "350 GSM Grey Back Board", gsm: 350, ratePerSheet: 5.4 },
];

export function InteractiveEstimatorSection() {
  const [printType, setPrintType] = useState<"offset" | "digital">("offset");
  const [selectedPaper, setSelectedPaper] = useState<PaperOption>(paperOptions[1]);
  const [quantity, setQuantity] = useState<number>(2500);
  const [hasLamination, setHasLamination] = useState<boolean>(true);
  const [hasSpotUv, setHasSpotUv] = useState<boolean>(false);
  const [hasDiePunching, setHasDiePunching] = useState<boolean>(false);

  // Dynamic calculations based on real print press metrics
  const paperCost = Math.round(quantity * selectedPaper.ratePerSheet);
  const setupPlatesCost = printType === "offset" ? 1400 : 250;
  const printingRunCost = Math.round(
    printType === "offset" ? Math.max(quantity * 0.45, 1200) : quantity * 1.8
  );

  let finishingCost = 0;
  if (hasLamination) finishingCost += Math.round(quantity * 0.65);
  if (hasSpotUv) finishingCost += Math.round(Math.max(quantity * 0.8, 1500));
  if (hasDiePunching) finishingCost += Math.round(Math.max(quantity * 0.4, 900));

  const totalProductionCost = paperCost + setupPlatesCost + printingRunCost + finishingCost;
  const targetMarginPct = 28; // Standard commercial printing target margin
  const recommendedSellingPrice = Math.round(totalProductionCost / (1 - targetMarginPct / 100));
  const profitMargin = recommendedSellingPrice - totalProductionCost;
  const costPerUnit = (recommendedSellingPrice / quantity).toFixed(2);
  const wastagePreventedSheets = Math.round(quantity * 0.08); // 8% average paper saved via ERP imposition

  return (
    <SectionReveal id="calculator-preview" className="border-t border-border bg-gradient-to-b from-surface via-background to-surface py-16 lg:py-24">
      <div className="mx-auto max-w-350 px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>Live Interactive Experience</SectionLabel>
          <SectionTitle className="mx-auto">
            Interactive Print Cost & Profit Margin Simulator
          </SectionTitle>
          <SectionSubtitle className="mx-auto">
            Experience how PrintoSync eliminates guesswork. Test different GSM stocks, quantities, and finishing options to see accurate cost estimations and protected profit margins in real time.
          </SectionSubtitle>
        </div>

        {/* Simulator Grid */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Controls Column (Left) */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-premium sm:p-8 lg:col-span-7">
            <div className="flex items-center justify-between border-b border-border/80 pb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand">
                  Step 1: Configure Job
                </span>
                <h3 className="font-display text-lg font-bold text-foreground">
                  Select Specifications
                </h3>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-brand-muted px-3 py-1 text-xs font-semibold text-brand">
                <Sparkles className="size-3.5" /> Live Engine
              </span>
            </div>

            {/* Print Type Selector */}
            <div className="mt-6">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Printing Technology
              </label>
              <div className="mt-2.5 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPrintType("offset")}
                  className={`flex flex-col rounded-xl border p-3.5 text-left transition-all ${
                    printType === "offset"
                      ? "border-brand bg-brand/10 text-brand shadow-sm"
                      : "border-border bg-background text-foreground hover:border-brand/40"
                  }`}
                >
                  <span className="text-sm font-bold">Commercial Offset</span>
                  <span className="text-[11px] text-muted-foreground">
                    CTP Plates • High volume runs
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setPrintType("digital")}
                  className={`flex flex-col rounded-xl border p-3.5 text-left transition-all ${
                    printType === "digital"
                      ? "border-brand bg-brand/10 text-brand shadow-sm"
                      : "border-border bg-background text-foreground hover:border-brand/40"
                  }`}
                >
                  <span className="text-sm font-bold">Digital Quick Print</span>
                  <span className="text-[11px] text-muted-foreground">
                    Zero make-ready • On-demand
                  </span>
                </button>
              </div>
            </div>

            {/* Paper Selection */}
            <div className="mt-6">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Paper Stock & GSM
              </label>
              <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {paperOptions.map((paper) => (
                  <button
                    key={paper.id}
                    type="button"
                    onClick={() => setSelectedPaper(paper)}
                    className={`flex items-center justify-between rounded-xl border p-3 text-left text-xs font-medium transition-all ${
                      selectedPaper.id === paper.id
                        ? "border-brand bg-brand/10 text-foreground font-semibold"
                        : "border-border bg-background text-muted-foreground hover:border-brand/40"
                    }`}
                  >
                    <span>{paper.name}</span>
                    <span className="font-mono text-[11px] text-brand">
                      ₹{paper.ratePerSheet}/sh
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Slider */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Order Quantity
                </label>
                <span className="font-mono text-sm font-bold text-foreground">
                  {quantity.toLocaleString()} Sheets
                </span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="500"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-surface accent-brand"
                />
              </div>
              <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
                <span>500 (Short run)</span>
                <span>2,500</span>
                <span>5,000</span>
                <span>10,000 (Bulk)</span>
              </div>
            </div>

            {/* Post-Press Finishing Checkboxes */}
            <div className="mt-6">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Post-Press Finishing Operations
              </label>
              <div className="mt-2.5 flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => setHasLamination(!hasLamination)}
                  className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition-all ${
                    hasLamination
                      ? "border-brand bg-brand-muted text-brand font-semibold"
                      : "border-border bg-background text-muted-foreground hover:border-brand/30"
                  }`}
                >
                  <CheckCircle2
                    className={`size-3.5 ${hasLamination ? "text-brand" : "text-muted-foreground/40"}`}
                  />
                  Thermal Lamination
                </button>
                <button
                  type="button"
                  onClick={() => setHasSpotUv(!hasSpotUv)}
                  className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition-all ${
                    hasSpotUv
                      ? "border-brand bg-brand-muted text-brand font-semibold"
                      : "border-border bg-background text-muted-foreground hover:border-brand/30"
                  }`}
                >
                  <CheckCircle2
                    className={`size-3.5 ${hasSpotUv ? "text-brand" : "text-muted-foreground/40"}`}
                  />
                  Spot UV Coating
                </button>
                <button
                  type="button"
                  onClick={() => setHasDiePunching(!hasDiePunching)}
                  className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition-all ${
                    hasDiePunching
                      ? "border-brand bg-brand-muted text-brand font-semibold"
                      : "border-border bg-background text-muted-foreground hover:border-brand/30"
                  }`}
                >
                  <CheckCircle2
                    className={`size-3.5 ${hasDiePunching ? "text-brand" : "text-muted-foreground/40"}`}
                  />
                  Die-Cutting / Punching
                </button>
              </div>
            </div>
          </div>

          {/* Real-Time Live Quote Breakdown (Right) */}
          <div className="relative rounded-3xl border border-brand/30 bg-gradient-to-br from-card via-card to-brand-muted/20 p-6 shadow-premium sm:p-8 lg:col-span-5">
            <div className="flex items-center justify-between border-b border-border/80 pb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand">
                  Live Quotation Engine
                </span>
                <h3 className="font-display text-lg font-bold text-foreground">
                  Job Cost & Margin Breakdown
                </h3>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-600">
                {targetMarginPct}% Target Profit
              </span>
            </div>

            {/* Cost Rows */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <span className="size-2 rounded-full bg-brand" /> Paper Stock Cost ({selectedPaper.gsm} GSM):
                </span>
                <span className="font-mono font-medium text-foreground">
                  ₹{paperCost.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <span className="size-2 rounded-full bg-indigo-500" /> Prepress & Make-Ready Plates:
                </span>
                <span className="font-mono font-medium text-foreground">
                  ₹{setupPlatesCost.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <span className="size-2 rounded-full bg-amber-500" /> Machine Press Run Charges:
                </span>
                <span className="font-mono font-medium text-foreground">
                  ₹{printingRunCost.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <span className="size-2 rounded-full bg-rose-500" /> Finishing & Post-Press:
                </span>
                <span className="font-mono font-medium text-foreground">
                  ₹{finishingCost.toLocaleString()}
                </span>
              </div>

              <div className="border-t border-border/80 pt-3 flex items-center justify-between text-sm font-semibold">
                <span className="text-foreground">Total Manufacturing Cost:</span>
                <span className="font-mono text-muted-foreground">
                  ₹{totalProductionCost.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Profit Highlight Banner */}
            <div className="mt-6 rounded-2xl border border-brand/20 bg-brand-muted/60 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Recommended Client Quote
                  </p>
                  <p className="mt-1 font-display text-3xl font-extrabold text-brand">
                    ₹{recommendedSellingPrice.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Protected Profit</p>
                  <p className="font-mono text-lg font-bold text-emerald-600">
                    +₹{profitMargin.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-brand/20 pt-3 text-xs text-muted-foreground">
                <span>Unit Cost: <strong className="text-foreground">₹{costPerUnit}/copy</strong></span>
                <span className="text-emerald-700 font-medium">
                  ✓ ~{wastagePreventedSheets} paper sheets saved from scrap
                </span>
              </div>
            </div>

            {/* Direct Value Note */}
            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
              ⚡ In PrintoSync, this calculation is auto-generated in <strong>less than 30 seconds</strong> from incoming inquiries and converts into a production Job Card with 1 click.
            </p>

            {/* Action CTA */}
            <div className="mt-6">
              <Link
                href="/book-demo"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-cta transition-transform hover:-translate-y-0.5"
              >
                See Full Estimator in Action <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
