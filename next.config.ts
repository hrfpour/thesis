import type { NextConfig } from "next";

/**
 * دو حالت build:
 *
 * ۱) پیش‌فرض (بدون متغیر محیطی): output "standalone"
 *    → لازم برای دکمه Publish / انتشار روی پلتفرم Z.ai
 *    → خروجی: .next/standalone/server.js
 *
 * ۲) با NEXT_OUTPUT=export: خروجی استاتیک برای GitHub Pages
 *    → خروجی: پوشه out/ (index.html + _next + images)
 *    → فقط در workflow گیت‌هاب با `bun run build:static` اجرا می‌شود
 */
const isStaticExport = process.env.NEXT_OUTPUT === "export";

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : "standalone",
  // در خروجی استاتیک، بهینه‌سازی تصویر در سرور در دسترس نیست
  ...(isStaticExport ? { images: { unoptimized: true } } : {}),
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
