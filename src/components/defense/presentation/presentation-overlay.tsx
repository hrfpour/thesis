"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/defense/theme-toggle";
import { usePresentation } from "@/components/defense/presentation-store";
import { SLIDES } from "@/components/defense/presentation/slides";
import { faDigits } from "@/lib/defense-data";
import { cn } from "@/lib/utils";

/* ── تایمر جلسه ── */
function SessionTimer({ startEpoch }: { startEpoch: number }) {
  const [elapsed, setElapsed] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => setElapsed(Date.now() - startEpoch), 1000);
    return () => clearInterval(id);
  }, [startEpoch]);

  const mm = Math.floor(elapsed / 60000);
  const ss = Math.floor((elapsed % 60000) / 1000);

  return (
    <span
      className="tabular-nums-fa hidden items-center gap-1.5 rounded-lg border bg-muted/50 px-2.5 py-1 text-xs font-bold text-muted-foreground md:inline-flex"
      title="زمان سپری‌شده جلسه"
      dir="rtl"
    >
      <Icons.Timer className="h-3.5 w-3.5 text-primary" />
      {faDigits(String(mm).padStart(2, "0"))}:{faDigits(String(ss).padStart(2, "0"))}
    </span>
  );
}

export function PresentationOverlay() {
  const { active, slideIndex, slideCount, startPresentation, exitPresentation, goTo, next, prev } =
    usePresentation();
  const [direction, setDirection] = React.useState(1);
  const [startEpoch, setStartEpoch] = React.useState(Date.now());
  const [showOverview, setShowOverview] = React.useState(false);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const touchStartX = React.useRef<number | null>(null);

  const total = SLIDES.length;

  React.useEffect(() => {
    usePresentation.getState().setSlideCount(total);
  }, [total]);

  // قفل اسکرول بدنه هنگام ارائه
  React.useEffect(() => {
    if (active) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      setStartEpoch(Date.now());
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [active]);

  const toggleFullscreen = React.useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      /* عدم پشتیبانی مرورگر */
    }
  }, []);

  // ناوبری با کیبورد (RTL: فلش چپ = اسلاید بعدی)
  React.useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
        case " ":
        case "Enter":
        case "PageDown":
          e.preventDefault();
          setDirection(1);
          next();
          break;
        case "ArrowRight":
        case "PageUp":
          e.preventDefault();
          setDirection(-1);
          prev();
          break;
        case "Home":
          e.preventDefault();
          setDirection(-1);
          goTo(0);
          break;
        case "End":
          e.preventDefault();
          setDirection(1);
          goTo(total - 1);
          break;
        case "Escape":
          if (showOverview) setShowOverview(false);
          else exitPresentation();
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
        case "g":
        case "G":
          setShowOverview((v) => !v);
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, next, prev, goTo, exitPresentation, total, showOverview, toggleFullscreen]);

  const handleGoTo = (i: number) => {
    setDirection(i > slideIndex ? 1 : -1);
    goTo(i);
    setShowOverview(false);
  };

  const goNext = () => {
    setDirection(1);
    next();
  };
  const goPrev = () => {
    setDirection(-1);
    prev();
  };

  // پشتیبانی لمسی (swipe)
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    if (Math.abs(delta) > 60) {
      if (delta < 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  const slide = SLIDES[Math.min(slideIndex, total - 1)];
  const progress = total > 0 ? ((slideIndex + 1) / total) * 100 : 0;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex flex-col bg-background"
          role="dialog"
          aria-label="حالت ارائه دفاع"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* نوار بالا */}
          <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b bg-background/90 px-3 backdrop-blur-xl sm:px-5">
            <div className="flex min-w-0 items-center gap-2.5">
              {slide.sectionNo && (
                <span className="hidden rounded-md bg-primary/12 px-2 py-0.5 text-xs font-black text-primary sm:inline-block">
                  {slide.sectionNo}
                </span>
              )}
              <span className="truncate text-sm font-bold text-foreground">{slide.section}</span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <SessionTimer startEpoch={startEpoch} />
              <span className="tabular-nums-fa text-sm font-black text-muted-foreground" dir="rtl">
                {faDigits(slideIndex + 1)} / {faDigits(total)}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowOverview((v) => !v)}
                aria-label="نمای کلی اسلایدها"
                title="نمای کلی (G)"
              >
                <Icons.LayoutGrid className="h-[1.1rem] w-[1.1rem]" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? "خروج از تمام‌صفحه" : "تمام‌صفحه"}
                title="تمام‌صفحه (F)"
              >
                {isFullscreen ? (
                  <Icons.Minimize className="h-[1.1rem] w-[1.1rem]" />
                ) : (
                  <Icons.Maximize className="h-[1.1rem] w-[1.1rem]" />
                )}
              </Button>
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={exitPresentation}
                aria-label="خروج از حالت ارائه"
                title="خروج (Esc)"
                className="text-destructive hover:text-destructive"
              >
                <Icons.X className="h-[1.1rem] w-[1.1rem]" />
              </Button>
            </div>
          </header>

          {/* محتوای اسلاید */}
          <main className="relative flex-1 overflow-hidden">
            {/* تصویر پس‌زمینه ملایم برای اسلاید جلد و اسلاید پایانی */}
            {slideIndex === 0 && (
              <>
                <img
                  src="/images/traffic-night.jpg"
                  alt=""
                  aria-hidden
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25 dark:opacity-20"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/75 via-background/40 to-background/85"
                />
              </>
            )}
            {slideIndex === total - 1 && (
              <>
                <img
                  src="/images/future-its.jpg"
                  alt=""
                  aria-hidden
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 dark:opacity-15"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/75 via-background/40 to-background/85"
                />
              </>
            )}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={slideIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction * -48 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * 48 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 overflow-y-auto"
              >
                <div className="mx-auto flex min-h-full w-full max-w-6xl items-center justify-center px-4 py-4 sm:px-6">
                  <div className="w-full">{slide.render()}</div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* نمای کلی اسلایدها */}
            <AnimatePresence>
              {showOverview && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  className="absolute inset-0 z-10 overflow-y-auto bg-background/95 p-4 backdrop-blur-xl sm:p-8"
                >
                  <div className="mx-auto max-w-4xl">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-extrabold text-foreground">
                      <Icons.LayoutGrid className="h-5 w-5 text-primary" />
                      نمای کلی اسلایدها
                    </h3>
                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
                      {SLIDES.map((s, i) => (
                        <button
                          key={i}
                          onClick={() => handleGoTo(i)}
                          className={cn(
                            "focus-ring flex flex-col items-start gap-1.5 rounded-xl border p-3 text-right transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:hover:shadow-primary/10",
                            i === slideIndex
                              ? "border-primary/60 bg-primary/10 shadow-sm"
                              : "border-border bg-card/60 hover:border-primary/40"
                          )}
                        >
                          <span className="flex w-full items-center justify-between gap-2">
                            <span className="text-[0.65rem] font-bold text-primary/70">{s.section}</span>
                            <span className="tabular-nums-fa text-xs font-black text-muted-foreground">
                              {faDigits(i + 1)}
                            </span>
                          </span>
                          <span className="text-xs font-bold leading-5 text-foreground">{s.title}</span>
                        </button>
                      ))}
                    </div>
                    <p className="mt-4 text-center text-[0.68rem] text-muted-foreground">
                      برای بستن این نمای، کلید G یا Esc را فشار دهید
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* نوار پایین */}
          <footer className="shrink-0 border-t bg-background/90 backdrop-blur-xl">
            <div
              role="progressbar"
              aria-valuemin={1}
              aria-valuemax={total}
              aria-valuenow={slideIndex + 1}
              aria-label="پیشرفت ارائه"
              className="h-1 w-full bg-muted"
            >
              <motion.div
                className="h-full bg-gradient-to-l from-primary to-accent"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="flex items-center justify-between gap-2 px-3 py-2.5 sm:px-5">
              <Button
                variant="outline"
                size="sm"
                onClick={goPrev}
                disabled={slideIndex === 0}
                className="gap-1.5"
              >
                <Icons.ChevronRight className="h-4 w-4" />
                قبلی
              </Button>

              <p className="hidden text-[0.68rem] leading-5 text-muted-foreground sm:block">
                ناوبری: <kbd className="kbd">←</kbd> اسلاید بعدی •{" "}
                <kbd className="kbd">→</kbd> قبلی •{" "}
                <kbd className="kbd">G</kbd> نمای کلی •{" "}
                <kbd className="kbd">F</kbd> تمام‌صفحه •{" "}
                <kbd className="kbd">Esc</kbd> خروج
              </p>

              <Button
                variant={slideIndex === total - 1 ? "default" : "outline"}
                size="sm"
                onClick={slideIndex === total - 1 ? exitPresentation : goNext}
                className="gap-1.5"
              >
                {slideIndex === total - 1 ? "پایان ارائه" : "بعدی"}
                <Icons.ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
