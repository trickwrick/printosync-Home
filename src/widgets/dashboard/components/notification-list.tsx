"use client";

import { motion } from "framer-motion";
import type { NotificationItem } from "../types";
import { GlassCard } from "./glass-card";

const typeStyles: Record<NotificationItem["type"], string> = {
  alert: "bg-red-500/15 text-red-400",
  info: "bg-blue-500/15 text-blue-400",
  success: "bg-emerald-500/15 text-emerald-400",
};

export function NotificationList({
  items,
  compact,
}: {
  items: NotificationItem[];
  compact?: boolean;
}) {
  return (
    <GlassCard padding={compact ? "sm" : "md"} className="h-full">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
          Notifications
        </p>
        <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[9px] font-medium text-indigo-300">
          {items.filter((n) => !n.read).length} new
        </span>
      </div>
      <div className="space-y-2">
        {items.map((n, i) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`rounded-lg border p-2.5 transition-colors ${
              n.read
                ? "border-white/[0.04] bg-transparent"
                : "border-indigo-500/20 bg-indigo-500/[0.04]"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className={`rounded px-1.5 py-0.5 text-[8px] font-medium uppercase ${typeStyles[n.type]}`}>
                  {n.type}
                </span>
                <p className="text-[11px] font-medium text-white/80">{n.title}</p>
              </div>
              <span className="shrink-0 text-[9px] text-white/25">{n.time}</span>
            </div>
            <p className="mt-1 text-[10px] text-white/40">{n.message}</p>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}
