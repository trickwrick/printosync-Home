"use client";

import { motion } from "framer-motion";
import type { KanbanCard } from "../types";
import { GlassCard } from "./glass-card";

const priorityColors = {
  high: "border-l-red-400",
  medium: "border-l-amber-400",
  low: "border-l-emerald-400",
};

function KanbanCardItem({ card }: { card: KanbanCard }) {
  return (
    <motion.div
      layout
      whileHover={{ scale: 1.02, y: -2 }}
      className={`cursor-pointer rounded-lg border border-white/[0.06] border-l-2 bg-white/[0.04] p-2.5 ${priorityColors[card.priority]}`}
    >
      <p className="text-[11px] font-medium text-white/85">{card.title}</p>
      <p className="mt-1 text-[9px] text-white/35">{card.client}</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[8px] uppercase text-white/40">
          {card.priority}
        </span>
        <span className="flex size-5 items-center justify-center rounded-full bg-indigo-500/30 text-[8px] font-bold text-indigo-300">
          {card.assignee}
        </span>
      </div>
    </motion.div>
  );
}

export function KanbanBoard({
  columns,
  compact,
}: {
  columns: Record<string, KanbanCard[]>;
  compact?: boolean;
}) {
  return (
    <div className={`flex gap-2 overflow-x-auto pb-1 ${compact ? "max-h-[200px]" : ""}`}>
      {Object.entries(columns).map(([name, cards]) => (
        <div key={name} className="min-w-[140px] flex-1 shrink-0">
          <div className="mb-2 flex items-center justify-between px-1">
            <span className="text-[10px] font-medium text-white/50">{name}</span>
            <span className="rounded-full bg-white/[0.06] px-1.5 text-[9px] text-white/30">
              {cards.length}
            </span>
          </div>
          <div className="space-y-2">
            {cards.map((card) => (
              <KanbanCardItem key={card.id} card={card} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function KanbanPanel({ columns, compact }: { columns: Record<string, KanbanCard[]>; compact?: boolean }) {
  return (
    <GlassCard padding={compact ? "sm" : "md"}>
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-white/40">
        Production Board
      </p>
      <KanbanBoard columns={columns} compact={compact} />
    </GlassCard>
  );
}
