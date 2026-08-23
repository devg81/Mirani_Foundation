import {
  cloneElement,
  isValidElement,
  useRef,
  type MouseEvent,
  type ReactElement,
} from "react";

type MagneticButtonProps = {
  children: ReactElement;
  /** How strongly the button follows the cursor (px of max travel). */
  strength?: number;
  /** Disable the magnetic pull but keep shine + ripple (e.g. small icon buttons). */
  magnet?: boolean;
  className?: string;
};

/**
 * Wraps a single interactive child (Link, <a>, <button>) and adds:
 *  - a subtle magnetic pull toward the cursor
 *  - a shine-sweep highlight on hover (via the shine-sweep utility class)
 *  - a ripple burst on click
 * Respects prefers-reduced-motion by skipping the magnetic transform.
 */
export function MagneticButton({
  children,
  strength = 18,
  magnet = true,
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    if (!magnet || reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    const mx = Math.max(-strength, Math.min(strength, x * 0.35));
    const my = Math.max(-strength, Math.min(strength, y * 0.35));
    el.style.setProperty("--mx", `${mx}px`);
    el.style.setProperty("--my", `${my}px`);
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mx", "0px");
    el.style.setProperty("--my", "0px");
  };

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || reduceMotion) return;
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const dot = document.createElement("span");
    dot.className = "ripple-dot";
    dot.style.width = dot.style.height = `${size}px`;
    dot.style.left = `${e.clientX - rect.left - size / 2}px`;
    dot.style.top = `${e.clientY - rect.top - size / 2}px`;
    el.appendChild(dot);
    window.setTimeout(() => dot.remove(), 650);
  };

  if (!isValidElement(children)) return children;

  const child = children as ReactElement<Record<string, unknown>>;

  return cloneElement(child, {
    ref,
    onMouseMove: (e: MouseEvent<HTMLElement>) => {
      (child.props.onMouseMove as ((e: MouseEvent<HTMLElement>) => void) | undefined)?.(e);
      handleMove(e);
    },
    onMouseLeave: (e: MouseEvent<HTMLElement>) => {
      (child.props.onMouseLeave as ((e: MouseEvent<HTMLElement>) => void) | undefined)?.(e);
      handleLeave();
    },
    onClick: (e: MouseEvent<HTMLElement>) => {
      handleClick(e);
      (child.props.onClick as ((e: MouseEvent<HTMLElement>) => void) | undefined)?.(e);
    },
    className: `${(child.props.className as string) ?? ""} magnetic shine-sweep relative overflow-hidden ${className}`.trim(),
  });
}
