"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { GraduationCap, Presentation, ScrollText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Countdown } from "@/components/defense/countdown";
import { usePresentation } from "@/components/defense/presentation-store";
import { meta } from "@/lib/defense-data";

/* پس‌زمینه: شبکه گراف نمادین (GNN) */
function GraphBackdrop() {
  const nodes = [
    { x: 8, y: 22 }, { x: 22, y: 10 }, { x: 36, y: 30 }, { x: 18, y: 48 },
    { x: 44, y: 62 }, { x: 62, y: 18 }, { x: 72, y: 44 }, { x: 88, y: 26 },
    { x: 84, y: 70 }, { x: 56, y: 80 }, { x: 30, y: 72 }, { x: 6, y: 66 },
    { x: 92, y: 8 }, { x: 48, y: 6 },
  ];
  const edges: [number, number][] = [
    [0, 1], [1, 2], [0, 3], [2, 4], [1, 5], [5, 6], [6, 7], [7, 8],
    [4, 9], [9, 10], [10, 3], [10, 11], [8, 9], [5, 12], [1, 13], [6, 4],
  ];
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="graph-pattern pattern-fade pointer-events-none absolute inset-0 h-full w-full opacity-60"
    >
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="currentColor"
          strokeWidth="0.18"
          className="text-primary/25"
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={i % 4 === 0 ? 0.9 : 0.55}
          fill="currentColor"
          className={i % 4 === 0 ? "text-primary/50 animate-soft-pulse" : "text-primary/30"}
          style={{ animationDelay: `${(i % 5) * 0.6}s` }}
        />
      ))}
    </svg>
  );
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  const startPresentation = usePresentation((s) => s.startPresentation);

  const scrollToToc = () => {
    document.getElementById("toc")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="cover"
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pb-16 pt-24 sm:px-6"
    >
      <GraphBackdrop />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[52rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center"
      >
        <motion.p variants={item} className="mb-6 text-base font-medium text-muted-foreground">
          {meta.besm}
        </motion.p>

        <motion.div variants={item} className="mb-6 flex flex-wrap items-center justify-center gap-2">
          <Badge variant="outline" className="gap-1.5 border-primary/30 bg-primary/8 px-3 py-1 text-primary">
            <GraduationCap className="h-3.5 w-3.5" />
            {meta.defenseKind}
          </Badge>
          <Badge variant="outline" className="px-3 py-1">
            رشته {meta.field} — مقطع {meta.degree}
          </Badge>
          <Badge variant="outline" className="px-3 py-1">
            پژوهش {meta.researchType}
          </Badge>
        </motion.div>

        <motion.h1
          variants={item}
          className="text-balance text-2xl font-extrabold leading-[1.7] text-foreground sm:text-3xl md:text-4xl md:leading-[1.75]"
        >
          {meta.titleFa}
        </motion.h1>

        <motion.p
          variants={item}
          dir="ltr"
          className="ltr mt-5 max-w-3xl text-balance text-sm font-medium leading-relaxed text-muted-foreground sm:text-base sm:leading-7"
        >
          {meta.titleEn}
        </motion.p>

        <motion.div variants={item} className="mt-4 flex flex-wrap justify-center gap-1.5">
          {meta.keywordsFa.map((k) => (
            <Badge key={k} variant="secondary" className="text-xs font-normal text-secondary-foreground">
              {k}
            </Badge>
          ))}
        </motion.div>

        <motion.div variants={item} className="mt-10 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {meta.people.map((p) => (
            <div
              key={p.role}
              className="flex flex-col rounded-xl border bg-card/70 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md dark:hover:shadow-primary/10"
            >
              <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-primary">{p.role}</p>
              <p className="mt-1.5 text-sm font-bold leading-6 text-foreground">{p.name}</p>
              <p className="mt-1.5 text-[0.72rem] font-semibold leading-5 text-foreground/85">{p.rank}</p>
              <p className="mt-1 text-[0.68rem] leading-5 text-muted-foreground">{p.detail}</p>
            </div>
          ))}
        </motion.div>

        <motion.div variants={item} className="mt-8 flex flex-col items-center gap-4">
          <Countdown />
        </motion.div>

        <motion.div variants={item} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" onClick={() => startPresentation(0)} className="gap-2 text-base font-bold">
            <Presentation className="h-5 w-5" />
            شروع ارائه دفاع
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={scrollToToc}
            className="gap-2 text-base font-semibold"
          >
            <ScrollText className="h-5 w-5" />
            مرور بخش‌های سایت
          </Button>
        </motion.div>

        <motion.p
          variants={item}
          className="mt-12 flex items-center gap-2 text-xs text-muted-foreground"
        >
          <Users className="h-3.5 w-3.5" />
          {meta.university} — {meta.faculty}
        </motion.p>
      </motion.div>
    </section>
  );
}
