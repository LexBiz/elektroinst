"use client";

import { useEffect } from "react";

type RGB = [number, number, number];
type Palette = {
  background: RGB; surface: RGB; surface2: RGB;
  text: RGB; muted: RGB; brand: RGB; brand2: RGB;
};

// Premium blue-iridescent palette: white → cool white → soft blue
const PALETTES: Palette[] = [
  {
    background: [248, 250, 255],
    surface:    [255, 255, 255],
    surface2:   [240, 245, 255],
    text:       [8,  12,  28],
    muted:      [80, 92, 118],
    brand:      [37, 99, 235],
    brand2:     [99, 102, 241],
  },
  {
    background: [243, 247, 255],
    surface:    [255, 255, 255],
    surface2:   [233, 241, 255],
    text:       [8,  12,  28],
    muted:      [80, 92, 118],
    brand:      [37, 99, 235],
    brand2:     [79, 70, 229],
  },
  {
    background: [236, 243, 255],
    surface:    [248, 251, 255],
    surface2:   [224, 234, 255],
    text:       [8,  12,  28],
    muted:      [80, 92, 118],
    brand:      [37, 99, 235],
    brand2:     [67, 56, 202],
  },
];

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

function mixRGB(a: RGB, b: RGB, t: number): string {
  return `rgb(${Math.round(lerp(a[0], b[0], t))} ${Math.round(lerp(a[1], b[1], t))} ${Math.round(lerp(a[2], b[2], t))})`;
}

export function ScrollPaletteLight() {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = "light";
    let raf = 0;

    function apply() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const norm = max <= 0 ? 0 : Math.min(window.scrollY / max, 1);
      const stepped = norm * (PALETTES.length - 1);
      const idx = Math.min(Math.floor(stepped), PALETTES.length - 2);
      const t = stepped - idx;
      const a = PALETTES[idx];
      const b = PALETTES[idx + 1];
      root.style.setProperty("--background", mixRGB(a.background, b.background, t));
      root.style.setProperty("--surface",    mixRGB(a.surface,    b.surface,    t));
      root.style.setProperty("--surface-2",  mixRGB(a.surface2,   b.surface2,   t));
      root.style.setProperty("--text",       mixRGB(a.text,       b.text,       t));
      root.style.setProperty("--muted",      mixRGB(a.muted,      b.muted,      t));
      root.style.setProperty("--brand",      mixRGB(a.brand,      b.brand,      t));
      root.style.setProperty("--brand-2",    mixRGB(a.brand2,     b.brand2,     t));
    }

    function onScroll() {
      if (raf) return;
      raf = window.requestAnimationFrame(() => { apply(); raf = 0; });
    }

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
      delete root.dataset.theme;
    };
  }, []);

  return null;
}
