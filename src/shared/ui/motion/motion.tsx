"use client";

import * as React from "react";
import {
  motion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";
import { ANIMATION, FRAMER_VARIANTS } from "@/shared/lib/animations";
import { cn } from "@/shared/lib/cn";

interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
}

const directionVariants: Record<
  NonNullable<FadeInProps["direction"]>,
  Variants
> = {
  up: FRAMER_VARIANTS.fadeInUp,
  down: FRAMER_VARIANTS.fadeInDown,
  left: FRAMER_VARIANTS.fadeInLeft,
  right: FRAMER_VARIANTS.fadeInRight,
  none: FRAMER_VARIANTS.fadeIn,
};

function FadeIn({
  children,
  className,
  delay = 0,
  duration = ANIMATION.duration.normal,
  direction = "up",
  once = true,
  ...props
}: FadeInProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={directionVariants[direction]}
      transition={{
        duration,
        delay,
        ease: ANIMATION.ease.out,
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
}

function StaggerContainer({
  children,
  className,
  stagger = ANIMATION.stagger.normal,
  delayChildren = 0.1,
  once = true,
  ...props
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) {
  return (
    <motion.div
      variants={FRAMER_VARIANTS.fadeInUp}
      transition={{ duration: ANIMATION.duration.normal, ease: ANIMATION.ease.out }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export { FadeIn, StaggerContainer, StaggerItem };
