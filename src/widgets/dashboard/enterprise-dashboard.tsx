"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import type { DashboardModule } from "./types";
import { DashboardSidebar } from "./components/sidebar";
import { DashboardTopbar } from "./components/topbar";
import { ModuleViews } from "./views/module-views";

export interface EnterpriseDashboardProps {
  variant?: "hero" | "showcase" | "full";
  className?: string;
  defaultModule?: DashboardModule;
}

export function EnterpriseDashboard({
  variant = "full",
  className,
  defaultModule = "dashboard",
}: EnterpriseDashboardProps) {
  const [activeModule, setActiveModule] = useState<DashboardModule>(defaultModule);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(variant === "hero");

  const isHero = variant === "hero";
  const isShowcase = variant === "showcase";

  return (
    <motion.div
      initial={{ opacity: 0, y: variant === "hero" ? 40 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: variant === "hero" ? 0.4 : 0, ease: [0.23, 1, 0.32, 1] }}
      className={cn("relative mx-auto w-full", className)}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-linear-to-b from-indigo-500/15 via-violet-500/5 to-transparent blur-2xl" />

      <div
        className={cn(
          "relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-[#0a0a12]/95 shadow-2xl shadow-indigo-500/10 backdrop-blur-2xl",
          (isHero || isShowcase) && "max-h-115 sm:max-h-120",
        )}
      >
        {/* Browser chrome */}
        <div className="flex shrink-0 items-center gap-3 border-b border-white/6 bg-black/30 px-3 py-2.5 sm:px-4">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-red-500/70" />
            <span className="size-2.5 rounded-full bg-amber-500/70" />
            <span className="size-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="flex max-w-xs flex-1 items-center gap-2 rounded-md border border-white/6 bg-white/3 px-3 py-1 sm:max-w-md">
              <Search className="size-3 shrink-0 text-white/25" />
              <span className="truncate text-[10px] text-white/30">
                app.printosync.com/{activeModule === "dashboard" ? "" : activeModule}
              </span>
            </div>
          </div>
          <div className="hidden size-2 sm:block" />
        </div>

        <div className="flex min-h-0 flex-1">
          <DashboardSidebar
            active={activeModule}
            onNavigate={setActiveModule}
            collapsed={sidebarCollapsed || isHero}
            onToggleCollapse={
              !isHero ? () => setSidebarCollapsed((c) => !c) : undefined
            }
          />

          <div className="flex min-w-0 flex-1 flex-col">
            <DashboardTopbar
              activeModule={activeModule}
              onNotificationsClick={() => setActiveModule("notifications")}
              compact={isHero}
            />

            <main
              className={cn(
                "flex-1 overflow-y-auto overflow-x-hidden p-3 scrollbar-none sm:p-4",
                isHero && "max-h-87.5 sm:max-h-92.5",
              )}
            >
              <ModuleViews module={activeModule} compact={isHero} />
            </main>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
