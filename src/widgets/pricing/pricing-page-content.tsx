import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { pricingPlans } from "@/entities/marketing";
import { Container } from "@/shared/ui/container";

const comparisonRows = [
  ["CRM & customer management", true, true, true, true],
  ["Quotation & job cards", true, true, true, true],
  ["Production management", false, true, true, true],
  ["Purchase & vendor management", false, true, true, true],
  ["Advanced reports", false, true, true, true],
  ["Multi-location operations", false, false, true, true],
  ["Custom workflow configuration", false, false, false, true],
] as const;

export function PricingPageContent() {
  return (
    <>
      <section className="py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
              Flexible plans
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
              Choose the right foundation for your growth
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Pricing is tailored to your users, modules, locations, and
              implementation needs. Book a demo for a transparent quote.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {pricingPlans.map((plan) => (
              <article
                key={plan.slug}
                className={`relative flex flex-col rounded-2xl border p-6 shadow-sm ${
                  "popular" in plan && plan.popular
                    ? "border-brand bg-brand-muted/50 shadow-glow"
                    : "border-border bg-card"
                }`}
              >
                {"popular" in plan && plan.popular && (
                  <span className="absolute right-4 top-4 rounded-full bg-brand px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-foreground">
                    Most popular
                  </span>
                )}
                <h2 className="font-display text-2xl font-bold text-foreground">
                  {plan.name}
                </h2>
                <p className="mt-3 min-h-16 text-sm leading-6 text-muted-foreground">
                  {plan.description}
                </p>
                <p className="mt-5 text-sm font-semibold text-brand">Custom quote</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2 text-sm text-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.slug === "starter" ? "/book-demo" : "/sales-enquiry"}
                  className={`mt-7 rounded-full px-4 py-3 text-center text-sm font-semibold ${
                    "popular" in plan && plan.popular
                      ? "bg-primary text-primary-foreground shadow-cta"
                      : "border border-border bg-background text-foreground hover:border-brand/30"
                  }`}
                >
                  {plan.cta}
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-surface py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
              Compare plans
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground">
              Capabilities at a glance
            </h2>
          </div>
          <div className="mt-10 overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="p-4 font-semibold text-foreground">Capability</th>
                  {pricingPlans.map((plan) => (
                    <th key={plan.slug} className="p-4 text-center font-semibold text-foreground">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(([name, ...availability]) => (
                  <tr key={name} className="border-b border-border last:border-0">
                    <th className="p-4 font-medium text-foreground">{name}</th>
                    {availability.map((available, index) => (
                      <td key={`${name}-${pricingPlans[index].slug}`} className="p-4 text-center">
                        {available ? (
                          <Check className="mx-auto size-4 text-brand" aria-label="Included" />
                        ) : (
                          <Minus className="mx-auto size-4 text-border" aria-label="Not included" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>
    </>
  );
}
