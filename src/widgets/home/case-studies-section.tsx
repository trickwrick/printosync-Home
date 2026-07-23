"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "./content";
import {
  SectionLabel,
  SectionReveal,
  SectionSubtitle,
  SectionTitle,
} from "./section-primitives";

export function CaseStudiesSection() {
  const [featured, ...rest] = caseStudies;

  return (
    <SectionReveal className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <SectionLabel>Case Studies</SectionLabel>
            <SectionTitle>Real results from real shops</SectionTitle>
            <SectionSubtitle>
              See how print businesses like yours achieved measurable growth.
            </SectionSubtitle>
          </div>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1 text-sm font-medium text-indigo-400 hover:text-indigo-300"
          >
            All case studies <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {/* Featured large card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-indigo-600/20 via-violet-600/10 to-transparent lg:row-span-2"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMGg2NHY2NEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDBoNjQiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg==')] opacity-50" />
            <Link
              href={`/case-studies#${featured.slug}`}
              className="relative flex h-full min-h-[400px] flex-col justify-between p-8 sm:p-10"
            >
              <div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/50">
                  {featured.industry}
                </span>
                <h3 className="mt-6 font-display text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                  {featured.title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/50">
                  {featured.excerpt}
                </p>
              </div>
              <div className="mt-8 flex items-end justify-between">
                <div>
                  <p className="font-display text-5xl font-bold text-indigo-400">
                    {featured.metric}
                  </p>
                  <p className="text-sm text-white/40">{featured.metricLabel}</p>
                </div>
                <span className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors group-hover:bg-white/10">
                  <ArrowUpRight className="size-5 text-white/70" />
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Smaller cards */}
          {rest.map((study, i) => (
            <motion.div
              key={study.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={`/case-studies#${study.slug}`}
                className="group flex h-full flex-col justify-between rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-colors hover:border-white/[0.12] hover:bg-white/[0.04] sm:p-8"
              >
                <div>
                  <span className="text-[11px] text-white/30">{study.industry}</span>
                  <h3 className="mt-2 text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors">
                    {study.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/40">{study.excerpt}</p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <span className="font-display text-2xl font-bold text-white">
                      {study.metric}
                    </span>
                    <span className="ml-2 text-xs text-white/35">
                      {study.metricLabel}
                    </span>
                  </div>
                  <ArrowUpRight className="size-4 text-white/30 group-hover:text-indigo-400 transition-colors" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
