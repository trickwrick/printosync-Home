"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BarChart3,
  Globe,
  Search,
  Settings,
  Users,
  Warehouse,
} from "lucide-react";
import { services } from "./content";
import {
  SectionLabel,
  SectionReveal,
  SectionSubtitle,
  SectionTitle,
} from "./section-primitives";

const serviceIcons = {
  Users,
  Settings,
  BarChart3,
  Warehouse,
  Globe,
  Search,
};

export function ServicesSection() {
  return (
    <SectionReveal className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <SectionLabel>Services</SectionLabel>
          <SectionTitle className="mx-auto">
            Full-stack print business services
          </SectionTitle>
          <SectionSubtitle className="mx-auto">
            Software plus the services to grow your print business online.
          </SectionSubtitle>
        </div>

        <div className="space-y-6">
          {services.map((service, i) => {
            const Icon = serviceIcons[service.icon as keyof typeof serviceIcons];
            const isEven = i % 2 === 0;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Link
                  href={service.href}
                  className={`group flex flex-col gap-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all hover:border-white/[0.12] hover:bg-white/[0.04] sm:flex-row sm:items-center sm:p-8 ${
                    isEven ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`flex flex-1 flex-col ${isEven ? "sm:items-start sm:text-left" : "sm:items-end sm:text-right"}`}
                  >
                    <span className="font-mono text-[11px] text-white/25">
                      {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 text-xl font-semibold text-white group-hover:text-indigo-300 transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-white/45">
                      {service.description}
                    </p>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.08, rotate: 5 }}
                    className="flex size-20 shrink-0 items-center justify-center self-center rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/20 to-violet-500/10 text-indigo-300 sm:size-24"
                  >
                    <Icon className="size-8 sm:size-9" />
                  </motion.div>

                  <div className={`hidden w-48 shrink-0 lg:block ${isEven ? "text-right" : "text-left"}`}>
                    <span className="text-sm font-medium text-white/30 transition-colors group-hover:text-indigo-400">
                      Explore →
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionReveal>
  );
}
