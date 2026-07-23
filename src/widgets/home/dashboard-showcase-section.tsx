"use client";

import { motion } from "framer-motion";
import {
  SectionLabel,
  SectionReveal,
  SectionSubtitle,
  SectionTitle,
} from "./section-primitives";
import { EnterpriseDashboard } from "@/widgets/dashboard/enterprise-dashboard";

export function DashboardShowcaseSection() {
  return (
    <SectionReveal className="border-y border-border bg-surface py-16 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <SectionLabel>Live demo</SectionLabel>
          <SectionTitle className="mx-auto">
            Your command center for the entire operation
          </SectionTitle>
          <SectionSubtitle className="mx-auto">
            CRM, production, GST billing, kanban, and more — click the sidebar to
            explore live.
          </SectionSubtitle>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border bg-card p-2 shadow-premium"
        >
          <EnterpriseDashboard variant="showcase" className="mx-auto max-w-[1100px]" />
        </motion.div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {["17 Modules", "Live Navigation", "Kanban", "GST Billing"].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-background px-3 py-1 text-[11px] font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
