"use client";

import { useCallback, useRef } from "react";

interface MagneticOptions {
  strength?: number;
}

export function useMagnetic<T extends HTMLElement>({
  strength = 0.35,
}: MagneticOptions = {}) {
  const ref = useRef<T>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    },
    [strength],
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  }, []);

  return { ref, handleMouseMove, handleMouseLeave };
}
