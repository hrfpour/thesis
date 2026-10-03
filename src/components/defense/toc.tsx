"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ListOrdered } from "lucide-react";
import { toc } from "@/lib/defense-data";

export function TocSection() {
  return (
    <section id="toc" className="scroll-mt-20 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center gap-3"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12 text-primary">
            <ListOrdered className="h-5.5 w-5.5" />
          </span>
          <div className="flex flex-col">
            <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">فهرست مطالب</h2>
            <span dir="ltr" className="ltr text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Table of Contents
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {toc.map((t, i) => (
            <motion.button
              key={t.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              onClick={() =>
                document.getElementById(t.id)?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              className="focus-ring group flex items-center justify-between gap-4 rounded-2xl border bg-card/60 p-5 text-right backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg dark:hover:shadow-primary/10"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold text-primary/70">{t.no}</span>
                  <span className="text-lg font-bold text-foreground">{t.title}</span>
                </div>
                <span className="text-xs leading-5 text-muted-foreground">{t.desc}</span>
              </div>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:bg-primary/10 group-hover:text-primary">
                <ChevronLeft className="h-4 w-4" />
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
