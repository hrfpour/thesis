"use client";

import * as React from "react";
import katex from "katex";
import { Sigma } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────
 *  KaTeX-based math rendering for the defense site.
 *  Formulas stay LTR (standard math direction) inside the RTL
 *  Persian layout; labels and captions remain Persian.
 * ───────────────────────────────────────────────────────────── */

export function Tex({
  tex,
  display = true,
  className,
}: {
  tex: string;
  display?: boolean;
  className?: string;
}) {
  const html = React.useMemo(
    () =>
      katex.renderToString(tex, {
        displayMode: display,
        throwOnError: false,
        strict: false,
        trust: false,
      }),
    [tex, display]
  );

  return (
    <div
      dir="ltr"
      className={cn(
        "math-formula overflow-x-auto overflow-y-hidden text-foreground",
        display ? "text-center" : "inline-block",
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/* A labeled formula card: Persian label + LaTeX + optional note */
export function FormulaCard({
  label,
  tex,
  desc,
  className,
  compact = false,
}: {
  label: string;
  tex: string;
  desc?: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-card/70 transition-all duration-300 hover:shadow-md dark:hover:shadow-primary/10",
        compact ? "p-2.5" : "p-3.5",
        className
      )}
    >
      <p
        className={cn(
          "flex items-center gap-1.5 font-black text-primary",
          compact ? "text-[0.68rem]" : "text-xs"
        )}
      >
        <Sigma className={compact ? "h-3 w-3 shrink-0" : "h-3.5 w-3.5 shrink-0"} />
        {label}
      </p>
      <Tex
        tex={tex}
        className={cn(
          "mt-2 rounded-xl bg-muted/45",
          compact ? "px-2.5 py-1.5 text-[0.74rem]" : "px-3 py-2.5 text-[0.88rem]"
        )}
      />
      {desc && (
        <p
          className={cn(
            "leading-5 text-muted-foreground",
            compact ? "mt-1.5 text-[0.62rem]" : "mt-2 text-[0.72rem]"
          )}
        >
          {desc}
        </p>
      )}
    </div>
  );
}
