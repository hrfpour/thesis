"use client";

import * as React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  no: string;
  title: string;
  en: string;
  icon: string;
  className?: string;
};

export function SectionHeading({ no, title, en, icon, className }: SectionHeadingProps) {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[icon] ??
    Icons.CircleDot;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn("mb-8", className)}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary">
          <Icon className="h-5.5 w-5.5" />
        </span>
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2.5">
            <span className="text-sm font-bold text-primary/70">{no}</span>
            <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">{title}</h2>
          </div>
          <span dir="ltr" className="ltr text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {en}
          </span>
        </div>
      </div>
      <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-l from-primary to-accent/70" />
    </motion.div>
  );
}

/** Standard section container */
export function Section({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("relative scroll-mt-20 py-14 sm:py-20", className)}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  );
}

/** Delicate card with entrance animation */
export function RevealCard({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "rounded-2xl border bg-card/60 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:border-primary/30 dark:hover:shadow-primary/10",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

/** "Work in progress" badge */
export function WipBadge({ label = "در حال تکمیل" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/50 bg-accent/15 px-2.5 py-0.5 text-[0.68rem] font-bold text-accent-foreground">
      <Icons.FlaskConical className="h-3 w-3" />
      {label}
    </span>
  );
}
