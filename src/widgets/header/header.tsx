"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
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
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 lg:h-[72px] lg:px-8">
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
            <Link
              href="/contact"
              className="hidden items-center gap-2 rounded-full border border-brand/30 bg-background px-4 py-2.5 text-sm font-semibold text-brand transition-colors hover:bg-brand-muted sm:inline-flex"
            >
              <Phone className="size-4" aria-hidden="true" />
              Call Us
            </Link>
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
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-border bg-background/98 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col gap-1 p-4" aria-label="Mobile">
              {[
                ...productMegaMenu,
                ...industriesMegaMenu,
                ...whyChooseMegaMenu,
              ].flatMap((s) =>
                s.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {item.title}
                  </Link>
                )),
              )}
              <Link
                href="/pricing"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                Pricing
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                Contact
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="mx-4 mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-brand/30 px-5 py-3 text-sm font-semibold text-brand"
              >
                <Phone className="size-4" aria-hidden="true" />
                Call Us
              </Link>
              <div className="mt-3 px-4">
                <MagneticButton href={ctaNavigation.href} className="w-full justify-center">
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
