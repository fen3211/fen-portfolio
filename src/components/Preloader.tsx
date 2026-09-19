"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

/** Прелоадер: логотип + счётчик процентов, уходит шторкой вверх */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const DURATION = 1700;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / DURATION);
      // ease-out: быстро в начале, замедление к концу
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          setVisible(false);
          doneRef.current();
        }, 250);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-bg"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Logo className="[&_img]:h-24 md:[&_img]:h-28" />
          </motion.div>

          <div className="mt-10 h-px w-48 overflow-hidden bg-line md:w-64">
            <motion.div
              className="h-full bg-accent"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-4 flex w-48 items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-muted md:w-64">
            <span>loading</span>
            <span className="text-accent">{progress}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
