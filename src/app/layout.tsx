import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/defense/theme-provider";

const vazirmatn = localFont({
  src: [
    { path: "../fonts/Vazirmatn-Light.woff2", weight: "300", style: "normal" },
    { path: "../fonts/Vazirmatn-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Vazirmatn-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Vazirmatn-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/Vazirmatn-Bold.woff2", weight: "700", style: "normal" },
    { path: "../fonts/Vazirmatn-ExtraBold.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: "دفاع از پروپوزال | ارزیابی و بهبود قابلیت اطمینان در پیش‌بینی ترافیک",
  description:
    "سایت جامع جلسه دفاع از پروپوزال پایان‌نامه کارشناسی ارشد — حمیدرضا فرهادی‌پور — دانشگاه علامه طباطبائی، دانشکده آمار، ریاضی و رایانه — تلفیق شبکه‌های عصبی گرافی فضایی-زمانی با رویکرد بیزی",
  keywords: [
    "پیش‌بینی ترافیک",
    "شبکه‌های عصبی گرافی",
    "رویکرد بیزی",
    "عدم قطعیت",
    "دفاع از پروپوزال",
    "علم داده‌ها",
  ],
  authors: [{ name: "حمیدرضا فرهادی‌پور" }],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6faf7" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1512" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${vazirmatn.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
