"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Появление блока при скролле: fade + slide-up + лёгкий blur */
export function Reveal({
  children,
  delay = 0,
  y = 32,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Построчное появление крупного заголовка: строки «выезжают» из маски */
export function SplitLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.12,
  once = true,
  inView = false,
  play,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  inView?: boolean;
  /** если задан — анимация управляется этим флагом, а не скроллом */
  play?: boolean;
}) {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const line = {
    hidden: { y: "115%", rotate: 3 },
    show: {
      y: "0%",
      rotate: 0,
      transition: { duration: 1.05, ease: EASE },
    },
  };
  const animProps =
    play !== undefined
      ? { animate: play ? ("show" as const) : ("hidden" as const) }
      : inView
        ? {
            initial: "hidden" as const,
            whileInView: "show" as const,
            viewport: { once, margin: "-8% 0px" as const },
          }
        : { initial: "hidden" as const, animate: "show" as const };

  return (
    <motion.span className={`block ${className ?? ""}`} variants={container} {...animProps}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span className={`block will-change-transform ${lineClassName ?? ""}`} variants={line}>
            {l}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Посимвольное появление текста */
export function SplitChars({
  text,
  className,
  delay = 0,
  stagger = 0.02,
  once = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}) {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const char = {
    hidden: { y: "110%", opacity: 0 },
    show: {
      y: "0%",
      opacity: 1,
      transition: { duration: 0.6, ease: EASE },
    },
  };
  return (
    <motion.span
      className={`inline-block ${className ?? ""}`}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-5% 0px" }}
      aria-label={text}
    >
      {text.split(" ").map((word, wi, arr) => (
        <span key={wi} className="inline-block whitespace-nowrap" aria-hidden>
          {word.split("").map((ch, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <motion.span className="inline-block will-change-transform" variants={char}>
                {ch}
              </motion.span>
            </span>
          ))}
          {wi < arr.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </motion.span>
  );
}
