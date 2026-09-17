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
        "relative overflow-hidden border-b border-border pt-24 sm:pt-28",
        className,
      )}
    >


      <div className="relative mx-auto max-w-350 px-6 py-12 text-center md:py-16 lg:px-8">
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
