"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { useMagnetic } from "@/shared/hooks/use-magnetic";

interface MagneticButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "brand";
  className?: string;
  showArrow?: boolean;
}

export function MagneticButton({
  href,
  children,
  variant = "primary",
  className,
  showArrow = true,
}: MagneticButtonProps) {
  const { ref, handleMouseMove, handleMouseLeave } =
    useMagnetic<HTMLAnchorElement>({ strength: 0.22 });

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold transition-[transform,box-shadow,background-color] duration-300 ease-out will-change-transform",
        variant === "primary" && [
          "bg-primary text-primary-foreground",
          "shadow-[var(--shadow-cta)] hover:bg-[#e04a1e]",
        ],
        variant === "brand" && [
          "bg-brand text-brand-foreground shadow-glow hover:bg-[var(--brand-dark)]",
        ],
        variant === "secondary" && [
          "bg-secondary text-secondary-foreground hover:bg-[#d7f2eb]",
        ],
        variant === "outline" && [
          "border border-border bg-background text-foreground shadow-sm",
          "hover:border-brand/40 hover:bg-brand-muted",
        ],
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
      {showArrow && (
        <ArrowRight className="relative z-10 size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      )}
      {variant === "primary" && (
        <span className="absolute inset-0 -z-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}
    </Link>
  );
}
