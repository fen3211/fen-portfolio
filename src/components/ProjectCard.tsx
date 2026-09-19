"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import { useRef, useState } from "react";
import { categoryLabel, type Project } from "@/data/projects";
import { withBase } from "@/lib/paths";

const spanClass: Record<Project["span"], string> = {
  wide: "md:col-span-8",
  normal: "md:col-span-4",
  tall: "md:col-span-4",
  full: "md:col-span-12",
};

const aspectClass: Record<Project["span"], string> = {
  wide: "aspect-[16/10]",
  normal: "aspect-[4/3]",
  tall: "aspect-[4/5]",
  full: "aspect-[16/9] md:aspect-[21/9]",
};

const sizesBySpan: Record<Project["span"], string> = {
  wide: "(max-width: 768px) 100vw, 66vw",
  normal: "(max-width: 768px) 100vw, 33vw",
  tall: "(max-width: 768px) 100vw, 33vw",
  full: "(max-width: 768px) 100vw, 92vw",
};

export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (p: Project) => void;
}) {
  const tiltRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), {
    stiffness: 160,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), {
    stiffness: 160,
    damping: 18,
  });
  const [hover, setHover] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    const r = tiltRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onEnter = () => {
    setHover(true);
    videoRef.current?.play().catch(() => {});
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
    setHover(false);
    if (videoRef.current) {
      videoRef.current.pause();
      try {
        videoRef.current.currentTime = 0;
      } catch {}
    }
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 12 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`col-span-1 ${spanClass[project.span]}`}
    >
      <motion.div
        ref={tiltRef}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={() => onOpen(project)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen(project);
          }
        }}
        aria-label={`${project.title} — смотреть кейс`}
        style={{ rotateX, rotateY, transformPerspective: 1100 }}
        className="group relative h-full w-full cursor-pointer overflow-hidden rounded-3xl border border-line bg-card transition-[border-color,box-shadow] duration-500 outline-none focus-visible:border-accent hover:border-accent/50 hover:shadow-[0_24px_90px_-30px_rgba(212,255,0,0.35)]"
      >
        {/* медиа */}
        <div
          className={`relative ${aspectClass[project.span]} w-full overflow-hidden bg-black/40`}
        >
          {project.cover.kind === "image" ? (
            <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.05]">
              <Image
                src={project.cover.src}
                alt={project.cover.alt}
                fill
                sizes={sizesBySpan[project.span]}
                className="object-cover"
              />
            </div>
          ) : (
            <video
              ref={videoRef}
              src={withBase(project.cover.src)}
              poster={project.cover.poster ? withBase(project.cover.poster) : undefined}
              muted
              loop
              playsInline
              preload="none"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
          )}

          {/* затемнение снизу */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />

          {/* категория */}
          <span className="absolute left-4 top-4 rounded-full border border-fg/15 bg-bg/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-fg/90 backdrop-blur-md md:left-5 md:top-5">
            {categoryLabel[project.category]}
          </span>

          {/* кнопка просмотра */}
          <span
            className={`absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-accent text-bg transition-all duration-400 md:right-5 md:top-5 ${
              hover ? "scale-100 opacity-100" : "scale-75 opacity-0"
            }`}
          >
            {project.cover.kind === "video" ? (
              <Play className="h-4.5 w-4.5 fill-current" />
            ) : (
              <ArrowUpRight className="h-5 w-5" />
            )}
          </span>

          {/* индикатор видео */}
          {project.cover.kind === "video" && (
            <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-bg/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-fg/80 backdrop-blur-md md:bottom-5 md:left-5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              видео
            </span>
          )}
        </div>

        {/* описание */}
        <div className="relative p-5 md:p-6">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-lg font-semibold leading-snug text-fg transition-colors duration-300 group-hover:text-accent md:text-xl">
              {project.title}
            </h3>
            <span className="shrink-0 font-mono text-xs text-muted">{project.year}</span>
          </div>
          <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-muted">
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full border border-line px-3 py-1 text-[11px] text-muted transition-colors duration-300 group-hover:border-fg/20"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}
