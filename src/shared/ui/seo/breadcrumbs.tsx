import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/shared/lib/cn";

export interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (items.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn("py-4", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        <li>
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-brand"
          >
            <Home className="size-3.5" aria-hidden="true" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.slice(1).map((item, i) => {
          const isLast = i === items.length - 2;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              <ChevronRight className="size-3.5 text-border" aria-hidden="true" />
              {isLast ? (
                <span className="font-medium text-foreground" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="text-muted-foreground transition-colors hover:text-brand"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
