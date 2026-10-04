"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Award, BookMarked, FileText } from "lucide-react";
import { Section, SectionHeading, RevealCard } from "@/components/defense/section-heading";
import { references } from "@/lib/defense-data";

function RefItem({
  index,
  authors,
  year,
  title,
  source,
}: {
  index: string;
  authors: string;
  year: string;
  title: string;
  source: string;
}) {
  return (
    <div className="flex gap-3 rounded-xl border bg-card/60 p-4 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md dark:hover:shadow-primary/10">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-black text-muted-foreground">
        {index}
      </span>
      <div dir="ltr" className="ltr flex-1">
        <p className="text-[0.8rem] font-semibold leading-6 text-foreground">{authors}</p>
        <p className="text-[0.82rem] leading-relaxed text-muted-foreground">
          {year && <span className="font-bold text-primary">({year}) </span>}
          “{title}”
        </p>
        <p className="mt-1 text-[0.72rem] italic leading-5 text-muted-foreground">{source}</p>
      </div>
    </div>
  );
}

export function ReferencesSection() {
  return (
    <Section id={references.id} className="bg-muted/30">
      <SectionHeading no={references.no} title={references.title} en={references.en} icon={references.icon} />

      {/* Primary reference */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="mb-10 rounded-2xl border-2 border-primary/40 bg-gradient-to-bl from-primary/10 via-card to-accent/8 p-5 sm:p-6"
      >
        <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary px-3.5 py-1 text-xs font-black text-primary-foreground">
          <Award className="h-3.5 w-3.5" />
          {references.primary.label}
        </span>
        {references.primary.items.map((r, i) => (
          <div key={i} dir="ltr" className="ltr text-left">
            <p className="text-sm font-bold leading-7 text-foreground">{r.authors} <span className="text-primary">({r.year})</span></p>
            <p className="text-sm leading-7 text-muted-foreground">“{r.title}”</p>
            <p className="mt-1 text-xs italic leading-6 text-muted-foreground">{r.source}</p>
          </div>
        ))}
      </motion.div>

      {/* Secondary references */}
      <h3 className="mb-4 flex items-center gap-2.5 text-lg font-extrabold text-foreground">
        <FileText className="h-5 w-5 text-primary" />
        {references.secondary.label}
        <span className="text-sm font-bold text-muted-foreground">({references.secondary.items.length} مرجع)</span>
      </h3>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {references.secondary.items.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.25) }}
          >
            <RefItem
              index={String(i + 1)}
              authors={r.authors}
              year={r.year}
              title={r.title}
              source={r.source}
            />
          </motion.div>
        ))}
      </div>

      <RevealCard className="mt-8 flex items-start gap-3">
        <BookMarked className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <p className="text-xs leading-6 text-muted-foreground">
          فهرست کامل منابع به‌همراه منابع کلاسیک ذکرشده در متن (شامل پژوهش‌های بنیادین حوزه STGNN و استنباط بیزی) در
          نسخه نهایی پایان‌نامه و طبق شیوه‌نامه ارجاع‌دهی دانشکده تنظیم و ارائه خواهد شد.
        </p>
      </RevealCard>
    </Section>
  );
}
