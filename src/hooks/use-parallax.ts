import { useEffect, useRef, useState } from "react";

/**
 * Tracks how far `ref`'s element has scrolled past the top of the
 * viewport and returns that as a small pixel offset, clamped to
 * `max`. Intended for scroll-linked parallax on hero media/text.
 * Returns 0 (no movement) under prefers-reduced-motion.
 */
export function useParallax<T extends HTMLElement>(max = 60) {
  const ref = useRef<T | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // progress: 0 when top of el at top of viewport, 1 when scrolled a full viewport past
      const progress = Math.min(Math.max(-rect.top / vh, 0), 1);
      setOffset(progress * max);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [max]);

  return { ref, offset };
}
