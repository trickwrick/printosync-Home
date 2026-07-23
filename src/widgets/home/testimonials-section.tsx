"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "./content";
import {
  SectionLabel,
  SectionReveal,
  SectionSubtitle,
  SectionTitle,
} from "./section-primitives";

export function TestimonialsSection() {
  return (
    <SectionReveal className="border-t border-white/[0.04] bg-white/[0.01] py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <SectionLabel>Testimonials</SectionLabel>
          <SectionTitle className="mx-auto">
            Loved by print shop owners
          </SectionTitle>
          <SectionSubtitle className="mx-auto">
            Hear from operations leaders who transformed their businesses with
            PrintoSync.
          </SectionSubtitle>
        </div>

        {/* Marquee-style dual row */}
        <div className="space-y-4 overflow-hidden">
          <div className="flex animate-marquee gap-4">
            {[...testimonials, ...testimonials].map((t, i) => (
              <TestimonialCard key={`${t.author}-${i}`} {...t} />
            ))}
          </div>
          <div className="flex animate-marquee-reverse gap-4">
            {[...testimonials.slice(2), ...testimonials.slice(0, 2), ...testimonials.slice(2), ...testimonials.slice(0, 2)].map((t, i) => (
              <TestimonialCard key={`rev-${t.author}-${i}`} {...t} />
            ))}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

function TestimonialCard({
  quote,
  author,
  role,
  company,
  avatar,
}: (typeof testimonials)[number]) {
  return (
    <motion.div
      whileHover={{ y: -4, borderColor: "rgba(99,102,241,0.3)" }}
      className="w-[340px] shrink-0 rounded-2xl border border-white/[0.06] bg-neutral-950/80 p-6 backdrop-blur-sm"
    >
      <Quote className="size-6 text-indigo-500/40" />
      <p className="mt-4 text-sm leading-relaxed text-white/60">&ldquo;{quote}&rdquo;</p>
      <div className="mt-6 flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-bold text-white">
          {avatar}
        </span>
        <div>
          <p className="text-sm font-semibold text-white">{author}</p>
          <p className="text-[11px] text-white/40">
            {role}, {company}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
