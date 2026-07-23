"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { solutions } from "./content";
import {
  SectionLabel,
  SectionReveal,
  SectionSubtitle,
  SectionTitle,
} from "./section-primitives";

export function SolutionsSection() {
  const [active, setActive] = useState(0);
  const current = solutions[active];

  return (
    <SectionReveal className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel>Solutions</SectionLabel>
          <SectionTitle className="mx-auto">
            One platform. Three powerful pillars.
          </SectionTitle>
          <SectionSubtitle className="mx-auto">
            PrintoSync replaces your fragmented stack with integrated modules
            that share data in real time.
          </SectionSubtitle>
        </div>

        {/* Tab pills */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {solutions.map((sol, i) => (
            <button
              key={sol.id}
              type="button"
              onClick={() => setActive(i)}
              className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                active === i
                  ? "text-white"
                  : "text-white/45 hover:text-white/70"
              }`}
            >
              {active === i && (
                <motion.span
                  layoutId="solution-tab"
                  className="absolute inset-0 rounded-full border border-indigo-500/30 bg-indigo-500/15"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{sol.title}</span>
            </button>
          ))}
        </div>

        {/* Content panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="mx-auto mt-10 max-w-4xl"
          >
            <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-indigo-500/[0.08] via-transparent to-violet-500/[0.05]">
              <div className="grid md:grid-cols-2">
                <div className="p-8 sm:p-10 lg:p-12">
                  <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                    {current.headline}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/50 sm:text-base">
                    {current.description}
                  </p>
                  <ul className="mt-8 space-y-3">
                    {current.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm text-white/70">
                        <span className="flex size-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                          <Check className="size-3" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={current.href}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 transition-colors hover:text-indigo-300"
                  >
                    Explore {current.title}
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
                <div className="relative flex min-h-[240px] items-center justify-center border-t border-white/[0.06] bg-white/[0.02] md:border-l md:border-t-0">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.15),transparent_70%)]" />
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="relative flex size-32 items-center justify-center rounded-3xl border border-indigo-500/20 bg-indigo-500/10"
                  >
                    <span className="font-display text-4xl font-bold text-indigo-300">
                      {String(active + 1).padStart(2, "0")}
                    </span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionReveal>
  );
}
