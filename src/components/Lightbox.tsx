"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Play, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { categoryLabel, type Project } from "@/data/projects";
import { startScroll, stopScroll } from "@/lib/lenis";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Lightbox({ project, onClose }: { project: Project; onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  const total = project.gallery.length;
  const media = project.gallery[idx];

  const next = useCallback(() => setIdx((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIdx((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    stopScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      startScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, next, prev]);

  return (
    <motion.div
      className="fixed inset-0 z-[180] flex items-center justify-center p-3 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — просмотр`}
    >
      <div
        className="absolute inset-0 bg-bg/90 backdrop-blur-xl"
        onClick={onClose}
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 44, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="relative flex h-[94dvh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-line bg-card shadow-2xl"
      >
        {/* Шапка */}
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-line px-5 py-4 md:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <span className="hidden shrink-0 rounded-full bg-accent px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-bg sm:inline-block">
              {categoryLabel[project.category]}
            </span>
            <h3 className="truncate font-display text-base font-semibold text-fg md:text-lg">
              {project.title}
            </h3>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span className="font-mono text-xs text-muted">
              {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <button
              onClick={onClose}
              aria-label="Закрыть"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-accent hover:text-accent"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Медиа */}
        <div className="relative min-h-0 flex-1 bg-black">
          {media.kind === "image" ? (
            <div className="absolute inset-0">
              <Image
                key={media.src}
                src={media.src}
                alt={media.alt}
                fill
                sizes="100vw"
                quality={85}
                className="object-contain"
                priority
              />
            </div>
          ) : (
            <video
              key={media.src}
              src={media.src}
              poster={media.poster}
              controls
              autoPlay
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-contain"
            />
          )}

          {total > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Предыдущий файл"
                className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-bg/70 text-fg backdrop-blur-md transition-colors hover:border-accent hover:text-accent"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                aria-label="Следующий файл"
                className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-bg/70 text-fg backdrop-blur-md transition-colors hover:border-accent hover:text-accent"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {/* Описание */}
        <div className="shrink-0 border-t border-line px-5 py-4 md:px-6">
          <p className="max-w-3xl text-sm leading-relaxed text-muted">
            {media.alt}
            <span className="mx-2 text-line">·</span>
            {project.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line px-3 py-1 text-[11px] text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Миниатюры */}
        {total > 1 && (
          <div
            className="flex shrink-0 gap-2 overflow-x-auto border-t border-line p-3 md:p-4"
            data-lenis-prevent
          >
            {project.gallery.map((m, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Файл ${i + 1}`}
                className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border transition-all duration-300 md:h-16 md:w-24 ${
                  i === idx
                    ? "border-accent opacity-100"
                    : "border-line opacity-50 hover:opacity-90"
                }`}
              >
                {m.kind === "image" || m.poster ? (
                  <Image
                    src={m.kind === "image" ? m.src : (m.poster as string)}
                    alt=""
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center bg-black text-muted">
                    <Play className="h-4 w-4 fill-current" />
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
