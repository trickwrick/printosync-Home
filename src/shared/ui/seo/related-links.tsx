import Link from "next/link";
import { getRelatedLinks } from "@/shared/lib/seo/internal-links";

interface RelatedLinksProps {
  path: string;
  title?: string;
}

export function RelatedLinks({ path, title = "Related pages" }: RelatedLinksProps) {
  const links = getRelatedLinks(path);
  if (!links.length) return null;

  return (
    <aside aria-label="Related pages" className="border-t border-border py-10">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h2>
      <nav>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group block rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:border-brand/30 hover:shadow-md"
              >
                <span className="text-sm font-medium text-foreground group-hover:text-brand">
                  {link.label}
                </span>
                {link.description && (
                  <p className="mt-1 text-xs text-muted-foreground">{link.description}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
