"use client";

import * as React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Section, SectionHeading, RevealCard, WipBadge } from "@/components/defense/section-heading";
import { Figure } from "@/components/defense/figure";
import { goals, fig } from "@/lib/defense-data";

function LucIcon({ name, className }: { name: string; className?: string }) {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name] ??
    Icons.CircleDot;
  return <Icon className={className ?? "h-5 w-5"} />;
}

/* ── Proposed architecture diagram (RTL flow) ── */
function ArchitectureDiagram() {
  const steps = goals.architecture.steps;
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch lg:gap-2" dir="rtl">
      {steps.map((s, i) => (
        <React.Fragment key={s.title}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            className="relative flex flex-1 flex-col rounded-2xl border-2 border-primary/25 bg-card/80 p-4 backdrop-blur-sm transition-all duration-300 hover:shadow-lg dark:hover:shadow-primary/10"
          >
            {i === 2 && (
              <span className="absolute -top-3 right-3 z-10">
                <WipBadge label="هسته نوآوری" />
              </span>
            )}
            <div className="mb-2.5 flex items-center gap-2.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary">
                <LucIcon name={s.icon} />
              </span>
              <div className="flex flex-col">
                <h5 className="text-sm font-black text-foreground">{s.title}</h5>
                <span dir="ltr" className="ltr text-[0.62rem] font-semibold uppercase tracking-wide text-muted-foreground">
                  {s.en}
                </span>
              </div>
            </div>
            <p className="flex-1 text-[0.78rem] leading-6.5 text-muted-foreground">{s.text}</p>
            <div className="mt-3 rounded-lg bg-muted/60 p-2.5">
              <p className="flex items-start gap-1.5 text-[0.7rem] leading-5 text-primary/90">
                <Icons.Info className="mt-0.5 h-3 w-3 shrink-0" />
                {s.detail}
              </p>
            </div>
          </motion.div>
          {i < steps.length - 1 && (
            <div className="flex items-center justify-center lg:pb-0" aria-hidden>
              <Icons.ChevronLeft className="hidden h-6 w-6 text-primary/60 lg:block" />
              <Icons.ChevronDown className="h-6 w-6 rotate-180 text-primary/60 lg:hidden" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export function GoalSection() {
  return (
    <Section id={goals.id}>
      <SectionHeading no={goals.no} title={goals.title} en={goals.en} icon={goals.icon} />

      {/* Main objective */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55 }}
        className="relative mb-10 overflow-hidden rounded-2xl border-2 border-primary/35 bg-gradient-to-bl from-primary/12 via-card to-accent/8 p-6 sm:p-8"
      >
        <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-primary/15 blur-2xl" />
        <div className="relative">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary px-3.5 py-1 text-xs font-black text-primary-foreground">
            <Icons.Target className="h-3.5 w-3.5" />
            {goals.main.label}
          </span>
          <p className="text-base font-bold leading-9 text-foreground sm:text-lg sm:leading-10">
            {goals.main.text}
          </p>
        </div>
      </motion.div>

      {/* Secondary objectives */}
      <h3 className="mb-4 text-xl font-extrabold text-foreground">اهداف فرعی پژوهش</h3>
      <div className="mb-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {goals.sub.map((g, i) => (
          <RevealCard key={g.title} delay={i * 0.05} className="flex flex-col">
            <div className="mb-2 flex items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-sm font-black text-primary">
                {["۱", "۲", "۳", "۴", "۵"][i]}
              </span>
              <h4 className="text-sm font-bold text-foreground">{g.title}</h4>
            </div>
            <p className="text-[0.82rem] leading-7 text-muted-foreground">{g.text}</p>
          </RevealCard>
        ))}
        <RevealCard delay={0.25} className="hidden items-center justify-center bg-accent/8 lg:flex">
          <div className="flex flex-col items-center gap-2 text-center">
            <Icons.Trophy className="h-8 w-8 text-accent-foreground" />
            <p className="max-w-40 text-xs font-bold leading-6 text-accent-foreground">
              تلفیق دقت یادگیری عمیق با اطمینان آماری بیزی
            </p>
          </div>
        </RevealCard>
      </div>

      {/* Research questions */}
      <RevealCard className="mb-12">
        <h3 className="mb-4 flex items-center gap-2.5 text-xl font-extrabold text-foreground">
          <Icons.CircleHelp className="h-6 w-6 text-primary" />
          سؤالات پژوهش
        </h3>

        <div className="mb-4 rounded-xl border-2 border-primary/25 bg-primary/6 p-5">
          <span className="mb-2 inline-block rounded-full bg-primary/12 px-3 py-0.5 text-[0.7rem] font-black text-primary">
            سؤال اصلی
          </span>
          <p className="text-sm font-bold leading-8 text-foreground sm:text-[0.95rem]">{goals.questions.main}</p>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {goals.questions.sub.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex items-start gap-3 rounded-xl border bg-muted/40 p-4"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/12 text-xs font-black text-primary">
                {["۱", "۲", "۳", "۴"][i]}
              </span>
              <p className="text-[0.83rem] leading-7 text-foreground">{q}</p>
            </motion.div>
          ))}
        </div>
      </RevealCard>

      {/* Proposed architecture */}
      <h3 className="mb-2 text-xl font-extrabold text-foreground">{goals.architecture.title}</h3>
      <p className="mb-6 max-w-3xl text-sm leading-8 text-muted-foreground">{goals.architecture.lead}</p>

      <div className="mb-4">
        <ArchitectureDiagram />
      </div>

      {/* Figures 4 & 5 — graph representation and STGNN modeling pipeline */}
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Figure data={fig.graph} mode="diagram" />
        <Figure data={fig.stgnn} mode="diagram" delay={0.08} />
      </div>

      <div className="mb-12 flex items-start gap-2.5 rounded-xl border border-accent/50 bg-accent/10 p-4">
        <Icons.FlaskConical className="mt-0.5 h-4.5 w-4.5 shrink-0 text-accent-foreground" />
        <div className="flex flex-col gap-1">
          <p className="text-xs font-bold text-accent-foreground">در دست تکمیل</p>
          <p className="text-[0.78rem] leading-6 text-muted-foreground">{goals.architecture.wipNote}</p>
        </div>
      </div>

      {/* Evaluation metrics */}
      <h3 className="mb-2 text-xl font-extrabold text-foreground">{goals.metrics.title}</h3>
      <p className="mb-6 text-sm leading-8 text-muted-foreground">{goals.metrics.lead}</p>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <RevealCard>
          <h4 className="mb-3 flex items-center gap-2 text-sm font-black text-foreground">
            <Icons.Gauge className="h-4.5 w-4.5 text-primary" />
            {goals.metrics.accuracy.title}
          </h4>
          <div className="flex flex-col gap-2">
            {goals.metrics.accuracy.items.map((m) => (
              <div key={m.name} className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
                <span dir="ltr" className="ltr text-sm font-black text-primary">{m.name}</span>
                <span className="text-xs text-muted-foreground">{m.desc}</span>
              </div>
            ))}
          </div>
        </RevealCard>

        <RevealCard delay={0.08}>
          <h4 className="mb-3 flex items-center gap-2 text-sm font-black text-foreground">
            <Icons.ShieldCheck className="h-4.5 w-4.5 text-accent-foreground" />
            {goals.metrics.reliability.title}
          </h4>
          <div className="flex flex-col gap-2">
            {goals.metrics.reliability.items.map((m) => (
              <div key={m.name} className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
                <span dir="ltr" className="ltr text-sm font-black text-accent-foreground">{m.name}</span>
                <span className="text-xs text-muted-foreground">{m.desc}</span>
              </div>
            ))}
          </div>
        </RevealCard>

        <RevealCard delay={0.16}>
          <h4 className="mb-3 flex items-center gap-2 text-sm font-black text-foreground">
            <Icons.ListChecks className="h-4.5 w-4.5 text-primary" />
            {goals.metrics.validation.title}
          </h4>
          <ul className="flex flex-col gap-2">
            {goals.metrics.validation.items.map((v) => (
              <li key={v} className="flex items-start gap-2 text-[0.8rem] leading-6 text-muted-foreground">
                <Icons.CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                {v}
              </li>
            ))}
          </ul>
        </RevealCard>
      </div>
    </Section>
  );
}
