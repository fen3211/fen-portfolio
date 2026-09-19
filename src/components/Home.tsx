"use client";

import { useEffect, useState } from "react";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Preloader } from "@/components/Preloader";
import { Skills } from "@/components/Skills";
import { Works } from "@/components/Works";
import { initLenis, startScroll, stopScroll } from "@/lib/lenis";

const marqueeItems = [
  "Айдентика",
  "Полиграфия",
  "Наружная реклама",
  "Баннеры",
  "Превью",
  "Моушн-дизайн",
  "Видеомонтаж",
  "3D-визуализация",
  "Lyrics-видео",
  "Шаблоны",
];

export default function Home() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initLenis();
    return () => {
      // destroyLenis не вызываем: в dev с StrictMode эффект отмонтируется
      // повторно, а единственный экземпляр Lenis должен жить на странице
    };
  }, []);

  useEffect(() => {
    if (ready) startScroll();
    else stopScroll();
  }, [ready]);

  return (
    <>
      <div className="noise-overlay" aria-hidden />
      <Preloader onDone={() => setReady(true)} />
      <Header ready={ready} />
      <main>
        <Hero ready={ready} />
        <Marquee items={marqueeItems} />
        <About />
        <Skills />
        <Works />
      </main>
      <Footer />
    </>
  );
}
