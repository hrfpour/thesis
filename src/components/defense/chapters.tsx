"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, CircleDashed, Flag, Map } from "lucide-react";
import { Section, SectionHeading, RevealCard, WipBadge } from "@/components/defense/section-heading";
import { Badge } from "@/components/ui/badge";
import { chapters } from "@/lib/defense-data";
import { cn } from "@/lib/utils";

export function ChaptersSection() {
  return (
    <Section id={chapters.id}>
      <SectionHeading no={chapters.no} title={chapters.title} en={chapters.en} icon={chapters.icon} />

      <RevealCard className="mb-10 border-primary/25 bg-primary/5">
        <p className="text-sm leading-8 text-foreground sm:text-base sm:leading-9">{chapters.lead}</p>
      </RevealCard>

      {/* Four chapters */}
      <div className="mb-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {chapters.items.map((ch, i) => (
          <motion.div
            key={ch.no}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className={cn(
              "relative flex flex-col rounded-2xl border-2 p-5 backdrop-blur-sm transition-all duration-300 hover:shadow-lg dark:hover:shadow-primary/10",
              ch.status === "wip"
                ? "border-dashed border-accent/60 bg-accent/5"
                : "border-primary/30 bg-card/70"
            )}
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <span
                className={cn(
                  "rounded-lg px-3 py-1 text-sm font-black",
                  ch.status === "wip" ? "bg-accent/20 text-accent-foreground" : "bg-primary text-primary-foreground"
                )}
              >
                {ch.no}
              </span>
              {ch.status === "wip" ? <WipBadge /> : (
                <Badge variant="outline" className="border-primary/40 bg-primary/8 text-primary">
                  <CheckCircle2 className="ml-1 h-3 w-3" />
                  {ch.statusText}
                </Badge>
              )}
            </div>
            <h4 className="mb-3 text-base font-extrabold text-foreground">{ch.title}</h4>
            <ul className="flex flex-col gap-2">
              {ch.points.map((p) => (
                <li key={p} className="flex items-start gap-2 text-[0.82rem] leading-6 text-muted-foreground">
                  {ch.status === "wip" ? (
                    <CircleDashed className="mt-1 h-3.5 w-3.5 shrink-0 text-accent-foreground/70" />
                  ) : (
                    <CheckCircle2 className="mt-1 h-3.5 w-3.5 shrink-0 text-primary" />
                  )}
                  {p}
                </li>
              ))}
            </ul>
            {ch.status === "wip" && (
              <p className="mt-3 rounded-lg bg-accent/10 px-3 py-2 text-[0.7rem] leading-5 text-accent-foreground">
                این فصل با تحقیقات و پیاده‌سازی‌های آینده نگارنده تکمیل خواهد شد.
              </p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Roadmap */}
      <h3 className="mb-2 flex items-center gap-2.5 text-xl font-extrabold text-foreground">
        <Map className="h-6 w-6 text-primary" />
        {chapters.roadmap.title}
      </h3>
      <p className="mb-5 text-xs leading-6 text-muted-foreground">{chapters.roadmap.note}</p>

      <div className="relative">
        {/* Roadmap horizontal line */}
        <div
          aria-hidden
          className="absolute right-0 top-[2.125rem] hidden h-0.5 w-full bg-gradient-to-l from-muted-foreground/30 via-primary/50 to-accent lg:block"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-2 lg:grid-cols-6">
          {chapters.roadmap.milestones.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="relative flex flex-col items-center gap-2.5 rounded-2xl p-3 text-center sm:pt-4"
            >
              <span
                className={cn(
                  "relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2",
                  m.highlight
                    ? "border-accent bg-accent text-accent-foreground shadow-lg shadow-accent/25"
                    : m.done
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground/40 bg-background text-muted-foreground"
                )}
              >
                {m.highlight ? <Flag className="h-4.5 w-4.5" /> : m.done ? <CheckCircle2 className="h-4.5 w-4.5" /> : <CircleDashed className="h-4.5 w-4.5" />}
              </span>
              <span
                className={cn(
                  "tabular-nums-fa text-xs font-black",
                  m.highlight ? "text-accent-foreground" : "text-foreground"
                )}
                dir="rtl"
              >
                {m.date}
              </span>
              <span className="text-[0.72rem] leading-5 text-muted-foreground">{m.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
