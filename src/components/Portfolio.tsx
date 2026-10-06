"use client";

import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Copy,
  Menu,
  Play,
  X,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import {
  filters,
  projects,
  type Category,
  type Project,
} from "@/data/projects";
import { nav, site } from "@/data/site";
import { withBase } from "@/lib/paths";
import { PortfolioGallery } from "@/components/PortfolioGallery";

const toolset = [
  { mark: "Ps", name: "Photoshop", className: "ps" },
  { mark: "Ai", name: "Illustrator", className: "ai" },
  { mark: "Id", name: "InDesign", className: "id" },
  { mark: "Fi", name: "Figma", className: "fi" },
  { mark: "Ae", name: "After Effects", className: "ae" },
  { mark: "Pr", name: "Premiere Pro", className: "pr" },
  { mark: "C4D", name: "Cinema 4D", className: "c4d" },
  { mark: "B", name: "Blender", className: "bl" },
];
const services = [
  "Айдентика",
  "Графический дизайн",
  "Моушн-дизайн",
  "Монтаж",
  "3D-визуализация",
];

function BrandLogo() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="pf-brand-logo"
      src={withBase("/assets/logo.svg")}
      alt="FEN — creative studio"
      width={618}
      height={555}
    />
  );
}

function Spark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pf-spark ${className}`}
      viewBox="0 0 64 64"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M32 0 38 23 55 9 41 26 64 32 41 38 55 55 38 41 32 64 26 41 9 55 23 38 0 32 23 26 9 9 26 23Z" />
    </svg>
  );
}

function MobileMenu({
  onClose,
  triggerRef,
}: {
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const overflow = document.documentElement.style.overflow;
    dialog?.showModal();
    document.documentElement.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.documentElement.style.overflow = overflow;
      triggerRef.current?.focus({ preventScroll: true });
    };
  }, [triggerRef]);
  return (
    <dialog
      id="portfolio-menu"
      ref={ref}
      className="pf-menu"
      aria-label="Навигация"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className="pf-menu-top">
        <a href="#top" className="pf-wordmark" onClick={onClose}>
          <BrandLogo />
        </a>
        <button
          type="button"
          className="pf-icon-button"
          onClick={onClose}
          aria-label="Закрыть меню"
        >
          <X />
        </button>
      </div>
      <nav aria-label="Мобильная навигация">
        {nav.map((item, index) => (
          <a key={item.id} href={`#${item.id}`} onClick={onClose}>
            <span>0{index + 1}</span>
            {item.label}
            <ArrowUpRight />
          </a>
        ))}
      </nav>
      <a
        href={site.telegram}
        target="_blank"
        rel="noreferrer"
        className="pf-button"
      >
        Написать в Telegram <ArrowUpRight size={18} />
      </a>
    </dialog>
  );
}

function WorkCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}) {
  const poster =
    project.cover.kind === "image" ? project.cover.src : project.cover.poster;
  return (
    <article className={`pf-work pf-work-${project.id}`}>
      <button
        type="button"
        className="pf-work-open"
        aria-label={`${project.title} — смотреть кейс`}
        onClick={() => onOpen(project)}
      >
        <div className="pf-work-image">
          {
            poster && (
              <img
                src={withBase(poster)}
                alt={project.cover.alt}
                loading="lazy"
                decoding="async"
              />
            ) /* eslint-disable-line @next/next/no-img-element */
          }
          <span className="pf-work-index">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="pf-work-view">
            {project.cover.kind === "video" ? (
              <Play size={20} fill="currentColor" />
            ) : (
              <ArrowUpRight size={24} />
            )}
            <span>Смотреть кейс</span>
          </span>
          {project.cover.kind === "video" && (
            <span className="pf-video-label">
              <Play size={10} fill="currentColor" /> Motion / 3D
            </span>
          )}
        </div>
        <div className="pf-work-caption">
          <div>
            <p>{project.tags.join(" / ")}</p>
            <h3>{project.title}</h3>
          </div>
          <span>
            {project.year}
            <ArrowUpRight size={20} />
          </span>
        </div>
      </button>
    </article>
  );
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | Category>("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const closeGallery = useCallback(() => setSelected(null), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const list =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  useEffect(
    () => () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    [],
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopyState("idle"), 2500);
  };

  return (
    <div className="portfolio" id="top">
      <a href="#main-content" className="pf-skip">
        Перейти к содержимому
      </a>
      <header className="pf-header pf-container">
        <a href="#top" className="pf-wordmark" aria-label="FEN — главная">
          <BrandLogo />
        </a>
        <nav className="pf-desktop-nav" aria-label="Основная навигация">
          {nav.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="pf-header-actions">
          <a
            className="pf-header-contact"
            href={site.telegram}
            target="_blank"
            rel="noreferrer"
          >
            Есть идея? <ArrowUpRight size={17} />
          </a>
          <button
            ref={menuTriggerRef}
            type="button"
            className="pf-menu-toggle pf-icon-button"
            aria-label="Открыть меню"
            aria-expanded={menuOpen}
            aria-controls={menuOpen ? "portfolio-menu" : undefined}
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      <main id="main-content">
        <section
          className="pf-hero pf-container"
          aria-labelledby="portfolio-title"
        >
          <div className="pf-hero-top">
            <p>
              <span className="pf-status-dot" />
              Открыт к новым проектам
            </p>
            <span>SELECTED WORK / 2026</span>
          </div>
          <div className="pf-hero-art">
            <div className="pf-haze pf-haze-one" aria-hidden="true" />
            <div className="pf-haze pf-haze-two" aria-hidden="true" />
            <p className="pf-hero-welcome">
              Добро пожаловать
              <br />в моё портфолио
            </p>
            <span className="pf-hero-year" aria-hidden="true">
              2026<span>©</span>
            </span>
            <h1 id="portfolio-title">PORTFOLIO</h1>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="pf-hero-logo"
              src={withBase("/assets/logo.svg")}
              alt="Логотип FEN — creative studio"
              width={618}
              height={555}
              fetchPriority="high"
            />
            <Spark className="pf-hero-spark" />
            <span className="pf-hero-note">Графика. Бренд. Движение.</span>
          </div>
          <div className="pf-hero-bottom">
            <p>
              Визуальные идеи
              <br />
              <strong>с характером.</strong>
            </p>
            <p>
              Графический дизайнер
              <br />и 3D & Motion Artist
            </p>
            <a
              href="#works"
              className="pf-circle-link"
              aria-label="Смотреть работы"
            >
              <ArrowDown size={23} />
            </a>
          </div>
        </section>

        <section
          id="about"
          className="pf-about pf-container"
          aria-labelledby="about-title"
        >
          <div className="pf-about-visual">
            <div className="pf-polaroid">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={withBase("/assets/projects/three-d/3d-02.jpg")}
                alt="Моя работа — предметная 3D-визуализация"
                width={800}
                height={800}
              />
              <div>
                <span>MADE BY FEN</span>
                <Spark />
              </div>
            </div>
            <span className="pf-sticker">
              design
              <br />
              with a twist <ArrowUpRight size={20} />
            </span>
            <span className="pf-photo-note">Идея → форма → эмоция</span>
          </div>
          <div className="pf-about-card">
            <div className="pf-about-grid" aria-hidden="true" />
            <Spark className="pf-about-spark" />
            <span className="pf-eyebrow">01 / Немного обо мне</span>
            <h2 id="about-title">
              Привет,
              <br />я <span>FEN.</span>
            </h2>
            <p>
              Соединяю графику и движение.
              <br />
              Создаю айдентику, цифровую графику
              <br className="pf-desktop-break" /> и 3D — от идеи до экрана.
            </p>
            <div className="pf-about-tags">
              {services.map((service) => (
                <span key={service}>{service}</span>
              ))}
            </div>
            <div className="pf-about-footer">
              <span>Россия / Работаю по всему миру</span>
              <ArrowUpRight size={24} />
            </div>
          </div>
        </section>

        <section
          id="skills"
          className="pf-skills pf-container"
          aria-labelledby="skills-title"
        >
          <div className="pf-section-label">
            <span className="pf-eyebrow" id="skills-title">
              02 / Мои инструменты
            </span>
            <span>От первого эскиза до финального кадра</span>
          </div>
          <div className="pf-tool-list">
            {toolset.map((tool) => (
              <div key={tool.name} className="pf-tool">
                <span
                  className={`pf-tool-mark pf-tool-${tool.className}`}
                  aria-hidden="true"
                >
                  {tool.mark}
                </span>
                <span>{tool.name}</span>
              </div>
            ))}
          </div>
          <div className="pf-disciplines">
            <Spark />
            <span>Графика</span>
            <Spark />
            <span>Айдентика</span>
            <Spark />
            <span>Движение</span>
            <Spark />
            <span>3D</span>
            <Spark />
          </div>
        </section>

        <section
          id="works"
          className="pf-works pf-container"
          aria-labelledby="works-title"
        >
          <div className="pf-section-label">
            <span className="pf-eyebrow">03 / Избранные работы</span>
            <span>
              {String(projects.length).padStart(2, "0")} проектов / 2024 — 2026
            </span>
          </div>
          <div className="pf-works-heading">
            <h2 id="works-title">
              Меньше слов.
              <br />
              <span>Больше дизайна.</span>
            </h2>
            <Spark />
          </div>
          <div className="pf-filters" aria-label="Категории проектов">
            {filters.map((item) => (
              <button
                type="button"
                key={item.id}
                aria-pressed={filter === item.id}
                onClick={() => setFilter(item.id)}
              >
                {item.label}
                <span>
                  {item.id === "all"
                    ? projects.length
                    : projects.filter((project) => project.category === item.id)
                        .length}
                </span>
              </button>
            ))}
          </div>
          <p className="pf-sr-only" role="status">
            Показано проектов: {list.length}
          </p>
          <div className="pf-work-grid">
            {list.map((project) => (
              <WorkCard
                key={project.id}
                project={project}
                index={projects.indexOf(project)}
                onOpen={setSelected}
              />
            ))}
          </div>
        </section>

        <section className="pf-showreel" aria-labelledby="showreel-title">
          <div className="pf-container">
            <div className="pf-section-label">
              <span className="pf-eyebrow">04 / Дизайн в движении</span>
              <span>PRESS PLAY ↗</span>
            </div>
            <div className="pf-reel-heading">
              <h2 id="showreel-title">
                А теперь —<br />
                <em>в движении.</em>
              </h2>
              <p>
                Моушн, монтаж и 3D.
                <br />
                Всё, что не помещается в один кадр.
              </p>
            </div>
            <div className="pf-reel-frame">
              <video
                src={withBase("/assets/videos/showreel.mp4")}
                poster={withBase("/assets/videos/showreel-poster.jpg")}
                controls
                playsInline
                preload="none"
                aria-label="Шоурил FEN — дизайн, моушн и 3D"
              />
              <span className="pf-reel-tag" aria-hidden="true">
                FEN / SHOWREEL
              </span>
            </div>
          </div>
        </section>
      </main>

      <footer id="contacts" className="pf-footer pf-container">
        <div className="pf-section-label">
          <span className="pf-eyebrow">05 / На связи</span>
          <span>
            <span className="pf-status-dot" />
            Open to work
          </span>
        </div>
        <div className="pf-contact-heading">
          <h2>
            Есть идея?
            <br />
            <span>Давай создадим.</span>
          </h2>
          <a
            href={site.telegram}
            target="_blank"
            rel="noreferrer"
            className="pf-contact-arrow"
            aria-label="Обсудить проект в Telegram"
          >
            <ArrowUpRight strokeWidth={1} />
          </a>
        </div>
        <div className="pf-contact-links">
          <a href={site.telegram} target="_blank" rel="noreferrer">
            Написать в Telegram <ArrowUpRight size={20} />
          </a>
          <div>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <button
              type="button"
              aria-label="Скопировать email"
              onClick={copyEmail}
            >
              {copyState === "copied" ? (
                <Check size={18} />
              ) : (
                <Copy size={18} />
              )}
            </button>
          </div>
          <span className="pf-copy-status" role="status">
            {copyState === "copied"
              ? "Email скопирован"
              : copyState === "failed"
                ? "Не удалось скопировать. Нажми на адрес, чтобы написать."
                : "Отвечу в течение дня"}
          </span>
        </div>
        <div className="pf-footer-bottom">
          <a href="#top" className="pf-wordmark">
            <BrandLogo />
          </a>
          <span>© 2026 FEN — Creative portfolio</span>
          <a href="#top">
            Наверх <ArrowUpRight size={16} />
          </a>
        </div>
      </footer>
      {menuOpen && (
        <MobileMenu onClose={closeMenu} triggerRef={menuTriggerRef} />
      )}
      {selected && (
        <PortfolioGallery
          key={selected.id}
          project={selected}
          onClose={closeGallery}
        />
      )}
    </div>
  );
}
