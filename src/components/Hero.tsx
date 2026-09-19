"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { Magnetic } from "@/components/anim/Magnetic";
import { SplitLines, SplitChars } from "@/components/anim/Reveal";
import { site } from "@/data/site";
import { scrollToId } from "@/lib/lenis";

export function Hero({ ready }: { ready: boolean }) {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* фоновая сетка + свечение */}
      <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full opacity-[0.07]"
        style={{
          background: "radial-gradient(closest-side, #D4FF00, transparent)",
          filter: "blur(40px)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-svh max-w-[1440px] flex-col justify-end px-5 pb-10 pt-32 md:px-10 md:pb-14">
        {/* верхняя строка */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mb-8 flex flex-wrap items-center justify-between gap-4 md:mb-14"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
            © 2026 — Портфолио
          </p>
          <div className="inline-flex items-center gap-3 rounded-full border border-line bg-card/60 px-4 py-2 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse-dot" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg/90 md:text-xs">
              Open to work — freelance / full-time
            </span>
          </div>
        </motion.div>

        {/* заголовок */}
        <h1 className="font-display font-extrabold uppercase leading-[0.98] tracking-tight text-[clamp(2rem,9vw,8.5rem)]">
          <SplitLines
            play={ready}
            delay={0.25}
            lines={[
              <span key="1" className="text-fg">
                Графика.
              </span>,
              <span key="2" className="text-outline pl-[5vw] md:pl-[6vw]">
                Бренд<span className="text-fg">.</span>
              </span>,
              <span key="3" className="pl-[10vw] text-fg md:pl-[12vw]">
                Движение<span className="text-accent">.</span>
              </span>,
            ]}
          />
        </h1>

        {/* нижний блок */}
        <div className="mt-10 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-12 md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.85 }}
            className="md:col-span-6 lg:col-span-5"
          >
            <p className="max-w-md text-base leading-relaxed text-muted md:text-lg">
              Проектирую визуальные системы, которые решают бизнес-задачи:
              айдентика, визуальные коммуникации, 3D и монтаж —{" "}
              <span className="text-fg">от идеи до экрана.</span>
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Magnetic>
                <button
                  onClick={() => scrollToId("works")}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-bg transition-shadow duration-300 hover:shadow-[0_0_36px_rgba(212,255,0,0.4)]"
                >
                  Смотреть работы
                  <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </button>
              </Magnetic>
              <Magnetic>
                <button
                  onClick={() => scrollToId("contacts")}
                  className="group inline-flex items-center gap-2.5 rounded-full border border-line px-7 py-3.5 text-sm font-medium text-fg transition-colors duration-300 hover:border-accent hover:text-accent"
                >
                  Контакты
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </Magnetic>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 1 }}
            className="md:col-span-6 lg:col-span-5 lg:col-start-8"
          >
            <div className="space-y-3 border-l border-line pl-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                Позиционирование
              </p>
              <SplitChars
                text={`${site.role} — ${site.role2}`}
                className="block text-lg font-medium leading-snug text-fg md:text-xl"
                delay={1.1}
                stagger={0.012}
              />
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                <MapPin className="h-3.5 w-3.5 text-accent" />
                {site.location}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
