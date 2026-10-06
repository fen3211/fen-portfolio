"use client";

import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { categoryLabel, type Project } from "@/data/projects";
import { withBase } from "@/lib/paths";

export function PortfolioGallery({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  const total = project.gallery.length;
  const media = project.gallery[index];
  const change = useCallback(
    (direction: number) => {
      setIndex((current) => (current + direction + total) % total);
      setFailed(false);
    },
    [total],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.documentElement.style.overflow;
    const previousFocus = document.activeElement;
    dialog?.showModal();
    document.documentElement.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.documentElement.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement)
        previousFocus.focus({ preventScroll: true });
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="pf-gallery"
      aria-labelledby="gallery-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        if (event.target instanceof HTMLVideoElement) return;
        if (event.key === "ArrowRight") {
          event.preventDefault();
          change(1);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          change(-1);
        }
      }}
    >
      <div className="pf-gallery-panel">
        <header className="pf-gallery-header">
          <div>
            <span className="pf-eyebrow">
              {categoryLabel[project.category]}
            </span>
            <h2 id="gallery-title">{project.title}</h2>
          </div>
          <button
            type="button"
            className="pf-icon-button"
            aria-label="Закрыть галерею"
            onClick={onClose}
          >
            <X size={22} />
          </button>
        </header>
        <div className="pf-gallery-stage">
          {failed ? (
            <div className="pf-media-error" role="alert">
              <p>Этот файл не удалось загрузить.</p>
              <button
                type="button"
                className="pf-button"
                onClick={() => setFailed(false)}
              >
                Попробовать ещё раз
              </button>
            </div>
          ) : media.kind === "image" ? (
            // Static assets retain their original detail and work with the GitHub Pages base path.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={media.src}
              src={withBase(media.src)}
              alt={media.alt}
              onError={() => setFailed(true)}
            />
          ) : (
            <video
              key={media.src}
              src={withBase(media.src)}
              poster={media.poster ? withBase(media.poster) : undefined}
              aria-label={media.alt}
              controls
              playsInline
              preload="metadata"
              onError={() => setFailed(true)}
            />
          )}
          {total > 1 && (
            <>
              <button
                type="button"
                className="pf-gallery-prev pf-icon-button"
                aria-label="Предыдущий файл"
                onClick={() => change(-1)}
              >
                <ArrowLeft size={22} />
              </button>
              <button
                type="button"
                className="pf-gallery-next pf-icon-button"
                aria-label="Следующий файл"
                onClick={() => change(1)}
              >
                <ArrowRight size={22} />
              </button>
            </>
          )}
        </div>
        <div className="pf-gallery-caption">
          <p>{media.alt}</p>
          <span aria-live="polite">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
        </div>
        <p className="pf-gallery-description">{project.description}</p>
        <div className="pf-gallery-thumbs" aria-label="Файлы проекта">
          {project.gallery.map((item, itemIndex) => (
            <button
              key={`${item.src}-${itemIndex}`}
              type="button"
              aria-label={`Файл ${itemIndex + 1}`}
              aria-pressed={index === itemIndex}
              onClick={() => {
                setIndex(itemIndex);
                setFailed(false);
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={withBase(
                  item.kind === "image"
                    ? item.src
                    : (item.poster ?? "/assets/videos/showreel-poster.jpg"),
                )}
                alt=""
                loading="lazy"
              />
              {item.kind === "video" && <span aria-hidden="true">▶</span>}
            </button>
          ))}
        </div>
      </div>
    </dialog>
  );
}
