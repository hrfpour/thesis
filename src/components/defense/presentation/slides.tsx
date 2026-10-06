"use client";

import * as React from "react";
import * as Icons from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WipBadge } from "@/components/defense/section-heading";
import { Tex } from "@/components/defense/math";
import {
  meta,
  problem,
  goals,
  background,
  chapters,
  references,
  fig,
  mathFramework,
} from "@/lib/defense-data";
import { cn } from "@/lib/utils";

/* ────────── Shared slide utilities ────────── */

function LucIcon({ name, className }: { name: string; className?: string }) {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name] ??
    Icons.CircleDot;
  return <Icon className={className ?? "h-5 w-5"} />;
}

function SlideTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-3.5 flex items-center gap-3">
      <h3 className="text-lg font-extrabold text-foreground sm:text-xl">{children}</h3>
      {sub && (
        <span dir="ltr" className="ltr text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {sub}
        </span>
      )}
      <span aria-hidden className="h-1 flex-1 rounded-full bg-gradient-to-l from-primary/60 to-transparent" />
    </div>
  );
}

function SlideCard({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={cn(
        "animate-in fade-in slide-in-from-bottom-3 rounded-2xl border bg-card/70 p-3.5 backdrop-blur-sm",
        className
      )}
      style={{ animationDuration: "450ms", animationDelay: `${delay}ms`, animationFillMode: "backwards" }}
    >
      {children}
    </div>
  );
}

/** Small title badge used inside cards */
function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[0.65rem] font-black",
        className ?? "bg-primary/12 text-primary"
      )}
    >
      {children}
    </span>
  );
}

/** Compact slide figure (image + numbered caption) */
function SlideFigure({
  data,
  height = "h-36 sm:h-44",
  contain = false,
}: {
  data: { src: string; alt: string; no: string; title: string };
  height?: string;
  contain?: boolean;
}) {
  return (
    <figure className="overflow-hidden rounded-xl border bg-card/70">
      <div className={cn("flex items-center justify-center", contain ? "bg-white p-1.5" : "")}>
        <img
          src={data.src}
          alt={data.alt}
          className={cn("w-full", height, contain ? "object-contain" : "object-cover")}
        />
      </div>
      <figcaption className="flex items-center gap-2 bg-muted/50 px-3 py-1.5" dir="rtl">
        <span className="shrink-0 rounded-full bg-primary px-2 py-0.5 text-[0.6rem] font-black text-primary-foreground">
          {data.no}
        </span>
        <span className="text-[0.64rem] font-bold leading-4 text-foreground">{data.title}</span>
      </figcaption>
    </figure>
  );
}

export type SlideDef = {
  section: string;
  sectionNo: string;
  title: string;
  render: () => React.ReactNode;
};

/* ────────── 13 condensed, visual-first slides ────────── */

export const SLIDES: SlideDef[] = [
  /* 1 — Cover */
  {
    section: "جلد",
    sectionNo: "",
    title: "صفحه عنوان",
    render: () => (
      <div className="flex flex-col items-center text-center">
        <p className="text-sm font-medium text-muted-foreground">{meta.besm}</p>
        <Badge variant="outline" className="mt-4 border-primary/40 bg-primary/10 px-3 py-1 text-primary">
          {meta.defenseKind} — رشته {meta.field}
        </Badge>
        <h2 className="mt-5 max-w-4xl text-balance text-xl font-extrabold leading-9 text-foreground sm:text-2xl sm:leading-10">
          {meta.titleFa}
        </h2>
        <p dir="ltr" className="ltr mt-3 max-w-3xl text-xs font-medium leading-6 text-muted-foreground sm:text-sm">
          {meta.titleEn}
        </p>
        <div className="mt-7 grid w-full max-w-4xl grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {meta.people.map((p) => (
            <div key={p.role} className="flex flex-col rounded-xl border bg-card/70 p-3.5 text-center">
              <p className="text-[0.68rem] font-bold text-primary">{p.role}</p>
              <p className="mt-1 text-xs font-bold leading-5 text-foreground">{p.name}</p>
              <p className="mt-1.5 text-[0.66rem] font-semibold leading-4 text-foreground/85">{p.rank}</p>
              <p className="mt-1 text-[0.62rem] leading-4 text-muted-foreground">{p.detail}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span>نگارنده: {meta.student.name}</span>
          <span aria-hidden>•</span>
          <span>{meta.university} — {meta.faculty}</span>
          <span aria-hidden>•</span>
          <span className="font-bold text-primary">{meta.defense.jalali}</span>
        </div>
      </div>
    ),
  },

  /* 2 — Problem at a glance: images + challenges + core deficiency */
  {
    section: "مقدمه",
    sectionNo: "۰۱",
    title: "مسئله در یک نگاه",
    render: () => (
      <div>
        <SlideTitle sub="The Problem at a Glance">مسئله در یک نگاه</SlideTitle>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          <SlideFigure data={fig.congestion} height="h-36 sm:h-44" />
          <SlideFigure data={fig.control} height="h-36 sm:h-44" />
        </div>
        <div className="mt-2.5 grid grid-cols-3 gap-2">
          {problem.challenges.map((ch) => (
            <SlideCard key={ch.title} className="flex flex-col items-center gap-1.5 p-2.5 text-center">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <LucIcon name={ch.icon} className="h-4 w-4" />
              </span>
              <span className="text-[0.68rem] font-bold leading-4 text-foreground">{ch.title}</span>
              <span className="text-[0.6rem] leading-4 text-muted-foreground">{ch.text}</span>
            </SlideCard>
          ))}
        </div>
        <SlideCard className="mt-2.5 border-destructive/30 bg-destructive/5">
          <p className="flex items-center gap-2 text-[0.72rem] font-bold leading-6 text-foreground">
            <Icons.TriangleAlert className="h-4 w-4 shrink-0 text-destructive" />
            {problem.coreProblem.title} — {problem.coreProblem.text}
          </p>
        </SlideCard>
      </div>
    ),
  },

  /* 3 — Evolution of four generations + the unsolved deficiency */
  {
    section: "بیان مسئله",
    sectionNo: "۰۲",
    title: "سیر تکامل مدل‌ها",
    render: () => (
      <div>
        <SlideTitle sub="Evolution of Models">سیر تکامل مدل‌های پیش‌بینی ترافیک</SlideTitle>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {problem.generations.map((g, gi) => (
            <SlideCard key={g.gen} delay={gi * 50} className="flex flex-col gap-1.5 p-3">
              <div className="flex items-center justify-between gap-1.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-xs font-black text-primary">
                  {["۱", "۲", "۳", "۴"][gi]}
                </span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[0.6rem] font-black",
                    gi === 3 ? "bg-accent/25 text-accent-foreground" : "bg-muted text-muted-foreground"
                  )}
                >
                  {g.gen}
                </span>
              </div>
              <h4 className="text-[0.7rem] font-black leading-5 text-foreground">{g.title}</h4>
              <p className="text-[0.62rem] leading-4.5 text-muted-foreground">{g.models[0].text}</p>
              <span className="mt-auto text-[0.58rem] font-medium text-primary/70">{g.models[0].cite}</span>
            </SlideCard>
          ))}
        </div>
        <SlideCard className="mt-2.5 border-primary/30 bg-primary/5">
          <p className="mb-1.5 text-[0.68rem] font-black text-primary">{mathFramework.transition.label}</p>
          <Tex
            tex={mathFramework.transition.tex}
            className="math-formula-compact rounded-lg bg-muted/45 px-2.5 py-1.5 text-[0.72rem]"
          />
          <p className="mt-1.5 text-[0.62rem] leading-4 text-muted-foreground">{mathFramework.transition.desc}</p>
        </SlideCard>
      </div>
    ),
  },

  /* 4 — Research gap & core problem */
  {
    section: "بیان مسئله",
    sectionNo: "۰۲",
    title: "خلأ پژوهشی و مسئله محوری",
    render: () => (
      <div>
        <SlideTitle sub="Research Gap">خلأ پژوهشی و مسئله محوری</SlideTitle>
        <SlideCard className="mb-2.5 border-primary/25 bg-primary/5">
          <p className="text-[0.74rem] leading-6 text-muted-foreground">{problem.gap.text}</p>
        </SlideCard>
        <div className="mb-2.5 grid grid-cols-1 items-stretch gap-2 sm:grid-cols-[1fr_auto_1fr]">
          <SlideCard className="p-3">
            <p className="mb-1 text-xs font-black text-foreground">{problem.gap.left.title}</p>
            <ul className="flex flex-col gap-1">
              {problem.gap.left.points.map((p) => (
                <li key={p} className="text-[0.68rem] leading-5 text-muted-foreground">• {p}</li>
              ))}
            </ul>
          </SlideCard>
          <div className="flex items-center justify-center">
            <span className="flex items-center gap-1.5 rounded-xl border-2 border-dashed border-primary/50 bg-primary/8 px-3 py-2 text-center text-xs font-black leading-5 text-primary">
              <Icons.Merge className="h-4 w-4 shrink-0" />
              {problem.gap.middle}
            </span>
          </div>
          <SlideCard className="p-3">
            <p className="mb-1 text-xs font-black text-foreground">{problem.gap.right.title}</p>
            <ul className="flex flex-col gap-1">
              {problem.gap.right.points.map((p) => (
                <li key={p} className="text-[0.68rem] leading-5 text-muted-foreground">• {p}</li>
              ))}
            </ul>
          </SlideCard>
        </div>
        <SlideCard className="border-primary/40 bg-gradient-to-bl from-primary/10 to-accent/8">
          <Chip className="mb-1.5">مسئله محوری پژوهش</Chip>
          <p className="flex items-start gap-2.5 text-[0.76rem] font-bold leading-7 text-foreground">
            <Icons.Crosshair className="mt-1.5 h-4.5 w-4.5 shrink-0 text-primary" />
            {problem.focus.text}
          </p>
        </SlideCard>
      </div>
    ),
  },

  /* 5 — Objectives & main question (merged) */
  {
    section: "هدف پژوهش",
    sectionNo: "۰۳",
    title: "اهداف و سؤال محوری",
    render: () => (
      <div>
        <SlideTitle sub="Objectives & Main Question">اهداف و سؤال محوری پژوهش</SlideTitle>
        <SlideCard className="mb-2.5 border-primary/40 bg-primary/8">
          <Chip className="mb-1.5">{goals.main.label}</Chip>
          <p className="text-[0.78rem] font-bold leading-7 text-foreground">{goals.main.text}</p>
        </SlideCard>
        <div className="mb-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {goals.sub.map((g, i) => (
            <SlideCard key={g.title} delay={i * 40} className="flex items-center gap-2 p-2.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-[0.62rem] font-black text-primary">
                {["۱", "۲", "۳", "۴", "۵"][i]}
              </span>
              <div className="flex min-w-0 flex-col">
                <p className="text-[0.68rem] font-black leading-5 text-foreground">{g.title}</p>
                <p className="text-[0.6rem] leading-4 text-muted-foreground">{g.text}</p>
              </div>
            </SlideCard>
          ))}
        </div>
        <SlideCard className="border-2 border-primary/35 bg-primary/6">
          <Chip className="mb-1.5">سؤال اصلی</Chip>
          <p className="text-[0.74rem] font-bold leading-7 text-foreground">{goals.questions.main}</p>
        </SlideCard>
      </div>
    ),
  },

  /* 6 — Proposed architecture: unified pipeline + two figures */
  {
    section: "هدف پژوهش",
    sectionNo: "۰۳",
    title: "معماری پیشنهادی — جریان یکپارچه",
    render: () => (
      <div>
        <SlideTitle sub="Proposed Architecture">معماری پیشنهادی — جریان یکپارچه</SlideTitle>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4" dir="rtl">
          {goals.architecture.steps.map((s, i) => (
            <React.Fragment key={s.title}>
              <SlideCard delay={i * 50} className="relative flex flex-col gap-1.5 p-2.5">
                {i === 2 && (
                  <span className="absolute -top-2 right-2 z-10"><WipBadge label="هسته نوآوری" /></span>
                )}
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary">
                    <LucIcon name={s.icon} className="h-4 w-4" />
                  </span>
                  <div className="flex min-w-0 flex-col">
                    <p className="text-[0.68rem] font-black leading-4 text-foreground">{s.title}</p>
                    <span dir="ltr" className="ltr text-[0.56rem] font-semibold leading-3.5 text-primary/70">{s.en}</span>
                  </div>
                </div>
                <p className="text-[0.6rem] leading-4.5 text-muted-foreground">{s.text}</p>
              </SlideCard>
              {i < goals.architecture.steps.length - 1 && (
                <div className="col-span-1 hidden items-center justify-center lg:flex" aria-hidden>
                  <Icons.ChevronLeft className="h-5 w-5 shrink-0 text-primary/60" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          <SlideFigure data={fig.graph} height="h-32 sm:h-40" contain />
          <SlideFigure data={fig.stgnn} height="h-32 sm:h-40" contain />
        </div>
      </div>
    ),
  },

  /* 7 — Architecture core: Bayesian layer & probabilistic output */
  {
    section: "هدف پژوهش",
    sectionNo: "۰۳",
    title: "معماری — هسته بیزی و خروجی احتمالاتی",
    render: () => (
      <div>
        <SlideTitle sub="Bayesian Core">هسته بیزی و خروجی احتمالاتی — حلقه مفقوده</SlideTitle>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {goals.architecture.steps.slice(2).map((s, i) => (
            <SlideCard key={s.title} delay={i * 60} className="relative flex flex-col gap-1.5 p-3">
              {i === 0 && (
                <span className="absolute -top-2 right-2 z-10"><WipBadge label="هسته نوآوری" /></span>
              )}
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary">
                  <LucIcon name={s.icon} className="h-4.5 w-4.5" />
                </span>
                <div className="flex min-w-0 flex-col">
                  <p className="text-xs font-black leading-4 text-foreground">{s.title}</p>
                  <span dir="ltr" className="ltr text-[0.58rem] font-semibold leading-4 text-primary/70">{s.en}</span>
                </div>
              </div>
              <p className="text-[0.66rem] leading-5 text-muted-foreground">{s.text}</p>
              <p className="mt-1 rounded-lg bg-muted/50 px-2.5 py-1.5 text-[0.62rem] leading-4.5 text-foreground/80">
                {s.detail}
              </p>
            </SlideCard>
          ))}
        </div>
        <div className="mt-2.5">
          <SlideFigure data={fig.architecture} height="h-36 sm:h-44" contain />
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-[0.62rem] leading-5 text-muted-foreground">
          <Icons.FlaskConical className="h-3.5 w-3.5 shrink-0 text-accent-foreground" />
          {goals.architecture.wipNote}
        </p>
      </div>
    ),
  },

  /* 8 — Mathematical formulation: the theoretical core (4 essential formulas) */
  {
    section: "هدف پژوهش",
    sectionNo: "۰۳",
    title: "فرمول‌بندی ریاضی — هسته نظری",
    render: () => {
      const items = [
        mathFramework.groups[0].items.find((f) => f.id === "task")!,
        mathFramework.groups[1].items.find((f) => f.id === "gcn")!,
        mathFramework.groups[2].items.find((f) => f.id === "bayes")!,
        mathFramework.groups[2].items.find((f) => f.id === "elbo")!,
      ];
      return (
        <div>
          <SlideTitle sub="Mathematical Formulation">فرمول‌بندی ریاضی — هسته نظری</SlideTitle>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
            {items.map((f, i) => (
              <SlideCard key={f.id} delay={i * 50} className="flex flex-col gap-1.5 p-3">
                <p className="text-[0.68rem] font-black text-primary">{f.label}</p>
                <Tex
                  tex={f.tex}
                  className="math-formula-compact rounded-lg bg-muted/45 px-2.5 py-1.5 text-[0.72rem]"
                />
                {f.desc && <p className="text-[0.6rem] leading-4 text-muted-foreground">{f.desc}</p>}
              </SlideCard>
            ))}
          </div>
        </div>
      );
    },
  },

  /* 9 — Probabilistic output & evaluation metrics */
  {
    section: "هدف پژوهش",
    sectionNo: "۰۳",
    title: "خروجی احتمالاتی و معیارها",
    render: () => {
      const outItems = [
        mathFramework.groups[2].items.find((f) => f.id === "var")!,
        mathFramework.groups[3].items.find((f) => f.id === "pi")!,
      ];
      return (
        <div>
          <SlideTitle sub="Probabilistic Output & Metrics">خروجی احتمالاتی و معیارهای ارزیابی</SlideTitle>
          <div className="mb-2.5 grid grid-cols-1 gap-2 lg:grid-cols-2">
            {outItems.map((f, i) => (
              <SlideCard key={f.id} delay={i * 50} className="flex flex-col gap-1 p-2.5">
                <p className="text-[0.66rem] font-black text-primary">{f.label}</p>
                <Tex
                  tex={f.tex}
                  className="math-formula-compact rounded-lg bg-muted/45 px-2.5 py-1.5 text-[0.7rem]"
                />
                {f.desc && <p className="text-[0.58rem] leading-4 text-muted-foreground">{f.desc}</p>}
              </SlideCard>
            ))}
          </div>
          <p className="mb-1.5 text-[0.68rem] font-black text-muted-foreground">فرمول معیارهای ارزیابی:</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {[...goals.metrics.accuracy.items, ...goals.metrics.reliability.items].map((m, i) => (
              <SlideCard key={m.name} delay={i * 40} className="flex flex-col gap-1 p-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span dir="ltr" className="ltr rounded-md bg-primary/12 px-2 py-0.5 text-[0.62rem] font-black text-primary">
                    {m.name}
                  </span>
                  <span className="text-[0.58rem] font-semibold text-muted-foreground">{m.desc}</span>
                </div>
                <Tex tex={m.tex} className="math-formula-compact rounded-lg bg-muted/45 px-2 py-1 text-[0.64rem]" />
              </SlideCard>
            ))}
          </div>
        </div>
      );
    },
  },

  /* 10 — Background: compact timeline + conclusion */
  {
    section: "پیشینه پژوهش",
    sectionNo: "۰۴",
    title: "پیشینه — خط زمانی",
    render: () => (
      <div>
        <SlideTitle sub="Research Timeline">پیشینه پژوهش — خط زمانی ۲۰۰۳ تا امروز</SlideTitle>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {background.timeline.map((t, i) => {
            const isFusion = t.kind === "fusion";
            return (
              <SlideCard
                key={`${t.year}-${t.title}`}
                delay={Math.min(i * 30, 240)}
                className={cn("flex flex-col gap-1 p-2.5", isFusion && "border-primary/45 bg-primary/8")}
              >
                <div className="flex items-center gap-2">
                  <span
                    dir="rtl"
                    className={cn(
                      "shrink-0 rounded-lg px-2 py-0.5 text-[0.64rem] font-black tabular-nums-fa",
                      isFusion ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                    )}
                  >
                    {t.year}
                  </span>
                  <span className="text-[0.66rem] font-bold leading-5 text-foreground">{t.title}</span>
                </div>
                <p className="text-[0.58rem] leading-4 text-muted-foreground">{t.text}</p>
              </SlideCard>
            );
          })}
        </div>
        <SlideCard className="mt-2.5 border-primary/40 bg-gradient-to-bl from-primary/10 to-accent/8">
          <p className="mb-1 flex items-center gap-2 text-xs font-black text-primary">
            <Icons.Lightbulb className="h-4 w-4 shrink-0" />
            {background.conclusion.title}
          </p>
          <p className="text-[0.7rem] leading-6 text-foreground">{background.conclusion.text}</p>
        </SlideCard>
      </div>
    ),
  },

  /* 11 — Chapter outline + roadmap (merged) */
  {
    section: "فصل‌بندی",
    sectionNo: "۰۵",
    title: "فصل‌بندی و نقشه راه",
    render: () => (
      <div>
        <SlideTitle sub="Thesis Structure & Roadmap">فصل‌بندی پایان‌نامه و نقشه راه اجرا</SlideTitle>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {chapters.items.map((ch) => (
            <SlideCard
              key={ch.no}
              className={cn("flex flex-col gap-1.5 p-2.5", ch.status === "wip" && "border-dashed border-accent/60 bg-accent/5")}
            >
              <div className="flex items-center justify-between gap-1.5">
                <span
                  className={cn(
                    "rounded-lg px-2 py-0.5 text-[0.64rem] font-black",
                    ch.status === "wip" ? "bg-accent/20 text-accent-foreground" : "bg-primary text-primary-foreground"
                  )}
                >
                  {ch.no}
                </span>
                {ch.status === "wip" ? (
                  <WipBadge />
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/8 px-2 py-0.5 text-[0.56rem] font-bold text-primary">
                    <Icons.CheckCircle2 className="h-2.5 w-2.5" />
                    {ch.statusText}
                  </span>
                )}
              </div>
              <p className="text-[0.68rem] font-black leading-5 text-foreground">{ch.title}</p>
              <ul className="flex flex-col gap-0.5">
                {ch.points.map((p) => (
                  <li key={p} className="flex items-start gap-1 text-[0.58rem] leading-4 text-muted-foreground">
                    {ch.status === "wip" ? (
                      <Icons.CircleDashed className="mt-1 h-2.5 w-2.5 shrink-0 text-accent-foreground/70" />
                    ) : (
                      <Icons.CheckCircle2 className="mt-1 h-2.5 w-2.5 shrink-0 text-primary" />
                    )}
                    {p}
                  </li>
                ))}
              </ul>
            </SlideCard>
          ))}
        </div>
        <div className="mt-2.5 flex flex-wrap items-center justify-between gap-1.5 rounded-2xl border bg-card/70 px-3 py-2.5">
          {chapters.roadmap.milestones.map((m, i) => (
            <React.Fragment key={m.label}>
              <div className="flex items-center gap-1.5">
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2",
                    m.highlight
                      ? "border-accent bg-accent text-accent-foreground"
                      : m.done
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground/40 bg-card text-muted-foreground"
                  )}
                >
                  {m.highlight ? <Icons.Flag className="h-3 w-3" /> : <Icons.CheckCircle2 className="h-3 w-3" />}
                </span>
                <div className="flex flex-col">
                  <span className="tabular-nums-fa text-[0.62rem] font-black text-foreground" dir="rtl">{m.date}</span>
                  <span className="text-[0.56rem] leading-4 text-muted-foreground">{m.label}</span>
                </div>
              </div>
              {i < chapters.roadmap.milestones.length - 1 && (
                <Icons.ChevronLeft className="hidden h-4 w-4 shrink-0 text-primary/40 sm:block" aria-hidden />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    ),
  },

  /* 12 — References (compact) */
  {
    section: "مراجع",
    sectionNo: "۰۶",
    title: "مراجع",
    render: () => (
      <div>
        <SlideTitle sub="References">مراجع</SlideTitle>
        <SlideCard className="mb-2 border-primary/40 bg-primary/8 p-3">
          <p className="mb-1 text-xs font-black text-primary">{references.primary.label}</p>
          <div dir="ltr" className="ltr text-left text-[0.68rem] leading-5 text-foreground">
            <span className="font-semibold">{references.primary.items[0].authors} ({references.primary.items[0].year})</span>{" "}
            “{references.primary.items[0].title},” <span className="italic">{references.primary.items[0].source}</span>
          </div>
        </SlideCard>
        <div className="grid grid-cols-1 gap-1.5 md:grid-cols-2 lg:grid-cols-3">
          {references.secondary.items.map((r, i) => (
            <div key={i} dir="ltr" className="ltr rounded-lg border bg-card/60 p-2.5 text-left">
              <p className="text-[0.62rem] leading-[1.55] text-muted-foreground">
                <span className="font-bold text-primary">[{i + 1}]</span> {r.authors} {r.year && `(${r.year})`} “{r.title},” <span className="italic">{r.source}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  /* 13 — Thanks */
  {
    section: "پایان",
    sectionNo: "",
    title: "تشکر",
    render: () => (
      <div className="flex flex-col items-center text-center">
        <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/12 text-primary">
          <Icons.HeartHandshake className="h-8 w-8" />
        </span>
        <h2 className="text-3xl font-black text-foreground sm:text-4xl">با سپاس از حسن توجه شما</h2>
        <p className="mt-4 max-w-lg text-sm leading-8 text-muted-foreground">
          آماده پاسخ‌گویی به پرسش‌های اساتید محترم هستم
        </p>
        <div className="mt-8 flex flex-col items-center gap-1 text-xs text-muted-foreground">
          <span className="font-bold text-foreground">{meta.student.name}</span>
          <span>{meta.defense.jalali} — {meta.university}</span>
        </div>
      </div>
    ),
  },
];
