"use client";

import { useState } from "react";
import { MapPin, Building2, CheckCircle2, TrendingUp, Sparkles } from "lucide-react";
import { Container } from "@/shared/ui/container";
import { INDIA_STATES, INDIA_VIEWBOX } from "./india-states-data";

export interface ImplementationPin {
  id: string;
  name: string;
  state: string;
  stateId: string;
  count: string;
  // Exact percentage positions on the 612 x 696 India SVG map
  x: number;
  y: number;
  featured?: boolean;
}

export const implementationPins: ImplementationPin[] = [
  { id: "delhi", name: "Delhi NCR", state: "Delhi", stateId: "dl", count: "110+ Presses", x: 30.5, y: 30.3, featured: true },
  { id: "jaipur", name: "Jaipur & Jodhpur", state: "Rajasthan", stateId: "rj", count: "85+ Presses", x: 27, y: 35.8 },
  { id: "ahmedabad", name: "Ahmedabad & Surat", state: "Gujarat", stateId: "gj", count: "95+ Presses", x: 14, y: 46 },
  { id: "mumbai", name: "Mumbai & Pune", state: "Maharashtra", stateId: "mh", count: "140+ Presses", x: 25, y: 58, featured: true },
  { id: "indore", name: "Indore & Bhopal", state: "Madhya Pradesh", stateId: "mp", count: "65+ Presses", x: 36, y: 44 },
  { id: "chandigarh", name: "Chandigarh & Ludhiana", state: "Punjab", stateId: "pb", count: "75+ Presses", x: 24.7, y: 21.8 },
  { id: "lucknow", name: "Lucknow & Kanpur", state: "Uttar Pradesh", stateId: "up", count: "90+ Presses", x: 42, y: 35 },
  { id: "chennai", name: "Chennai & Sivakasi", state: "Tamil Nadu", stateId: "tn", count: "105+ Presses", x: 34.5, y: 86, featured: true },
];

export function NationwideReachSection() {
  const [activePin, setActivePin] = useState<ImplementationPin>(implementationPins[0]);
  const [hoveredPin, setHoveredPin] = useState<ImplementationPin | null>(null);

  const displayPin = hoveredPin || activePin;

  // Active state ids that have installations
  const activeStateIds = new Set(implementationPins.map((p) => p.stateId));

  return (
    <section className="relative overflow-hidden border-y border-border bg-linear-to-b from-background via-surface/60 to-background py-20 lg:py-28">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute left-1/4 top-1/2 -z-10 h-96 w-96 -translate-y-1/2 rounded-full bg-brand/10 blur-3xl" />
      <div className="pointer-events-none absolute right-10 top-1/4 -z-10 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Authentic Detailed India Map with Highlighted States & Interactive Pins */}
          <div className="order-2 lg:order-1 lg:col-span-7">
            <div className="relative mx-auto flex aspect-612/696 w-full max-w-140 items-center justify-center rounded-3xl border border-border/80 bg-linear-to-br from-card/95 via-background to-card/90 p-5 shadow-premium backdrop-blur-xl sm:p-7">
              {/* Subtle background coordinate dots */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(#29b8ba_1px,transparent_1px)] bg-size-[20px_20px] opacity-[0.08]" />

              {/* Status Header Badge */}
              <div className="absolute right-6 top-6 z-20 flex items-center gap-2 rounded-full border border-brand/30 bg-brand-muted/90 px-3.5 py-1 text-xs font-semibold text-brand backdrop-blur-md shadow-sm">
                <span className="size-2 animate-ping rounded-full bg-brand" />
                Live Active Installations
              </div>

              {/* Exact Real India SVG Map */}
              <div className="relative h-full w-full">
                <svg
                  viewBox={INDIA_VIEWBOX}
                  className="h-full w-full drop-shadow-[0_12px_30px_rgba(41,184,186,0.12)]"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="india-states-layer">
                    {INDIA_STATES.map((state) => {
                      const isActiveState = activeStateIds.has(state.id);
                      const isHoveredState = displayPin.stateId === state.id;

                      return (
                        <path
                          key={state.id}
                          id={state.id}
                          d={state.path}
                          className="transition-all duration-300 cursor-pointer"
                          style={{
                            fill: isHoveredState
                              ? "rgba(41, 184, 186, 0.65)"
                              : isActiveState
                              ? "rgba(41, 184, 186, 0.28)"
                              : "rgba(148, 163, 184, 0.12)",
                            stroke: isHoveredState
                              ? "#29b8ba"
                              : isActiveState
                              ? "rgba(41, 184, 186, 0.5)"
                              : "rgba(148, 163, 184, 0.25)",
                            strokeWidth: isHoveredState ? 1.6 : 0.8,
                          }}
                          onClick={() => {
                            const found = implementationPins.find((p) => p.stateId === state.id);
                            if (found) setActivePin(found);
                          }}
                        >
                          <title>{state.name}</title>
                        </path>
                      );
                    })}
                  </g>
                </svg>

                {/* Implementation Location Pins */}
                {implementationPins.map((pin) => {
                  const isSelected = displayPin.id === pin.id;
                  const isHovered = hoveredPin?.id === pin.id;
                  const isTopActive = isSelected || isHovered;
                  return (
                    <div
                      key={pin.id}
                      style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                        isTopActive ? "z-40" : "z-20"
                      }`}
                      onMouseEnter={() => setHoveredPin(pin)}
                      onMouseLeave={() => setHoveredPin(null)}
                      onClick={() => setActivePin(pin)}
                    >
                      {/* Pulsing ring for active pin */}
                      {isSelected && (
                        <span className="absolute -inset-2.5 animate-ping rounded-full bg-brand/35 duration-1000" />
                      )}

                      {/* Map Pin Marker */}
                      <button
                        type="button"
                        className={`group relative flex items-center justify-center rounded-full transition-all duration-300 shadow-md ${
                          isSelected
                            ? "size-7.5 bg-brand text-brand-foreground ring-4 ring-brand/30 scale-110"
                            : "size-5.5 bg-card border border-brand/60 text-brand hover:scale-125 hover:border-brand hover:bg-brand hover:text-brand-foreground"
                        }`}
                        aria-label={`View ${pin.name}`}
                      >
                        <MapPin className={isSelected ? "size-3.5" : "size-2.5"} />

                        {/* Hover Tooltip Popup - positioned safely above with high z-index and no overlap */}
                        <div className="pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border/80 bg-slate-900/95 px-3 py-1.5 text-xs font-semibold text-white shadow-2xl opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-top-12 z-50 backdrop-blur-sm">
                          {pin.name}: {pin.count}
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900/95" />
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Map Footer Legend */}
              <div className="absolute bottom-4 left-6 right-6 z-20 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-border/80 bg-background/95 px-4 py-2.5 backdrop-blur-md shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-brand/10 text-brand font-bold text-xs">
                    500+
                  </div>
                  <span className="text-xs font-semibold text-foreground">Presses Across India</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-brand" /> Active States
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-muted-foreground/30" /> Expanding
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Informative Copy & Selected Region Spotlight */}
          <div className="order-1 lg:order-2 lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-muted px-3.5 py-1 text-xs font-semibold text-brand">
                <Sparkles className="size-3.5" />
                Trusted Nationwide Network
              </div>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Where PrintoSync is Implemented
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                PrintoSync is widely deployed in commercial offset presses, packaging convertors, digital printing houses, and publishing presses across India.
              </p>
            </div>

            {/* Dynamic Selected Region Card */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-brand/30">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand">
                    Active Implementation Hub
                  </span>
                  <h3 className="mt-1 font-display text-2xl font-bold text-foreground">
                    {displayPin.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">State: {displayPin.state}</p>
                </div>
                <span className="rounded-xl bg-brand/10 px-3 py-1.5 font-mono text-xs font-bold text-brand border border-brand/20">
                  {displayPin.count}
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border/70 pt-4 text-xs">
                <div className="flex items-center gap-2 text-foreground font-medium">
                  <CheckCircle2 className="size-4 text-brand shrink-0" />
                  Real-time Job Sync
                </div>
                <div className="flex items-center gap-2 text-foreground font-medium">
                  <CheckCircle2 className="size-4 text-brand shrink-0" />
                  GST Billing & Stock
                </div>
                <div className="flex items-center gap-2 text-foreground font-medium">
                  <CheckCircle2 className="size-4 text-brand shrink-0" />
                  Shop Floor Job Cards
                </div>
                <div className="flex items-center gap-2 text-foreground font-medium">
                  <CheckCircle2 className="size-4 text-brand shrink-0" />
                  24/7 Dedicated Support
                </div>
              </div>
            </div>

            {/* Expansion Highlights */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <TrendingUp className="size-3.5" />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <strong className="text-foreground">Rapidly Expanding PAN India:</strong> Serving Rajasthan, Punjab, Haryana, Delhi NCR, Uttar Pradesh, Gujarat, Maharashtra, Madhya Pradesh, and Tamil Nadu.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <Building2 className="size-3.5" />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <strong className="text-foreground">On-Site & Cloud Deployment:</strong> Fast onboarding, legacy data migration, and operator training tailored for single-location units and multi-city printing chains.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
