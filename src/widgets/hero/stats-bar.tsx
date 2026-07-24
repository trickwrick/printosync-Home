"use client";

import { motion } from "framer-motion";
import { heroStats } from "@/shared/config/navigation";
import { useCountUp } from "@/shared/hooks/use-count-up";

function StatItem({
  value,
  suffix,
  label,
  decimals = 0,
}: {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}) {
  const { count, ref } = useCountUp({ end: value, decimals, duration: 2000 });

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {decimals > 0 ? count.toFixed(decimals) : Math.round(count)}
        <span className="text-brand">{suffix}</span>
      </p>
      <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{label}</p>
    </div>
  );
}

export function StatsBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="mt-14 grid grid-cols-2 gap-6 rounded-2xl border border-border bg-card px-6 py-8 shadow-sm sm:grid-cols-4 sm:gap-4"
    >
      {heroStats.map((stat) => (
        <StatItem
          key={stat.label}
          value={stat.value}
          suffix={stat.suffix}
          label={stat.label}
          decimals={Number.isInteger(stat.value) ? 0 : 1}
        />
      ))}
    </motion.div>
  );
}
