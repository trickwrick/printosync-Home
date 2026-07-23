"use client";

import { motion } from "framer-motion";
import {
  Headphones,
  Printer,
  Shield,
  Zap,
} from "lucide-react";
import { whyChoose } from "./content";
import {
  SectionLabel,
  SectionReveal,
  SectionSubtitle,
  SectionTitle,
} from "./section-primitives";

const icons = { Printer, Zap, Shield, Headphones };

export function WhyChooseSection() {
  return (
    <SectionReveal className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent">
          <div className="grid lg:grid-cols-[1.2fr_1fr]">
            {/* Left: big stat block */}
            <div className="flex flex-col justify-center border-b border-white/[0.06] p-8 sm:p-12 lg:border-b-0 lg:border-r">
              <SectionLabel>Why PrintoSync</SectionLabel>
              <SectionTitle>
                The platform print shops switch to and stay on
              </SectionTitle>
              <SectionSubtitle>
                Not another generic ERP. PrintoSync is purpose-built by people
                who understand your industry.
              </SectionSubtitle>

              <div className="mt-10 grid grid-cols-2 gap-6">
                {[
                  { value: "500+", label: "Active shops" },
                  { value: "4.9★", label: "Avg. rating" },
                  { value: "99.9%", label: "Uptime" },
                  { value: "2 wks", label: "Avg. go-live" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <p className="font-display text-3xl font-bold text-white">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs text-white/40">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: icon checklist */}
            <div className="divide-y divide-white/[0.06]">
              {whyChoose.map((item, i) => {
                const Icon = icons[item.icon as keyof typeof icons];
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                    className="flex gap-5 p-6 sm:p-8"
                  >
                    <motion.span
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                    >
                      <Icon className="size-5" />
                    </motion.span>
                    <div>
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/45">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
