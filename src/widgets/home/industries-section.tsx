"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { industries } from "./content";
import {
  SectionLabel,
  SectionReveal,
  SectionSubtitle,
  SectionTitle,
} from "./section-primitives";

const colorMap = {
  indigo: "from-indigo-600/40 to-indigo-900/20 border-indigo-500/20",
  emerald: "from-emerald-600/40 to-emerald-900/20 border-emerald-500/20",
  amber: "from-amber-600/40 to-amber-900/20 border-amber-500/20",
  violet: "from-violet-600/40 to-violet-900/20 border-violet-500/20",
  cyan: "from-cyan-600/40 to-cyan-900/20 border-cyan-500/20",
};

export function IndustriesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <SectionReveal className="overflow-hidden border-t border-white/[0.04] py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <SectionLabel>Industries</SectionLabel>
            <SectionTitle>Built for every print vertical</SectionTitle>
            <SectionSubtitle>
              Whether you run offset, digital, packaging, or wide format —
              PrintoSync adapts to your specialty.
            </SectionSubtitle>
          </div>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1 text-sm font-medium text-indigo-400 hover:text-indigo-300"
          >
            View case studies <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="mt-8 h-0.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-[width] duration-150"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      {/* Horizontal scroll */}
      <div
        ref={scrollRef}
        className="mt-10 flex gap-5 overflow-x-auto px-6 pb-4 scrollbar-none lg:px-[max(2rem,calc((100vw-1400px)/2+2rem))]"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {industries.map((industry, i) => (
          <motion.article
            key={industry.name}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -8 }}
            className={`group relative h-[320px] w-[280px] shrink-0 overflow-hidden rounded-2xl border bg-gradient-to-br ${colorMap[industry.color as keyof typeof colorMap]} sm:w-[320px]`}
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_60%)]" />
            <div className="relative flex h-full flex-col justify-between p-7">
              <span className="w-fit rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] text-white/60 backdrop-blur-sm">
                {industry.jobs}
              </span>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {industry.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  {industry.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-white/40 opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more <ArrowUpRight className="size-3" />
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </SectionReveal>
  );
}
