"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" },
    );

    function observe() {
      document.querySelectorAll<Element>(".reveal:not(.visible)").forEach((el) => io.observe(el));
    }

    // Observe immediately, then once more after a short delay
    // to catch elements that render slightly after the effect fires.
    observe();
    const timer = setTimeout(observe, 120);

    // Also pick up any elements added to the DOM after initial scan
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
