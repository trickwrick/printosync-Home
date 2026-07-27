"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  CircleCheck,
  Factory,
  Layers3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  homepageBenefits,
  howItWorks,
  industries,
  modules,
} from "@/entities/marketing";
import { MagneticButton } from "@/shared/ui/magnetic-button";
import {
  SectionLabel,
  SectionReveal,
  SectionSubtitle,
  SectionTitle,
  StaggerItem,
  StaggerReveal,
} from "./section-primitives";

const whyChoose = [
  "Complete Printing Press ERP",
  "Easy Order & Job Management",
  "Real-Time Production Tracking",
  "Inventory & Stock Management",
  "CRM & Customer Management",
  "Purchase & Vendor Management",
  "GST Invoicing & Accounting",
  "Reports & Business Analytics",
  "Multi-User Access",
  "Cloud-Based & Secure",
] as const;

export function AboutOverviewSection() {
  return (
    <SectionReveal id="overview" className="border-t border-border bg-surface py-16 lg:py-20">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-8">
        <div>
          <SectionLabel>About PrintoSync</SectionLabel>
          <SectionTitle>Built specifically for printing businesses</SectionTitle>
          <SectionSubtitle>
            PrintoSync is an all-in-one ERP for offset presses, digital printing
            units, packaging companies, and commercial print shops.
          </SectionSubtitle>
          <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
            Streamline every stage from quotation to final delivery. Reduce
            manual work, improve production efficiency, and gain complete
            visibility with real-time tracking and automation.
          </p>
          <Link
            href="/about"
            className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-brand"
          >
            Discover our story
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-premium sm:p-8">
          <div className="grid grid-cols-2 gap-4">
            {[
              ["One platform", "CRM, ERP & MIS"],
              ["Real-time", "Production tracking"],
              ["Connected", "Stock & accounts"],
              ["Secure", "Cloud access"],
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

export function WhyPrintoSyncSection() {
  return (
    <SectionReveal id="why-printosync" className="py-16 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel>Why PrintoSync</SectionLabel>
          <SectionTitle className="mx-auto">
            Everything needed to run a modern printing press
          </SectionTitle>
          <SectionSubtitle className="mx-auto">
            Purpose-built tools replace disconnected spreadsheets and give every
            team one reliable source of truth.
          </SectionSubtitle>
        </div>
        <StaggerReveal className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {whyChoose.map((item) => (
            <StaggerItem key={item}>
              <div className="flex h-full items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-muted text-brand">
                  <Check className="size-4" aria-hidden="true" />
                </span>
                <p className="pt-1 text-sm font-semibold leading-snug text-foreground">
                  {item}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </SectionReveal>
  );
}

export function ModulesOverviewSection() {
  const featuredModules = modules.slice(0, 8);
  return (
    <SectionReveal id="modules" className="border-y border-border bg-surface py-16 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel>Everything you need</SectionLabel>
            <SectionTitle>One platform for every department</SectionTitle>
            <SectionSubtitle>
              Connect sales, operations, production, inventory, accounts, and
              management without duplicate data.
            </SectionSubtitle>
          </div>
          <Link
            href="/services"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand"
          >
            View all 19 modules
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <StaggerReveal className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredModules.map((module, index) => (
            <StaggerItem key={module.slug}>
              <Link
                href={`/modules/${module.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand/30 hover:shadow-premium"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-brand-muted font-mono text-xs font-bold text-brand">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-foreground group-hover:text-brand">
                  {module.shortTitle ?? module.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
                  {module.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-brand">
                  Explore module <ArrowRight className="size-3.5" aria-hidden="true" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </SectionReveal>
  );
}

export function IndustriesOverviewSection() {
  return (
    <SectionReveal id="industries" className="py-16 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel>Industries we serve</SectionLabel>
          <SectionTitle className="mx-auto">Made for every kind of printer</SectionTitle>
          <SectionSubtitle className="mx-auto">
            Adapt PrintoSync to your processes, products, machines, and scale.
          </SectionSubtitle>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-sm font-semibold text-foreground shadow-sm transition-all hover:border-brand/30 hover:text-brand"
            >
              <Factory className="size-4 shrink-0 text-brand" aria-hidden="true" />
              {industry.title}
            </Link>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}

export function BenefitsAndProcessSection() {
  return (
    <SectionReveal className="border-y border-border bg-surface py-16 lg:py-20">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <SectionLabel>Key benefits</SectionLabel>
          <SectionTitle>Work smarter and grow with control</SectionTitle>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {homepageBenefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
              >
                <CircleCheck className="size-4 shrink-0 text-brand" aria-hidden="true" />
                <span className="text-sm font-medium text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionLabel>How it works</SectionLabel>
          <SectionTitle>From enquiry to business insight</SectionTitle>
          <ol className="mt-8 space-y-3">
            {howItWorks.map((step, index) => (
              <li
                key={step}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-sm"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand text-xs font-bold text-brand-foreground">
                  {index + 1}
                </span>
                <span className="text-sm font-semibold text-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </SectionReveal>
  );
}

export function DigitizeCtaSection() {
  return (
    <SectionReveal className="py-16 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
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
                href="/sales-enquiry"
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
