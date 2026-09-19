"use client";

import { ArrowUpRight } from "lucide-react";
import { Reveal, SplitLines } from "@/components/anim/Reveal";

const services = [
  {
    title: "Айдентика и фирменный стиль",
    desc: "Логотипы, знаковые системы, брендбуки — визуальный язык, который узнают с первого взгляда.",
  },
  {
    title: "Полиграфия и наружная реклама",
    desc: "Макеты для печати, OOH-конструкции, мерч — от визитки до билборда, с уважением к сетке и типографике.",
  },
  {
    title: "Баннеры и цифровая графика",
    desc: "Превью, обложки, аватары и промо-материалы для соцсетей и видеоплатформ.",
  },
  {
    title: "Моушн-дизайн и монтаж",
    desc: "Анимация логотипов, баннеры в движении, lyrics-видео и динамичная нарезка контента.",
  },
  {
    title: "3D-визуализация",
    desc: "Моделирование и рендер сцен, интро и оверлеи для эфиров и презентаций.",
  },
  {
    title: "Визуальные коммуникации",
    desc: "Системные шаблоны и оформление каналов — единый стиль во всех точках контакта с аудиторией.",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <Reveal>
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-muted">
            (01) — Обо мне
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="font-display text-[clamp(1.7rem,3.4vw,3rem)] font-bold uppercase leading-[1.08] tracking-tight">
              <SplitLines
                inView
                lines={[
                  <span key="1">Дизайн,</span>,
                  <span key="2" className="text-outline">
                    который
                  </span>,
                  <span key="3">
                    работает<span className="text-accent">.</span>
                  </span>,
                ]}
              />
            </h2>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={0.15}>
              <p className="text-lg leading-relaxed text-fg/90 md:text-xl">
                Я подхожу к дизайну как к инструменту решения бизнес-задач: прежде
                чем рисовать, разбираюсь в продукте, аудитории и целях. Красота —
                следствие точности, а не наоборот.
              </p>
              <p className="mt-6 leading-relaxed text-muted md:text-lg">
                Работаю на стыке графики и движения: собираю айдентику, полиграфию
                и цифровую графику, а затем оживляю их в 3D, моушне и монтаже.
                Так бренд звучит одинаково уверенно на визитке, билборде, в ленте
                соцсетей и на экране.
              </p>
              <p className="mt-6 leading-relaxed text-muted md:text-lg">
                Ценю строгие сетки, смелую типографику и системы, которые легко
                масштабировать — от одного знака до целой кампании.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Компетенции */}
        <div className="mt-20 md:mt-28">
          <Reveal>
            <h3 className="mb-8 font-mono text-xs uppercase tracking-[0.25em] text-muted">
              Что я делаю
            </h3>
          </Reveal>
          <ul>
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.04}>
                <li className="group relative cursor-default overflow-hidden border-t border-line last:border-b">
                  <div className="absolute inset-0 translate-y-full bg-accent transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0" />
                  <div className="relative grid grid-cols-[auto_1fr_auto] items-center gap-4 px-2 py-6 md:grid-cols-[64px_1fr_1.2fr_auto] md:gap-8 md:px-4 md:py-8">
                    <span className="font-mono text-xs text-muted transition-colors duration-300 group-hover:text-bg/70">
                      /0{i + 1}
                    </span>
                    <h4 className="text-base font-semibold text-fg transition-colors duration-300 group-hover:text-bg md:text-xl">
                      {s.title}
                    </h4>
                    <p className="col-span-3 max-w-xl text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-bg/80 md:col-span-1 md:text-[15px]">
                      {s.desc}
                    </p>
                    <ArrowUpRight className="hidden h-6 w-6 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-bg md:block" />
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
