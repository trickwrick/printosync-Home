"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { themeConfig } from "@/shared/config/theme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={themeConfig.defaultTheme}
      enableSystem={themeConfig.enableSystem}
      storageKey={themeConfig.storageKey}
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}
