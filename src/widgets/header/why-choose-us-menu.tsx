"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Monitor,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

const links = [
  { title: "About", href: "/about" },
  { title: "Security", href: "/legal/data-security" },
  { title: "Testimonials", href: "/#customer-success" },
] as const;

export function WhyChooseUsMenu({ isOpen }: { isOpen: boolean }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="absolute left-1/2 top-full z-50 mt-2 w-[880px] -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-background/98 shadow-premium backdrop-blur-xl"
        >
          <div className="grid min-h-[340px] grid-cols-[260px_270px_1fr]">
            <div className="flex flex-col justify-between border-r border-border bg-surface p-8">
              <div>
                <h2 className="font-display text-3xl font-bold tracking-tight text-foreground">
                  Why choose us
                </h2>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  Print-focused software, secure access, and practical support
                  for your entire team.
                </p>
              </div>
              <Link
                href="/company/why-printosync"
                className="group inline-flex items-center justify-center gap-2 rounded-lg border border-brand px-5 py-3 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-brand-foreground"
              >
                View all
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <nav aria-label="Why choose PrintoSync" className="p-7">
              <ul className="space-y-2">
                {links.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-center justify-between rounded-xl px-4 py-4 text-base font-semibold text-foreground transition-colors hover:bg-brand-muted hover:text-brand"
                    >
                      {item.title}
                      <ArrowRight className="size-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="relative overflow-hidden bg-gradient-to-br from-[#fde7ef] via-[#f7d4e2] to-[#efbfd1] p-8">
              <div className="absolute -right-10 -top-12 size-44 rounded-full bg-white/35 blur-2xl" />
              <div className="relative flex h-full flex-col justify-center">
                <div className="mx-auto w-full max-w-[280px] rounded-2xl border-[5px] border-[#24383a] bg-[#f7fbfa] p-3 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <span className="h-2 w-16 rounded-full bg-brand/30" />
                    <span className="size-2 rounded-full bg-brand" />
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {[
                      { icon: BarChart3, value: "Live" },
                      { icon: ShieldCheck, value: "Secure" },
                      { icon: CheckCircle2, value: "Simple" },
                    ].map(({ icon: Icon, value }) => (
                      <div
                        key={value}
                        className="rounded-lg border border-border bg-white p-2 text-center"
                      >
                        <Icon className="mx-auto size-4 text-brand" />
                        <p className="mt-1 text-[9px] font-bold text-foreground">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 h-16 rounded-lg bg-gradient-to-r from-brand-muted to-[#dff3ee] p-2">
                    <div className="flex h-full items-end gap-1">
                      {[35, 55, 42, 70, 58, 85, 76].map((height, index) => (
                        <span
                          key={index}
                          className="flex-1 rounded-t-sm bg-brand/70"
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative mx-auto -mt-5 flex w-[230px] items-end justify-between">
                  <span className="flex size-16 items-center justify-center rounded-xl border-4 border-[#24383a] bg-white shadow-lg">
                    <Monitor className="size-7 text-brand" />
                  </span>
                  <span className="flex h-20 w-12 items-center justify-center rounded-xl border-4 border-[#24383a] bg-white shadow-lg">
                    <Smartphone className="size-5 text-brand" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
