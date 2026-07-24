"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Handshake,
  Printer,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { ctaNavigation } from "@/shared/config/navigation";
import { siteConfig } from "@/shared/config/site";
import { Container } from "@/shared/ui/container";
import { MagneticButton } from "@/shared/ui/magnetic-button";
import {
  SectionLabel,
  SectionReveal,
  SectionSubtitle,
  SectionTitle,
  StaggerItem,
  StaggerReveal,
} from "@/widgets/home/section-primitives";
import {
  aboutCapabilities,
  aboutMilestones,
  aboutStats,
  aboutValues,
} from "./content";

const valueIcons: Record<string, LucideIcon> = {
  Printer,
  Sparkles,
  BarChart3,
  Handshake,
};

export function AboutPageContent() {
  return (
    <div className="pb-16">
      {/* Mission */}
      <SectionReveal className="border-b border-border bg-surface py-12 lg:py-16">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionLabel>Our story</SectionLabel>
              <SectionTitle>
                Software born on the shop floor
              </SectionTitle>
              <SectionSubtitle>
                PrintoSync started with a simple belief: printing presses deserve
                the same caliber of operations software as any modern enterprise
                — without the complexity, cost, or generic workflows of
                one-size-fits-all tools.
              </SectionSubtitle>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Today we help owners unify CRM, ERP, MIS, inventory, and
                production in one cloud platform — so teams spend less time
                chasing information and more time delivering great print.
              </p>
            </div>

            <StaggerReveal className="grid grid-cols-2 gap-4">
              {aboutStats.map((stat) => (
                <StaggerItem key={stat.label}>
                  <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
                    <p className="font-display text-3xl font-bold text-brand sm:text-4xl">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-xs font-medium text-muted-foreground sm:text-sm">
                      {stat.label}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </Container>
      </SectionReveal>

      {/* Values */}
      <SectionReveal className="py-12 lg:py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>What we stand for</SectionLabel>
            <SectionTitle className="mx-auto">Our values</SectionTitle>
            <SectionSubtitle className="mx-auto">
              Everything we build reflects how print shops actually work — and
              what they need to grow sustainably.
            </SectionSubtitle>
          </div>

          <StaggerReveal className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {aboutValues.map((value) => {
              const Icon = valueIcons[value.icon] ?? Printer;
              return (
                <StaggerItem key={value.title}>
                  <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-muted text-brand">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                      {value.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerReveal>
        </Container>
      </SectionReveal>

      {/* Platform */}
      <SectionReveal className="border-y border-border bg-surface py-12 lg:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <SectionLabel>The platform</SectionLabel>
              <SectionTitle>One system for your entire operation</SectionTitle>
              <SectionSubtitle>
                From first inquiry to final invoice, {siteConfig.name} connects
                every department in your print business.
              </SectionSubtitle>
              <Link
                href="/services"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand"
              >
                Explore all services
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {aboutCapabilities.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground shadow-sm"
                >
                  <span
                    className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </SectionReveal>

      {/* Timeline */}
      <SectionReveal className="py-12 lg:py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>Our journey</SectionLabel>
            <SectionTitle className="mx-auto">How we got here</SectionTitle>
          </div>

          <ol className="mx-auto mt-10 max-w-3xl space-y-0">
            {aboutMilestones.map((item, index) => (
              <li
                key={item.year}
                className="relative flex gap-6 pb-10 last:pb-0"
              >
                {index < aboutMilestones.length - 1 && (
                  <span
                    className="absolute left-[27px] top-10 h-[calc(100%-2rem)] w-px bg-border"
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border border-brand/20 bg-brand-muted font-display text-sm font-bold text-brand">
                  {item.year}
                </span>
                <div className="pt-2">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </SectionReveal>

      {/* CTA */}
      <SectionReveal>
        <Container>
          <div className="rounded-2xl border border-border bg-gradient-to-br from-brand-muted to-background px-8 py-10 text-center shadow-premium lg:px-12 lg:py-14">
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              Ready to modernize your print shop?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Book a personalized demo and see how {siteConfig.name} can unify
              your CRM, production, and billing in one place.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <MagneticButton href={ctaNavigation.href}>
                {ctaNavigation.title}
              </MagneticButton>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-brand/30 hover:bg-brand-muted"
              >
                Contact us
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </SectionReveal>
    </div>
  );
}
