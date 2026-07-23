"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { CalendarEvent } from "../types";
import { GlassCard } from "./glass-card";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function CalendarWidget({
  events,
  compact,
}: {
  events: CalendarEvent[];
  compact?: boolean;
}) {
  const [month] = useState("March 2026");
  const today = 23;
  const daysInMonth = 31;
  const startDay = 0;

  const cells = Array.from({ length: startDay + daysInMonth }, (_, i) =>
    i < startDay ? null : i - startDay + 1,
  );

  return (
    <GlassCard padding={compact ? "sm" : "md"} className="h-full">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
          Calendar
        </p>
        <div className="flex items-center gap-1">
          <button type="button" className="rounded p-0.5 text-white/30 hover:bg-white/5 hover:text-white/60">
            <ChevronLeft className="size-3.5" />
          </button>
          <span className="text-[10px] font-medium text-white/60">{month}</span>
          <button type="button" className="rounded p-0.5 text-white/30 hover:bg-white/5 hover:text-white/60">
            <ChevronRight className="size-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-0.5 text-center">
        {DAYS.map((d) => (
          <span key={d} className="py-1 text-[8px] font-medium text-white/25">
            {d}
          </span>
        ))}
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;
          const dayEvents = events.filter((e) => e.date === day);
          const isToday = day === today;

          return (
            <motion.button
              key={day}
              type="button"
              whileHover={{ scale: 1.1 }}
              className={`relative flex aspect-square flex-col items-center justify-center rounded-md text-[10px] ${
                isToday
                  ? "bg-indigo-500/30 font-semibold text-indigo-200"
                  : "text-white/50 hover:bg-white/[0.04]"
              }`}
            >
              {day}
              {dayEvents.length > 0 && (
                <span className="absolute bottom-0.5 flex gap-px">
                  {dayEvents.slice(0, 2).map((e) => (
                    <span key={e.id} className={`size-1 rounded-full ${e.color}`} />
                  ))}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {!compact && (
        <div className="mt-3 space-y-1.5 border-t border-white/[0.06] pt-3">
          {events.slice(0, 3).map((e) => (
            <div key={e.id} className="flex items-center gap-2 text-[10px]">
              <span className={`size-1.5 rounded-full ${e.color}`} />
              <span className="text-white/35">{e.time}</span>
              <span className="truncate text-white/60">{e.title}</span>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
}
