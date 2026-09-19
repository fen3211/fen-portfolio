"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { Lightbox } from "@/components/Lightbox";
import { Reveal, SplitLines } from "@/components/anim/Reveal";
import { filters, projects, type Category, type Project } from "@/data/projects";

type FilterId = "all" | Category;

export function Works() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [selected, setSelected] = useState<Project | null>(null);

  const list = filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const counts: Record<FilterId, number> = {
    all: projects.length,
    design: projects.filter((p) => p.category === "design").length,
    motion3d: projects.filter((p) => p.category === "motion3d").length,
  };

  return (
    <section id="works" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <Reveal>
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-muted">
            (03) — Избранные работы
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
          <h2 className="font-display text-[clamp(1.7rem,3.4vw,3rem)] font-bold uppercase leading-[1.08] tracking-tight md:col-span-7">
            <SplitLines
              inView
              lines={[
                <span key="1">Работы,</span>,
                <span key="2" className="text-outline">
                  которые говорят<span className="text-fg">.</span>
                </span>,
              ]}
            />
          </h2>
          <Reveal delay={0.15} className="md:col-span-4 md:col-start-9">
            <p className="leading-relaxed text-muted">
              Кейсы из практики: айдентика и цифровая графика — рядом монтаж, 3D
              и моушн. Нажмите на карточку, чтобы рассмотреть детали.
            </p>
          </Reveal>
        </div>

        {/* Фильтры */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center gap-2.5 md:mt-14">
            {filters.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`relative rounded-full border px-5 py-2.5 font-mono text-xs uppercase tracking-[0.12em] transition-all duration-300 ${
                    active
                      ? "border-accent bg-accent text-bg"
                      : "border-line text-muted hover:border-muted hover:text-fg"
                  }`}
                >
                  {f.label}
                  <sup className={`ml-1.5 ${active ? "text-bg/70" : "text-accent"}`}>
                    {counts[f.id]}
                  </sup>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Bento-сетка */}
        <motion.div layout className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-12 md:gap-5">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <ProjectCard key={p.id} project={p} onOpen={setSelected} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Лайтбокс */}
      <AnimatePresence>
        {selected && (
          <Lightbox project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
