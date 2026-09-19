# FEN — сайт-портфолио графического дизайнера

Премиальный одностраничный сайт-портфолио: айдентика, визуальные коммуникации,
3D и видеомонтаж. Тёмная editorial-тема, неоновый лаймовый акцент, плавные
анимации и интерактивные кейсы с работами из Яндекс.Диска.

## Деплой — GitHub Pages (настроен и работает)

Сайт живёт по адресу **https://fen3211.github.io/fen-portfolio/**

Деплой автоматический: workflow `.github/workflows/deploy.yml` собирает
статический экспорт (`npm run build:pages`) и публикует его при каждом пуше
в `main`. Никаких действий вручную не нужно.

Как это устроено:
- флаг `STATIC_EXPORT=1` включает в `next.config.ts` режим `output: "export"`;
- `basePath: "/fen-portfolio"` и `NEXT_PUBLIC_BASE_PATH` добавляют префикс
  к путям (сайт живёт в подпапке домена `fen3211.github.io`);
- обычные `npm run build` / `npm run start` работают как раньше — флаг
  используется только в CI.

## Vercel (альтернатива)

Vercel идеально подходит под Next.js, но с 2022 года ограничивает новые
регистрации из ряда стран — если вход не работает, GitHub Pages выше решает
всё без VPN. Если Vercel доступен: `git remote add origin …` уже настроен,
достаточно импортировать репозиторий `fen3211/fen-portfolio` на vercel.com.

## Быстрый старт

```bash
npm install
npm run dev     # разработка → http://localhost:3000
```

Продакшен:

```bash
npm run build
npm run start
```

## Стек

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **Tailwind CSS 4** (токены темы в `src/app/globals.css`)
- **Framer Motion** — reveal-анимации, split-text, tilt-карточки, лайтбокс
- **Lenis** — инерционный smooth scroll
- **Lucide React** — иконки
- Шрифты: Unbounded (акцидентный), Inter (текст), JetBrains Mono (лейблы)

## Структура

```
public/assets/
  logo.svg                    # логотип (в шапке, прелоадере и favicon)
  projects/…                  # изображения кейсов (превью, айдентика, аватары, 3D)
  videos/*.mp4                # видео: моушн, lyrics, интро-оверлей
  videos/posters/*.jpg        # кадры-постеры для видео
src/
  data/projects.ts            # ВСЕ кейсы: названия, описания, галереи, теги
  data/site.ts                # контакты и настройки бренда  ← заменить перед публикацией
  components/                 # Header, Hero, About, Skills, Works, Lightbox, Footer…
  components/anim/            # Reveal, SplitLines, SplitChars, Magnetic
  lib/lenis.ts                # smooth scroll и блокировки прокрутки
```

## Контакты

Контакты задаются в `src/data/site.ts` и используются в футере и мобильном меню:

- `telegram` — https://t.me/TT_Fen
- `email` — vlad2.0top@mail.ru

Логотип: `public/assets/logo.svg`. Если файл недоступен, шапка и прелоадер
автоматически показывают текстовую монограмму FEN (компонент `src/components/Logo.tsx`).

## Контент

Работы скачаны из общей папки Яндекс.Диска (`refs/fetch3.py` — скрипт закачки,
`refs/asset-manifest.json` — соответствие файлов исходным именам на диске).
Чтобы добавить кейс: положите файлы в `public/assets/projects/<папка>/` и
допишите объект в массив `projects` в `src/data/projects.ts` (поля `cover`,
`gallery`, `span` управляют карточкой в bento-сетке).
