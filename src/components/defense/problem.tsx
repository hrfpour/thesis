"use client";

import * as React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Section, SectionHeading, RevealCard } from "@/components/defense/section-heading";
import { Figure } from "@/components/defense/figure";
import { problem, fig } from "@/lib/defense-data";
import { cn } from "@/lib/utils";

function LucIcon({ name, className }: { name: string; className?: string }) {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name] ??
    Icons.CircleDot;
  return <Icon className={className ?? "h-5 w-5"} />;
}

const GEN_STYLES = [
  { badge: "bg-muted text-muted-foreground", border: "border-border" },
  { badge: "bg-primary/10 text-primary", border: "border-primary/30" },
  { badge: "bg-primary/15 text-primary", border: "border-primary/40" },
  { badge: "bg-accent/20 text-accent-foreground", border: "border-accent/60" },
];

export function ProblemSection() {
  return (
    <Section id={problem.id} className="bg-muted/30">
      <SectionHeading no={problem.no} title={problem.title} en={problem.en} icon={problem.icon} />

      <RevealCard className="mb-8 border-primary/25 bg-primary/5">
        <p className="text-base leading-8 text-foreground sm:text-lg sm:leading-9">{problem.lead}</p>
      </RevealCard>

      {/* Figure 3 — peak-hour congestion */}
      <Figure data={fig.congestion} mode="photo" className="mx-auto mb-12 max-w-3xl" />

      {/* Triple challenges */}
      <div className="mb-12 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {problem.challenges.map((ch, i) => (
          <RevealCard key={ch.title} delay={i * 0.07}>
            <div className="mb-2.5 flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                <LucIcon name={ch.icon} />
              </span>
              <h4 className="text-base font-bold text-foreground">{ch.title}</h4>
            </div>
            <p className="text-[0.83rem] leading-7 text-muted-foreground">{ch.text}</p>
          </RevealCard>
        ))}
      </div>

      {/* Evolution of models */}
      <h3 className="mb-2 text-xl font-extrabold text-foreground">{problem.evolutionTitle}</h3>
      <p className="mb-6 max-w-3xl text-sm leading-8 text-muted-foreground">{problem.evolutionLead}</p>

      <div className="relative mb-12">
        {/* Vertical evolution line */}
        <div aria-hidden className="absolute bottom-4 right-[1.35rem] top-4 w-0.5 bg-gradient-to-b from-border via-primary/40 to-accent/60 sm:right-[1.6rem]" />

        <div className="flex flex-col gap-6">
          {problem.generations.map((g, gi) => {
            const style = GEN_STYLES[gi % GEN_STYLES.length];
            return (
              <motion.div
                key={g.gen}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex gap-4 pr-0 sm:gap-6"
              >
                <div className="relative z-10 flex flex-col items-center">
                  <span
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 bg-background text-sm font-black sm:h-[3.25rem] sm:w-[3.25rem]",
                      style.border
                    )}
                  >
                    <span className={style.badge}>{problem.generations.indexOf(g) + 1}</span>
                  </span>
                </div>

                <div className="flex-1 rounded-2xl border bg-card/70 p-5 backdrop-blur-sm">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className={cn("rounded-full px-3 py-1 text-xs font-bold", style.badge)}>{g.gen}</span>
                    <h4 className="text-base font-bold text-foreground sm:text-lg">{g.title}</h4>
                  </div>
                  <div className="flex flex-col gap-3">
                    {g.models.map((m) => (
                      <div key={m.name} className="rounded-xl bg-muted/40 p-4">
                        <h5 className="mb-1.5 text-sm font-bold text-foreground">{m.name}</h5>
                        <p className="text-[0.82rem] leading-7 text-muted-foreground">{m.text}</p>
                        <span className="mt-2 inline-block text-[0.7rem] font-medium text-primary/80">{m.cite}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Fundamental shortcoming */}
      <RevealCard className="mb-10 border-destructive/30 bg-destructive/5">
        <h3 className="mb-3 flex items-center gap-2.5 text-xl font-extrabold text-foreground">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-destructive/12 text-destructive">
            <Icons.TriangleAlert className="h-5 w-5" />
          </span>
          {problem.coreProblem.title}
        </h3>
        <p className="mb-5 text-sm leading-8 text-muted-foreground sm:text-[0.95rem]">
          {problem.coreProblem.text}
        </p>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          {problem.coreProblem.items.map((item, i) => (
            <div
              key={item.title}
              className={cn(
                "rounded-xl border p-4",
                i === 0
                  ? "border-destructive/35 bg-destructive/8"
                  : "border-border bg-muted/40"
              )}
            >
              <h4 className="mb-1.5 text-sm font-bold text-foreground">{item.title}</h4>
              <p className="text-[0.8rem] leading-7 text-muted-foreground">{item.text}</p>
              {item.cite && (
                <span className="mt-2 inline-block text-[0.7rem] font-medium text-destructive/90">{item.cite}</span>
              )}
            </div>
          ))}
        </div>
      </RevealCard>

      {/* Research gap */}
      <RevealCard className="mb-10">
        <h3 className="mb-3 text-xl font-extrabold text-foreground">{problem.gap.title}</h3>
        <p className="mb-6 text-sm leading-8 text-muted-foreground sm:text-[0.95rem]">{problem.gap.text}</p>

        <div className="flex flex-col items-stretch gap-4 lg:flex-row lg:items-center">
          <div className="flex-1 rounded-xl border bg-muted/40 p-4">
            <h4 className="mb-2.5 text-center text-sm font-bold text-foreground">{problem.gap.left.title}</h4>
            <ul className="flex flex-col gap-1.5">
              {problem.gap.left.points.map((p) => (
                <li key={p} className="flex items-center gap-2 text-xs leading-6 text-muted-foreground">
                  <Icons.Check className="h-3.5 w-3.5 text-primary" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex items-center justify-center lg:w-56">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.25 }}
              className="flex items-center gap-2 rounded-2xl border-2 border-dashed border-primary/50 bg-primary/8 px-4 py-3 text-center"
            >
              <Icons.Merge className="h-4.5 w-4.5 text-primary" />
              <span className="text-sm font-black text-primary">{problem.gap.middle}</span>
            </motion.div>
          </div>

          <div className="flex-1 rounded-xl border bg-muted/40 p-4">
            <h4 className="mb-2.5 text-center text-sm font-bold text-foreground">{problem.gap.right.title}</h4>
            <ul className="flex flex-col gap-1.5">
              {problem.gap.right.points.map((p) => (
                <li key={p} className="flex items-center gap-2 text-xs leading-6 text-muted-foreground">
                  <Icons.Check className="h-3.5 w-3.5 text-accent-foreground" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </RevealCard>

      {/* Core problem */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55 }}
        className="relative overflow-hidden rounded-2xl border-2 border-primary/35 bg-gradient-to-bl from-primary/12 via-card to-accent/10 p-6 sm:p-8"
      >
        <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/15 blur-2xl" />
        <h3 className="mb-4 flex items-center gap-2.5 text-xl font-extrabold text-primary">
          <Icons.Crosshair className="h-6 w-6" />
          {problem.focus.title}
        </h3>
        <p className="relative text-sm leading-9 text-foreground sm:text-base sm:leading-10">
          {problem.focus.text}
        </p>
      </motion.div>
    </Section>
  );
}
