"use client";

import * as React from "react";
import { CalendarClock } from "lucide-react";
import { jalaaliToDateObject } from "jalaali-js";
import { faDigits, meta } from "@/lib/defense-data";
import { cn } from "@/lib/utils";

/** تاریخ هدف: ۳۰ بهمن ۱۴۰۵ — ساعت ۹ صبح به وقت تهران (UTC+3:30) */
const TARGET_DATE = (() => {
  const base = jalaaliToDateObject(1405, 11, 30); // 2027-02-19T00:00:00Z
  return new Date(base.getTime() + 5.5 * 3600 * 1000); // 09:00 Tehran
})();

function getRemaining(target: Date, now: Date) {
  const diff = Math.max(0, target.getTime() - now.getTime());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
    finished: diff === 0,
  };
}

export function Countdown({ compact = false }: { compact?: boolean }) {
  const [now, setNow] = React.useState<Date | null>(null);

  React.useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // برای جلوگیری از ناهماهنگی هیدراسیون، تا زمان آماده شدن کلاینت، جای‌نگهدار نمایش می‌دهیم
  const r = now ? getRemaining(TARGET_DATE, now) : null;

  const cells = [
    { value: r?.days ?? 0, label: "روز" },
    { value: r?.hours ?? 0, label: "ساعت" },
    { value: r?.minutes ?? 0, label: "دقیقه" },
    { value: r?.seconds ?? 0, label: "ثانیه" },
  ];

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3",
        compact ? "gap-2" : "gap-4"
      )}
      dir="rtl"
    >
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <CalendarClock className="h-4 w-4 text-primary" />
        <span>
          شمارش معکوس تا جلسه دفاع — <span className="font-semibold text-foreground">{meta.defense.jalali}</span>
          <span className="hidden sm:inline"> ({meta.defense.gregorian})</span>
        </span>
      </div>
      <div className="flex flex-row-reverse items-stretch justify-center gap-2 sm:gap-3" dir="rtl">
        {cells.map((c, i) => (
          <React.Fragment key={c.label}>
            <div
              className={cn(
                "flex flex-col items-center justify-center rounded-xl border bg-card/70 backdrop-blur-sm tabular-nums-fa",
                compact
                  ? "min-w-14 px-2 py-1.5"
                  : "min-w-16 px-2.5 py-2.5 sm:min-w-20 sm:px-3 md:min-w-24 md:py-3.5"
              )}
            >
              <span
                className={cn(
                  "font-black text-primary",
                  compact ? "text-xl" : "text-2xl sm:text-3xl md:text-4xl"
                )}
              >
                {faDigits(String(c.value).padStart(2, "0"))}
              </span>
              <span className="text-[0.65rem] sm:text-xs text-muted-foreground">{c.label}</span>
            </div>
            {i < cells.length - 1 && (
              <span
                aria-hidden
                className={cn(
                  "self-center text-primary/50 font-bold",
                  compact ? "text-lg" : "text-xl sm:text-2xl"
                )}
              >
                :
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
