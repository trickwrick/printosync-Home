"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Factory, Layers3, Printer } from "lucide-react";
import { industries } from "@/entities/marketing";

export function WhoWeHelpMenu({ isOpen }: { isOpen: boolean }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="absolute left-1/2 top-full z-50 mt-2 w-[920px] -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-background/98 shadow-premium backdrop-blur-xl"
        >
          <div className="grid min-h-[340px] grid-cols-[240px_1fr_330px]">
            <div className="flex flex-col justify-between border-r border-border bg-surface p-8">
              <div>
                <span className="inline-flex bg-brand px-2 py-1 font-display text-2xl font-bold leading-none text-brand-foreground">
                  Who we help
                </span>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  Flexible workflows for every kind of printing business.
                </p>
              </div>
              <Link
                href="/#industries"
                className="group inline-flex items-center justify-center gap-2 rounded-lg border border-brand px-5 py-3 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-brand-foreground"
              >
                View all
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <nav aria-label="Industries" className="p-7">
              <ul className="grid grid-cols-2 gap-x-5 gap-y-1">
                {industries.map((industry) => (
                  <li key={industry.slug}>
                    <Link
                      href={`/industries/${industry.slug}`}
                      className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-brand-muted hover:text-brand"
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-brand transition-colors group-hover:border-brand/30">
                        <Printer className="size-4" aria-hidden="true" />
                      </span>
                      <span className="leading-snug">{industry.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="relative overflow-hidden bg-gradient-to-br from-[#e9f8f5] via-[#d8f0ee] to-[#b9ded9] p-7">
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,.65) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.65) 1px, transparent 1px)",
                  backgroundSize: "34px 34px",
                }}
                aria-hidden="true"
              />
              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-brand text-brand-foreground shadow-glow">
                    <Factory className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-bold text-[#123b3c]">
                    Built for real print operations
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#315f60]">
                    From offset and digital printing to packaging, labels, books,
                    signage, and corrugated boxes.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/70 bg-white/75 p-4 shadow-sm backdrop-blur">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-brand-muted text-brand">
                      <Layers3 className="size-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-[#123b3c]">
                        One connected ERP
                      </p>
                      <p className="text-xs text-[#527879]">
                        Adapted to your workflow
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
