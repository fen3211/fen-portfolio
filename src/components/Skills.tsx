"use client";

import { Reveal, SplitLines } from "@/components/anim/Reveal";

const tools = [
  { name: "Photoshop", cat: "Adobe", note: "Растровая графика, коллажи, обработка" },
  { name: "Illustrator", cat: "Adobe", note: "Векторная графика, логотипы, знаки" },
  { name: "InDesign", cat: "Adobe", note: "Полиграфия, макеты, многостраничник" },
  { name: "Figma", cat: "Interface", note: "UI-макеты, презентации, системы" },
  { name: "After Effects", cat: "Adobe", note: "Моушн-дизайн, анимация, композинг" },
  { name: "Premiere Pro", cat: "Adobe", note: "Монтаж видео, ритм, звук" },
  { name: "Cinema 4D", cat: "3D", note: "Моделирование, анимация, рендер" },
  { name: "Blender", cat: "3D", note: "Скульптинг, сцены, визуализация" },
];

export function Skills() {
  return (
    <section id="skills" className="relative bg-surface/40 py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <Reveal>
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-muted">
            (02) — Навыки
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
          <h2 className="font-display text-[clamp(1.7rem,3.4vw,3rem)] font-bold uppercase leading-[1.08] tracking-tight md:col-span-7">
            <SplitLines
              inView
              lines={[
                <span key="1">Инструменты,</span>,
                <span key="2" className="text-outline">
                  которым я доверяю<span className="text-fg">.</span>
                </span>,
              ]}
            />
          </h2>
          <Reveal delay={0.15} className="md:col-span-4 md:col-start-9">
            <p className="leading-relaxed text-muted">
              Графика, полиграфия, моушн и 3D — полный цикл производства
              визуального контента в связке проверенных инструментов.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((t, i) => (
            <Reveal key={t.name} delay={(i % 4) * 0.07}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-card/60 p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/70 hover:shadow-[0_18px_50px_-20px_rgba(212,255,0,0.25)]">
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: "radial-gradient(closest-side, rgba(212,255,0,0.16), transparent)",
                  }}
                />
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs text-muted">/0{i + 1}</span>
                  <span className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted transition-colors duration-300 group-hover:border-accent/50 group-hover:text-accent">
                    {t.cat}
                  </span>
                </div>
                <h3 className="mt-8 font-display text-lg font-semibold text-fg transition-colors duration-300 group-hover:text-accent md:text-xl">
                  {t.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
