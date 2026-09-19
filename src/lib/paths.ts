/**
 * Префикс для «сырых» путей к ассетам (<img>, <video>): при сборке на
 * GitHub Pages сайт живёт в подпапке /fen-portfolio, и корневые пути
 * нужно дополнять. next/image и next/font учитывают basePath сами.
 */
export const withBase = (path: string): string =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
