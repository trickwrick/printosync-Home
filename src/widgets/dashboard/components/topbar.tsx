"use client";

import { Bell, Plus, Search } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import type { DashboardModule } from "../types";
import { navModules } from "../config/navigation";

interface DashboardTopbarProps {
  activeModule: DashboardModule;
  notificationCount?: number;
  onNotificationsClick?: () => void;
  compact?: boolean;
}

export function DashboardTopbar({
  activeModule,
  notificationCount = 2,
  onNotificationsClick,
  compact,
}: DashboardTopbarProps) {
  const moduleLabel = navModules.find((m) => m.id === activeModule)?.label ?? "Dashboard";

  return (
    <header className="flex h-11 shrink-0 items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-3 backdrop-blur-md sm:px-4">
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-[13px] font-semibold text-white">{moduleLabel}</h1>
        {!compact && (
          <p className="truncate text-[10px] text-white/30">Welcome back, Operations Team</p>
        )}
      </div>

      <div className="hidden items-center gap-2 sm:flex">
        <div className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5">
          <Search className="size-3 text-white/30" />
          <span className="text-[10px] text-white/25">Search orders, clients...</span>
          <kbd className="rounded border border-white/10 bg-white/[0.04] px-1 text-[8px] text-white/25">
            ⌘K
          </kbd>
        </div>
      </div>

      <button
        type="button"
        className="hidden items-center gap-1.5 rounded-lg bg-indigo-600 px-2.5 py-1.5 text-[10px] font-semibold text-white transition-colors hover:bg-indigo-500 sm:flex"
      >
        <Plus className="size-3" />
        New Order
      </button>

      <button
        type="button"
        onClick={onNotificationsClick}
        className={cn(
          "relative rounded-lg border border-white/[0.08] p-1.5 text-white/50 transition-colors hover:bg-white/[0.04] hover:text-white/80",
        )}
        aria-label="Notifications"
      >
        <Bell className="size-3.5" />
        {notificationCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex size-3.5 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white">
            {notificationCount}
          </span>
        )}
      </button>

      <div className="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-[9px] font-bold text-white">
        OP
      </div>
    </header>
  );
}
