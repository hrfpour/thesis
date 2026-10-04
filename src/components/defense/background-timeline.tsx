"use client";

import * as React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Section, SectionHeading, RevealCard } from "@/components/defense/section-heading";
import { Figure } from "@/components/defense/figure";
import { background, fig } from "@/lib/defense-data";
import { cn } from "@/lib/utils";

const KIND_STYLE: Record<string, { dot: string; text: string; label: string }> = {
  stat: { dot: "bg-muted-foreground", text: "text-muted-foreground", label: "آماری کلاسیک" },
  dl: { dot: "bg-primary", text: "text-primary", label: "یادگیری عمیق" },
  bayes: { dot: "bg-accent-foreground", text: "text-accent-foreground", label: "رویکرد بیزی" },
  fusion: { dot: "bg-destructive", text: "text-destructive", label: "نقطه عطف تلفیق" },
};

export function BackgroundSection() {
  return (
    <Section id={background.id} className="bg-muted/30">
      <SectionHeading no={background.no} title={background.title} en={background.en} icon={background.icon} />

      <RevealCard className="mb-10 border-primary/25 bg-primary/5">
        <p className="text-sm leading-8 text-foreground sm:text-base sm:leading-9">{background.lead}</p>
      </RevealCard>

      {/* Research type legend */}
      <div className="mb-8 flex flex-wrap items-center gap-4 text-xs">
        {Object.entries(KIND_STYLE).map(([key, v]) => (
          <span key={key} className="flex items-center gap-1.5 text-muted-foreground">
            <span className={cn("h-2.5 w-2.5 rounded-full", v.dot)} />
            {v.label}
          </span>
        ))}
      </div>

      {/* Vertical timeline */}
      <div className="relative mb-12">
        <div
          aria-hidden
          className="absolute bottom-6 right-[0.5625rem] top-6 w-0.5 bg-gradient-to-b from-muted-foreground/40 via-primary/50 to-accent sm:right-[0.6875rem]"
        />

        <div className="flex flex-col gap-5">
          {background.timeline.map((t, i) => {
            const kind = KIND_STYLE[t.kind] ?? KIND_STYLE.stat;
            const isHighlight = t.kind === "fusion";
            return (
              <motion.div
                key={`${t.year}-${t.title}`}
                initial={{ opacity: 0, x: 26 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: Math.min(i * 0.04, 0.3) }}
                className="relative flex gap-4 sm:gap-5"
              >
                <div className="relative z-10 flex w-5 shrink-0 flex-col items-center pt-1 sm:w-6">
                  <span
                    className={cn(
                      "mt-1 h-[0.9rem] w-[0.9rem] shrink-0 rounded-full border-[3px] border-background sm:h-4 sm:w-4",
                      kind.dot,
                      isHighlight && "ring-4 ring-primary/20"
                    )}
                  />
                </div>

                <div
                  className={cn(
                    "flex-1 rounded-2xl border bg-card/70 p-4 backdrop-blur-sm transition-all duration-300 hover:shadow-md dark:hover:shadow-primary/10 sm:p-5",
                    isHighlight ? "border-primary/45 bg-primary/6" : "border-border hover:border-primary/30"
                  )}
                >
                  <div className="mb-1.5 flex flex-wrap items-center gap-2">
                    <span
                      className={cn(
                        "rounded-lg px-2.5 py-0.5 text-sm font-black",
                        isHighlight ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                      )}
                      dir="rtl"
                    >
                      {t.year}
                    </span>
                    <h4 className="text-sm font-bold text-foreground sm:text-base">{t.title}</h4>
                    {isHighlight && (
                      <Icons.Star className="h-4 w-4 fill-primary text-primary" aria-hidden />
                    )}
                  </div>
                  <p className="text-[0.82rem] leading-7 text-muted-foreground">{t.text}</p>
                  <span className={cn("mt-2 inline-block text-[0.7rem] font-medium", kind.text)}>
                    {t.cite}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Figure 6 — advanced new-wave architecture */}
      <Figure data={fig.architecture} mode="diagram" className="mx-auto mb-12 max-w-4xl" />

      {/* Novel contribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55 }}
        className="relative overflow-hidden rounded-2xl border-2 border-primary/35 bg-gradient-to-bl from-primary/12 via-card to-accent/10 p-6 sm:p-8"
      >
        <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-primary/15 blur-2xl" />
        <h3 className="mb-4 flex items-center gap-2.5 text-xl font-extrabold text-primary">
          <Icons.Lightbulb className="h-6 w-6" />
          {background.conclusion.title}
        </h3>
        <p className="relative text-sm leading-9 text-foreground sm:text-base sm:leading-10">
          {background.conclusion.text}
        </p>
      </motion.div>
    </Section>
  );
}
