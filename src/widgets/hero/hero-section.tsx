"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Star } from "lucide-react";
import { ctaNavigation } from "@/shared/config/navigation";
import { MagneticButton } from "@/shared/ui/magnetic-button";
import { HeroBackground } from "./hero-background";
import { DashboardPreview } from "./dashboard-preview";
import { StatsBar } from "./stats-bar";
import { ClientLogos } from "./client-logos";

export function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;
    let cancelled = false;

    void import("gsap").then(({ default: gsap }) => {
      if (cancelled) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.15 },
      );
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      aria-label="PrintoSync homepage hero"
      className="relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pt-36"
    >
      <HeroBackground />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-muted px-3.5 py-1.5 text-xs font-medium text-brand"
            >
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
              </span>
              Trusted by 500+ print shops
            </motion.div>

            <h1
              ref={headlineRef}
              className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.08] tracking-[-0.03em] text-foreground"
            >
              Simple online{" "}
              <span className="gradient-text-brand">print shop software.</span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Plan jobs, manage clients, track production, and grow revenue — all
              in one cloud platform built exclusively for printing presses.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <MagneticButton href={ctaNavigation.href}>
                {ctaNavigation.title}
              </MagneticButton>
              <Link
                href="/printing-crm"
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition-all hover:border-brand/30 hover:bg-brand-muted"
              >
                <Play className="size-4 fill-brand text-brand" />
                View features
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-8 flex items-center gap-3"
            >
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-amber-400 text-amber-400"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">4.9</span> · Based
                on 500+ shop reviews
              </p>
            </motion.div>
          </div>

          {/* Product preview */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-3xl bg-brand/5 blur-2xl" aria-hidden="true" />
            <div className="relative rounded-2xl border border-border/80 bg-surface p-2 shadow-premium">
              <DashboardPreview />
            </div>
          </motion.div>
        </div>

        <StatsBar />
        <ClientLogos />
      </div>
    </section>
  );
}
