"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { Magnetic } from "@/components/anim/Magnetic";
import { nav, site } from "@/data/site";
import { scrollToId, scrollToTop, startScroll, stopScroll } from "@/lib/lenis";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

export function Header({ ready }: { ready: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 32);
    setHidden(y > 480 && y > prev && !open);
  });

  // scroll-spy
  useEffect(() => {
    const ids = nav.map((n) => n.id);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // блокировка скролла при открытом мобильном меню
  useEffect(() => {
    if (open) stopScroll();
    else startScroll();
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    // даём меню закрыться до начала скролла на мобильных
    setTimeout(() => scrollToId(id), open ? 350 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: ready && !hidden ? 0 : hidden ? -100 : -80, opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-[100] transition-colors duration-500 ${
          scrolled ? "border-b border-line/80 bg-bg/80 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 md:px-10">
          <button
            onClick={() => scrollToTop()}
            aria-label="Наверх"
            className="cursor-pointer"
          >
            <Logo />
          </button>

          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className={`group relative font-mono text-[13px] uppercase tracking-[0.14em] transition-colors duration-300 ${
                  active === n.id ? "text-accent" : "text-muted hover:text-fg"
                }`}
              >
                {n.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-accent transition-all duration-300 ${
                    active === n.id ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block">
              <Magnetic>
                <button
                  onClick={() => go("contacts")}
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[13px] font-semibold text-bg transition-shadow duration-300 hover:shadow-[0_0_28px_rgba(212,255,0,0.35)]"
                >
                  Обсудить проект
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </Magnetic>
            </span>
            <button
              onClick={() => setOpen(true)}
              aria-label="Открыть меню"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-accent hover:text-accent lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Мобильное меню — fullscreen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[150] flex flex-col bg-bg/95 backdrop-blur-2xl lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <div className="flex h-[72px] items-center justify-between px-5">
              <Logo />
              <button
                onClick={() => setOpen(false)}
                aria-label="Закрыть меню"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-accent hover:text-accent"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-2 px-8">
              {nav.map((n, i) => (
                <motion.div
                  key={n.id}
                  initial={{ y: 44, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.6, ease: EASE }}
                >
                  <button
                    onClick={() => go(n.id)}
                    className="group flex w-full items-baseline gap-4 py-3 text-left"
                  >
                    <span className="font-mono text-xs text-accent">0{i + 1}</span>
                    <span className="font-display text-[9vw] font-semibold uppercase leading-none text-fg transition-colors group-hover:text-accent sm:text-5xl">
                      {n.label}
                    </span>
                    <ArrowUpRight className="ml-auto h-6 w-6 self-center text-muted transition-colors group-hover:text-accent" />
                  </button>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-x-6 gap-y-2 px-8 pb-10 font-mono text-xs uppercase tracking-widest text-muted"
            >
              <a href={site.telegram} target="_blank" rel="noreferrer" className="hover:text-accent">Telegram</a>
              <a href={`mailto:${site.email}`} className="hover:text-accent">Email</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
