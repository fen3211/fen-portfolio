"use client";

import Lenis from "lenis";

let lenis: Lenis | null = null;
let rafId = 0;

export function initLenis(): Lenis {
  if (lenis) return lenis;
  lenis = new Lenis({
    lerp: 0.09,
    wheelMultiplier: 1,
    touchMultiplier: 1.4,
  });
  const raf = (time: number) => {
    lenis?.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);
  return lenis;
}

export function getLenis(): Lenis | null {
  return lenis;
}

export function stopScroll() {
  lenis?.stop();
  document.documentElement.classList.add("overflow-hidden");
}

export function startScroll() {
  lenis?.start();
  document.documentElement.classList.remove("overflow-hidden");
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: -72, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { duration: 1.4 });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

export function destroyLenis() {
  cancelAnimationFrame(rafId);
  lenis?.destroy();
  lenis = null;
}
