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
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {clientLogos.map((name, i) => (
          <motion.span
            key={name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 + i * 0.05 }}
            className="text-sm font-semibold tracking-tight text-muted-foreground/70 transition-colors hover:text-foreground"
          >
            {name}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
