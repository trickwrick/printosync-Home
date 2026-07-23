"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Mail, Phone, Shield, Headphones, Cloud } from "lucide-react";
import { ctaNavigation } from "@/shared/config/navigation";
import { siteConfig } from "@/shared/config/site";
import { MagneticButton } from "@/shared/ui/magnetic-button";
import { SectionReveal } from "./section-primitives";

const trustPoints = [
  { icon: Shield, label: "SOC 2 compliant data" },
  { icon: Headphones, label: "Dedicated support" },
  { icon: Cloud, label: "Cloud-based platform" },
] as const;

export function ContactCtaSection() {
  return (
    <SectionReveal className="pb-20 pt-4 lg:pb-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#29b8ba] to-[#289475] px-8 py-14 shadow-glow sm:px-12 lg:px-16 lg:py-16">
          <div className="absolute -right-20 -top-20 size-64 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-16 -left-16 size-48 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />

          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-3xl font-bold tracking-tight text-brand-foreground sm:text-4xl"
              >
                A simpler way to run your print shop
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="mt-4 text-base leading-relaxed text-brand-foreground/80"
              >
                Try PrintoSync with full features. Book a personalized demo and
                see how it fits your workflow.
              </motion.p>

              <ul className="mt-6 space-y-2">
                {trustPoints.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-2 text-sm text-brand-foreground/90"
                  >
                    <Icon className="size-4 shrink-0" aria-hidden="true" />
                    {label}
                  </li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.16 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <MagneticButton
                  href={ctaNavigation.href}
                  variant="primary"
                  className="bg-white text-[#f05121] shadow-lg hover:bg-white/95"
                >
                  {ctaNavigation.title}
                </MagneticButton>
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-brand-foreground transition-colors hover:bg-white/10"
                >
                  Contact sales
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-3"
            >
              {[
                {
                  icon: Calendar,
                  label: "Book a demo",
                  value: "30-min personalized walkthrough",
                  href: ctaNavigation.href,
                },
                {
                  icon: Mail,
                  label: "Email us",
                  value: siteConfig.contact.email,
                  href: `mailto:${siteConfig.contact.email}`,
                },
                {
                  icon: Phone,
                  label: "Call us",
                  value: siteConfig.contact.phone,
                  href: `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`,
                },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex items-center gap-4 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm transition-all hover:bg-white/15"
                >
                  <span className="flex size-11 items-center justify-center rounded-xl bg-white/15 text-brand-foreground">
                    <item.icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-brand-foreground/70">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-brand-foreground">
                      {item.value}
                    </p>
                  </div>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
