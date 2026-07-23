"use client";

import { useEffect, useRef } from "react";
import { workflowSteps } from "./content";
import {
  SectionLabel,
  SectionReveal,
  SectionSubtitle,
  SectionTitle,
} from "./section-primitives";

export function WorkflowSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const line = lineRef.current;
    if (!container || !line) return;

    let ctx: { revert: () => void } | undefined;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          gsap.from(line, {
            scaleY: 0,
            transformOrigin: "top",
            scrollTrigger: {
              trigger: container,
              start: "top 75%",
              end: "bottom 65%",
              scrub: 1,
            },
          });

          gsap.utils.toArray<HTMLElement>(".workflow-step").forEach((step) => {
            gsap.from(step, {
              opacity: 0,
              y: 24,
              scrollTrigger: {
                trigger: step,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            });
          });
        }, container);
      },
    );

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <SectionReveal className="py-16 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <SectionLabel>Workflow</SectionLabel>
          <SectionTitle className="mx-auto">Quote to invoice in six steps</SectionTitle>
          <SectionSubtitle className="mx-auto">
            Mapped to how print shops actually operate — not generic software logic.
          </SectionSubtitle>
        </div>

        <div ref={containerRef} className="relative mx-auto max-w-3xl">
          <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-1/2" />
          <div
            ref={lineRef}
            className="absolute left-4 top-0 h-full w-px bg-brand md:left-1/2 md:-translate-x-1/2"
          />

          <div className="space-y-6">
            {workflowSteps.map((step, i) => {
              const isRight = i % 2 === 1;
              return (
                <div
                  key={step.step}
                  className={`workflow-step relative pl-10 md:pl-0 ${
                    isRight ? "md:text-right" : ""
                  }`}
                >
                  <div className="absolute left-4 top-5 size-3 -translate-x-1/2 rounded-full border-2 border-brand bg-background md:left-1/2 md:top-6" />

                  <div
                    className={`md:w-[calc(50%-2rem)] ${
                      isRight ? "md:ml-auto md:pl-8" : "md:pr-8"
                    }`}
                  >
                    <div className="card-hover rounded-2xl border border-border bg-card p-5 shadow-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-brand">
                          {step.step}
                        </span>
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                          {step.duration}
                        </span>
                      </div>
                      <h3 className="mt-2 text-base font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
