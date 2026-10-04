"use client";

import * as React from "react";
import * as Icons from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WipBadge } from "@/components/defense/section-heading";
import { meta, toc, problem, goals, background, chapters, references, intro, fig } from "@/lib/defense-data";
import { cn } from "@/lib/utils";

/* ────────── Shared slide utilities ────────── */

function LucIcon({ name, className }: { name: string; className?: string }) {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name] ??
    Icons.CircleDot;
  return <Icon className={className ?? "h-5 w-5"} />;
}

function SlideTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
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

export type SlideDef = {
  section: string;
  sectionNo: string;
  title: string;
  render: () => React.ReactNode;
};

/* ────────── 24 fully-detailed slides ────────── */

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

  /* 2 — Table of contents */
  {
    section: "فهرست مطالب",
    sectionNo: "",
    title: "فهرست مطالب",
    render: () => (
      <div>
        <SlideTitle sub="Table of Contents">فهرست مطالب</SlideTitle>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {toc.map((t) => (
            <SlideCard key={t.id} className="flex items-start gap-3">
              <span className="text-lg font-black leading-6 text-primary/70">{t.no}</span>
              <span className="flex flex-col">
                <span className="text-sm font-bold text-foreground">{t.title}</span>
                <span className="mt-1 text-[0.68rem] leading-5 text-muted-foreground">{t.desc}</span>
              </span>
            </SlideCard>
          ))}
        </div>
      </div>
    ),
  },

  /* 3 — Intro: importance of traffic forecasting */
  {
    section: "مقدمه",
    sectionNo: "۰۱",
    title: "چرا پیش‌بینی ترافیک؟",
    render: () => (
      <div>
        <SlideTitle sub="Introduction">چرا پیش‌بینی ترافیک اهمیت حیاتی دارد؟</SlideTitle>
        <SlideCard className="mb-2.5 border-primary/25 bg-primary/5">
          <p className="text-sm leading-7 text-foreground sm:text-base">{intro.lead}</p>
        </SlideCard>
        <SlideCard className="mb-2.5">
          <h4 className="mb-1.5 text-sm font-black text-foreground">{intro.importance.title}</h4>
          <p className="text-[0.75rem] leading-6 text-muted-foreground">{intro.importance.text}</p>
        </SlideCard>
        <p className="mb-2 text-xs font-bold text-muted-foreground">پیامدهای مدیریت ناکارآمد ترافیک:</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {intro.importance.impacts.map((im) => (
            <SlideCard key={im.label} className="flex flex-col items-center gap-2 p-2.5 text-center">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <LucIcon name={im.icon} className="h-4 w-4" />
              </span>
              <span className="text-[0.7rem] font-semibold leading-5 text-foreground">{im.label}</span>
            </SlideCard>
          ))}
        </div>
      </div>
    ),
  },

  /* 4 — Visual look at the problem and application */
  {
    section: "مقدمه",
    sectionNo: "۰۱",
    title: "نگاهی تصویری به مسئله",
    render: () => (
      <div>
        <SlideTitle sub="Visual Context">نگاهی تصویری به مسئله و کاربرد پژوهش</SlideTitle>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {[fig.congestion, fig.control].map((f) => (
            <figure key={f.src} className="overflow-hidden rounded-xl border bg-card/70">
              <img src={f.src} alt={f.alt} className="h-48 w-full object-cover sm:h-60" />
              <figcaption className="flex items-center gap-2 bg-muted/50 px-3 py-2" dir="rtl">
                <span className="shrink-0 rounded-full bg-primary px-2 py-0.5 text-[0.6rem] font-black text-primary-foreground">
                  {f.no}
                </span>
                <span className="text-[0.66rem] font-bold leading-4 text-foreground">{f.title}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-2.5 flex items-center gap-1.5 text-[0.62rem] leading-5 text-muted-foreground">
          <Icons.Camera className="h-3 w-3 shrink-0" />
          تصاویر از منابع آزاد وب — شرح کامل هر شکل در حالت مرور سایت ارائه شده است
        </p>
      </div>
    ),
  },

  /* 5 — Intro: nature of traffic data */
  {
    section: "مقدمه",
    sectionNo: "۰۱",
    title: "ماهیت داده‌های ترافیک",
    render: () => (
      <div>
        <SlideTitle sub="Data Characteristics">ماهیت داده‌های ترافیک</SlideTitle>
        <SlideCard className="mb-2.5 border-primary/25 bg-primary/5">
          <h4 className="mb-1.5 text-sm font-black text-foreground">{intro.nature.title}</h4>
          <p className="text-[0.75rem] leading-6 text-muted-foreground">{intro.nature.text}</p>
        </SlideCard>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {intro.nature.factors.map((f) => (
            <SlideCard key={f.title} className="p-3">
              <div className="mb-1.5 flex items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary">
                  <LucIcon name={f.icon} className="h-3.5 w-3.5" />
                </span>
                <h4 className="text-xs font-bold text-foreground">{f.title}</h4>
              </div>
              <p className="text-[0.7rem] leading-5 text-muted-foreground">{f.text}</p>
            </SlideCard>
          ))}
        </div>

        {/* Figure 4 — graph representation of the road network */}
        <figure className="mt-2.5 overflow-hidden rounded-xl border bg-card/70">
          <div className="flex items-center justify-center bg-white p-2">
            <img src={fig.graph.src} alt={fig.graph.alt} className="h-40 w-full object-contain sm:h-48" />
          </div>
          <figcaption className="flex items-center gap-2 bg-muted/50 px-3 py-2" dir="rtl">
            <span className="shrink-0 rounded-full bg-primary px-2 py-0.5 text-[0.6rem] font-black text-primary-foreground">
              {fig.graph.no}
            </span>
            <span className="text-[0.66rem] font-bold leading-4 text-foreground">{fig.graph.title}</span>
          </figcaption>
        </figure>
      </div>
    ),
  },

  /* 6 — Intro: key concepts (full definitions) */
  {
    section: "مقدمه",
    sectionNo: "۰۱",
    title: "مفاهیم کلیدی پژوهش",
    render: () => (
      <div>
        <SlideTitle sub="Key Concepts">مفاهیم کلیدی پژوهش</SlideTitle>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          {intro.concepts.items.map((c) => (
            <SlideCard key={c.term} className="p-3">
              <div className="mb-1.5 flex flex-wrap items-center justify-between gap-1.5">
                <h4 className="text-[0.72rem] font-black text-foreground">{c.term}</h4>
                <span
                  dir="ltr"
                  className="ltr rounded-md bg-muted px-1.5 py-0.5 text-[0.6rem] font-semibold text-muted-foreground"
                >
                  {c.en}
                </span>
              </div>
              <p className="text-[0.68rem] leading-[1.65] text-muted-foreground">{c.def}</p>
            </SlideCard>
          ))}
        </div>
      </div>
    ),
  },

  /* 7 — Problem statement: challenges */
  {
    section: "بیان مسئله",
    sectionNo: "۰۲",
    title: "چالش‌های پیش‌بینی ترافیک",
    render: () => (
      <div>
        <SlideTitle sub="Problem Statement">چالش‌های پیش‌بینی جریان ترافیک</SlideTitle>
        <SlideCard className="mb-2.5 border-primary/25 bg-primary/5">
          <p className="text-sm leading-7 text-foreground">{problem.lead}</p>
        </SlideCard>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {problem.challenges.map((ch) => (
            <SlideCard key={ch.title} className="p-3">
              <div className="mb-1.5 flex items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                  <LucIcon name={ch.icon} className="h-3.5 w-3.5" />
                </span>
                <h4 className="text-xs font-bold text-foreground">{ch.title}</h4>
              </div>
              <p className="text-[0.7rem] leading-5 text-muted-foreground">{ch.text}</p>
            </SlideCard>
          ))}
        </div>
      </div>
    ),
  },

  /* 8 — First generation */
  {
    section: "بیان مسئله",
    sectionNo: "۰۲",
    title: "نسل اول — مدل‌های کلاسیک",
    render: () => (
      <div>
        <SlideTitle sub="Generation 1">نسل اول: مدل‌های آماری و یادگیری ماشین کلاسیک</SlideTitle>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {problem.generations[0].models.map((m) => (
            <SlideCard key={m.name}>
              <div className="mb-2 flex items-center justify-between gap-2">
                <h4 className="text-sm font-black text-foreground">{m.name}</h4>
                <Badge variant="secondary" className="shrink-0 text-[0.65rem]">نسل اول</Badge>
              </div>
              <p className="text-[0.78rem] leading-7 text-muted-foreground">{m.text}</p>
              <span className="mt-2 inline-block text-[0.68rem] font-medium text-primary/80">{m.cite}</span>
            </SlideCard>
          ))}
        </div>
        <SlideCard className="mt-3 border-destructive/30 bg-destructive/5">
          <p className="flex items-center gap-2 text-xs font-bold leading-6 text-foreground">
            <Icons.TriangleAlert className="h-4 w-4 shrink-0 text-destructive" />
            محدودیت کلیدی: فرض خطی بودن روابط + نادیده گرفتن ساختار توپولوژیک شبکه راه‌ها
          </p>
        </SlideCard>
      </div>
    ),
  },

  /* 9 — Second generation */
  {
    section: "بیان مسئله",
    sectionNo: "۰۲",
    title: "نسل دوم — یادگیری عمیق فضایی-زمانی",
    render: () => (
      <div>
        <SlideTitle sub="Generation 2">نسل دوم: یادگیری عمیق فضایی-زمانی (ترکیب CNN و RNN)</SlideTitle>
        <SlideCard>
          <div className="mb-2 flex items-center justify-between gap-2">
            <h4 className="text-sm font-black text-foreground">ترکیب CNN و RNN</h4>
            <Badge variant="secondary" className="shrink-0 text-[0.65rem]">نسل دوم</Badge>
          </div>
          <p className="text-[0.82rem] leading-8 text-muted-foreground">{problem.generations[1].models[0].text}</p>
          <span className="mt-2 inline-block text-[0.68rem] font-medium text-primary/80">
            {problem.generations[1].models[0].cite}
          </span>
        </SlideCard>
        <SlideCard className="mt-3 border-destructive/30 bg-destructive/5">
          <p className="flex items-center gap-2 text-xs font-bold leading-6 text-foreground">
            <Icons.TriangleAlert className="h-4 w-4 shrink-0 text-destructive" />
            محدودیت کلیدی: نامناسب برای ساختارهای غیراقلیدسی و نامنظم شبکه واقعی جاده‌ها
          </p>
        </SlideCard>
      </div>
    ),
  },

  /* 10 — Third generation */
  {
    section: "بیان مسئله",
    sectionNo: "۰۲",
    title: "نسل سوم — STGNN",
    render: () => (
      <div>
        <SlideTitle sub="Generation 3">نسل سوم: شبکه‌های عصبی گرافی فضایی-زمانی (STGNN)</SlideTitle>
        <SlideCard>
          <div className="mb-2 flex items-center justify-between gap-2">
            <h4 className="text-sm font-black text-foreground">STGCN و DCRNN</h4>
            <Badge className="bg-primary text-primary-foreground shrink-0 text-[0.65rem]">نسل سوم</Badge>
          </div>
          <p className="text-[0.82rem] leading-8 text-muted-foreground">{problem.generations[2].models[0].text}</p>
          <span className="mt-2 inline-block text-[0.68rem] font-medium text-primary/80">
            {problem.generations[2].models[0].cite}
          </span>
        </SlideCard>
        <SlideCard className="mt-3 border-primary/30 bg-primary/6">
          <p className="flex items-center gap-2 text-xs font-bold leading-6 text-foreground">
            <Icons.Trophy className="h-4 w-4 shrink-0 text-primary" />
            مهم‌ترین تحول حوزه — در حال حاضر دقیق‌ترین ابزار پیش‌بینی نقطه‌ای ترافیک
          </p>
        </SlideCard>
      </div>
    ),
  },

  /* 11 — Fourth generation */
  {
    section: "بیان مسئله",
    sectionNo: "۰۲",
    title: "نسل چهارم — رویکرد بیزی",
    render: () => (
      <div>
        <SlideTitle sub="Generation 4">نسل چهارم: رویکرد بیزی در یادگیری عمیق</SlideTitle>
        <SlideCard>
          <div className="mb-2 flex items-center justify-between gap-2">
            <h4 className="text-sm font-black text-foreground">MC Dropout و Variational Inference</h4>
            <Badge className="bg-accent/25 text-accent-foreground shrink-0 border border-accent/50">نسل چهارم</Badge>
          </div>
          <p className="text-[0.82rem] leading-8 text-muted-foreground">{problem.generations[3].models[0].text}</p>
          <span className="mt-2 inline-block text-[0.68rem] font-medium text-primary/80">
            {problem.generations[3].models[0].cite}
          </span>
        </SlideCard>
        <SlideCard className="mt-3 border-accent/50 bg-accent/8">
          <p className="flex items-center gap-2 text-xs font-bold leading-6 text-foreground">
            <Icons.Sparkles className="h-4 w-4 shrink-0 text-accent-foreground" />
            کلید حل مسئله: شبکه‌های عصبی با خروجی احتمالاتی و مدل‌سازی عدم قطعیت
          </p>
        </SlideCard>
      </div>
    ),
  },

  /* 12 — Fundamental shortcoming */
  {
    section: "بیان مسئله",
    sectionNo: "۰۲",
    title: "کاستی بنیادین مدل‌های موجود",
    render: () => (
      <div>
        <SlideTitle sub="Core Deficiency">کاستی بنیادین: ماهیت قطعی و اطمینان کاذب</SlideTitle>
        <SlideCard className="mb-2.5 border-destructive/30 bg-destructive/5">
          <h4 className="mb-1.5 text-sm font-black text-foreground">{problem.coreProblem.title}</h4>
          <p className="text-[0.75rem] leading-6 text-muted-foreground">{problem.coreProblem.text}</p>
        </SlideCard>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {problem.coreProblem.items.map((item) => (
            <SlideCard key={item.title} className="p-3">
              <h4 className="mb-1 text-xs font-bold text-foreground">{item.title}</h4>
              <p className="text-[0.68rem] leading-5 text-muted-foreground">{item.text}</p>
            </SlideCard>
          ))}
        </div>
      </div>
    ),
  },

  /* 13 — Research gap & core problem */
  {
    section: "بیان مسئله",
    sectionNo: "۰۲",
    title: "خلأ پژوهشی و مسئله محوری",
    render: () => (
      <div>
        <SlideTitle sub="Research Gap">خلأ پژوهشی و مسئله محوری پژوهش</SlideTitle>
        <SlideCard className="mb-2.5 border-primary/25 bg-primary/5">
          <h4 className="mb-1.5 text-sm font-black text-foreground">{problem.gap.title}</h4>
          <p className="text-[0.75rem] leading-6 text-muted-foreground">{problem.gap.text}</p>
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
          <p className="flex items-start gap-2.5 text-[0.78rem] font-bold leading-7 text-foreground">
            <Icons.Crosshair className="mt-1.5 h-4.5 w-4.5 shrink-0 text-primary" />
            {problem.focus.text}
          </p>
        </SlideCard>
      </div>
    ),
  },

  /* 14 — Main & secondary objectives (full text) */
  {
    section: "هدف پژوهش",
    sectionNo: "۰۳",
    title: "هدف اصلی و اهداف فرعی",
    render: () => (
      <div>
        <SlideTitle sub="Objectives">هدف اصلی و اهداف فرعی پژوهش</SlideTitle>
        <SlideCard className="mb-2.5 border-primary/40 bg-primary/8">
          <Chip className="mb-1.5">{goals.main.label}</Chip>
          <p className="text-[0.8rem] font-bold leading-7 text-foreground">{goals.main.text}</p>
        </SlideCard>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          {goals.sub.map((g, i) => (
            <SlideCard key={g.title} delay={i * 40} className="p-3">
              <div className="mb-1.5 flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-[0.65rem] font-black text-primary">
                  {["۱", "۲", "۳", "۴", "۵"][i]}
                </span>
                <h4 className="text-[0.72rem] font-black leading-5 text-foreground">{g.title}</h4>
              </div>
              <p className="text-[0.68rem] leading-[1.65] text-muted-foreground">{g.text}</p>
            </SlideCard>
          ))}
        </div>
      </div>
    ),
  },

  /* 15 — Research questions */
  {
    section: "هدف پژوهش",
    sectionNo: "۰۳",
    title: "سؤالات پژوهش",
    render: () => (
      <div>
        <SlideTitle sub="Research Questions">سؤالات پژوهش</SlideTitle>
        <SlideCard className="mb-2.5 border-2 border-primary/35 bg-primary/8">
          <Chip className="mb-1.5">سؤال اصلی</Chip>
          <p className="text-[0.8rem] font-bold leading-7 text-foreground">{goals.questions.main}</p>
        </SlideCard>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {goals.questions.sub.map((q, i) => (
            <SlideCard key={i} className="flex items-start gap-2.5 p-3" delay={i * 40}>
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-[0.65rem] font-black text-muted-foreground">
                {["۱", "۲", "۳", "۴"][i]}
              </span>
              <p className="text-[0.72rem] font-semibold leading-6 text-foreground">{q}</p>
            </SlideCard>
          ))}
        </div>
      </div>
    ),
  },

  /* 16 — Proposed architecture 1: data & spatio-temporal module */
  {
    section: "هدف پژوهش",
    sectionNo: "۰۳",
    title: "معماری پیشنهادی (۱)",
    render: () => (
      <div>
        <SlideTitle sub="Proposed Architecture 1/2">معماری پیشنهادی پژوهش — بخش اول</SlideTitle>
        <SlideCard className="mb-2.5 border-primary/25 bg-primary/5">
          <h4 className="mb-1.5 text-sm font-black text-foreground">{goals.architecture.title}</h4>
          <p className="text-[0.75rem] leading-6 text-muted-foreground">{goals.architecture.lead}</p>
        </SlideCard>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {goals.architecture.steps.slice(0, 2).map((s, i) => (
            <SlideCard key={s.title} className="p-3" delay={i * 50}>
              <div className="mb-2 flex items-center gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary">
                  <LucIcon name={s.icon} className="h-4 w-4" />
                </span>
                <div className="flex min-w-0 flex-col">
                  <p className="text-xs font-black leading-4 text-foreground">{s.title}</p>
                  <span dir="ltr" className="ltr text-[0.6rem] font-semibold leading-4 text-primary/70">{s.en}</span>
                </div>
              </div>
              <p className="text-[0.7rem] leading-6 text-muted-foreground">{s.text}</p>
              <p className="mt-2 rounded-lg bg-muted/50 px-2.5 py-1.5 text-[0.66rem] leading-5 text-foreground/80">
                {s.detail}
              </p>
            </SlideCard>
          ))}
        </div>

        {/* Figure 5 — data collection & STGNN modeling pipeline */}
        <figure className="mt-2.5 overflow-hidden rounded-xl border bg-card/70">
          <div className="flex items-center justify-center bg-white p-2">
            <img src={fig.stgnn.src} alt={fig.stgnn.alt} className="h-40 w-full object-contain sm:h-48" />
          </div>
          <figcaption className="flex items-center gap-2 bg-muted/50 px-3 py-2" dir="rtl">
            <span className="shrink-0 rounded-full bg-primary px-2 py-0.5 text-[0.6rem] font-black text-primary-foreground">
              {fig.stgnn.no}
            </span>
            <span className="text-[0.66rem] font-bold leading-4 text-foreground">{fig.stgnn.title}</span>
          </figcaption>
        </figure>
      </div>
    ),
  },

  /* 17 — Proposed architecture 2: Bayesian layer & probabilistic output */
  {
    section: "هدف پژوهش",
    sectionNo: "۰۳",
    title: "معماری پیشنهادی (۲)",
    render: () => (
      <div>
        <SlideTitle sub="Proposed Architecture 2/2">معماری پیشنهادی پژوهش — بخش دوم</SlideTitle>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {goals.architecture.steps.slice(2).map((s, i) => (
            <SlideCard key={s.title} className="relative p-3" delay={i * 50}>
              {i === 0 && (
                <span className="absolute -top-2 right-2 z-10"><WipBadge label="هسته نوآوری" /></span>
              )}
              <div className="mb-2 flex items-center gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary">
                  <LucIcon name={s.icon} className="h-4 w-4" />
                </span>
                <div className="flex min-w-0 flex-col">
                  <p className="text-xs font-black leading-4 text-foreground">{s.title}</p>
                  <span dir="ltr" className="ltr text-[0.6rem] font-semibold leading-4 text-primary/70">{s.en}</span>
                </div>
              </div>
              <p className="text-[0.7rem] leading-6 text-muted-foreground">{s.text}</p>
              <p className="mt-2 rounded-lg bg-muted/50 px-2.5 py-1.5 text-[0.66rem] leading-5 text-foreground/80">
                {s.detail}
              </p>
            </SlideCard>
          ))}
        </div>
        <p className="mt-2.5 flex items-center gap-2 text-[0.68rem] leading-6 text-muted-foreground">
          <Icons.FlaskConical className="h-3.5 w-3.5 shrink-0 text-accent-foreground" />
          {goals.architecture.wipNote}
        </p>
      </div>
    ),
  },

  /* 18 — Evaluation metrics (full) */
  {
    section: "هدف پژوهش",
    sectionNo: "۰۳",
    title: "معیارهای ارزیابی",
    render: () => (
      <div>
        <SlideTitle sub="Evaluation Metrics">معیارهای ارزیابی پژوهش</SlideTitle>
        <SlideCard className="mb-2.5 border-primary/25 bg-primary/5">
          <p className="text-[0.75rem] leading-6 text-muted-foreground">{goals.metrics.lead}</p>
        </SlideCard>
        <div className="mb-2 grid grid-cols-1 gap-2 md:grid-cols-2">
          <SlideCard className="p-3">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-black text-foreground">
              <Icons.Gauge className="h-4 w-4 shrink-0 text-primary" />
              {goals.metrics.accuracy.title}
            </p>
            <ul className="flex flex-col gap-1.5">
              {goals.metrics.accuracy.items.map((m) => (
                <li key={m.name} className="flex items-center gap-2 text-[0.7rem] leading-5 text-muted-foreground">
                  <span
                    dir="ltr"
                    className="ltr shrink-0 rounded-md bg-primary/12 px-2 py-0.5 text-[0.64rem] font-black text-primary"
                  >
                    {m.name}
                  </span>
                  {m.desc}
                </li>
              ))}
            </ul>
          </SlideCard>
          <SlideCard className="p-3">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-black text-foreground">
              <Icons.ShieldCheck className="h-4 w-4 shrink-0 text-accent-foreground" />
              {goals.metrics.reliability.title}
            </p>
            <ul className="flex flex-col gap-1.5">
              {goals.metrics.reliability.items.map((m) => (
                <li key={m.name} className="flex items-center gap-2 text-[0.7rem] leading-5 text-muted-foreground">
                  <span
                    dir="ltr"
                    className="ltr shrink-0 rounded-md bg-accent/15 px-2 py-0.5 text-[0.64rem] font-black text-accent-foreground"
                  >
                    {m.name}
                  </span>
                  {m.desc}
                </li>
              ))}
            </ul>
          </SlideCard>
        </div>
        <SlideCard className="p-3">
          <p className="mb-1.5 flex items-center gap-1.5 text-xs font-black text-foreground">
            <Icons.FlaskConical className="h-4 w-4 shrink-0 text-primary" />
            {goals.metrics.validation.title}
          </p>
          <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {goals.metrics.validation.items.map((v) => (
              <li key={v} className="flex items-start gap-2 text-[0.68rem] leading-5 text-muted-foreground">
                <Icons.CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                {v}
              </li>
            ))}
          </ul>
        </SlideCard>
      </div>
    ),
  },

  /* 19 — Background 1: from classical statistics to deep learning */
  {
    section: "پیشینه پژوهش",
    sectionNo: "۰۴",
    title: "پیشینه ۱ — ۲۰۰۳ تا ۲۰۱۷",
    render: () => (
      <div>
        <SlideTitle sub="Timeline 2003–2017">پیشینه پژوهش — از آمار کلاسیک تا یادگیری عمیق</SlideTitle>
        <SlideCard className="mb-2.5 border-primary/25 bg-primary/5">
          <p className="text-[0.75rem] leading-6 text-muted-foreground">{background.lead}</p>
        </SlideCard>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {background.timeline.slice(0, 5).map((t) => (
            <div
              key={`${t.year}-${t.title}`}
              className={cn(
                "rounded-xl border p-2.5",
                t.kind === "fusion" ? "border-primary/45 bg-primary/8" : "border-border bg-card/60"
              )}
            >
              <div className="mb-1 flex items-center gap-2.5">
                <span
                  className={cn(
                    "shrink-0 rounded-lg px-2 py-0.5 text-[0.7rem] font-black tabular-nums-fa",
                    t.kind === "fusion" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  )}
                >
                  {t.year}
                </span>
                <div className="flex min-w-0 flex-col">
                  <span className="text-[0.72rem] font-bold leading-5 text-foreground">{t.title}</span>
                  <span className="text-[0.62rem] leading-4 text-muted-foreground">{t.cite}</span>
                </div>
              </div>
              <p className="text-[0.66rem] leading-[1.6] text-muted-foreground">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  /* 20 — Background 2: graph era & Bayesian approach + summary */
  {
    section: "پیشینه پژوهش",
    sectionNo: "۰۴",
    title: "پیشینه ۲ — ۲۰۱۸ تا امروز",
    render: () => (
      <div>
        <SlideTitle sub="Timeline 2018–Today">پیشینه پژوهش — عصر گراف و رویکرد بیزی</SlideTitle>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {background.timeline.slice(5).map((t) => (
            <div
              key={`${t.year}-${t.title}`}
              className={cn(
                "rounded-xl border p-2.5",
                t.kind === "fusion" ? "border-primary/45 bg-primary/8" : "border-border bg-card/60"
              )}
            >
              <div className="mb-1 flex items-center gap-2.5">
                <span
                  className={cn(
                    "shrink-0 rounded-lg px-2 py-0.5 text-[0.7rem] font-black tabular-nums-fa",
                    t.kind === "fusion" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  )}
                >
                  {t.year}
                </span>
                <div className="flex min-w-0 flex-col">
                  <span className="text-[0.72rem] font-bold leading-5 text-foreground">{t.title}</span>
                  <span className="text-[0.62rem] leading-4 text-muted-foreground">{t.cite}</span>
                </div>
              </div>
              <p className="text-[0.66rem] leading-[1.6] text-muted-foreground">{t.text}</p>
            </div>
          ))}
        </div>
        <SlideCard className="mt-2.5 border-primary/40 bg-gradient-to-bl from-primary/10 to-accent/8">
          <p className="mb-1 flex items-center gap-2 text-xs font-black text-primary">
            <Icons.Lightbulb className="h-4 w-4 shrink-0" />
            {background.conclusion.title}
          </p>
          <p className="text-[0.72rem] leading-6 text-foreground">{background.conclusion.text}</p>
        </SlideCard>
      </div>
    ),
  },

  /* 21 — Chapter outline (with chapter contents) */
  {
    section: "فصل‌بندی",
    sectionNo: "۰۵",
    title: "فصل‌بندی پایان‌نامه",
    render: () => (
      <div>
        <SlideTitle sub="Thesis Structure">فصل‌بندی پایان‌نامه</SlideTitle>
        <SlideCard className="mb-2.5 border-primary/25 bg-primary/5">
          <p className="text-[0.75rem] leading-6 text-muted-foreground">{chapters.lead}</p>
        </SlideCard>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
          {chapters.items.map((ch) => (
            <SlideCard
              key={ch.no}
              className={cn("p-3", ch.status === "wip" && "border-dashed border-accent/60 bg-accent/5")}
            >
              <div className="mb-2 flex items-center justify-between gap-1.5">
                <span
                  className={cn(
                    "rounded-lg px-2 py-0.5 text-[0.7rem] font-black",
                    ch.status === "wip" ? "bg-accent/20 text-accent-foreground" : "bg-primary text-primary-foreground"
                  )}
                >
                  {ch.no}
                </span>
                {ch.status === "wip" ? (
                  <WipBadge />
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/8 px-2 py-0.5 text-[0.6rem] font-bold text-primary">
                    <Icons.CheckCircle2 className="h-3 w-3" />
                    {ch.statusText}
                  </span>
                )}
              </div>
              <p className="mb-1.5 text-[0.72rem] font-black leading-5 text-foreground">{ch.title}</p>
              <ul className="flex flex-col gap-1">
                {ch.points.map((p) => (
                  <li key={p} className="flex items-start gap-1.5 text-[0.66rem] leading-5 text-muted-foreground">
                    {ch.status === "wip" ? (
                      <Icons.CircleDashed className="mt-1 h-3 w-3 shrink-0 text-accent-foreground/70" />
                    ) : (
                      <Icons.CheckCircle2 className="mt-1 h-3 w-3 shrink-0 text-primary" />
                    )}
                    {p}
                  </li>
                ))}
              </ul>
            </SlideCard>
          ))}
        </div>
      </div>
    ),
  },

  /* 22 — Execution roadmap */
  {
    section: "فصل‌بندی",
    sectionNo: "۰۵",
    title: "نقشه راه اجرای پایان‌نامه",
    render: () => (
      <div>
        <SlideTitle sub="Roadmap">نقشه راه اجرای پایان‌نامه</SlideTitle>
        <div className="relative mx-auto flex max-w-2xl flex-col gap-2">
          <div
            aria-hidden
            className="absolute bottom-4 right-[1.56rem] top-4 w-0.5 rounded-full bg-gradient-to-b from-primary/50 via-primary/30 to-accent/60"
          />
          {chapters.roadmap.milestones.map((m, i) => (
            <SlideCard key={m.label} delay={i * 60} className="flex items-center gap-3 p-2.5">
              <span
                className={cn(
                  "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2",
                  m.highlight
                    ? "border-accent bg-accent text-accent-foreground shadow-lg shadow-accent/25"
                    : m.done
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground/40 bg-card text-muted-foreground"
                )}
              >
                {m.highlight ? (
                  <Icons.Flag className="h-3.5 w-3.5" />
                ) : m.done ? (
                  <Icons.CheckCircle2 className="h-3.5 w-3.5" />
                ) : (
                  <Icons.CircleDashed className="h-3.5 w-3.5" />
                )}
              </span>
              <div className="flex min-w-0 flex-col">
                <span className="tabular-nums-fa text-[0.8rem] font-black text-foreground" dir="rtl">
                  {m.date}
                </span>
                <span className="text-[0.7rem] leading-5 text-muted-foreground">{m.label}</span>
              </div>
              {m.highlight && (
                <Badge className="mr-auto shrink-0 bg-accent text-accent-foreground">نقطه اوج</Badge>
              )}
            </SlideCard>
          ))}
        </div>
      </div>
    ),
  },

  /* 23 — References */
  {
    section: "مراجع",
    sectionNo: "۰۶",
    title: "مراجع",
    render: () => (
      <div>
        <SlideTitle sub="References">مراجع</SlideTitle>
        <SlideCard className="mb-2 border-primary/40 bg-primary/8 p-3">
          <p className="mb-1 text-xs font-black text-primary">{references.primary.label}</p>
          <div dir="ltr" className="ltr text-left text-[0.7rem] leading-5 text-foreground">
            <span className="font-semibold">{references.primary.items[0].authors} ({references.primary.items[0].year})</span>{" "}
            “{references.primary.items[0].title},” <span className="italic">{references.primary.items[0].source}</span>
          </div>
        </SlideCard>
        <div className="grid grid-cols-1 gap-1.5 md:grid-cols-2 lg:grid-cols-3">
          {references.secondary.items.map((r, i) => (
            <div key={i} dir="ltr" className="ltr rounded-lg border bg-card/60 p-2.5 text-left">
              <p className="text-[0.64rem] leading-[1.55] text-muted-foreground">
                <span className="font-bold text-primary">[{i + 1}]</span> {r.authors} {r.year && `(${r.year})`} “{r.title},” <span className="italic">{r.source}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  /* 24 — Thanks */
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
