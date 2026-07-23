"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { platformCategories, whoWeHelp } from "./content";
import {
  SectionLabel,
  SectionReveal,
  SectionSubtitle,
  SectionTitle,
  StaggerItem,
  StaggerReveal,
} from "./section-primitives";

export function PlatformSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [featureIndex, setFeatureIndex] = useState(0);
  const category = platformCategories[activeTab];
  const feature = category.features[featureIndex];

  const nextFeature = () =>
    setFeatureIndex((i) => (i + 1) % category.features.length);
  const prevFeature = () =>
    setFeatureIndex(
      (i) => (i - 1 + category.features.length) % category.features.length,
    );

  return (
    <SectionReveal className="border-t border-border bg-surface py-16 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        {/* Who we help */}
        <div className="mb-16">
          <SectionLabel>Who we help</SectionLabel>
          <SectionTitle>We enable print shops like yours to grow</SectionTitle>
          <StaggerReveal className="mt-10 grid gap-5 md:grid-cols-3">
            {whoWeHelp.map((item) => (
              <StaggerItem key={item.title}>
                <Link
                  href={item.href}
                  className="group card-hover flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-brand">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand">
                    Learn more
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>

        {/* Features tabs */}
        <div className="text-center">
          <SectionLabel>Features</SectionLabel>
          <SectionTitle className="mx-auto">
            How PrintoSync will help you
          </SectionTitle>
          <SectionSubtitle className="mx-auto">
            CRM, production, inventory, and analytics — explore what matters
            most to your shop.
          </SectionSubtitle>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {platformCategories.map((cat, i) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setActiveTab(i);
                setFeatureIndex(0);
              }}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                activeTab === i
                  ? "bg-brand text-brand-foreground shadow-glow"
                  : "border border-border bg-card text-muted-foreground hover:border-brand/30 hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative mt-10 overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-premium md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${featureIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="mx-auto max-w-2xl text-center"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                {category.label}
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold text-foreground sm:text-3xl">
                {feature.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
              <Link
                href={feature.href}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand/80"
              >
                Learn about {feature.title}
                <ArrowRight className="size-4" />
              </Link>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prevFeature}
              className="flex size-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-brand/30 hover:text-brand"
              aria-label="Previous feature"
            >
              <ChevronLeft className="size-5" />
            </button>
            <div className="flex gap-2">
              {category.features.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setFeatureIndex(i)}
                  className={`size-2 rounded-full transition-all ${
                    i === featureIndex ? "w-6 bg-brand" : "bg-border hover:bg-brand/40"
                  }`}
                  aria-label={`Feature ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={nextFeature}
              className="flex size-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-brand/30 hover:text-brand"
              aria-label="Next feature"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
          >
            View all features
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </SectionReveal>
  );
}
