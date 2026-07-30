"use client";

import { useEffect, useState, useCallback } from "react";
import { ThemeContext } from "./contexts";
import { THEME_STORAGE_KEY } from "@/constants/key";
import { Theme } from "@/type/theme/index";

const disableAnimation = () => {
  const css = document.createElement("style");

  css.appendChild(
    document.createTextNode(
      `*,*::before,*::after {
        transition: none !important;
      }`,
    ),
  );

  document.head.appendChild(css);

  return () => {
    (() => window.getComputedStyle(document.body))();

    setTimeout(() => {
      document.head.removeChild(css);
    }, 1);
  };
};

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

  const applyTheme = useCallback((t: Theme) => {
    const enable = disableAnimation();

    const resolved: "light" | "dark" =
      t === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : t;

    document.documentElement.classList.toggle("dark", resolved === "dark");
    localStorage.setItem(THEME_STORAGE_KEY, t);
    setThemeState(t);

    enable();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
