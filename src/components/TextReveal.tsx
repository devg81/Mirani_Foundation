import { useEffect, useRef, useState, type ElementType } from "react";

type TextRevealProps = {
  text: string;
  as?: ElementType;
  className?: string;
  /** ms delay before the first word starts */
  delay?: number;
  /** ms stagger between words */
  stagger?: number;
};

/**
 * Splits `text` into words, each masked and revealed with a staggered
 * translateY + fade as the element scrolls into view. Falls back to a
 * plain, fully-visible render under prefers-reduced-motion.
 */
export function TextReveal({
  text,
  as,
  className = "",
  delay = 0,
  stagger = 45,
}: TextRevealProps) {
  const Tag = (as ?? "span") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref as never} className={className}>
      {words.map((word, i) => (
        <span key={i} className="word-reveal-mask">
          <span
            className="word-reveal-inner"
            style={{
              animationDelay: visible ? `${delay + i * stagger}ms` : undefined,
              animationPlayState: visible ? "running" : "paused",
              opacity: visible ? undefined : 0,
              transform: visible ? undefined : "translateY(110%)",
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
