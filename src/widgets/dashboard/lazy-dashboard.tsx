"use client";

import dynamic from "next/dynamic";
import type { EnterpriseDashboardProps } from "./enterprise-dashboard";

function DashboardSkeleton() {
  return (
    <div
      className="mx-auto aspect-[16/10] min-h-[280px] w-full animate-pulse rounded-xl bg-muted"
      aria-hidden="true"
    />
  );
}

/** Single lazy-load entry for EnterpriseDashboard — avoids nested dynamic imports. */
export const LazyEnterpriseDashboard = dynamic<EnterpriseDashboardProps>(
  () =>
    import("./enterprise-dashboard").then((mod) => ({
      default: mod.EnterpriseDashboard,
    })),
  {
    ssr: false,
    loading: DashboardSkeleton,
  },
);
