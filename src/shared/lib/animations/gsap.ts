"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GSAP_DEFAULTS } from "./constants";

let gsapRegistered = false;

function registerGsap() {
  if (typeof window === "undefined" || gsapRegistered) return;
  gsap.registerPlugin(ScrollTrigger);
  gsapRegistered = true;
}

export interface UseGsapScrollRevealOptions {
  y?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  start?: string;
  once?: boolean;
}

export function useGsapScrollReveal<T extends HTMLElement>(
  options: UseGsapScrollRevealOptions = {},
) {
  const ref = useRef<T>(null);
  const {
    y = 40,
    opacity = 0,
    duration = GSAP_DEFAULTS.duration,
    delay = 0,
    start = "top 85%",
    once = true,
  } = options;

  useEffect(() => {
    registerGsap();
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.from(element, {
        y,
        opacity,
        duration,
        delay,
        ease: GSAP_DEFAULTS.ease,
        scrollTrigger: {
          trigger: element,
          start,
          toggleActions: once ? "play none none none" : "play none none reverse",
        },
      });
    }, element);

    return () => ctx.revert();
  }, [y, opacity, duration, delay, start, once]);

  return ref;
}

export interface UseGsapStaggerOptions {
  selector?: string;
  y?: number;
  opacity?: number;
  stagger?: number;
  duration?: number;
  start?: string;
}

export function useGsapStagger<T extends HTMLElement>(
  options: UseGsapStaggerOptions = {},
) {
  const ref = useRef<T>(null);
  const {
    selector = ":scope > *",
    y = 30,
    opacity = 0,
    stagger = 0.1,
    duration = GSAP_DEFAULTS.duration,
    start = "top 85%",
  } = options;

  useEffect(() => {
    registerGsap();
    const container = ref.current;
    if (!container) return;

    const children = container.querySelectorAll(selector);
    if (!children.length) return;

    const ctx = gsap.context(() => {
      gsap.from(children, {
        y,
        opacity,
        duration,
        stagger,
        ease: GSAP_DEFAULTS.ease,
        scrollTrigger: {
          trigger: container,
          start,
          toggleActions: "play none none none",
        },
      });
    }, container);

    return () => ctx.revert();
  }, [selector, y, opacity, stagger, duration, start]);

  return ref;
}
