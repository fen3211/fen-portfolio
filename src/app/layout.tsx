import type { Metadata, Viewport } from "next";
import { Manrope, JetBrains_Mono, Unbounded } from "next/font/google";
import "./globals.css";
import "./portfolio.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-unbounded",
  display: "swap",
});

const jbmono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  variable: "--font-jbmono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FEN® — Graphic & Brand Designer · 3D & Motion Artist",
  description:
    "Портфолио: айдентика, визуальные коммуникации, полиграфия и OOH, 3D-визуализация, моушн-дизайн и видеомонтаж. Проектирую визуальные системы, которые решают бизнес-задачи.",
  keywords: [
    "графический дизайнер",
    "айдентика",
    "3D",
    "моушн-дизайн",
    "видеомонтаж",
    "портфолио",
  ],
};

export const viewport: Viewport = {
  themeColor: "#f7f7fb",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ru"
      className={`${manrope.variable} ${unbounded.variable} ${jbmono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
