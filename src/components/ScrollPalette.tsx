"use client";

import { useEffect } from "react";

type RGB = [number, number, number];

type Palette = {
  background: RGB;
  surface:    RGB;
  surface2:   RGB;
  text:       RGB;
  muted:      RGB;
  brand:      RGB;
  brand2:     RGB;
};

/* Black → charcoal → near-black wave as user scrolls */
const PALETTES: Palette[] = [
  {
    background: [0,   0,   0  ],
    surface:    [11,  11,  11 ],
    surface2:   [20,  20,  20 ],
    text:       [255, 255, 255],
    muted:      [150, 150, 150],
    brand:      [255, 213, 0  ],
    brand2:     [255, 165, 0  ],
  },
  {
    background: [10,  10,  10 ],
    surface:    [22,  22,  22 ],
    surface2:   [34,  34,  34 ],
    text:       [248, 248, 248],
    muted:      [142, 142, 142],
    brand:      [255, 213, 0  ],
    brand2:     [255, 165, 0  ],
  },
  {
    background: [4,   4,   4  ],
    surface:    [14,  14,  14 ],
    surface2:   [24,  24,  24 ],
    text:       [255, 255, 255],
    muted:      [155, 155, 155],
    brand:      [255, 213, 0  ],
    brand2:     [255, 165, 0  ],
  },
];

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}

function mixRGB(a: RGB, b: RGB, t: number): string {
  return `rgb(${lerp(a[0], b[0], t)} ${lerp(a[1], b[1], t)} ${lerp(a[2], b[2], t)})`;
}

export function ScrollPalette() {
  useEffect(() => {
    const root = document.documentElement;
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
    };
  }, []);

  return null;
}
