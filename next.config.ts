import type { NextConfig } from "next";

/**
 * STATIC_EXPORT=1 — сборка полностью статического сайта для GitHub Pages
 * (репозиторий fen3211/fen-portfolio → адрес /fen-portfolio/).
 * Обычная сборка и dev-сервер работают без этого флага как прежде.
 */
const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = isStaticExport
  ? {
      output: "export",
      basePath: "/fen-portfolio",
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
