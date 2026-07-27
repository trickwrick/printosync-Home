import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { Container } from "@/shared/ui/container";
import { caseStudies, testimonials } from "@/widgets/home/content";

export function CaseStudiesContent() {
  return (
    <>
      <section className="py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
              Customer success
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
              Better workflows, measurable outcomes
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              See how modern printing businesses use connected operations to
              improve turnaround, quality, and visibility.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <article
                key={study.slug}
                className="flex flex-col rounded-2xl border border-border bg-card p-7 shadow-sm"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-brand">
                  {study.industry}
                </span>
                <p className="mt-5 font-display text-5xl font-bold text-brand">
                  {study.metric}
                </p>
                <p className="mt-1 text-xs font-medium text-muted-foreground">
                  {study.metricLabel}
                </p>
                <h2 className="mt-5 font-display text-xl font-bold text-foreground">
                  {study.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                  {study.excerpt}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-surface py-16 lg:py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.slice(0, 4).map((testimonial) => (
              <blockquote
                key={testimonial.author}
                className="rounded-2xl border border-border bg-card p-7 shadow-sm"
              >
                <Quote className="size-5 text-brand" aria-hidden="true" />
                <p className="mt-4 text-sm leading-7 text-foreground">
                  “{testimonial.quote}”
                </p>
                <footer className="mt-5 text-sm">
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/book-demo"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-cta"
            >
              Start your success story <ArrowRight className="size-4" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
