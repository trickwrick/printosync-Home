import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/shared/lib/cn";

export interface PageHeroBannerProps {
  title: string;
  breadcrumbLabel: string;
  className?: string;
}

export function PageHeroBanner({
  title,
  breadcrumbLabel,
  className,
}: PageHeroBannerProps) {
  return (
    <section
      aria-label="Page header"
      className={cn(
        "relative overflow-hidden border-b border-border bg-background pt-24 sm:pt-28",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 gradient-mesh" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `
              linear-gradient(var(--border) 1px, transparent 1px),
              linear-gradient(90deg, var(--border) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse 90% 80% at 50% 0%, black 20%, transparent 70%)",
          }}
        />
        <div className="absolute -left-16 top-8 size-56 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute -right-12 top-12 size-48 rounded-full bg-brand-muted blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 py-12 text-center md:py-16 lg:px-8">
        <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-[3.25rem] md:leading-tight">
          {title}
        </h1>

        <nav aria-label="Breadcrumb" className="mt-5">
          <ol className="flex flex-wrap items-center justify-center gap-1.5 text-sm">
            <li>
              <Link
                href="/"
                className="font-medium text-muted-foreground transition-colors hover:text-brand"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-3.5 text-border" />
            </li>
            <li>
              <span className="font-medium text-foreground" aria-current="page">
                {breadcrumbLabel}
              </span>
            </li>
          </ol>
        </nav>
      </div>
    </section>
  );
}
