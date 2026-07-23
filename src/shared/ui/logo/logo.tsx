"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { siteConfig } from "@/shared/config/site";
import { cn } from "@/shared/lib/cn";

interface LogoProps {
  className?: string;
  showText?: boolean;
  iconSize?: number;
}

export function Logo({ className, showText = true, iconSize = 36 }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label={`${siteConfig.name} home`}
    >
      <motion.span
        className="relative shrink-0 overflow-hidden rounded-xl shadow-sm"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <Image
          src={siteConfig.logo}
          alt={`${siteConfig.name} logo`}
          width={iconSize}
          height={iconSize}
          className="size-9 object-cover"
          priority
        />
      </motion.span>
      {showText && (
        <span className="font-display text-[17px] font-bold tracking-tight text-foreground">
          {siteConfig.name}
        </span>
      )}
    </Link>
  );
}
