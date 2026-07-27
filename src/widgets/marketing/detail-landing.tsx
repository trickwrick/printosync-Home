import Link from "next/link";
import {
  ArrowRight,
  Check,
  CircleCheck,
  Layers3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { MarketingEntry } from "@/entities/marketing";
import { Container } from "@/shared/ui/container";
import { PageHeroBanner } from "@/widgets/page-shell/page-hero-banner";

interface DetailLandingProps {
  entry: MarketingEntry;
  path: string;
  categoryLabel: string;
  related?: readonly MarketingEntry[];
  relatedBasePath?: string;
}

export function DetailLanding({
  entry,
  path,
  categoryLabel,
  related = [],
  relatedBasePath,
}: DetailLandingProps) {
  return (
    <article>
      <PageHeroBanner title={entry.title} breadcrumbLabel={categoryLabel} />

      <section className="py-16 lg:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
            <div>
              <span className="inline-flex rounded-full border border-brand/20 bg-brand-muted px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
                {entry.eyebrow}
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Built to simplify real printing operations
              </h2>
              <p className="mt-5 text-base leading-8 text-muted-foreground">
                {entry.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/book-demo"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-cta transition-transform hover:-translate-y-0.5"
                >
                  Book Free Demo <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href={`/contact?intent=quote&source=${encodeURIComponent(path)}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-brand/30 hover:bg-brand-muted"
                >
                  Request a Quote
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-surface p-6 shadow-premium sm:p-8">
              <div className="flex items-center gap-3 border-b border-border pb-5">
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand text-brand-foreground">
                  <Layers3 className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold text-foreground">Core capabilities</p>
                  <p className="text-xs text-muted-foreground">Connected with PrintoSync ERP</p>
                </div>
              </div>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {entry.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 rounded-xl border border-border bg-card p-3 text-sm font-medium text-foreground"
                  >
                    <CircleCheck className="size-4 shrink-0 text-brand" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-surface py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
              Business impact
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground">
              Practical benefits from day one
            </h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-3">
            {entry.benefits.map((benefit) => (
              <div
                key={benefit}
                className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm"
              >
                <span className="mx-auto flex size-10 items-center justify-center rounded-xl bg-brand-muted text-brand">
                  <Check className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                  {benefit}
                </h3>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="py-16 lg:py-20">
          <Container>
            <div className="flex items-end justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
                  Continue exploring
                </span>
                <h2 className="mt-2 font-display text-2xl font-bold text-foreground">
                  Related {categoryLabel.toLowerCase()}
                </h2>
              </div>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {related.slice(0, 3).map((item) => (
                <Link
                  key={item.slug}
                  href={`${relatedBasePath ?? path.split("/").slice(0, -1).join("/")}/${item.slug}`}
                  className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand/30 hover:shadow-premium"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                    {item.eyebrow}
                  </p>
                  <h3 className="mt-3 font-display text-lg font-bold text-foreground group-hover:text-brand">
                    {item.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-brand">
                    Learn more <ArrowRight className="size-3.5" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="pb-16 lg:pb-20">
        <Container>
          <div className="relative overflow-hidden rounded-3xl bg-foreground px-6 py-12 text-center sm:px-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(41,184,186,0.35),transparent_50%)]" />
            <div className="relative mx-auto max-w-2xl">
              <Sparkles className="mx-auto size-6 text-brand" aria-hidden="true" />
              <h2 className="mt-4 font-display text-3xl font-bold text-white">
                See {entry.shortTitle ?? entry.title} in action
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/70">
                Get a personalized walkthrough based on your printing business,
                team, and current workflow.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link
                  href="/book-demo"
                  className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-cta"
                >
                  Schedule a Demo
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white"
                >
                  Contact Sales <ArrowRight className="size-4" />
                </Link>
              </div>
              <p className="mt-6 inline-flex items-center gap-2 text-xs text-white/60">
                <ShieldCheck className="size-4 text-brand" /> Secure, cloud-based,
                and built to scale
              </p>
            </div>
          </div>
        </Container>
      </section>
    </article>
  );
}

interface CollectionIndexProps {
  title: string;
  description: string;
  label: string;
  entries: readonly MarketingEntry[];
  basePath: string;
}

export function CollectionIndex({
  title,
  description,
  label,
  entries,
  basePath,
}: CollectionIndexProps) {
  return (
    <article>
      <PageHeroBanner title={title} breadcrumbLabel={label} />
      <section className="py-16 lg:py-20">
        <Container>
          <p className="mx-auto max-w-3xl text-center text-base leading-8 text-muted-foreground">
            {description}
          </p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {entries.map((entry) => (
              <Link
                key={entry.slug}
                href={`${basePath}/${entry.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand/30 hover:shadow-premium"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                  {entry.eyebrow}
                </p>
                <h2 className="mt-3 font-display text-xl font-bold text-foreground group-hover:text-brand">
                  {entry.shortTitle ?? entry.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                  {entry.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-brand">
                  Explore <ArrowRight className="size-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </article>
  );
}
