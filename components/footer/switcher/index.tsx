"use client";

import { useEffect, useState } from "react";
import { Sun, Monitor, Moon } from "lucide-react";
import { Theme } from "@/type/theme";
import { useTheme } from "@/components/theme/hooks";

const THEMES: { value: Theme; icon: React.ReactNode; label: string }[] = [
  { value: "light", icon: <Sun className="h-3.5 w-3.5" />, label: "라이트" },
  {
    value: "system",
    icon: <Monitor className="h-3.5 w-3.5" />,
    label: "시스템",
  },
  { value: "dark", icon: <Moon className="h-3.5 w-3.5" />, label: "다크" },
];

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-8 w-23 rounded-full bg-blog-bg-3 border border-blog-border" />
    );
  }

  return (
    <div
      role="group"
      aria-label="테마 선택"
      className="flex items-center bg-blog-bg-3 border border-blog-border rounded-full p-0.5 gap-0.5"
    >
      {THEMES.map(({ value, icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          aria-label={label}
          title={label}
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
            theme === value
              ? "bg-blog-bg-2 text-blog-fg shadow-sm"
              : "text-blog-fg-subtle hover:text-blog-fg-muted"
          }`}
        >
          {icon}
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
