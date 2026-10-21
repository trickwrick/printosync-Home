"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import {
  ctaNavigation,
  headerNavigation,
  industriesMegaMenu,
  productMegaMenu,
  whyChooseMegaMenu,
} from "@/shared/config/navigation";
import { cn } from "@/shared/lib/cn";
import { useScrollPosition } from "@/shared/hooks";
import { Logo } from "@/shared/ui/logo";
import { MagneticButton } from "@/shared/ui/magnetic-button";
import { MegaMenu } from "./mega-menu";
import { WhoWeHelpMenu } from "./who-we-help-menu";
import { WhyChooseUsMenu } from "./why-choose-us-menu";

const megaMenus = {
  Modules: productMegaMenu,
} as const;

export function Header() {
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 12;
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          isScrolled
            ? "border-b border-border/80 bg-background/90 shadow-sm backdrop-blur-xl"
            : "border-b border-transparent bg-background/70 backdrop-blur-md",
        )}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="mx-auto flex h-16 max-w-350 items-center justify-between px-6 lg:h-18 lg:px-8">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {headerNavigation.map((item) => {
              if ("mega" in item && item.mega) {
                const menuKey = item.title;
                const isActive = activeMenu === menuKey;

                return (
                  <div
                    key={menuKey}
                    className="relative"
                    onMouseEnter={() => setActiveMenu(menuKey)}
                  >
                    <button
                      type="button"
                      onFocus={() => setActiveMenu(menuKey)}
                      onClick={() => setActiveMenu(isActive ? null : menuKey)}
                      className={cn(
                        "flex items-center gap-1 rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors",
                        isActive
                          ? "text-brand"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                      aria-expanded={isActive}
                    >
                      {item.title}
                      <ChevronDown
                        className={cn(
                          "size-3.5 transition-transform duration-200",
                          isActive && "rotate-180",
                        )}
                      />
                    </button>
                    {menuKey === "Who we help" ? (
                      <WhoWeHelpMenu isOpen={isActive} />
                    ) : menuKey === "Why choose us" ? (
                      <WhyChooseUsMenu isOpen={isActive} />
                    ) : (
                      <MegaMenu
                        sections={megaMenus[menuKey as keyof typeof megaMenus]}
                        isOpen={isActive}
                      />
                    )}
                  </div>
                );
              }

              if ("href" in item && item.href) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-lg px-3.5 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.title}
                  </Link>
                );
              }

              return null;
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <MagneticButton href={ctaNavigation.href} showArrow>
                {ctaNavigation.title}
              </MagneticButton>
            </div>
            <button
              type="button"
              className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-x-0 top-16 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-border bg-background/98 shadow-2xl backdrop-blur-2xl lg:hidden"
          >
            <nav className="flex flex-col divide-y divide-border/60 p-4" aria-label="Mobile">
              {/* Who We Help Accordion */}
              <div className="py-2">
                <button
                  type="button"
                  onClick={() =>
                    setExpandedMobile(expandedMobile === "who-we-help" ? null : "who-we-help")
                  }
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="size-2 rounded-full bg-brand" />
                    Who we help
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-4 text-muted-foreground transition-transform duration-200",
                      expandedMobile === "who-we-help" && "rotate-180 text-brand"
                    )}
                  />
                </button>
                <AnimatePresence>
                  {expandedMobile === "who-we-help" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pl-4 pr-1 pt-1 space-y-1"
                    >
                      {industriesMegaMenu.flatMap((sec) => sec.items).map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground transition hover:bg-brand-muted hover:text-brand"
                          >
                            {Icon && <Icon className="size-3.5 shrink-0 text-brand" />}
                            <span>{item.title}</span>
                          </Link>
                        );
                      })}
                      <Link
                        href="/#industries"
                        onClick={() => setMobileOpen(false)}
                        className="inline-block px-3 py-1.5 text-xs font-semibold text-brand hover:underline"
                      >
                        View all printing segments →
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Why Choose Us Accordion */}
              <div className="py-2">
                <button
                  type="button"
                  onClick={() =>
                    setExpandedMobile(expandedMobile === "why-choose" ? null : "why-choose")
                  }
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="size-2 rounded-full bg-brand" />
                    Why choose us
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-4 text-muted-foreground transition-transform duration-200",
                      expandedMobile === "why-choose" && "rotate-180 text-brand"
                    )}
                  />
                </button>
                <AnimatePresence>
                  {expandedMobile === "why-choose" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pl-4 pr-1 pt-1 space-y-1"
                    >
                      {whyChooseMegaMenu.flatMap((sec) => sec.items).map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground transition hover:bg-brand-muted hover:text-brand"
                          >
                            {Icon && <Icon className="size-3.5 shrink-0 text-brand" />}
                            <span>{item.title}</span>
                          </Link>
                        );
                      })}
                      <Link
                        href="/company/why-printosync"
                        onClick={() => setMobileOpen(false)}
                        className="inline-block px-3 py-1.5 text-xs font-semibold text-brand hover:underline"
                      >
                        Learn why print shops choose PrintoSync →
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Modules Accordion */}
              <div className="py-2">
                <button
                  type="button"
                  onClick={() =>
                    setExpandedMobile(expandedMobile === "modules" ? null : "modules")
                  }
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="size-2 rounded-full bg-brand" />
                    Modules (ERP Software)
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-4 text-muted-foreground transition-transform duration-200",
                      expandedMobile === "modules" && "rotate-180 text-brand"
                    )}
                  />
                </button>
                <AnimatePresence>
                  {expandedMobile === "modules" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pl-4 pr-1 pt-1 space-y-1"
                    >
                      {productMegaMenu.flatMap((sec) => sec.items).map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground transition hover:bg-brand-muted hover:text-brand"
                          >
                            {Icon && <Icon className="size-3.5 shrink-0 text-brand" />}
                            <span>{item.title}</span>
                          </Link>
                        );
                      })}
                      <Link
                        href="/services"
                        onClick={() => setMobileOpen(false)}
                        className="inline-block px-3 py-1.5 text-xs font-semibold text-brand hover:underline"
                      >
                        Explore all printing ERP modules →
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Direct Links */}
              <div className="py-2 space-y-1">
                <Link
                  href="/pricing"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
                >
                  Pricing
                </Link>
                <Link
                  href="/blog"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
                >
                  Blog & Articles
                </Link>
                <Link
                  href="/resources/faqs"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
                >
                  FAQ
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
                >
                  Contact
                </Link>
              </div>

              {/* Bottom CTA Button */}
              <div className="pt-4 pb-2">
                <MagneticButton href={ctaNavigation.href} className="w-full justify-center py-3 shadow-md">
                  {ctaNavigation.title}
                </MagneticButton>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
