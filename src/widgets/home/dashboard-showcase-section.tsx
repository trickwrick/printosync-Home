"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  SectionLabel,
  SectionReveal,
  SectionSubtitle,
  SectionTitle,
} from "./section-primitives";
import { EnterpriseDashboard } from "@/widgets/dashboard/enterprise-dashboard";
import type { DashboardModule } from "@/widgets/dashboard/types";

const dashboardSlides: {
  module: DashboardModule;
  label: string;
  title: string;
  description: string;
}[] = [
  {
    module: "dashboard",
    label: "Dashboard",
    title: "Your command center for the entire operation",
    description:
      "Monitor jobs, revenue, payments, stock, and production from one live business dashboard.",
  },
  {
    module: "crm",
    label: "CRM",
    title: "Keep every customer opportunity moving",
    description:
      "Manage enquiries, follow-ups, customer history, quotations, and repeat orders in one place.",
  },
  {
    module: "production",
    label: "Production",
    title: "Track every job across the shop floor",
    description:
      "Follow production stages, priorities, operators, machines, and delivery commitments in real time.",
  },
  {
    module: "inventory",
    label: "Inventory",
    title: "Know exactly what material is available",
    description:
      "Control paper, ink, plates, and other materials with live stock movement and low-stock alerts.",
  },
  {
    module: "gst",
    label: "GST Billing",
    title: "Create accurate GST-ready invoices faster",
    description:
      "Connect orders, dispatch, taxes, invoices, payments, and outstanding balances without duplicate entry.",
  },
];

export function DashboardShowcaseSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const slide = dashboardSlides[activeSlide];

  useEffect(() => {
    if (isPaused || reduceMotion) return;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % dashboardSlides.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, [isPaused, reduceMotion]);

  const showPrevious = () => {
    setActiveSlide(
      (current) => (current - 1 + dashboardSlides.length) % dashboardSlides.length,
    );
  };

  const showNext = () => {
    setActiveSlide((current) => (current + 1) % dashboardSlides.length);
  };

  return (
    <SectionReveal className="border-y border-border bg-surface py-16 lg:py-20">
      <div
        className="mx-auto max-w-[1400px] px-6 lg:px-8"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <SectionLabel>Live demo</SectionLabel>
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.module}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <SectionTitle className="mx-auto">{slide.title}</SectionTitle>
              <SectionSubtitle className="mx-auto">
                {slide.description}
              </SectionSubtitle>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative mx-auto max-w-[1180px]">
          <button
            type="button"
            onClick={showPrevious}
            aria-label="Previous dashboard slide"
            className="absolute left-3 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/95 text-foreground shadow-md transition-colors hover:border-brand/40 hover:text-brand lg:-left-5"
          >
            <ChevronLeft className="size-5" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={slide.module}
              initial={reduceMotion ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="rounded-2xl border border-border bg-card p-2 shadow-premium"
            >
              <EnterpriseDashboard
                variant="showcase"
                defaultModule={slide.module}
                className="mx-auto max-w-[1100px]"
              />
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={showNext}
            aria-label="Next dashboard slide"
            className="absolute right-3 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/95 text-foreground shadow-md transition-colors hover:border-brand/40 hover:text-brand lg:-right-5"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2" role="tablist">
          {dashboardSlides.map((item, index) => (
            <button
              key={item.module}
              type="button"
              role="tab"
              aria-selected={activeSlide === index}
              onClick={() => setActiveSlide(index)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                activeSlide === index
                  ? "border-brand bg-brand text-brand-foreground shadow-glow"
                  : "border-border bg-background text-muted-foreground hover:border-brand/30 hover:text-brand"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-4 flex max-w-xs gap-1.5" aria-hidden="true">
          {dashboardSlides.map((item, index) => (
            <span
              key={item.module}
              className="h-1 flex-1 overflow-hidden rounded-full bg-border"
            >
              <span
                className={`block h-full rounded-full bg-brand transition-[width] duration-500 ${
                  activeSlide === index ? "w-full" : index < activeSlide ? "w-full" : "w-0"
                }`}
              />
            </span>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
