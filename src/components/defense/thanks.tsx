"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { HeartHandshake, Presentation, TrafficCone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Figure } from "@/components/defense/figure";
import { usePresentation } from "@/components/defense/presentation-store";
import { meta, fig } from "@/lib/defense-data";

export function ThanksSection() {
  const startPresentation = usePresentation((s) => s.startPresentation);

  return (
    <section id="thanks" className="relative overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="graph-pattern pattern-fade h-72 w-[40rem] opacity-50" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto flex max-w-2xl flex-col items-center px-4 text-center"
      >
        <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/12 text-primary">
          <HeartHandshake className="h-8 w-8" />
        </span>
        <h2 className="text-3xl font-black text-foreground sm:text-4xl">با سپاس از حسن توجه شما</h2>
        <p className="mt-5 text-sm leading-8 text-muted-foreground sm:text-base sm:leading-9">
          نگارنده آماده پاسخ‌گویی به پرسش‌ها و دیدگاه‌های ارزشمند اساتید محترم راهنما، مشاور و داور است.
          بخش‌های در دست تکمیل سایت، با پیشرفت پژوهش و انجام آزمایش‌ها به‌روزرسانی خواهد شد.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
          <span>{meta.student.name}</span>
          <span aria-hidden>•</span>
          <span>دفاع از پروپوزال — {meta.defense.jalali}</span>
          <span aria-hidden>•</span>
          <span>{meta.university}</span>
        </div>

        <Button
          size="lg"
          onClick={() => startPresentation(0)}
          variant="outline"
          className="mt-8 gap-2 font-semibold"
        >
          <Presentation className="h-4.5 w-4.5" />
          مشاهده مجدد حالت ارائه
        </Button>
      </motion.div>

      {/* Vision image */}
      <div className="relative mx-auto mt-12 max-w-4xl px-4 sm:px-6">
        <Figure data={fig.future} mode="photo" delay={0.1} compact />
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t bg-muted/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-center sm:flex-row sm:px-6 sm:text-right">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/12 text-primary">
            <TrafficCone className="h-4 w-4" />
          </span>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-foreground">
              دفاع از پروپوزال — پیش‌بینی ترافیک با رویکرد بیزی
            </span>
            <span className="text-[0.68rem] text-muted-foreground">
              {meta.university} — {meta.faculty}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 text-[0.68rem] text-muted-foreground sm:items-end">
          <span>
            {meta.student.name} — شماره دانشجویی {meta.student.id}
          </span>
          <span>جلسه دفاع: {meta.defense.jalali} ({meta.defense.gregorian})</span>
          <span>تصاویر سایت از منابع آزاد وب گردآوری شده و جنبه توضیحی دارند.</span>
        </div>
      </div>
    </footer>
  );
}
