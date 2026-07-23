"use client";

import { motion } from "framer-motion";
import type { ActivityItem } from "../types";
import { GlassCard } from "./glass-card";

const typeColors: Record<ActivityItem["type"], string> = {
  order: "bg-indigo-500",
  invoice: "bg-emerald-500",
  production: "bg-amber-500",
  crm: "bg-violet-500",
  system: "bg-slate-500",
};

export function ActivityTimeline({ items, compact }: { items: ActivityItem[]; compact?: boolean }) {
  return (
    <GlassCard padding={compact ? "sm" : "md"} className="h-full">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-white/40">
        Activity Timeline
      </p>
      <div className="relative space-y-0">
        <div className="absolute bottom-2 left-[5px] top-2 w-px bg-white/[0.08]" />
        {items.slice(0, compact ? 4 : 6).map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="relative flex gap-3 pb-4 last:pb-0"
          >
            <span
              className={`relative z-10 mt-1.5 size-[11px] shrink-0 rounded-full ring-2 ring-[#0c0c14] ${typeColors[item.type]}`}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-[11px] font-medium text-white/85">{item.title}</p>
                <span className="shrink-0 text-[9px] text-white/30">{item.time}</span>
              </div>
              <p className="mt-0.5 text-[10px] leading-relaxed text-white/40">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}
