"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { Container } from "@/shared/ui/container";

interface FaqItem {
  question: string;
  answer: string;
}

interface ModuleFaqSectionProps {
  faqs?: FaqItem[];
  moduleTitle: string;
}

export function ModuleFaqSection({ faqs, moduleTitle }: ModuleFaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="border-t border-border bg-surface/50 py-16 lg:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-muted px-3.5 py-1 text-xs font-semibold text-brand">
            <HelpCircle className="size-3.5" />
            Frequently Asked Questions
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Questions about {moduleTitle}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Everything you need to know about setting up and operating this module.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-muted/50"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-foreground sm:text-base">
                    {faq.question}
                  </span>
                  <span
                    className={`flex size-7 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                      isOpen
                        ? "border-brand bg-brand text-brand-foreground"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {isOpen ? <Minus className="size-3.5" /> : <Plus className="size-3.5" />}
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-border px-5 pb-5 pt-3">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
