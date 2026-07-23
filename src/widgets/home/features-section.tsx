"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Calendar,
  Link2,
  Package,
  Sparkles,
  Users,
} from "lucide-react";
import { features } from "./content";
import {
  SectionLabel,
  SectionReveal,
  SectionSubtitle,
  SectionTitle,
  StaggerItem,
  StaggerReveal,
} from "./section-primitives";

const featureIcons = [Sparkles, Calendar, Package, Users, BarChart3, Link2];

const sizeClasses = {
  large: "md:col-span-2 md:row-span-2 min-h-[280px]",
  medium: "md:col-span-1 md:row-span-2 min-h-[200px]",
  small: "md:col-span-1 min-h-[160px]",
};

export function FeaturesSection() {
  return (
    <SectionReveal className="border-y border-white/[0.04] bg-white/[0.01] py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <div className="mb-14 max-w-2xl">
          <SectionLabel>Features</SectionLabel>
          <SectionTitle>
            Everything your print shop needs
          </SectionTitle>
          <SectionSubtitle>
            A bento of powerful capabilities — each module designed to work
            together seamlessly.
          </SectionSubtitle>
        </div>

        <StaggerReveal className="grid auto-rows-fr grid-cols-1 gap-3 md:grid-cols-4">
          {features.map((feature, i) => {
            const Icon = featureIcons[i];
            return (
              <StaggerItem
                key={feature.title}
                className={sizeClasses[feature.size]}
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ duration: 0.25 }}
                  className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br ${feature.gradient} p-6 sm:p-8`}
                >
                  <div className="absolute inset-0 bg-white/[0.02] opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative">
                    <motion.span
                      whileHover={{ rotate: 12, scale: 1.1 }}
                      className="mb-4 inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70"
                    >
                      <Icon className="size-5" />
                    </motion.span>
                    <h3 className="text-lg font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/45">
                      {feature.description}
                    </p>
                  </div>
                  {feature.size === "large" && (
                    <div className="relative mt-6 flex gap-2">
                      {["Quote", "Schedule", "Ship"].map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerReveal>
      </div>
    </SectionReveal>
  );
}
