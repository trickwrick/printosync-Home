export const themeConfig = {
  defaultTheme: "light" as const,
  storageKey: "printosync-theme",
  enableSystem: false,
  themes: ["light", "dark"] as const,
} as const;

export type ThemeMode = (typeof themeConfig.themes)[number];
