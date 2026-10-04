"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  // Fixed value before mount (SSR-safe); real theme after mount
  const isDark = mounted ? resolvedTheme === "dark" : false;

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={isDark ? "تغییر به حالت روشن" : "تغییر به حالت تیره"}
      title={isDark ? "حالت روشن" : "حالت تیره"}
      className={className}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {mounted ? (
        isDark ? (
          <Sun className="h-[1.1rem] w-[1.1rem]" />
        ) : (
          <Moon className="h-[1.1rem] w-[1.1rem]" />
        )
      ) : (
        <Sun className="h-[1.1rem] w-[1.1rem] opacity-0" />
      )}
    </Button>
  );
}
