"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ctaNavigation } from "@/shared/config/navigation";
import { pricingTiers } from "./content";
import {
  SectionLabel,
  SectionReveal,
  SectionSubtitle,
  SectionTitle,
} from "./section-primitives";

export function PricingSection() {
  return (
    <SectionReveal className="border-t border-border bg-surface py-16 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <SectionLabel>Pricing</SectionLabel>
          <SectionTitle className="mx-auto">Plans that scale with your shop</SectionTitle>
          <SectionSubtitle className="mx-auto">
            14-day free trial. No credit card required.
          </SectionSubtitle>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {pricingTiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: tier.highlighted ? 0 : -4 }}
              className={`relative flex flex-col rounded-2xl border p-7 shadow-sm ${
                tier.highlighted
                  ? "border-brand/50 bg-card shadow-glow lg:scale-[1.02]"
                  : "border-border bg-card"
              }`}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-0.5 text-[11px] font-semibold text-brand-foreground">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-semibold text-foreground">{tier.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
              <div className="mt-5">
                {tier.price ? (
                  <p className="font-display text-4xl font-bold text-foreground">
                    ${tier.price}
                    <span className="text-base font-normal text-muted-foreground">/mo</span>
                  </p>
                ) : (
                  <p className="font-display text-4xl font-bold text-foreground">Custom</p>
                )}
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={tier.highlighted ? ctaNavigation.href : "/pricing"}
                className={`mt-7 block rounded-full py-3 text-center text-sm font-semibold transition-all ${
                  tier.highlighted
                    ? "bg-primary text-primary-foreground shadow-[var(--shadow-cta)] hover:bg-[#e04a1e]"
                    : "border border-border text-foreground hover:border-brand/40 hover:bg-brand-muted"
                }`}
              >
                {tier.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
