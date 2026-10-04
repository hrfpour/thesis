"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FigureDef } from "@/lib/defense-data";

/**
 * Numbered thesis-style figure (modeled after the professor's sample file):
 * "Figure n — title" + full description + image source
 *
 * mode="photo"   → full-bleed image with caption over a dark gradient
 * mode="diagram" → scientific figure (white background) with caption below
 */
export function Figure({
  data,
  mode = "photo",
  className,
  delay = 0,
  compact = false,
}: {
  data: FigureDef;
  mode?: "photo" | "diagram";
  className?: string;
  delay?: number;
  compact?: boolean;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "group overflow-hidden rounded-2xl border bg-card/70 backdrop-blur-sm transition-all duration-300 hover:shadow-lg dark:hover:shadow-primary/10",
        className
      )}
    >
      <div className="relative overflow-hidden">
        <img
          src={data.src}
          alt={data.alt}
          loading="lazy"
          className={cn(
            "w-full transition-transform duration-500 group-hover:scale-[1.02]",
            mode === "photo"
              ? "aspect-[16/10] object-cover"
              : "aspect-[16/10] bg-white object-contain p-3 dark:brightness-[0.97]"
          )}
        />
        {mode === "photo" ? (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent p-3.5 pt-10" dir="rtl">
            <figcaption className="flex items-center gap-2">
              <span className="shrink-0 rounded-full bg-primary px-2.5 py-0.5 text-[0.65rem] font-black text-primary-foreground">
                {data.no}
              </span>
              <span className="text-xs font-bold leading-5 text-white sm:text-[0.83rem]">{data.title}</span>
            </figcaption>
          </div>
        ) : (
          <figcaption className="flex items-center gap-2 border-b bg-muted/50 px-3.5 py-2.5" dir="rtl">
            <span className="shrink-0 rounded-full bg-primary px-2.5 py-0.5 text-[0.65rem] font-black text-primary-foreground">
              {data.no}
            </span>
            <span className="text-xs font-bold leading-5 text-foreground">{data.title}</span>
          </figcaption>
        )}
      </div>
      {!compact && (
        <div className="flex flex-col gap-2 p-4">
          <p className="text-[0.8rem] leading-7 text-muted-foreground">{data.desc}</p>
          <span className="flex items-center gap-1.5 text-[0.66rem] font-medium text-muted-foreground/80">
            <Camera className="h-3 w-3 shrink-0" />
            منبع تصویر: {data.source} — استفاده با جنبه توضیحی
          </span>
        </div>
      )}
    </motion.figure>
  );
}
