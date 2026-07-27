"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import type { MegaMenuSection } from "@/shared/config/navigation";
import { cn } from "@/shared/lib/cn";

interface MegaMenuProps {
  sections: MegaMenuSection[];
  isOpen: boolean;
}

function MegaMenuItem({
  title,
  href,
  description,
  icon: Icon,
}: {
  title: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
}) {
  return (
    <Link
      href={href}
      className="group flex gap-3 rounded-xl p-3 transition-colors hover:bg-muted"
    >
      {Icon && (
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-brand transition-colors group-hover:border-brand/30 group-hover:bg-brand-muted">
          <Icon className="size-[18px]" />
        </span>
      )}
      <span className="flex flex-col gap-0.5">
        <span className="flex items-center gap-1 text-sm font-medium text-foreground">
          {title}
          <ArrowRight className="size-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
        </span>
        {description && (
          <span className="text-xs leading-relaxed text-muted-foreground">
            {description}
          </span>
        )}
      </span>
    </Link>
  );
}

export function MegaMenu({ sections, isOpen }: MegaMenuProps) {
  const isWide = sections.length > 2;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className={cn(
            "absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2",
            isWide ? "w-[960px]" : "w-[620px]",
            "rounded-2xl border border-border bg-background/98 p-2 shadow-premium backdrop-blur-xl",
          )}
        >
          <div className={cn("grid gap-1", isWide ? "grid-cols-4" : "grid-cols-2")}>
            {sections.map((section) => (
              <div key={section.title} className="p-2">
                <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {section.title}
                </p>
                <div className="space-y-0.5">
                  {section.items.map((item) => (
                    <MegaMenuItem key={item.href} {...item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
