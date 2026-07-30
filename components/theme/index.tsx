"use client";

import { useEffect, useState } from "react";
import { ThemeContext } from "./contexts";
import { THEME_STORAGE_KEY } from "@/constants/key";
import { Theme } from "@/type/theme/index";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const saved = (localStorage.getItem(THEME_STORAGE_KEY) as Theme) ?? "dark";
    setThemeState(saved);
  }, []);

  useEffect(() => {
    if (theme !== "system") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      document.documentElement.classList.toggle("dark", e.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [theme]);

  const applyTheme = (theme: Theme) => {
    document.documentElement.classList.add("no-transitions");

    const resolved: "light" | "dark" =
      theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme;

    document.documentElement.classList.toggle("dark", resolved === "dark");
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    setThemeState(theme);

    requestAnimationFrame(() => {
      document.documentElement.classList.remove("no-transitions");
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
