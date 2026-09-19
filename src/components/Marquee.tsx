"use client";

import { Asterisk } from "lucide-react";

export function Marquee({ items }: { items: string[] }) {
  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={key === "b"}>
      {items.map((it, i) => (
        <span key={i} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-display text-sm uppercase tracking-[0.2em] text-fg/85 md:px-10 md:text-base">
            {it}
          </span>
          <Asterisk className="h-5 w-5 shrink-0 text-accent" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="group relative overflow-hidden border-y border-line bg-surface/60 py-4 md:py-5">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
