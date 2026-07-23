"use client";

import { motion } from "framer-motion";
import { TrendingDown, TrendingUp } from "lucide-react";
import type { StatMetric } from "../types";
import { GlassCard } from "./glass-card";

interface StatCardProps {
  stat: StatMetric;
  index?: number;
  compact?: boolean;
}

export function StatCard({ stat, index = 0, compact }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
    >
      <GlassCard hover padding={compact ? "sm" : "md"} className="h-full">
        <p className="text-[10px] font-medium uppercase tracking-wider text-white/35 sm:text-[11px]">
          {stat.label}
        </p>
        <p className={`mt-1 font-semibold text-white ${compact ? "text-base" : "text-xl"}`}>
          {stat.value}
        </p>
        <div className="mt-1.5 flex items-center gap-1">
          {stat.trend === "up" && <TrendingUp className="size-3 text-emerald-400" />}
          {stat.trend === "down" && <TrendingDown className="size-3 text-red-400" />}
          <span
            className={`text-[10px] font-medium ${
              stat.trend === "up"
                ? "text-emerald-400"
                : stat.trend === "down"
                  ? "text-red-400"
                  : "text-white/40"
            }`}
          >
            {stat.change}
          </span>
        </div>
      </GlassCard>
    </motion.div>
  );
}
