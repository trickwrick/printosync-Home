"use client";

export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden gradient-mesh">
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 90% 70% at 50% -10%, black 15%, transparent 65%)",
        }}
      />
      <div className="absolute -left-20 top-20 size-72 rounded-full bg-brand/10 blur-3xl animate-float" />
      <div className="absolute -right-16 top-32 size-64 rounded-full bg-accent/10 blur-3xl animate-float-delayed" />
    </div>
  );
}
