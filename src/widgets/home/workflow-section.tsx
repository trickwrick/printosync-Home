"use client";

import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  BriefcaseBusiness,
  Calculator,
  CheckCircle2,
  CircleCheck,
  CreditCard,
  FileText,
  LayoutDashboard,
  ScrollText,
  type LucideIcon,
} from "lucide-react";
import { workflowSteps } from "./content";
import {
  SectionLabel,
  SectionReveal,
  SectionSubtitle,
  SectionTitle,
} from "./section-primitives";

const stepIcons: LucideIcon[] = [
  LayoutDashboard,
  BriefcaseBusiness,
  FileText,
  CreditCard,
  Boxes,
  ScrollText,
  Calculator,
  BarChart3,
];

const stepHighlights = [
  ["Business snapshot", "Pending job alerts", "Revenue overview"],
  ["Job specifications", "Operator assignment", "Production tracking"],
  ["Delivery details", "Dispatch records", "Printable challan"],
  ["Payment entries", "Outstanding balances", "Collection tracking"],
  ["Material quantities", "Usage history", "Low-stock alerts"],
  ["Customer ledger", "Vendor ledger", "Downloadable statement"],
  ["Cost calculation", "Professional quotation", "Margin control"],
  ["Sales performance", "Production insights", "Profitability analysis"],
] as const;

export function WorkflowSection() {
  const [activeStep, setActiveStep] = useState(0);
  const selectedStep = workflowSteps[activeStep];
  const SelectedIcon = stepIcons[activeStep];

  const goToNextStep = () => {
    setActiveStep((current) => (current + 1) % workflowSteps.length);
  };

  return (
    <SectionReveal className="relative overflow-hidden border-y border-border bg-surface py-16 lg:py-20">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[48rem] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <SectionLabel>Workflow</SectionLabel>
          <SectionTitle className="mx-auto">
            Every operation, one connected workspace
          </SectionTitle>
          <SectionSubtitle className="mx-auto">
            Move seamlessly across the tools your print business uses every day.
          </SectionSubtitle>
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border border-border/80 bg-card shadow-premium">
          <div className="overflow-x-auto border-b border-border bg-background/80 p-3">
            <div
              className="relative flex min-w-[1200px] items-start justify-between"
              role="tablist"
              aria-label="PrintoSync workflow modules"
            >
              <span
                className="absolute left-[6%] right-[6%] top-6 h-px bg-border"
                aria-hidden="true"
              />
              <span
                className="absolute left-[6%] top-6 h-px bg-brand transition-all duration-500"
                style={{
                  width: `${(activeStep / (workflowSteps.length - 1)) * 88}%`,
                }}
                aria-hidden="true"
              />

              {workflowSteps.map((step, index) => {
                const Icon = stepIcons[index];
                const isActive = activeStep === index;
                const isComplete = index < activeStep;

                return (
                  <button
                    key={step.step}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="workflow-detail"
                    onClick={() => setActiveStep(index)}
                    className="group relative z-10 flex w-36 flex-col items-center rounded-xl px-1 py-1 text-center"
                  >
                    <span
                      className={`flex size-11 items-center justify-center rounded-xl border shadow-sm transition-all duration-300 ${
                        isActive
                          ? "scale-110 border-brand bg-brand text-brand-foreground shadow-glow"
                          : isComplete
                            ? "border-brand/30 bg-brand-muted text-brand"
                            : "border-border bg-card text-muted-foreground group-hover:border-brand/30 group-hover:text-brand"
                      }`}
                    >
                      {isComplete ? (
                        <CheckCircle2 className="size-5" aria-hidden="true" />
                      ) : (
                        <Icon className="size-5" aria-hidden="true" />
                      )}
                    </span>
                    <span
                      className={`mt-3 whitespace-nowrap text-[13px] font-semibold transition-colors ${
                        isActive
                          ? "text-brand"
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {step.title}
                    </span>
                    <span className="mt-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
                      Step {step.step}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            id="workflow-detail"
            role="tabpanel"
            className="grid gap-8 bg-gradient-to-br from-card via-card to-brand-muted/50 p-6 md:grid-cols-[1.25fr_0.75fr] md:p-10 lg:gap-14 lg:p-12"
          >
            <div>
              <div className="flex items-center gap-4">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-brand text-brand-foreground shadow-glow">
                  <SelectedIcon className="size-6" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
                    Module {selectedStep.step}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-bold text-foreground sm:text-3xl">
                    {selectedStep.title}
                  </h3>
                </div>
              </div>

              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {selectedStep.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-brand/20 bg-brand-muted px-3 py-1.5 text-xs font-semibold text-brand">
                  {selectedStep.duration}
                </span>
                <button
                  type="button"
                  onClick={goToNextStep}
                  className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background transition-all hover:bg-brand hover:text-brand-foreground"
                >
                  {activeStep === workflowSteps.length - 1
                    ? "Back to dashboard"
                    : "Next module"}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-background/90 p-5 shadow-sm">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <p className="text-sm font-semibold text-foreground">
                  Module highlights
                </p>
                <span className="rounded-full bg-brand-muted px-2.5 py-1 text-[10px] font-bold text-brand">
                  LIVE
                </span>
              </div>

              <ul className="mt-4 space-y-3">
                {stepHighlights[activeStep].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-border/70 bg-card px-3.5 py-3 text-sm font-medium text-foreground"
                  >
                    <CircleCheck
                      className="size-4 shrink-0 text-brand"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center justify-between text-[11px] font-medium text-muted-foreground">
                <span>Workflow progress</span>
                <span>
                  {activeStep + 1} of {workflowSteps.length}
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-brand transition-all duration-500"
                  style={{
                    width: `${((activeStep + 1) / workflowSteps.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
