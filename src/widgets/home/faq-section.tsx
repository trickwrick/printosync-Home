"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { faqs } from "./content";
import {
  SectionLabel,
  SectionReveal,
  SectionSubtitle,
  SectionTitle,
} from "./section-primitives";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const displayFaqs = faqs.slice(0, 4);

  return (
    <SectionReveal id="faq" className="py-16 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <SectionLabel>FAQ</SectionLabel>
          <SectionTitle className="mx-auto">You ask. We answer.</SectionTitle>
          <SectionSubtitle className="mx-auto">
            Quick answers to your most important questions.
          </SectionSubtitle>
        </div>

        <div className="mx-auto max-w-3xl space-y-3">
          {displayFaqs.map((faq, globalIndex) => {
            const isOpen = openIndex === globalIndex;

            return (
              <motion.div
                key={faq.question}
                layout
                className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-muted/50"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-medium text-foreground">
                    {faq.question}
                  </span>
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground">
                    {isOpen ? <Minus className="size-3.5" /> : <Plus className="size-3.5" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                    >
                      <p className="border-t border-border px-5 pb-5 pt-3 text-sm leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionReveal>
  );
}
