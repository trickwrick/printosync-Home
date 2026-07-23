"use client";

import { Search } from "lucide-react";

/** Lightweight hero mock — avoids loading the full interactive dashboard twice on the homepage. */
export function DashboardStaticPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[980px] perspective-[1200px]">
      <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-b from-indigo-500/15 via-violet-500/5 to-transparent blur-2xl" />

      <div className="relative flex max-h-[580px] flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a12]/95 shadow-2xl shadow-indigo-500/10 backdrop-blur-2xl sm:max-h-[620px]">
        <div className="flex shrink-0 items-center gap-3 border-b border-white/[0.06] bg-black/30 px-3 py-2.5 sm:px-4">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-red-500/70" />
            <span className="size-2.5 rounded-full bg-amber-500/70" />
            <span className="size-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="flex max-w-xs flex-1 items-center gap-2 rounded-md border border-white/[0.06] bg-white/[0.03] px-3 py-1 sm:max-w-md">
              <Search className="size-3 shrink-0 text-white/25" />
              <span className="truncate text-[10px] text-white/30">app.printosync.com</span>
            </div>
          </div>
        </div>

        <div className="flex min-h-0 flex-1">
          <div className="hidden w-14 shrink-0 border-r border-white/[0.06] bg-black/20 p-2 sm:block">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`mb-2 h-8 rounded-lg ${i === 0 ? "bg-brand/30" : "bg-white/[0.04]"}`}
              />
            ))}
          </div>

          <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="h-4 w-32 rounded bg-white/10" />
              <div className="h-8 w-24 rounded-lg bg-brand/20" />
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {["Jobs today", "Revenue", "In production"].map((label) => (
                <div
                  key={label}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3"
                >
                  <p className="text-[10px] text-white/40">{label}</p>
                  <div className="mt-2 h-5 w-16 rounded bg-white/10" />
                </div>
              ))}
            </div>

            <div className="mt-4 flex-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
              <div className="mb-3 h-3 w-28 rounded bg-white/10" />
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="mb-2 flex items-center gap-2">
                  <div className="size-2 rounded-full bg-brand/50" />
                  <div className="h-2 flex-1 rounded bg-white/[0.06]" />
                  <div className="h-2 w-10 rounded bg-white/[0.08]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
