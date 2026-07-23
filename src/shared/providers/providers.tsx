"use client";

import * as React from "react";
import { ThemeProvider } from "./theme-provider";
import { PageLoader } from "@/shared/ui/premium";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <PageLoader />
      {children}
    </ThemeProvider>
  );
}
