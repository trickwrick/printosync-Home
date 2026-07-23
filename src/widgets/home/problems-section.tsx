"use client";

import { motion } from "framer-motion";
import {
  Clock,
  MessageSquareWarning,
  PackageX,
  Unplug,
} from "lucide-react";
import { problems } from "./content";
import {
  SectionLabel,
  SectionReveal,
  SectionSubtitle,
  SectionTitle,
  StaggerItem,
  StaggerReveal,
} from "./section-primitives";

const iconMap = {
  Unplug,
  Clock,
  PackageX,
  MessageSquareWarning,
};

export function ProblemsSection() {
  return (
    <SectionReveal className="border-t border-white/[0.04] py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          {/* Sticky left column */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>Problems We Solve</SectionLabel>
            <SectionTitle>
              Print shops lose money on{" "}
              <span className="text-red-400">broken workflows</span>
            </SectionTitle>
            <SectionSubtitle>
              Legacy tools weren&apos;t built for printing. Here&apos;s what
              costs shops like yours every single day.
            </SectionSubtitle>
          </div>

          {/* Scrolling problem cards */}
          <StaggerReveal className="space-y-4">
            {problems.map((problem, i) => {
              const Icon = iconMap[problem.icon as keyof typeof iconMap];
              return (
                <StaggerItem key={problem.id}>
                  <motion.div
                    whileHover={{ x: 8, borderColor: "rgba(239,68,68,0.3)" }}
                    transition={{ duration: 0.2 }}
                    className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-r from-red-500/[0.04] to-transparent p-6 sm:p-8"
                  >
                    <div className="absolute -right-8 -top-8 size-32 rounded-full bg-red-500/5 blur-2xl transition-opacity group-hover:opacity-100 opacity-0" />
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex gap-4">
                        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-400">
                          <Icon className="size-5" />
                        </span>
                        <div>
                          <span className="text-[11px] font-mono text-white/25">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <h3 className="mt-1 text-lg font-semibold text-white">
                            {problem.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-white/45">
                            {problem.description}
                          </p>
                        </div>
                      </div>
                      <div className="shrink-0 text-right sm:pl-4">
                        <p className="font-display text-2xl font-bold text-red-400">
                          {problem.stat}
                        </p>
                        <p className="text-[11px] text-white/30">
                          {problem.statLabel}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerReveal>
        </div>
      </div>
    </SectionReveal>
  );
}
