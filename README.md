# FEN — сайт-портфолио графического дизайнера

Премиальный одностраничный сайт-портфолио: айдентика, визуальные коммуникации,
3D и видеомонтаж. Тёмная editorial-тема, неоновый лаймовый акцент, плавные
анимации и интерактивные кейсы с работами из Яндекс.Диска.

## Деплой на Vercel (бесплатно)

1. **Создайте репозиторий на GitHub** и отправьте проект:

   ```bash
   git remote add origin https://github.com/ВАШ_НИК/fen-portfolio.git
   git push -u origin main
   ```

2. **На vercel.com** войдите через GitHub → «Add New… Project» → импортируйте
   репозиторий. Vercel сам определит Next.js — настройки сборки менять не нужно,
   нажмите «Deploy».
3. Через ~минуту сайт будет доступен по адресу `ваш-проект.vercel.app`.
   Каждый `git push` в `main` обновляет продакшен автоматически.

Альтернатива без GitHub — CLI: `npx vercel` из папки проекта (потребует
войти в аккаунт Vercel).

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
