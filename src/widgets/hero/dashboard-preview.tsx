"use client";

import { LazyEnterpriseDashboard } from "@/widgets/dashboard/lazy-dashboard";

export function DashboardPreview() {
  return (
    <LazyEnterpriseDashboard
      variant="hero"
      className="max-w-[980px] perspective-[1200px]"
    />
  );
}
