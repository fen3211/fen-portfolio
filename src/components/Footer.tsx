"use client";

import { ArrowUp, ArrowUpRight, Mail } from "lucide-react";
import { Magnetic } from "@/components/anim/Magnetic";
import { Reveal, SplitLines } from "@/components/anim/Reveal";
import { site } from "@/data/site";
import { scrollToTop } from "@/lib/lenis";

const contacts = [
  {
    label: "Telegram",
    value: "написать в TG",
    href: site.telegram,
    mark: "TG",
    external: true,
  },
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    mark: "@",
    external: false,
  },
];

export function Footer() {
  return (
    <footer id="contacts" className="relative overflow-hidden border-t border-line">
      {/* свечение */}
      <div
        className="pointer-events-none absolute bottom-[-30%] left-1/2 h-[600px] w-[900px] -translate-x-1/2 opacity-[0.06]"
        style={{
          background: "radial-gradient(closest-side, #D4FF00, transparent)",
          filter: "blur(60px)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <Reveal>
          <p className="mb-8 text-center font-mono text-xs uppercase tracking-[0.25em] text-muted">
            (04) — Контакты
          </p>
        </Reveal>

        <h2 className="text-center font-display text-[clamp(1.9rem,5.4vw,4.6rem)] font-extrabold uppercase leading-[1.04] tracking-tight">
          <SplitLines
            inView
            lines={[
              <span key="1">Давайте создадим</span>,
              <span key="2" className="text-outline">
                что-то выдающееся<span className="text-accent" style={{ WebkitTextStroke: "0px" }}>.</span>
              </span>,
            ]}
          />
        </h2>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-xl text-center leading-relaxed text-muted">
            Расскажите о своей задаче — отвечу в течение дня. Открыт к
            фриланс-проектам и предложениям о full-time сотрудничестве.
          </p>
        </Reveal>

        {/* Контакты */}
        <div className="mx-auto mt-14 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-2 md:mt-16 md:gap-4">
          {contacts.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.07}>
              <Magnetic strength={0.25} className="block">
                <a
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noreferrer" : undefined}
                  className="group flex h-full flex-col justify-between gap-8 rounded-2xl border border-line bg-card/60 p-5 transition-all duration-500 hover:border-accent hover:bg-accent md:p-6"
                >
                  <span className="flex items-center justify-between">
                    <span className="font-display text-2xl font-bold text-fg transition-colors duration-300 group-hover:text-bg md:text-3xl">
                      {c.mark}
                    </span>
                    {c.label === "Email" ? (
                      <Mail className="h-5 w-5 text-muted transition-colors duration-300 group-hover:text-bg" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-bg" />
                    )}
                  </span>
                  <span>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors duration-300 group-hover:text-bg/70">
                      {c.label}
                    </span>
                    <span className="mt-1 block text-sm font-medium text-fg transition-colors duration-300 group-hover:text-bg">
                      {c.value}
                    </span>
                  </span>
                </a>
              </Magnetic>
            </Reveal>
          ))}
        </div>

        {/* Нижняя строка */}
        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-line pt-7 md:mt-28 md:flex-row">
          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} {site.name} — {site.suffix}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted/70">
            {site.role} · {site.role2}
          </p>
          <Magnetic>
            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              Наверх
              <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
