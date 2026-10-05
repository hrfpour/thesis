"use client";

import * as React from "react";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { SLIDES } from "@/components/defense/presentation/slides";
import { meta, faDigits } from "@/lib/defense-data";

/* ─────────────────────────────────────────────────────────────
 *  Presentation export: PDF & PowerPoint
 *  A hidden 1600×900 stage renders every slide; each is rasterized
 *  via html-to-image (JPEG) and assembled incrementally into a
 *  PPTX (pptxgenjs) or a landscape PDF (jsPDF) — fully client-side,
 *  so it also works on the static GitHub Pages deployment.
 *
 *  Robustness measures (learned the hard way):
 *  • requestAnimationFrame is temporarily replaced by a timer-based
 *    shim — html-to-image resolves via rAF, which stalls when the
 *    tab is hidden or the compositor starves (classic hang).
 *  • Every slide capture has a hard timeout (25s) + 3 retries.
 *  • Stage images are inlined as data-URLs via canvas (no network),
 *    fetch as fallback — immune to request-burst throttling.
 *  • @font-face rules are inlined once (module-cached, fetched with
 *    limited concurrency) and passed as `fontEmbedCSS`.
 *  • The stage is memoized so progress updates never re-render it.
 * ───────────────────────────────────────────────────────────── */

const STAGE_W = 1600;
const STAGE_H = 900;
/* Slides use sm/md/lg breakpoints (no xl/2xl), so a viewport ≥1024px
   guarantees the exact desktop layout inside the fixed-width stage. */
const MIN_VIEWPORT = 1024;
const CAPTURE_PIXEL_RATIO = 1.3;
const CAPTURE_QUALITY = 0.92;
const CAPTURE_TIMEOUT_MS = 25_000;

/* Curated style properties for html-to-image's `includeStyleProperties`.
   By default the library inlines ~500 properties (incl. -webkit- aliases
   and every CSS variable) on EVERY cloned node — with thousands of KaTeX
   spans per math slide the SVG balloons to many MB and the renderer ends
   in a GC death spiral. This list covers everything a Tailwind-based UI
   needs and keeps the clone styles ~4–5× lighter. */
const STYLE_PROPERTIES = [
  /* layout */
  "display", "position", "top", "right", "bottom", "left", "inset", "z-index",
  "float", "clear", "box-sizing", "width", "height", "min-width", "min-height",
  "max-width", "max-height", "overflow", "overflow-x", "overflow-y", "aspect-ratio",
  "visibility", "clip", "isolation", "contain",
  /* flex & grid */
  "flex", "flex-direction", "flex-wrap", "flex-grow", "flex-shrink", "flex-basis",
  "order", "align-items", "align-self", "align-content", "justify-content",
  "justify-self", "justify-items", "gap", "row-gap", "column-gap",
  "grid-template-columns", "grid-template-rows", "grid-auto-flow",
  "grid-auto-columns", "grid-auto-rows", "grid-column", "grid-row", "grid-area",
  "place-items", "place-content", "place-self",
  /* box model */
  "margin", "margin-top", "margin-right", "margin-bottom", "margin-left",
  "padding", "padding-top", "padding-right", "padding-bottom", "padding-left",
  "border", "border-top", "border-right", "border-bottom", "border-left",
  "border-width", "border-style", "border-color",
  "border-top-width", "border-top-style", "border-top-color",
  "border-right-width", "border-right-style", "border-right-color",
  "border-bottom-width", "border-bottom-style", "border-bottom-color",
  "border-left-width", "border-left-style", "border-left-color",
  "border-radius", "border-top-left-radius", "border-top-right-radius",
  "border-bottom-right-radius", "border-bottom-left-radius",
  "outline", "outline-color", "outline-style", "outline-width", "box-shadow",
  /* typography */
  "font-family", "font-size", "font-style", "font-weight", "font-stretch",
  "line-height", "letter-spacing", "word-spacing", "text-align", "text-align-last",
  "text-decoration", "text-decoration-line", "text-decoration-style", "text-decoration-color",
  "text-transform", "text-indent", "text-overflow", "white-space", "word-break",
  "overflow-wrap", "direction", "unicode-bidi", "writing-mode", "vertical-align",
  "font-variant-numeric", "font-feature-settings", "font-variant-ligatures",
  "tab-size", "user-select", "-webkit-text-fill-color",
  /* colors & backgrounds */
  "color", "background", "background-color", "background-image", "background-repeat",
  "background-position", "background-size", "background-clip", "background-origin",
  "background-attachment", "opacity", "mix-blend-mode",
  /* effects & transforms */
  "filter", "backdrop-filter", "transform", "transform-origin", "transform-box",
  "clip-path", "mask", "mask-image", "mask-size", "mask-repeat", "mask-position",
  "-webkit-mask", "-webkit-mask-image", "-webkit-mask-size", "-webkit-mask-repeat",
  "-webkit-mask-position", "-webkit-background-clip", "will-change", "pointer-events",
];

/* Cross-instance guards: header + overlay can both trigger an export */
let exportInFlight = false;

type FontFaceRecord = {
  cssText: string;
  family: string;
  replacements: { raw: string; absolute: string; dataUrl: string }[];
};

/* Fetched once per page session — re-exports skip the network entirely */
let cachedFontFaces: FontFaceRecord[] | null = null;

type Busy = { kind: "pdf" | "pptx"; done: number; total: number } | null;

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/** Timer-based rAF replacement used while rasterizing. */
const rafShim = (callback: FrameRequestCallback): number =>
  window.setTimeout(() => callback(performance.now()), 16) as unknown as number;

function withRafShim<T>(task: () => Promise<T>): Promise<T> {
  const original = window.requestAnimationFrame;
  window.requestAnimationFrame = rafShim as typeof window.requestAnimationFrame;
  return task().finally(() => {
    window.requestAnimationFrame = original;
  });
}

function withTimeout<T>(task: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`${label} timed out`)), ms);
    task.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      }
    );
  });
}

/** Read a same-origin URL as a data-URL with retries. */
async function fetchAsDataUrl(url: string, attempts = 3): Promise<string> {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const blob = await res.blob();
        const dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(String(reader.result));
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(blob);
        });
        if (dataUrl) return dataUrl;
      }
    } catch {
      /* retry */
    }
    await sleep(350);
  }
  return "";
}

/** Map over a list with bounded concurrency (protects against bursts). */
async function mapLimited<T, R>(
  items: T[],
  limit: number,
  worker: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let cursor = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index]);
    }
  });
  await Promise.all(runners);
  return results;
}

/** Draw an already-loaded DOM image onto a canvas → data-URL (no network). */
function domImageToDataUrl(img: HTMLImageElement): string {
  try {
    if (!img.complete || !img.naturalWidth) return "";
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL("image/jpeg", 0.92);
  } catch {
    return "";
  }
}

/**
 * Replace every <img> inside the stage with a data-URL twin so the
 * capture never fetches images over the network. Canvas first
 * (zero network), fetch as fallback. Duplicate URLs are deduped.
 */
async function inlineStageImages(stage: HTMLElement) {
  const images = Array.from(stage.querySelectorAll("img"));
  const srcs = [
    ...new Set(
      images
        .map((img) => img.getAttribute("src") ?? "")
        .filter((src) => src && !src.startsWith("data:"))
    ),
  ];
  const cache = new Map<string, string>();
  await mapLimited(srcs, 4, async (src) => {
    const img = images.find((el) => (el.getAttribute("src") ?? "") === src);
    let dataUrl = img ? domImageToDataUrl(img) : "";
    if (!dataUrl) {
      dataUrl = await fetchAsDataUrl(new URL(src, window.location.href).href);
    }
    cache.set(src, dataUrl);
  });
  for (const img of images) {
    const src = img.getAttribute("src") ?? "";
    const dataUrl = cache.get(src);
    if (dataUrl) {
      img.src = dataUrl;
      await img.decode?.().catch(() => undefined);
    }
  }
}

/**
 * Collect every @font-face rule of the page with its font files
 * inlined as base64 data-URLs. Fetched with bounded concurrency
 * + retries (immune to request-burst throttling). Cached for re-runs.
 */
async function loadFontFaces(): Promise<FontFaceRecord[]> {
  if (cachedFontFaces) return cachedFontFaces;
  const faces: FontFaceRecord[] = [];
  const seen = new Set<string>();
  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList | null = null;
    try {
      rules = sheet.cssRules;
    } catch {
      continue; // cross-origin sheet — skipped
    }
    if (!rules) continue;
    for (const rule of Array.from(rules)) {
      if (!(rule instanceof CSSFontFaceRule)) continue;
      const cssText = rule.cssText;
      const family = (cssText.match(/font-family:\s*["']?([^;"']+)["']?\s*;/i)?.[1] ?? "").trim();
      const raws = cssText.match(/url\(\s*["']?[^"')]+["']?\s*\)/g) ?? [];
      const replacements: { raw: string; absolute: string; dataUrl: string }[] = [];
      for (const raw of raws) {
        const href = raw.match(/url\(\s*["']?([^"')]+)["']?\s*\)/)?.[1];
        if (!href || href.startsWith("data:")) continue;
        const absolute = new URL(href, window.location.href).href;
        if (seen.has(absolute)) continue;
        seen.add(absolute);
        replacements.push({ raw, absolute, dataUrl: "" });
      }
      if (!faces.some((face) => face.cssText === cssText)) {
        faces.push({ cssText, family, replacements });
      }
    }
  }
  /* Fetch every unique font file with bounded concurrency + retries */
  const jobs = faces.flatMap((face) => face.replacements);
  await mapLimited(jobs, 4, async (job) => {
    job.dataUrl = await fetchAsDataUrl(job.absolute, 4);
  });
  cachedFontFaces = faces;
  return faces;
}

/** Font families actually used inside a node's subtree (computed styles). */
function collectFontFamilies(node: HTMLElement): Set<string> {
  const used = new Set<string>();
  const push = (value: string) =>
    value.split(",").forEach((entry) => {
      const name = entry.trim().replace(/^["']|["']$/g, "");
      if (name) used.add(name);
    });
  const walk = (element: Element) => {
    const inline = element instanceof HTMLElement ? element.style.fontFamily : "";
    push(inline || getComputedStyle(element).fontFamily || "");
    Array.from(element.children).forEach((child) => {
      if (child instanceof HTMLElement) walk(child);
    });
  };
  walk(node);
  return used;
}

/** Per-slide font CSS: only the @font-face rules that slide really uses. */
function fontCssForNode(node: HTMLElement, faces: FontFaceRecord[]): string | undefined {
  const used = collectFontFamilies(node);
  const css = faces
    .filter((face) => face.family !== "" && used.has(face.family))
    .map((face) =>
      face.replacements.reduce(
        (text, r) => (r.dataUrl ? text.split(r.raw).join(`url(${r.dataUrl})`) : text),
        face.cssText
      )
    )
    .join("\n");
  return css || undefined;
}

/** Capture one slide node as JPEG: timeout + retries. */
async function captureSlide(
  toJpeg: (node: HTMLElement, options: Record<string, unknown>) => Promise<string>,
  node: HTMLElement,
  fontEmbedCSS: string | undefined
): Promise<string> {
  let lastError: unknown;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      return await withTimeout(
        withRafShim(() =>
          toJpeg(node, {
            quality: CAPTURE_QUALITY,
            pixelRatio: CAPTURE_PIXEL_RATIO,
            includeStyleProperties: STYLE_PROPERTIES,
            ...(fontEmbedCSS ? { fontEmbedCSS } : {}),
          })
        ),
        CAPTURE_TIMEOUT_MS,
        `اسلاید (تلاش ${attempt + 1})`
      );
    } catch (error) {
      lastError = error;
      console.info(`[export] slide capture failed (attempt ${attempt + 1}/3):`, error);
      if (attempt < 2) await sleep(600);
    }
  }
  throw lastError;
}

/* ── Hidden rasterization stage (memoized: progress updates never re-render it) ── */
const ExportStage = React.memo(function ExportStage() {
  return (
    <div
      aria-hidden
      className="export-stage pointer-events-none fixed left-[-10000px] top-0 z-[-1]"
      style={{ width: STAGE_W }}
    >
      {SLIDES.map((s, i) => (
        <div
          key={i}
          data-export-slide
          style={{ width: STAGE_W, height: STAGE_H }}
          className="relative overflow-hidden bg-background"
        >
          {/* Cover & closing photo backgrounds (mirrors the live overlay) */}
          {(i === 0 || i === SLIDES.length - 1) && (
            <>
              <img
                src={i === 0 ? "/images/traffic-night.webp" : "/images/future-its.webp"}
                alt=""
                className="export-slide-bg absolute inset-0 h-full w-full object-cover opacity-25 dark:opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/40 to-background/85" />
            </>
          )}
          <div className="absolute inset-0 flex items-center justify-center px-4 py-4 sm:px-6" dir="rtl">
            <div className="mx-auto w-full max-w-6xl">{s.render()}</div>
          </div>
        </div>
      ))}
    </div>
  );
});

export function PresentationExport({ variant = "icon" }: { variant?: "icon" | "labeled" }) {
  const { toast } = useToast();
  const [busy, setBusy] = React.useState<Busy>(null);

  const total = SLIDES.length;

  const run = React.useCallback(
    async (kind: "pdf" | "pptx") => {
      if (exportInFlight || busy) return;

      if (window.innerWidth < MIN_VIEWPORT) {
        toast({
          title: "نمایشگر کوچک است",
          description:
            "برای ساخت خروجی PDF/PowerPoint، عرض پنجرهٔ مرورگر باید حداقل ۱۰۲۴ پیکسل باشد؛ لطفاً پنجره را بزرگ کنید یا از رایانهٔ شخصی استفاده کنید.",
          variant: "destructive",
        });
        return;
      }

      exportInFlight = true;
      setBusy({ kind, done: 0, total });
      const t0 = performance.now();

      try {
        // 1) Let React paint the hidden stage
        await sleep(60);
        const stage = document.querySelector<HTMLElement>(".export-stage");
        if (!stage) throw new Error("export stage unavailable");

        // 2) Offline assets: fonts → embedded CSS records, images → data-URLs
        const fontFaces = await loadFontFaces();
        console.info(`[export] fonts embedded: ${fontFaces.length ? "yes" : "fallback"}`);
        await inlineStageImages(stage);
        if (document.fonts?.ready) await document.fonts.ready;
        await sleep(100);

        // 3) Prepare the writer (incremental assembly = low memory)
        let pptx: import("pptxgenjs").default | null = null;
        let pdf: import("jspdf").jsPDF | null = null;
        if (kind === "pptx") {
          const { default: PptxGenJS } = await import("pptxgenjs");
          pptx = new PptxGenJS();
          pptx.layout = "LAYOUT_16x9";
          pptx.title = meta.titleEn;
          pptx.subject = "Proposal Defense Presentation";
          pptx.author = meta.student.name;
          pptx.company = meta.university;
        } else {
          const { jsPDF } = await import("jspdf");
          /* 16:9 landscape page in points (13.33in × 7.5in) */
          pdf = new jsPDF({
            orientation: "landscape",
            unit: "pt",
            format: [960, 540],
            compress: true,
          });
          pdf.setProperties({
            title: meta.titleEn,
            subject: "Proposal Defense Presentation",
            author: meta.student.name,
            creator: meta.university,
          });
        }

        // 4) Rasterize slides one by one & append to the document
        const { toJpeg } = await import("html-to-image");
        const nodes = Array.from(
          stage.querySelectorAll<HTMLElement>("[data-export-slide]")
        );
        for (let i = 0; i < nodes.length; i++) {
          const slideT0 = performance.now();
          /* Per-slide font subset: ordinary slides carry only the Persian
             font (~4× lighter SVG), math slides add the KaTeX fonts. */
          const fontEmbedCSS = fontCssForNode(nodes[i], fontFaces);
          const dataUrl = await captureSlide(toJpeg, nodes[i], fontEmbedCSS);
          if (pptx) {
            const slide = pptx.addSlide();
            slide.addImage({ data: dataUrl, x: 0, y: 0, w: "100%", h: "100%" });
            slide.addNotes(
              `اسلاید ${faDigits(i + 1)} — ${SLIDES[i].section} | ${SLIDES[i].title}`
            );
          } else if (pdf) {
            if (i > 0) pdf.addPage([960, 540], "landscape");
            pdf.addImage(dataUrl, "JPEG", 0, 0, 960, 540, undefined, "FAST");
          }
          setBusy({ kind, done: i + 1, total: nodes.length });
          console.info(
            `[export] slide ${i + 1}/${nodes.length} in ${Math.round(performance.now() - slideT0)}ms`
          );
          /* Heavy slides (math formulas) get a longer GC breathing window */
          const elapsed = performance.now() - slideT0;
          await sleep(elapsed > 1200 ? 500 : 90);
        }

        // 5) Emit the file
        if (pptx) {
          await pptx.writeFile({ fileName: "farhadipour-defense-slides.pptx" });
          toast({
            title: "خروجی PowerPoint آماده شد",
            description: `فایل با ${faDigits(nodes.length)} اسلاید (۱۶:۹) دانلود شد — قابل اجرا در PowerPoint و قابل حمل روی فلش.`,
          });
        } else if (pdf) {
          pdf.save("farhadipour-defense-slides.pdf");
          toast({
            title: "خروجی PDF آماده شد",
            description: `فایل با ${faDigits(nodes.length)} صفحهٔ افقی (۱۶:۹) دانلود شد — مناسب چاپ و ارسال برای اساتید.`,
          });
        }
        console.info(`[export] done (${kind}) in ${Math.round(performance.now() - t0)}ms`);
      } catch (error) {
        console.error("Export failed:", error);
        toast({
          title: "خطا در ساخت خروجی",
          description:
            "ساخت فایل کامل نشد؛ لطفاً دوباره تلاش کنید. اگر مشکل ادامه داشت، از چاپ مرورگر (Ctrl+P → Save as PDF) استفاده کنید.",
          variant: "destructive",
        });
      } finally {
        exportInFlight = false;
        setBusy(null);
      }
    },
    [busy, toast, total]
  );

  const labeled = variant === "labeled";

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size={labeled ? "sm" : "icon"}
            disabled={!!busy}
            aria-label="خروجی گرفتن از ارائه"
            title="خروجی PDF / PowerPoint"
            className={labeled ? "gap-1.5 font-semibold" : undefined}
          >
            <Icons.FileDown className={labeled ? "h-4 w-4" : "h-[1.1rem] w-[1.1rem]"} />
            {labeled && <span className="hidden sm:inline">خروجی</span>}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-60">
          <DropdownMenuLabel dir="rtl" className="text-right">
            خروجی گرفتن از ارائه
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem dir="rtl" className="gap-2 text-right" onClick={() => void run("pdf")} disabled={!!busy}>
            <Icons.FileText className="h-4 w-4 shrink-0 text-destructive" />
            <span className="flex-1">خروجی PDF</span>
            <span className="text-[0.65rem] text-muted-foreground">{faDigits(total)} صفحه</span>
          </DropdownMenuItem>
          <DropdownMenuItem dir="rtl" className="gap-2 text-right" onClick={() => void run("pptx")} disabled={!!busy}>
            <Icons.Presentation className="h-4 w-4 shrink-0 text-primary" />
            <span className="flex-1">خروجی PowerPoint</span>
            <span className="text-[0.65rem] text-muted-foreground">{faDigits(total)} اسلاید</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Progress indicator */}
      {busy && (
        <div
          role="status"
          aria-live="polite"
          dir="rtl"
          className="fixed bottom-4 left-4 z-[70] w-72 rounded-xl border bg-card/95 p-4 shadow-xl backdrop-blur"
        >
          <div className="flex items-center gap-2">
            <Icons.Loader2 className="h-4 w-4 shrink-0 animate-spin text-primary" />
            <p className="text-xs font-black text-foreground">
              {busy.kind === "pdf" ? "در حال ساخت خروجی PDF…" : "در حال ساخت خروجی PowerPoint…"}
            </p>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-l from-primary to-accent transition-all duration-200"
              style={{ width: `${(busy.done / busy.total) * 100}%` }}
            />
          </div>
          <p className="mt-2 text-[0.68rem] leading-5 text-muted-foreground">
            {busy.done === 0
              ? "آماده‌سازی فونت‌ها و تصاویر اسلایدها…"
              : `رندر اسلاید ${faDigits(busy.done)} از ${faDigits(busy.total)} — لطفاً تا پایان مراحل، صفحه را نبندید`}
          </p>
        </div>
      )}

      {/* Hidden fixed-size rasterization stage (off-screen) */}
      {busy && <ExportStage />}
    </>
  );
}
