"use client";

import { cn } from "@/shared/lib/cn";
import type { DashboardModule } from "../types";
import { navGroups, navModules } from "../config/navigation";

interface DashboardSidebarProps {
  active: DashboardModule;
  onNavigate: (module: DashboardModule) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function DashboardSidebar({
  active,
  onNavigate,
  collapsed,
  onToggleCollapse,
}: DashboardSidebarProps) {
  return (
    <aside
      className={cn(
        "flex shrink-0 flex-col border-r border-white/[0.06] bg-black/20 transition-all duration-300",
        collapsed ? "w-[52px]" : "w-[168px] lg:w-[180px]",
      )}
    >
      <div className="flex h-11 items-center justify-between border-b border-white/[0.06] px-3">
        {!collapsed && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">
            PrintoSync
          </span>
        )}
        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            className="rounded-md p-1 text-white/30 hover:bg-white/5 hover:text-white/60"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {collapsed ? (
                <path d="M9 18l6-6-6-6" />
              ) : (
                <path d="M15 18l-6-6 6-6" />
              )}
            </svg>
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto overflow-x-hidden p-2 scrollbar-none">
        {navGroups.map((group) => {
          const items = navModules.filter((m) => m.group === group.key);
          return (
            <div key={group.key} className="mb-3">
              {!collapsed && (
                <p className="mb-1.5 px-2 text-[8px] font-semibold uppercase tracking-[0.15em] text-white/20">
                  {group.label}
                </p>
              )}
              <ul className="space-y-0.5">
                {items.map((item) => {
                  const isActive = active === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => onNavigate(item.id)}
                        title={collapsed ? item.label : undefined}
                        className={cn(
                          "group relative flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left transition-all",
                          isActive
                            ? "bg-indigo-500/15 text-indigo-300 shadow-sm shadow-indigo-500/10"
                            : "text-white/45 hover:bg-white/[0.04] hover:text-white/75",
                        )}
                      >
                        {isActive && (
                          <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-indigo-400" />
                        )}
                        <item.icon className="size-3.5 shrink-0" />
                        {!collapsed && (
                          <>
                            <span className="flex-1 truncate text-[11px] font-medium">
                              {item.label}
                            </span>
                            {item.badge && (
                              <span className="rounded-full bg-indigo-500/25 px-1.5 text-[9px] font-semibold text-indigo-300">
                                {item.badge}
                              </span>
                            )}
                          </>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
