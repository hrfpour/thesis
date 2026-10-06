"use client";

import * as React from "react";
import * as Icons from "lucide-react";
import { Section, SectionHeading, RevealCard } from "@/components/defense/section-heading";
import { Figure } from "@/components/defense/figure";
import { intro, fig } from "@/lib/defense-data";

function LucIcon({ name }: { name: string }) {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name] ??
    Icons.CircleDot;
  return <Icon className="h-5 w-5" />;
}

export function IntroSection() {
  return (
    <Section id={intro.id}>
      <SectionHeading no={intro.no} title={intro.title} en={intro.en} icon={intro.icon} />

      <RevealCard className="mb-6 border-primary/25 bg-primary/5">
        <p className="text-base leading-8 text-foreground sm:text-lg sm:leading-9">{intro.lead}</p>
      </RevealCard>

      {/* Importance of traffic forecasting */}
      <RevealCard className="mb-6">
        <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-foreground">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/12 text-primary">
            <LucIcon name="TrafficCone" />
          </span>
          {intro.importance.title}
        </h3>
        <p className="text-sm leading-8 text-muted-foreground sm:text-[0.95rem]">
          {intro.importance.text}
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {intro.importance.impacts.map((im) => (
            <div
              key={im.label}
              className="flex flex-col items-center gap-2 rounded-xl border bg-muted/40 p-3.5 text-center"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <LucIcon name={im.icon} />
              </span>
              <span className="text-xs font-semibold leading-5 text-foreground/90">{im.label}</span>
            </div>
          ))}
        </div>
      </RevealCard>

      {/* Thematic images: traffic flow and control center */}
      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Figure data={fig.night} mode="photo" />
        <Figure data={fig.control} mode="photo" delay={0.08} />
      </div>

      {/* Nature of traffic data */}
      <RevealCard className="mb-6">
        <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-foreground">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/12 text-primary">
            <LucIcon name="Map" />
          </span>
          {intro.nature.title}
        </h3>
        <p className="text-sm leading-8 text-muted-foreground sm:text-[0.95rem]">{intro.nature.text}</p>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {intro.nature.factors.map((f) => (
            <div key={f.title} className="rounded-xl border bg-muted/40 p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-primary">
                  <LucIcon name={f.icon} />
                </span>
                <span className="text-sm font-bold text-foreground">{f.title}</span>
              </div>
              <p className="text-xs leading-6 text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </RevealCard>

      {/* Key concepts */}
      <h3 className="mb-4 text-lg font-bold text-foreground">{intro.concepts.title}</h3>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {intro.concepts.items.map((c, i) => (
          <RevealCard key={c.term} delay={i * 0.04} className="p-4">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />
                <h4 className="text-base font-bold text-foreground">{c.term}</h4>
              </div>
              <span dir="ltr" className="ltr rounded-md bg-muted px-2 py-0.5 text-[0.68rem] font-semibold text-muted-foreground">
                {c.en}
              </span>
            </div>
            <p className="text-[0.8rem] leading-6 text-muted-foreground">{c.def}</p>
          </RevealCard>
        ))}
      </div>
    </Section>
  );
}
