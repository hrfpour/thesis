"use client";

import * as React from "react";
import { Menu, Presentation, TrafficCone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/defense/theme-toggle";
import { usePresentation } from "@/components/defense/presentation-store";
import { PresentationExport } from "@/components/defense/presentation/presentation-export";
import { toc } from "@/lib/defense-data";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [active, setActive] = React.useState<string | null>(null);
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const startPresentation = usePresentation((s) => s.startPresentation);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const sections = toc
      .map((t) => document.getElementById(t.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b bg-background/80 backdrop-blur-xl shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-4 sm:px-6">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="focus-ring flex items-center gap-2 rounded-lg px-1.5 py-1 text-sm font-bold text-foreground/90 transition-colors hover:text-primary"
          aria-label="بازگشت به ابتدای صفحه"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <TrafficCone className="h-4.5 w-4.5" />
          </span>
          <span className="hidden sm:inline">دفاع از پروپوزال — پیش‌بینی ترافیک با رویکرد بیزی</span>
          <span className="sm:hidden">دفاع از پروپوزال</span>
        </button>

        <nav className="hidden lg:flex items-center gap-0.5" aria-label="ناوبری بخش‌ها">
          {toc.map((t) => (
            <button
              key={t.id}
              onClick={() => scrollTo(t.id)}
              className={cn(
                "focus-ring rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                active === t.id
                  ? "bg-primary/12 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {t.title}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <PresentationExport variant="labeled" />
          <Button
            size="sm"
            onClick={() => startPresentation(0)}
            className="gap-1.5 font-semibold"
          >
            <Presentation className="h-4 w-4" />
            <span className="hidden sm:inline">شروع ارائه</span>
            <span className="sm:hidden">ارائه</span>
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="منوی بخش‌ها">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 p-4">
              <SheetTitle className="text-right text-base font-bold mb-2">فهرست بخش‌ها</SheetTitle>
              <nav className="flex flex-col gap-1" aria-label="منوی موبایل">
                {toc.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => scrollTo(t.id)}
                    className={cn(
                      "focus-ring rounded-lg px-3 py-2.5 text-right text-sm font-medium transition-colors",
                      active === t.id
                        ? "bg-primary/12 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <span className="ml-2 text-xs text-muted-foreground/70">{t.no}</span>
                    {t.title}
                  </button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
