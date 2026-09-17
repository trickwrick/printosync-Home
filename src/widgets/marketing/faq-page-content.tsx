"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, MessageCircleQuestion, HelpCircle, Mail, Search } from "lucide-react";
import { faqs } from "@/widgets/home/content";
import { MagneticButton } from "@/shared/ui/magnetic-button";

export function FaqPageContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen pb-24 pt-32">
      
      <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-brand/10 text-brand ring-1 ring-brand/20 shadow-[0_0_40px_rgba(var(--brand),0.2)]"
          >
            <MessageCircleQuestion className="size-8" />
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl"
          >
            How can we <span className="text-brand">help you?</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg text-muted-foreground"
          >
            Everything you need to know about PrintoSync. Can&apos;t find the answer you&apos;re looking for? Feel free to contact our support team.
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto mt-10 max-w-xl relative"
          >
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground">
              <Search className="size-5" />
            </div>
            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full rounded-full border border-border bg-background/50 py-4 pl-12 pr-6 text-base text-foreground shadow-sm outline-none transition-all focus:ring-2 focus:ring-brand/20 backdrop-blur-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </div>

        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-4"
        >
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={faq.question}
                  layout
                  className="overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm shadow-sm transition-colors hover:bg-card/80"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-semibold text-foreground">
                      {faq.question}
                    </span>
                    <span className={`flex size-8 shrink-0 items-center justify-center rounded-full transition-colors ${isOpen ? 'bg-brand text-brand-foreground shadow-[0_0_15px_rgba(var(--brand),0.4)]' : 'bg-muted text-muted-foreground'}`}>
                      {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                      >
                        <p className="border-t border-border/50 px-6 pb-6 pt-4 text-base leading-relaxed text-muted-foreground">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <div className="py-12 text-center text-muted-foreground">
              <HelpCircle className="mx-auto mb-4 size-12 opacity-20" />
              <p>No results found for &quot;{searchQuery}&quot;.</p>
            </div>
          )}
        </motion.div>

        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-20 flex flex-col items-center justify-center rounded-3xl border border-brand/20 bg-brand/5 px-6 py-12 text-center relative overflow-hidden shadow-sm"
        >
           <div className="absolute top-0 right-0 -mt-16 -mr-16 size-64 rounded-full bg-brand/10 blur-3xl" />
           <div className="absolute bottom-0 left-0 -mb-16 -ml-16 size-64 rounded-full bg-brand/10 blur-3xl" />
          
          <h3 className="mb-2 font-display text-2xl font-bold text-foreground">Still have questions?</h3>
          <p className="mb-8 max-w-md text-muted-foreground">
            Our team of print industry experts is ready to help you with any questions you might have.
          </p>
          <MagneticButton href="/contact">
            <Mail className="mr-2 size-4" />
            Contact Support
          </MagneticButton>
        </motion.div>
      </div>
    </div>
  );
}
