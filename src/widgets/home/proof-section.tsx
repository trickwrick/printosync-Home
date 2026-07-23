"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import { ctaNavigation } from "@/shared/config/navigation";
import { testimonials, caseStudies } from "./content";
import {
  SectionLabel,
  SectionReveal,
  SectionTitle,
  StaggerItem,
  StaggerReveal,
} from "./section-primitives";
import { MagneticButton } from "@/shared/ui/magnetic-button";

export function ProofSection() {
  const featured = testimonials.slice(0, 2);
  const topCase = caseStudies[0];

  return (
    <SectionReveal className="border-t border-border py-16 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionLabel>Testimonials</SectionLabel>
            <SectionTitle>Loved by print shop owners</SectionTitle>
            <StaggerReveal className="mt-8 space-y-5">
              {featured.map((t) => (
                <StaggerItem key={t.author}>
                  <blockquote className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <Quote className="size-5 text-brand/40" aria-hidden="true" />
                    <p className="mt-3 text-sm leading-relaxed text-foreground">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <footer className="mt-4 flex items-center gap-3">
                      <span className="flex size-9 items-center justify-center rounded-full bg-brand-muted text-xs font-bold text-brand">
                        {t.avatar}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {t.author}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t.role}, {t.company}
                        </p>
                      </div>
                    </footer>
                  </blockquote>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>

          <div>
            <SectionLabel>Case study</SectionLabel>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border bg-gradient-to-br from-brand-muted to-background p-8 shadow-premium"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                {topCase.industry}
              </p>
              <p className="mt-4 font-display text-5xl font-bold text-brand">
                {topCase.metric}
              </p>
              <p className="text-sm font-medium text-muted-foreground">
                {topCase.metricLabel}
              </p>
              <h3 className="mt-4 text-xl font-semibold text-foreground">
                {topCase.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {topCase.excerpt}
              </p>
              <Link
                href="/case-studies"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand"
              >
                Read case studies
                <ArrowRight className="size-4" />
              </Link>
            </motion.div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {caseStudies.slice(1).map((cs) => (
                <div
                  key={cs.slug}
                  className="rounded-xl border border-border bg-card p-4 text-center shadow-sm"
                >
                  <p className="font-display text-2xl font-bold text-brand">
                    {cs.metric}
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {cs.metricLabel}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 rounded-2xl border border-border bg-surface px-8 py-10 text-center">
          <h3 className="font-display text-2xl font-bold text-foreground">
            Switching is quick and secure
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Dedicated onboarding, data migration, and team training — so you go
            live in weeks, not months.
          </p>
          <div className="mt-6">
            <MagneticButton href={ctaNavigation.href}>
              {ctaNavigation.title}
            </MagneticButton>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
