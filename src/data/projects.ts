export type MediaKind = "image" | "video";

export interface Media {
  kind: MediaKind;
  src: string;
  alt: string;
  /** кадр-превью для видео */
  poster?: string;
}

export type Category = "design" | "motion3d";

export interface Project {
  id: string;
  title: string;
  category: Category;
  tags: string[];
  year: string;
  description: string;
  cover: Media;
  gallery: Media[];
  /** форма карточки в bento-сетке */
  span: "wide" | "normal" | "tall" | "full";
  link?: string;
}

export const categoryLabel: Record<Category, string> = {
  design: "Графический дизайн",
  motion3d: "Монтаж + 3D",
};

export const filters: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "Все проекты" },
  { id: "design", label: "Графический дизайн" },
  { id: "motion3d", label: "Монтаж + 3D" },
];

const img = (src: string, alt: string): Media => ({ kind: "image", src, alt });
const vid = (src: string, alt: string, poster?: string): Media => ({
  kind: "video",
  src,
  alt,
  poster,
});

export const projects: Project[] = [
  {
    id: "eblan-awards",
    title: "Eblan Awards — айдентика премии",
    category: "design",
    tags: ["Айдентика", "Премия", "Telegram"],
    year: "2026",
    span: "wide",
    description:
      "Полный визуальный пакет интернет-премии: логотип, шапки каналов, 20 карточек номинаций и стикеры голосования — единая золотая система, узнаваемая с первой секунды.",
    cover: img(
      "/assets/projects/eblan-awards/aw-cover-2.png",
      "Баннер премии Eblan Awards"
    ),
    gallery: [
      img("/assets/projects/eblan-awards/aw-cover-2.png", "Баннер премии Eblan Awards"),
      img("/assets/projects/eblan-awards/aw-cover-1.png", "Логотип премии Eblan Awards"),
      img("/assets/projects/eblan-awards/aw-extra-3.png", "Тёмная версия баннера"),
      img("/assets/projects/eblan-awards/nominations/awn-02.png", "Номинация — Лучший новостной паблик года"),
      img("/assets/projects/eblan-awards/nominations/awn-06.png", "Номинация — Eblan года"),
      img("/assets/projects/eblan-awards/nominations/awn-07.png", "Номинация — Eblan-мем года"),
      img("/assets/projects/eblan-awards/nominations/awn-09.png", "Номинация — Eblanka года"),
      img("/assets/projects/eblan-awards/nominations/awn-10.png", "Номинация — Игра года"),
      img("/assets/projects/eblan-awards/nominations/awn-12.png", "Номинация — Конфликт года"),
      img("/assets/projects/eblan-awards/nominations/awn-13.png", "Номинация — Музыкант года"),
      img("/assets/projects/eblan-awards/nominations/awn-18.png", "Номинация — Событие года"),
      img("/assets/projects/eblan-awards/nominations/awn-19.png", "Номинация — Стрим-хата года"),
      img("/assets/projects/eblan-awards/stickers/aws-01.png", "Стикер голосования"),
      img("/assets/projects/eblan-awards/stickers/aws-13.png", "Стикер голосования — пара года"),
      img("/assets/projects/eblan-awards/stickers/aws-14.png", "Стикер голосования"),
      img("/assets/projects/eblan-awards/stickers/aws-17.png", "Стикер голосования"),
    ],
  },
  {
    id: "avatars",
    title: "Аватары и знаки каналов",
    category: "design",
    tags: ["Аватары", "Логотипы", "Соцсети"],
    year: "2024–25",
    span: "normal",
    description:
      "Цикл аватаров и знаков для каналов и сообществ: от монохромных логотипов до иллюстративных обложек профиля — каждый выдержан в своём характере.",
    cover: img("/assets/projects/avatars/ava-01.png", "Знак канала — жёлтая монограмма"),
    gallery: [
      img("/assets/projects/avatars/ava-01.png", "Знак канала — жёлтая монограмма"),
      img("/assets/projects/avatars/ava-02.png", "Аватар премии"),
      img("/assets/projects/avatars/ava-03.png", "Логотип — синий круглый знак"),
      img("/assets/projects/avatars/ava-04.png", "Аватар — неоновая иллюстрация"),
      img("/assets/projects/avatars/ava-05.png", "Аватар — зелёный силуэт"),
      img("/assets/projects/avatars/ava-06.png", "Аватар — зелёный силуэт, вариант"),
      img("/assets/projects/avatars/ava-07.jpg", "Круглый знак канала"),
    ],
  },
  {
    id: "youtube-previews",
    title: "Превью для YouTube",
    category: "design",
    tags: ["Обложки", "Типографика", "Коллаж"],
    year: "2024–25",
    span: "normal",
    description:
      "Серия обложек для видеоплатформы: фотоколлаж, дерзкая типографика и цвет, который выделяет ролик в ленте рекомендаций и поднимает CTR.",
    cover: img("/assets/projects/yt/yt-12.png", "Превью — SLAY, номинации года"),
    gallery: [
      img("/assets/projects/yt/yt-12.png", "Превью — SLAY, номинации года"),
      img("/assets/projects/yt/yt-08.png", "Превью — Стрижка"),
      img("/assets/projects/yt/yt-14.png", "Превью — главная премия ру-стриминга"),
      img("/assets/projects/yt/yt-17.png", "Превью — стримеры, похожие на актёров"),
      img("/assets/projects/yt/yt-05.png", "Превью — стрим-хата, постер"),
      img("/assets/projects/yt/yt-10.png", "Превью — восковое безумие"),
      img("/assets/projects/yt/yt-09.png", "Превью — хоррор-эпизод"),
      img("/assets/projects/yt/yt-13.png", "Превью — No, I'm not a Human"),
      img("/assets/projects/yt/yt-18.png", "Превью — тюрьма, спортивный коллаж"),
      img("/assets/projects/yt/yt-16.png", "Превью — смузи вслепую"),
      img("/assets/projects/yt/yt-04.jpg", "Превью — судья"),
      img("/assets/projects/yt/yt-07.png", "Превью — конфликт"),
      img("/assets/projects/yt/yt-20.png", "Превью — No, I'm not a Human, версия 2"),
      img("/assets/projects/yt/yt-01.png", "Превью — выпуск №2"),
    ],
  },
  {
    id: "telegram-templates",
    title: "Шаблоны для Telegram-каналов",
    category: "design",
    tags: ["Системный дизайн", "Соцсети"],
    year: "2025",
    span: "normal",
    description:
      "Системные шаблоны постов: инфо-карточки, анонсы и промо-макеты — оформление канала остаётся цельным в руках любого автора.",
    cover: img("/assets/projects/telegram/tg-01.jpg", "Шаблон поста для Telegram"),
    gallery: [
      img("/assets/projects/telegram/tg-01.jpg", "Шаблон поста — инфо-карточка"),
      img("/assets/projects/telegram/tg-02.jpg", "Шаблон поста — анонс"),
      img("/assets/projects/telegram/tg-03.jpg", "Шаблон поста — затемнённая версия"),
      img("/assets/projects/telegram/tg-04.jpg", "Шаблон поста — промо"),
      img("/assets/projects/misc/misc-01.jpg", "Промо-макет розыгрыша"),
      img("/assets/projects/misc/misc-02.png", "Промо-макет на кирпичной стене"),
    ],
  },
  {
    id: "lyrics",
    title: "Lyrics-видео",
    category: "motion3d",
    tags: ["Кинетическая типографика", "Монтаж"],
    year: "2024–25",
    span: "normal",
    description:
      "Анимированная типографика под музыку: ритм монтажа следует за битом, текст становится главным героем клипа.",
    cover: vid("/assets/videos/lyrics-pereboli.mp4", "Lyrics-видео — Переболи во мне моя тоска", "/assets/videos/posters/lyrics-pereboli.jpg"),
    gallery: [
      vid("/assets/videos/lyrics-pereboli.mp4", "Lyrics-видео — Переболи во мне моя тоска", "/assets/videos/posters/lyrics-pereboli.jpg"),
      vid("/assets/videos/lyrics-ne-nado.mp4", "Lyrics-видео — Пожалуйста не надо", "/assets/videos/posters/lyrics-ne-nado.jpg"),
    ],
  },
  {
    id: "motion-banners",
    title: "Логотипы и баннеры в движении",
    category: "motion3d",
    tags: ["Моушн", "Анимация логотипов", "Баннеры"],
    year: "2024–25",
    span: "wide",
    description:
      "Живые логотипы, анимированные баннеры и титры: короткие моушн-ролики, которые превращают статичную айдентику в событие на экране.",
    cover: vid("/assets/videos/banner-contest.mp4", "Анимированный баннер для конкурса", "/assets/videos/posters/banner-contest.jpg"),
    gallery: [
      vid("/assets/videos/banner-contest.mp4", "Анимированный баннер для конкурса", "/assets/videos/posters/banner-contest.jpg"),
      vid("/assets/videos/logo.mp4", "Анимация логотипа", "/assets/videos/posters/logo.jpg"),
      vid("/assets/videos/logo-2.mp4", "Анимация логотипа — вариант 2", "/assets/videos/posters/logo-2.jpg"),
      vid("/assets/videos/logo-3.mp4", "Анимация логотипа — вариант 3", "/assets/videos/posters/logo-3.jpg"),
      vid("/assets/videos/logo-4.mp4", "Анимация логотипа — вариант 4", "/assets/videos/posters/logo-4.jpg"),
      vid("/assets/videos/anim.mp4", "Анимационная заставка", "/assets/videos/posters/anim.jpg"),
      vid("/assets/videos/text.mp4", "Титры и текст в движении", "/assets/videos/posters/text.jpg"),
      vid("/assets/videos/test-task.mp4", "Тестовое моушн-задание", "/assets/videos/posters/test-task.jpg"),
    ],
  },
  {
    id: "three-d",
    title: "3D-сцены и интро-оверлеи",
    category: "motion3d",
    tags: ["3D", "Рендер", "Оверлеи"],
    year: "2024–25",
    span: "normal",
    description:
      "Трёхмерная графика для эфиров и презентаций: интро-оверлей для трансляций, сцены и предметные рендеры.",
    cover: vid("/assets/videos/ne-stint-intro-overlay.mp4", "Интро-оверлей для трансляций", "/assets/videos/posters/ne-stint-intro-overlay.jpg"),
    gallery: [
      vid("/assets/videos/ne-stint-intro-overlay.mp4", "Интро-оверлей для трансляций", "/assets/videos/posters/ne-stint-intro-overlay.jpg"),
      img("/assets/projects/three-d/3d-02.jpg", "Предметный 3D-рендер"),
      img("/assets/projects/three-d/3d-01.jpg", "3D-сцена с персонажем"),
    ],
  },
];
