"use client";

import { motion } from "framer-motion";
import { clientLogos } from "@/shared/config/navigation";

export function ClientLogos() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7, duration: 0.6 }}
      className="mt-12 border-t border-border pt-8"
    >
      <p className="mb-5 text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
        Trusted by leading print shops
      </p>

      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <motion.div
          className="flex w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, ease: "linear", repeat: Infinity }}
        >
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex shrink-0 items-center gap-4 pr-4"
              aria-hidden={copy === 1}
            >
              {clientLogos.map((name, i) => (
                <motion.span
                  key={`${copy}-${name}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75 + i * 0.05 }}
                  className="flex min-w-40 items-center justify-center rounded-xl border border-border bg-card px-6 py-4 text-sm font-semibold tracking-tight text-muted-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:text-brand hover:shadow-premium"
                >
                  {name}
                </motion.span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
