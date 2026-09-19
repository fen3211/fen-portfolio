"use client";

import { useState } from "react";
import { site } from "@/data/site";

/**
 * Логотип из public/assets/logo.svg с фолбэком:
 * если файл недоступен — минималистичная монограмма FEN.
 */
export function Logo({ className }: { className?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className={`group inline-flex items-baseline gap-[0.35em] leading-none select-none ${className ?? ""}`}
      >
        <span className="font-display text-lg font-extrabold tracking-[0.18em] text-fg transition-colors duration-300 group-hover:text-accent">
          FEN
        </span>
        <span className="hidden sm:inline font-mono text-[9px] uppercase tracking-[0.3em] text-muted">
          {site.suffix}
        </span>
      </span>
    );
  }

  return (
    <span className={`group inline-flex items-center select-none ${className ?? ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/logo.svg"
        alt={`${site.name} — ${site.suffix}`}
        className="h-10 w-auto transition-all duration-500 group-hover:scale-[1.06] group-hover:drop-shadow-[0_0_12px_rgba(212,255,0,0.35)] md:h-11"
        onError={() => setFailed(true)}
      />
    </span>
  );
}
