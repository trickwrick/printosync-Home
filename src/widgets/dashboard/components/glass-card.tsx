"use client";

import { cn } from "@/shared/lib/cn";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

const paddingMap = { sm: "p-3", md: "p-4", lg: "p-5" };

export function GlassCard({
  children,
  className,
  hover = false,
  padding = "md",
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md",
        hover && "transition-all duration-200 hover:border-white/[0.14] hover:bg-white/[0.05]",
        paddingMap[padding],
        className,
      )}
    >
      {children}
    </div>
  );
}
