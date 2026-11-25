"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MessageSquare, Sparkles, X } from "lucide-react";

export function FloatingQuickAction() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show pill after scrolling past 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isDismissed || !isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center gap-2 rounded-full border border-border/80 bg-card/95 p-1.5 shadow-2xl backdrop-blur-md">
        {/* WhatsApp Quick Chat */}
        <a
          href="https://wa.me/919999999999?text=Hello%20PrintoSync%20team,%20I%20would%20like%20to%20know%20more%20about%20your%20Printing%20Press%20ERP%20software."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full bg-emerald-500/15 px-3.5 py-2 text-xs font-bold text-emerald-600 transition-colors hover:bg-emerald-500 hover:text-white"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <MessageSquare className="size-3.5" />
          <span>Chat on WhatsApp</span>
        </a>

        {/* Demo Button */}
        <Link
          href="/book-demo"
          className="flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition-transform hover:scale-105"
        >
          <Sparkles className="size-3" />
          <span>Book Free Demo</span>
        </Link>

        {/* Dismiss button */}
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          className="flex size-7 items-center justify-center rounded-full text-muted-foreground hover:bg-surface hover:text-foreground"
          aria-label="Dismiss quick bar"
        >
          <X className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
